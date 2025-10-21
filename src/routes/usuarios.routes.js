import { Router } from "express";
import { login, register } from "../controllers/usuarios.controllers.js";

const router = Router();

router.post("/usuarios/register", register);
router.post("/usuarios/login", login);

export default router;


