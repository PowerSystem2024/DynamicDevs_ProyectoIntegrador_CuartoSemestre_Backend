import { crearPedidoService, listarPedidosUsuarioService, listarPedidosAdminService, actualizarEstadoPagoService } from "../services/pedidos.service.js";

// Crea un pedido a partir del carrito enviado por el usuario autenticado
// Body esperado: { productos: [{ productoId, cantidad }], metodoPago }
export const crearPedido = async (req, res) => {
  try {
    const usuarioId = req.usuario?.uid; // seteado por autenticarJWT
    if (!usuarioId) {
      return res.status(401).json({ mensaje: "No autenticado" });
    }

    const { productos, metodoPago } = req.body;
    const pedido = await crearPedidoService({ usuarioId, productos, metodoPago });
    return res.status(201).json({ mensaje: "Pedido creado", pedido });
  } catch (error) {
    return res.status(500).json({ mensaje: "Error del servidor", error: error.message });
  }
};

// Lista pedidos del usuario autenticado
export const listarPedidosUsuario = async (req, res) => {
  try {
    const usuarioId = req.usuario?.uid;
    if (!usuarioId) {
      return res.status(401).json({ mensaje: "No autenticado" });
    }

    const pedidos = await listarPedidosUsuarioService(usuarioId);
    return res.json(pedidos);
  } catch (error) {
    return res.status(500).json({ mensaje: "Error del servidor", error: error.message });
  }
};

// Lista todos los pedidos (solo ADMIN)
export const listarPedidosAdmin = async (req, res) => {
  try {
    const rol = req.usuario?.rol;
    if (rol !== "ADMIN") {
      return res.status(403).json({ mensaje: "No autorizado" });
    }

    const pedidos = await listarPedidosAdminService();
    return res.json(pedidos);
  } catch (error) {
    return res.status(500).json({ mensaje: "Error del servidor", error: error.message });
  }
};

// Actualiza estado de pago según notificación de Mercado Pago
// Body esperado: { external_reference (pedidoId), status }
export const actualizarEstadoPago = async (req, res) => {
  try {
    // TODO: Validar firma/seguridad de notificación según Mercado Pago
    const { external_reference, status } = req.body;
    const pedido = await actualizarEstadoPagoService({ external_reference, status });
    return res.json({ mensaje: "Estado actualizado", pedido });
  } catch (error) {
    return res.status(500).json({ mensaje: "Error del servidor", error: error.message });
  }
};


