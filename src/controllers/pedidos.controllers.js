import Pedido from "../database/models/pedidos.js";

// =========================
// REGISTRAR PEDIDO EFECTIVO
// =========================
export const registrarPedidoEfectivo = async (req, res) => {
  try {
    const { items, total } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ mensaje: "No hay productos en el pedido." });
    }

    const pedido = new Pedido({
      productos: items.map(i => i._id),
      total,
      metodoPago: "EFECTIVO",
      estado: "PENDIENTE_RETIRO",
    });

    await pedido.save();

    return res.status(201).json({
      mensaje: "Pedido registrado con éxito",
      orderId: pedido._id,
    });

  } catch (error) {
    console.error("Error al registrar pedido efectivo:", error);
    return res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

