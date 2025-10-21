import { check } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";

const validacionProducto =  [
      check("nombreProducto")
        .not()
        .notEmpty()
        .withMessage("El nombre del producto es obligatorio")
        .isLength({ min: 2, max: 50 })
        .withMessage(
          "El nombre del producto debe tener entre 2 y 50 caracteres"
        ),
        //Aquí llamo a  resultadoValidacion
        (req, res, next) => resultadoValidacion(req, res, next)
    ]

        export default validacionProducto;