import { MercadoPagoConfig, Preference } from "mercadopago";
import Pedido from '../database/models/pedidos.js';
import { enviarMail } from '../helpers/enviarMail.js'; 

// Configurar cliente de Mercado Pago
const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

export const createPreference = async (req, res) => {
  try {
    console.log('🎯 Creando preferencia con token:', process.env.MP_ACCESS_TOKEN ? '✅ Cargado' : '❌ Error');
    
    const { items } = req.body;

    // 🔹 Extraemos datos del retiro enviados desde el frontend
    const { nombreRetira, fechaRetira, horaRetira } = req.body;

    // 🔹 Validamos datos del retiro
    if (!nombreRetira || !fechaRetira || !horaRetira) {
      return res.status(400).json({
        error: "Debe indicar nombre, fecha y horario de retiro"
      });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "El carrito está vacío o es inválido" });
    }

    const preference = new Preference(client);
    
    const response = await preference.create({
      body: {
        items: items.map((item) => ({
          title: item.nombreProducto || item.title,
          quantity: item.cantidad || item.quantity || 1,
          unit_price: Number(item.precio || item.unit_price),
          currency_id: "ARS",
        })),
        back_urls: {
          success: "https://chocodevs.netlify.app/success",
          failure: "https://chocodevs.netlify.app/failure",
          pending: "https://chocodevs.netlify.app/pending",
        },
        payment_methods: {
          excluded_payment_types: [],
          installments: 12,
        },
      },
    });

    console.log("✅ Preferencia creada exitosamente. ID:", response.id);

    try {
      await enviarMail({
        subject: 'Nueva compra con Mercado Pago',
        items,
        metodoPago: 'MP',
        nombreRetira,
        fechaRetira,
        horaRetira
      });
    } catch (err) {
      console.error('❌ Error enviando mail de Mercado Pago:', err.message);
    }

    res.status(200).json({
      preferenceId: response.id,
      init_point: response.init_point,
    });
  } catch (error) {
    console.error("❌ Error creando preferencia:", error);
    res.status(500).json({ 
      error: "Error creando la preferencia de pago",
      details: error.message 
    });
  }
};


export const registrarPedidoEfectivo = async (req, res) => {
  try {
    const { items, total, nombreRetira, fechaRetira, horaRetira } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ 
        mensaje: 'Debe enviar al menos un producto' 
      });
    }

    if (!nombreRetira || !fechaRetira || !horaRetira) {
      return res.status(400).json({
        mensaje: 'Debe indicar nombre, fecha y horario de retiro'
      });
    }

    const nuevoPedido = new Pedido({
      usuario: null,
      productos: items.map(item => item._id),
      total,
      metodoPago: 'EFECTIVO',
      estado: 'PENDIENTE_RETIRO',
      nombreRetira,
      fechaRetira,
      horaRetira
    });

    await nuevoPedido.save();

    console.log('✅ Pedido en efectivo registrado:', nuevoPedido._id);

    try {
      await enviarMail({
        subject: 'Nuevo pedido para retirar en local',
        items,
        metodoPago: 'EFECTIVO',
        nombreRetira,
        fechaRetira,
        horaRetira
      });
    } catch (err) {
      console.error('❌ Error enviando mail de pedido en efectivo:', err.message);
    }

    res.status(201).json({
      mensaje: 'Pedido registrado exitosamente',
      orderId: nuevoPedido._id,
      metodoPago: 'EFECTIVO'
    });

  } catch (error) {
    console.error('❌ Error al registrar pedido en efectivo:', error);
    res.status(500).json({ 
      mensaje: 'Error al registrar el pedido',
      error: error.message 
    });
  }
};

export const registrarPedidoMercadoPago = async (req, res) => {
  try {
    const { items, total, nombreRetira, fechaRetira, horaRetira, paymentId, status } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ mensaje: 'Debe enviar al menos un producto' });
    }

    if (!nombreRetira || !fechaRetira || !horaRetira) {
      return res.status(400).json({
        mensaje: 'Debe indicar nombre, fecha y horario de retiro'
      });
    }

    if (!paymentId) {
      return res.status(400).json({
        mensaje: 'Debe indicar el ID de pago de Mercado Pago'
      });
    }

    const nuevoPedido = new Pedido({
      usuario: null,
      productos: items.map(item => item._id),
      total,
      metodoPago: 'MERCADO_PAGO',
      estado: status === "approved" ? "PENDIENTE_RETIRO" : "PENDIENTE_PAGO",
      nombreRetira,
      fechaRetira,
      horaRetira,
      paymentId
    });

    await nuevoPedido.save();

    console.log("✅ Pedido MP guardado en DB:", nuevoPedido._id);

    try {
      await enviarMail({
        subject: "Nueva compra con Mercado Pago",
        items,
        metodoPago: "MERCADO_PAGO",
        nombreRetira,
        fechaRetira,
        horaRetira
      });
    } catch (error) {
      console.error("❌ Error enviando mail:", error.message);
    }

    res.status(201).json({
      mensaje: "Pedido registrado exitosamente",
      orderId: nuevoPedido._id,
      metodoPago: "MERCADO_PAGO"
    });

  } catch (error) {
    console.error("❌ Error registrando pedido MP:", error);
    res.status(500).json({
      mensaje: "Error al registrar el pedido",
      error: error.message
    });
  }
};
