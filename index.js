import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import "./src/database/database.js";

// Routers
import productoRouter from "./src/routes/productos.routes.js";
import usuarioRouter from "./src/routes/usuarios.routes.js";
import pagoRouter from "./src/routes/pagos.routes.js";

dotenv.config();

console.log('🎯 Puerto:', process.env.PORT);
console.log('🔑 MP Token:', process.env.MP_ACCESS_TOKEN ? '✅ Cargado' : '❌ No cargado');

const app = express();
const PORT = process.env.PORT || 4001;

// Middlewares
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Archivos estáticos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "/public")));

// SDK de Mercado Pago
import { MercadoPagoConfig, Preference } from "mercadopago";
import { registrarPedidoEfectivo } from "./src/controllers/pagos.controllers.js";
// Agrega credenciales
const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

//Routes Ping
app.get("/ping", (req, res) => {
  res.send("Pong 🏓");
});

// Route to create preference mp
app.post("/create-preference", (req, res) => {
  const preference = new Preference(client);

  preference
    .create({
      body: {
        items: [
          {
            title: "Mi producto",
            quantity: 1,
            unit_price: 2000,
          },
        ],
      },
    })
    .then((data) =>{
      console.log(data);
      //Object data contains all information about our preference
      res.status(200).json({
        preference_id: data.id,
        preference_url: data.init_point,
      })
    })
    .catch(()=>{
      res.status(500).json({ error: "Error creando la preferencia" });
    });
});

// Rutas
app.use("/api/productos", productoRouter);
app.use("/api/usuarios", usuarioRouter);
app.use("/api/pagos", pagoRouter);

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor de Panadería Backend funcionando 🚀");
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
  console.log("Base de datos conectada");
});
