import mongoose, { Schema } from "mongoose";

const pedidoSchema = new Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "usuario",
    required: false // Puede ser null para compras sin registro
  },
  productos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "producto",
    required: true
  }],
  total: {
    type: Number,
    required: true,
    min: 0
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  },
  metodoPago: {
    type: String,
    enum: ['TARJETA_CREDITO', 'TARJETA_DEBITO', 'EFECTIVO', 'BILLETERA_VIRTUAL', 'PENDIENTE', 'MERCADOPAGO'],
    default: 'PENDIENTE'
  },
  estado: {
    type: String,
    enum: ['PENDIENTE', 'PAGADO', 'CANCELADO', 'FALLIDO'],
    default: 'PENDIENTE'
  },
  mercadoPagoId: {
    type: String,
    required: false
  },
  preferenceId: {
    type: String,
    required: false
  }
});

const Pedido = mongoose.model("pedido", pedidoSchema);
export default Pedido;
