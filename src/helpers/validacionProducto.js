import { check } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";

const validacionProducto = [
  check("nombreProducto")
    .not()
    .notEmpty()
    .withMessage("El nombre del producto es obligatorio")
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre del producto debe tener entre 2 y 50 caracteres"),
  check("precio")
    .notEmpty()
    .withMessage("El precio del producto es un dato obligatorio")
    .isNumeric()
    .withMessage("El precio debe ser un valor numérico")
    .custom((value) => {
      if (value >= 50 && value <= 20000) {
        return true;
      } else {
        throw new Error("El precio del producto debe estar entre $50 y $20000");
      }
    }),
    check("imagen")
        .notEmpty()
        .withMessage("La imagen del producto es un dato obligatorio")
        .matches(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/)
        .withMessage(
          "La imagen debe ser una URL válida que termine en .jpg, .jpeg, .gif o .png"
        ),
        check("categoria")
        .notEmpty()
        .withMessage("La categoría del producto es un dato obligatorio")
        .isIn(["Infusiones", "Batidos", "Dulce", "Salado", "Sandwich"])
        .withMessage(
          "La categoría debe ser una de las siguientes: (Infusiones, Batidos, Dulce, Salado, Sandwich)"
        ),
         check("descripcion_breve")
        .not()
        .notEmpty()
        .withMessage("La descripcion breve es un dato obligatorio")
        .isLength({ min: 5, max: 100 })
        .withMessage(
          "La descripcion breve debe tener entre 5 y 100 caracteres"
        ),
         check("descripcion_amplia")
        .not()
        .notEmpty()
        .withMessage("La descripcion amplia es un dato obligatorio")
        .isLength({ min: 30, max: 500 })
        .withMessage(
          "La descripcion amplia debe tener entre 30 y 500 caracteres"
        ),
  //Aquí llamo a  resultadoValidacion
  (req, res, next) => resultadoValidacion(req, res, next),
];

export default validacionProducto;
