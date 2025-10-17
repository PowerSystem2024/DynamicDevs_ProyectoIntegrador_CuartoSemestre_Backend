import { Router } from "express";
import { borrarProducto, crearProducto, editarProducto, listarProductos, obtenerProducto } from "../controllers/productos.controllers.js";
const router = Router(); 

//crear las rutas
router.route('/prueba').get(listarProductos)
router.route('/productos').post(crearProducto).get(listarProductos);
router.route('/productos/:id').get(obtenerProducto).put(editarProducto).delete(borrarProducto)
export default router;
