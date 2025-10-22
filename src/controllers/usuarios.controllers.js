import Usuario from "../database/models/usuario.js";
import bcrypt from "bcrypt";
import generarJWT from "../helpers/generarJWT.js";

export const crearUsuario = async (req, res) => {
  try {
    const { email, password, nombreUsuario } = req.body;

    // Verificar si el email ya fue registrado
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: "El email ya fue registrado" });
    }

    // Hashear la contraseña de forma asíncrona
    const saltos = await bcrypt.genSalt(10);
    const passwordHasheado = await bcrypt.hash(password, saltos);

    // Crear el usuario con la contraseña hasheada
    const nuevoUsuario = new Usuario({
      email,
      password: passwordHasheado,
      nombreUsuario,
    });

    // Guardar en la base de datos
    await nuevoUsuario.save();

    // Responder al frontend de forma afirmativa
    res.status(201).json({ mensaje: "Usuario creado correctamente" });
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    res.status(400).json({ mensaje: "Error al crear el usuario" });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password, } = req.body;

    // Verificar si el email ya fue registrado
    const usuarioExistente = await Usuario.findOne({ email });
    if (!usuarioExistente) {
      return res.status(400).json({ mensaje: "Correo o password incorrecto - email" });
    }
    //verificar el password
    const passwordValido = bcrypt.compareSync(password, usuarioExistente.password);
    // quiero saber si el password es incorrecto
    if(!passwordValido){
      return res.status(400).json({ mensaje: "Correo o password incorrecto - password" });
    }
    // Generamos un token
    const token = await generarJWT(usuarioExistente._id, usuarioExistente.email);
    // Responder al frontend de forma afirmativa
    return res.status(200).json({
      mensaje: "Los datos del usuario son validos",
      email,
      token

     });
    
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    res.status(500).json({ mensaje: "Error al loguear a un usuario" });
  }
};