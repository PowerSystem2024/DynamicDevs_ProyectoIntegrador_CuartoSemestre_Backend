import { Router } from "express";
import { 
  createPreference, 
  registrarPedidoEfectivo,
  registrarPedidoMercadoPago
} from "../controllers/pagos.controllers.js";

const router = Router();

router.post("/create-preference", createPreference);
router.post("/pedido-efectivo", registrarPedidoEfectivo);
router.post("/pedido-mp", registrarPedidoMercadoPago);

export default router;
