import { Router } from "express";
import { createPreference, registrarPedidoEfectivo } from "../controllers/pagos.controllers.js";

const router = Router();

// Endpoint para crear preferencia
router.post("/create-preference", createPreference);
router.post("/pedido-efectivo", registrarPedidoEfectivo)

export default router;