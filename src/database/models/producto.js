import mongoose, {Schema} from "mongoose";

const productoSchema = new Schema({
    nombreProducto:{type: String, 
        required: true,
        minLength: 2,
        maxLength: 50,
        unique: true,
    },
    precio: {
        type: Number,
        required: true,
        min: 50,
        max: 20000,
    },
    imagen: {
        type: String,
        required: true,
        validate: {
            validator: (valor) =>{
                // const pattern = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/
                 return /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/.test(valor);
            }
        }
    },
    categoria: {
        type: String,
        required: true,
        enum: ['Infusiones', 'Batidos', 'Dulce', 'Salado', 'Sandwich']
    },
    descripcion_breve: {
        type: String,
        requiered: true,
        minLength: 5,
        maxLength: 100,
    },
    descripcion_amplia:{
        type: String,
        minLength:30,
        maxLength: 500,
    }
});

const Producto = mongoose.model('producto', productoSchema);
export default Producto;