import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Usuario from "../database/models/usuario.js";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ;

export const register = async (req, res) => {
  try {
    const { nombre, apellido, email, password, rol } = req.body;

    if (!nombre || !apellido || !email || !password) {
      return res.status(400).json({ mensaje: "Campos obligatorios faltantes" });
    }

    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(409).json({ mensaje: "El email ya está registrado" });
    }

    const nuevoUsuario = new Usuario({ nombre, apellido, email, password, rol });
    await nuevoUsuario.save();

    return res.status(201).json({ mensaje: "Usuario registrado con éxito" });
  } catch (error) {
    return res.status(500).json({ mensaje: "Error del servidor", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ mensaje: "Email y password son requeridos" });
    }

    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ mensaje: "Credenciales inválidas" });
    }

    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) {
      return res.status(401).json({ mensaje: "Credenciales inválidas" });
    }

    const payload = { uid: usuario._id, rol: usuario.rol };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    return res.json({ token, usuario: { id: usuario._id, nombre: usuario.nombre, apellido: usuario.apellido, email: usuario.email, rol: usuario.rol } });
  } catch (error) {
    return res.status(500).json({ mensaje: "Error del servidor", error: error.message });
  }
};


