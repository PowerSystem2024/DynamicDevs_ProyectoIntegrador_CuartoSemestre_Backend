import mongoose, { Schema } from "mongoose";

const usuarioSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    unique: false
  },
  apellido: {
    type: String,
    required: true,
    unique: false
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minLength: 8
  },
  rol: {
    type: String,
    enum: ['ADMIN', 'CLIENTE'],
    default: 'CLIENTE'
  },
  fechaRegistro: {
    type: Date,
    default: Date.now
  }
});

const SALT_ROUNDS = 12;

usuarioSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

const Usuario = mongoose.model("usuario", usuarioSchema);
export default Usuario;
