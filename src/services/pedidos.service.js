import Pedido from "../database/models/pedido.js";
import Producto from "../database/models/producto.js";

export async function calcularTotalYValidar(productos) {
  if (!Array.isArray(productos) || productos.length === 0) {
    throw new Error("El carrito está vacío");
  }
  const productoIds = productos.map((p) => p.productoId);
  const productosDb = await Producto.find({ _id: { $in: productoIds } });
  const productoIdToData = new Map(productosDb.map((p) => [String(p._id), p]));

  let total = 0;
  for (const item of productos) {
    const data = productoIdToData.get(String(item.productoId));
    if (!data) {
      throw new Error(`Producto no encontrado: ${item.productoId}`);
    }
    const cantidad = Number(item.cantidad || 1);
    if (cantidad <= 0) {
      throw new Error("Cantidad inválida");
    }
    total += data.precio * cantidad;
  }
  return { total, productoIds };
}

export async function crearPedidoService({ usuarioId, productos, metodoPago }) {
  if (!usuarioId) {
    throw new Error("No autenticado");
  }
  if (!metodoPago) {
    throw new Error("Debe indicar un método de pago");
  }
  const { total, productoIds } = await calcularTotalYValidar(productos);
  const pedido = new Pedido({
    usuario: usuarioId,
    productos: productoIds,
    total,
    metodoPago,
    estado: "PENDIENTE",
  });
  await pedido.save();
  // TODO: Integrar creación de preferencia de Mercado Pago y devolver init_point
  return pedido;
}

export async function listarPedidosUsuarioService(usuarioId) {
  if (!usuarioId) {
    throw new Error("No autenticado");
  }
  return await Pedido.find({ usuario: usuarioId })
    .populate("productos")
    .sort({ fechaCreacion: -1 });
}

export async function listarPedidosAdminService() {
  return await Pedido.find()
    .populate("usuario")
    .populate("productos")
    .sort({ fechaCreacion: -1 });
}

export async function actualizarEstadoPagoService({ external_reference, status }) {
  if (!external_reference || !status) {
    throw new Error("Faltan parámetros");
  }
  const pedido = await Pedido.findById(external_reference);
  if (!pedido) {
    throw new Error("Pedido no encontrado");
  }
  if (status === "approved") {
    pedido.estado = "PAGADO";
  } else if (status === "cancelled" || status === "rejected") {
    pedido.estado = "CANCELADO";
  } else {
    pedido.estado = "PENDIENTE";
  }
  await pedido.save();
  // TODO: Consultar detalle en API de Mercado Pago si es necesario para verificar montos
  return pedido;
}


