import { Preference } from 'mercadopago';
import client from '../config/mercadopago.js';
import Pedido from '../database/models/pedido.js';
import Producto from '../database/models/producto.js';
import { randomUUID } from 'crypto';

// Crear una preferencia de pago
export const crearPreferencia = async (req, res) => {
  let nuevoPedido = null; // Declarar fuera del try para acceso en catch
  
  try {
    const { productos, usuario } = req.body;

    // Validar que se envíen productos
    if (!productos || productos.length === 0) {
      return res.status(400).json({ 
        mensaje: 'Debe enviar al menos un producto' 
      });
    }

    // Obtener información de los productos desde la BD
    const productosDB = await Producto.find({
      '_id': { $in: productos.map(p => p.id) }
    });

    if (productosDB.length !== productos.length) {
      return res.status(400).json({ 
        mensaje: 'Algunos productos no existen en la base de datos' 
      });
    }

    // Calcular el total y preparar items para Mercado Pago
    let total = 0;
    const items = productosDB.map((producto, index) => {
      const cantidad = productos.find(p => p.id === producto._id.toString()).cantidad || 1;
      total += producto.precio * cantidad;

      return {
        title: producto.nombreProducto,
        description: producto.descripcion_breve || 'Producto ChocoDevs',
        picture_url: producto.imagen,
        category_id: producto.categoria,
        quantity: cantidad,
        unit_price: Number(producto.precio),
        currency_id: 'ARS'
      };
    });

    // Crear el pedido en la base de datos con estado PENDIENTE
    nuevoPedido = new Pedido({
      usuario: usuario || null,
      productos: productosDB.map(p => p._id),
      total: total,
      metodoPago: 'PENDIENTE',
      estado: 'PENDIENTE'
    });

    await nuevoPedido.save();

    // Verificar que las URLs estén configuradas
    if (!process.env.FRONTEND_URL || !process.env.BACKEND_URL) {
      return res.status(500).json({
        mensaje: 'Error de configuración del servidor',
        error: 'FRONTEND_URL y BACKEND_URL deben estar configuradas en .env'
      });
    }

    // Crear la preferencia de Mercado Pago
    const preference = new Preference(client);

    const preferenceData = {
      items: items,
      back_urls: {
        success: `${process.env.FRONTEND_URL}/pago-exitoso`,
        failure: `${process.env.FRONTEND_URL}/pago-fallido`,
        pending: `${process.env.FRONTEND_URL}/pago-pendiente`
      },
      notification_url: `${process.env.BACKEND_URL}/api/pagos/webhook`,
      external_reference: nuevoPedido._id.toString(),
      payment_methods: {
        excluded_payment_types: [],
        installments: 12
      },
      payer: {
        email: "test_payer@test.com"
      }
    };

    console.log('Datos de preferencia:', JSON.stringify(preferenceData, null, 2));

    // Generar un idempotencyKey único para esta operación
    const idempotencyKey = randomUUID();
    console.log('IdempotencyKey generado:', idempotencyKey);

    const result = await preference.create({ 
      body: preferenceData,
      requestOptions: {
        idempotencyKey: idempotencyKey
      }
    });

    console.log('Preferencia creada exitosamente:', result.id);

    res.status(201).json({
      mensaje: 'Preferencia creada exitosamente',
      preferenceId: result.id,
      initPoint: result.init_point,
      pedidoId: nuevoPedido._id
    });

  } catch (error) {
    console.error('Error al crear la preferencia:', error);
    
    // Limpiar el pedido si falló la creación de la preferencia
    if (nuevoPedido && nuevoPedido._id) {
      try {
        await Pedido.findByIdAndDelete(nuevoPedido._id);
        console.log('Pedido limpiado:', nuevoPedido._id);
      } catch (deleteError) {
        console.error('Error al limpiar pedido:', deleteError);
      }
    }
    
    res.status(500).json({ 
      mensaje: 'Error al crear la preferencia de pago',
      error: error.message,
      detalles: error.cause || 'Verifica la configuración de Mercado Pago'
    });
  }
};

// Webhook para recibir notificaciones de Mercado Pago
export const webhook = async (req, res) => {
  try {
    const { type, data } = req.body;

    console.log('Webhook recibido:', { type, data });

    // Mercado Pago envía notificaciones de tipo "payment"
    if (type === 'payment') {
      const paymentId = data.id;

      // Importar Payment SDK de Mercado Pago
      const { Payment } = await import('mercadopago');
      const payment = new Payment(client);

      // Obtener información del pago
      const paymentInfo = await payment.get({ id: paymentId });
      
      if (paymentInfo) {
        const pedidoId = paymentInfo.external_reference;
        const estado = paymentInfo.status;
        const metodoPago = paymentInfo.payment_method_id;

        // Actualizar el estado del pedido según el estado del pago
        let estadoPedido = 'PENDIENTE';
        if (estado === 'approved') {
          estadoPedido = 'PAGADO';
        } else if (estado === 'rejected' || estado === 'cancelled') {
          estadoPedido = 'FALLIDO';
        }

        // Actualizar el pedido en la base de datos
        await Pedido.findByIdAndUpdate(pedidoId, {
          estado: estadoPedido,
          metodoPago: metodoPago || 'MERCADOPAGO',
          mercadoPagoId: paymentId,
          preferenceId: paymentInfo.preference_id
        });

        console.log(`Pedido ${pedidoId} actualizado a estado: ${estadoPedido}`);
      }
    }

    // IMPORTANTE: Siempre responder con 200 o 201
    res.status(200).json({ mensaje: 'Webhook recibido correctamente' });

  } catch (error) {
    console.error('Error en webhook:', error);
    // Aún así, responder con 200 para evitar reintentos de MP
    res.status(200).json({ mensaje: 'Webhook procesado' });
  }
};

// Obtener el estado de un pedido
export const obtenerEstadoPedido = async (req, res) => {
  try {
    const { id } = req.params;

    const pedido = await Pedido.findById(id)
      .populate('usuario', 'nombreUsuario email')
      .populate('productos', 'nombreProducto precio imagen');

    if (!pedido) {
      return res.status(404).json({ 
        mensaje: 'Pedido no encontrado' 
      });
    }

    res.status(200).json(pedido);

  } catch (error) {
    console.error('Error al obtener el pedido:', error);
    res.status(500).json({ 
      mensaje: 'Error al obtener el pedido',
      error: error.message 
    });
  }
};

// Listar todos los pedidos de un usuario
export const listarPedidosUsuario = async (req, res) => {
  try {
    const { usuarioId } = req.params;

    const pedidos = await Pedido.find({ usuario: usuarioId })
      .populate('productos', 'nombreProducto precio imagen')
      .sort({ fechaCreacion: -1 });

    res.status(200).json(pedidos);

  } catch (error) {
    console.error('Error al listar pedidos:', error);
    res.status(500).json({ 
      mensaje: 'Error al listar los pedidos',
      error: error.message 
    });
  }
};
