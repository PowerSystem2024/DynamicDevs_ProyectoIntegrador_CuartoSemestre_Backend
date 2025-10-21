import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import './src/database/database.js';
import path from 'path';
import { fileURLToPath } from 'url';
import productoRouter from './src/routes/productos.routes.js';
import usuarioRouter from './src/routes/usuarios.routes.js';
import { autenticarJWT } from './src/middlewares/auth.middleware.js';
import pedidosRouter from './src/routes/pedidos.routes.js';

// 1- Configurar un puerto
const app = express();
//crear una variable de entorno
app.set('port', process.env.PORT || 4000);
app.listen(app.get('port'), ()=> {
    console.log('Estoy escuchando el puerto '+ app.get('port'));
})
// 2- Configurar los middlewares
//Habilidades que tendrá mi backend
app.use(cors()) //Permitir conexiones remotas con CORS
app.use(morgan('dev')) //Datos extras en la terminal con morgan
app.use(express.json()); //Configurar para que  se interpreten los datos en formato JSON  y que pueda acceder a los datos del body del request
app.use(express.urlencoded({extended:true})); //y que pueda acceder a los datos del body del request
//Configurar archivos estaticos
//Que mi backend entienda JSON y que pueda acceder a los datos del body del request

// Obtiene la ruta del archivo y su carpeta
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename) 
// Sirve archivos estáticos (imágenes, CSS, JS) desde 'public'
app.use(express.static(path.join(__dirname, '/public')))

// 3- Crear las rutas
//Empezaremos a crear las rutas y comenzamos con GET
//http://localhost:4001/prueba
// app.get('/prueba', (req, res)=>{
//     console.log('Prueba de solicitud GET')
//     //Enviar respuesta
//     res.send('Desde mi backend de Panaderia Croissant')

// })

app.use('/api', usuarioRouter)
app.use('/api', productoRouter)
app.use('/api', pedidosRouter)