# Sitio en construcción

# 🍫 ChocoDevs – Backend E-commerce de Alfajores e Infusiones

**ChocoDevs** es un **backend para un proyecto de e-commerce** desarrollado con enfoque profesional y académico.  
Permite gestionar productos (alta, baja, edición y listado) conectando con **MongoDB Atlas** y sirve como API para un frontend de tienda online. Además, se utilizaron **Postman** para pruebas de endpoints y simulación de peticiones.

---

## 🧠 Objetivos del proyecto
- Desarrollar un **backend completo** para la gestión de productos de un e-commerce.  
- Implementar un **CRUD completo de productos** con validaciones: alta, baja, modificación y obtención de productos.  
- Conectar con **MongoDB Atlas** usando Mongoose.  
- Permitir integración con un frontend para consumo de la API.  
- Aplicar buenas prácticas de desarrollo web y estructura escalable.  
- Probar y depurar la API utilizando **Postman**.

---

## 👨‍💻 Equipo de desarrollo


| Rol | Nombre | GitHub | LinkedIn |
|-----|--------|--------|----------|
| Líder Técnico Backend | Diaz Cristian Ivan | <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" width="16"/> [GitHub](https://github.com/cristiandcode)  | <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" width="16"/> [LinkedIn](https://www.linkedin.com/in/cristiandcode/) |


---

## ⚙️ Tecnologías utilizadas

### 🗄️ Backend

| Tecnología | Versión | Uso |
|------------|--------|-----|
| Node.js | 20.x | Servidor y API REST |
| Express.js | 5.1.0 | Framework backend |
| Mongoose | 8.19.1 | Conexión y manejo de MongoDB |
| CORS | 2.8.5 | Permitir peticiones externas |
| Morgan | 1.10.1 | Logs de requests en consola |
| Postman | Última | Pruebas y depuración de endpoints |

---

## 🧩 Funcionalidades principales
- CRUD de productos: alta, baja, edición y listado  
- Validación de datos de productos (nombre, precio, categoría, imágenes, descripciones)  
- Conexión segura con **MongoDB Atlas**  
- Respuestas en formato JSON para consumir desde el frontend  
- Logs de peticiones para monitoreo y debugging  
- Pruebas de API y simulación de peticiones con **Postman**

### 🔐 Autenticación y Autorización 
- Registro de usuario con validación y cifrado de contraseña (bcrypt)
- Login con generación de **JWT** (jsonwebtoken)
- Middleware de autenticación para proteger rutas (por ejemplo, pedidos y pagos)

---

## 🔑 Configuración de variables de entorno

Agrega al archivo `.env` las siguientes variables:

```bash
MONGODB_URI=<URI_MONGO>
PORT=4001
JWT_SECRET=<tu_secret_seguro>
JWT_EXPIRES_IN=7d
```

---

## 🛣️ Endpoints

Base URL: `/api`

### Usuarios
- `POST /api/usuarios/register`
  - Body: `{ nombre, apellido, email, password, rol? }`
  - Respuestas:
    - 201: `{ mensaje }`
    - 409: `{ mensaje: "El email ya está registrado" }`
- `POST /api/usuarios/login`
  - Body: `{ email, password }`
  - Respuestas:
    - 200: `{ token, usuario }`
    - 401: `{ mensaje: "Credenciales inválidas" }`

### Productos
- `GET /api/productos`
- `POST /api/productos`
- `GET /api/productos/:id`
- `PUT /api/productos/:id`
- `DELETE /api/productos/:id`

### Pedidos
- `POST /api/pedidos` (JWT requerido)
  - Body: `{ productos: [{ productoId, cantidad }], metodoPago }`
  - Crea un pedido a partir del carrito del usuario autenticado.
- `GET /api/pedidos/mios` (JWT requerido)
  - Lista los pedidos del usuario autenticado.
- `GET /api/pedidos` (JWT + rol ADMIN)
  - Lista todos los pedidos (solo administradores).

### Pagos (Webhook)
- `POST /api/pagos/notificacion`
  - Notificación de actualización de estado de pago de Mercado Pago.
  - Recomendado validar firma/seguridad de la notificación (pendiente de integración).

---

## 🛡️ Rutas protegidas por JWT

Se debe enviar el encabezado `Authorization: Bearer <token>` en cada solicitud.

Actualmente el proyecto ya expone el middleware `autenticarJWT` para usarse al montar estas rutas.

---

## 📫 Contacto

**Diaz Cristian Ivan – Líder Técnico Backend - Frontend**  
- [LinkedIn](https://www.linkedin.com/in/cristiandcode/)  
- [GitHub](https://github.com/cristiandcode)


## 🚀 Clonar y ejecutar el proyecto

1️⃣ **Clonar el repositorio**  
```bash
git clone <https://github.com/PowerSystem2024/DynamicDevs_ProyectoIntegrador_CuartoSemestre_Backend.git>

cd Proyecto4semestreBackend
npm install

MONGODB_URI=<URI_MONGO>
PORT=4001
npm run dev
## El servidor debería imprimir en consola:
Base de datos conectada
Estoy escuchando el puerto 4001


