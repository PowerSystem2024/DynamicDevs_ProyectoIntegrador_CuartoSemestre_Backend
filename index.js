import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import './src/database/database.js'; // Conectar con la base de datos
import path from 'path';
import { fileURLToPath } from 'url';
import productoRouter from './src/routes/productos.routes.js';
import usuarioRouter from './src/routes/usuarios.routes.js';

// 1- Configurar un puerto
const app = express();
app.set('port', process.env.PORT || 4000); // Puerto configurable desde variable de entorno

// Iniciar servidor
app.listen(app.get('port'), () => {
    console.log('Estoy escuchando el puerto ' + app.get('port'));
});

// 2- Configurar los middlewares
app.use(cors()); // Permitir conexiones remotas con CORS
app.use(morgan('dev')); // Mostrar detalles de cada petición en la terminal
app.use(express.json()); // Permitir interpretar datos en formato JSON
app.use(express.urlencoded({ extended: true })); // Permitir interpretar datos de formularios

// Configurar archivos estáticos
const __filename = fileURLToPath(import.meta.url); // Obtener la ruta del archivo actual
const __dirname = path.dirname(__filename); // Obtener la carpeta del archivo
app.use(express.static(path.join(__dirname, '/public'))); // Servir archivos estáticos desde 'public'

//3- Crear las rutas
app.use('/api', productoRouter)
app.use('api/usuarios', usuarioRouter)
