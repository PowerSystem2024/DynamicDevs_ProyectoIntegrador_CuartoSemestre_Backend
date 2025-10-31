import { Router } from 'express';
import { 
  crearPreferencia, 
  webhook, 
  obtenerEstadoPedido,
  listarPedidosUsuario 
} from '../controllers/pagos.controllers.js';
import verificarJWT from '../helpers/verificarJWT.js';

const router = Router();

// Crear una preferencia de pago (PÚBLICO - sin necesidad de login)
router.route('/crear-preferencia')
  .post(crearPreferencia);

// Webhook de Mercado Pago (público - MP necesita acceso)
router.route('/webhook')
  .post(webhook);

// Obtener estado de un pedido (protegido con JWT)
router.route('/pedido/:id')
  .get(verificarJWT, obtenerEstadoPedido);

// Listar pedidos de un usuario (protegido con JWT)
router.route('/pedidos/usuario/:usuarioId')
  .get(verificarJWT, listarPedidosUsuario);

export default router;
