import { Router } from "express";
import { autenticarJWT, autorizarRoles } from "../middlewares/auth.middleware.js";
import { crearPedido, listarPedidosUsuario, listarPedidosAdmin, actualizarEstadoPago } from "../controllers/pedidos.controllers.js";

const router = Router();

// Crear pedido (usuario autenticado)
router.post('/pedidos', autenticarJWT, crearPedido);

// Listar pedidos del usuario autenticado
router.get('/pedidos/mios', autenticarJWT, listarPedidosUsuario);

// Listar todos los pedidos (ADMIN)
router.get('/pedidos', autenticarJWT, autorizarRoles('ADMIN'), listarPedidosAdmin);

// Webhook/Notificación de Mercado Pago (no requiere auth de usuario; validar firma en TODO)
router.post('/pagos/notificacion', actualizarEstadoPago);

export default router;


