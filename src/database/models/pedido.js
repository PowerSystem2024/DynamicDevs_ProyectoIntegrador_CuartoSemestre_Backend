import mongoose, { Schema } from "mongoose";

const pedidoSchema = new Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "usuario",
    required: true
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
    enum: ['TARJETA_CREDITO', 'TARJETA_DEBITO', 'EFECTIVO', 'BILLETERA_VIRTUAL'],
    required: true
  },
  estado: {
    type: String,
    enum: ['PENDIENTE', 'PAGADO', 'CANCELADO'],
    default: 'PENDIENTE'
  }
});

const Pedido = mongoose.model("pedido", pedidoSchema);
export default Pedido;
