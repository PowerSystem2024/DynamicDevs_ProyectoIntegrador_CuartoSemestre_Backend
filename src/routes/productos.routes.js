import { Router } from "express";
import {
  borrarProducto,
  crearProducto,
  editarProducto,
  listarProductos,
  obtenerProducto,
} from "../controllers/productos.controllers.js";
import validacionProducto from "../helpers/validacionProducto.js";
import verificarJWT from "../helpers/verificarJWT.js"
const router = Router();

//crear las rutas
router.route("/prueba").get(listarProductos);
router
  .route("/productos")
  .post([verificarJWT, validacionProducto],crearProducto)
  .get(listarProductos);
router
  .route("/productos/:id")
  .get(obtenerProducto)
  .put([verificarJWT, validacionProducto],editarProducto)
  .delete(verificarJWT, borrarProducto);
export default router;