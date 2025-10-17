import mongoose from "mongoose";

const mongodb = process.env.MONGODB_URI;

mongoose.connect(mongodb)

const conexion = mongoose.connection;

conexion.once('open', ()=>{
    console.info('Base de datos conectada')
})