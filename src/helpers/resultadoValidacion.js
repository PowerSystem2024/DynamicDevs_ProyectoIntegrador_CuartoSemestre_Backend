import { validationResult } from "express-validator";

const resultadoValidacion = (req, res, next) =>{
    const errors = validationResult(req);
        //Quiero saber si hay errores, usaremos isEmpty()
        if(!errors.isEmpty()){
          return res.status(400).json({errores: errors.array()})
        }
        //Continuar con la ejecucion con el siguiente codigo
        next();
}
export default resultadoValidacion;