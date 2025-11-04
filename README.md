# 🍫 ChocoDevs – E-commerce de Alfajores e Infusiones

**ChocoDevs** es un **proyecto de e-commerce full stack** desarrollado con enfoque académico y profesional.  
Permite gestionar productos (alta, baja, edición y listado) y realizar compras mediante **Mercado Pago** o **pago en efectivo**. Además, envía **notificaciones automáticas por correo electrónico** al vendedor cuando se concreta una compra, asegurando comunicación inmediata y efectiva.

El proyecto combina **buenas prácticas de desarrollo web**, experiencia de usuario y gestión de datos, siendo un ejemplo completo de **CRUD full stack aplicado**.

---

## 🧠 Objetivos del proyecto

- Crear una **tienda online funcional** para la venta de alfajores e infusiones.  
- Implementar un **CRUD completo de productos** (alta, baja, modificación y visualización).  
- Desarrollar un **frontend moderno, interactivo y responsivo** con **React**, **Vite** y **Bootstrap**.  
- Construir un **backend escalable** con **Node.js**, **Express** y **MongoDB Atlas**.  
- Integrar una **pasarela de pagos segura** con **Mercado Pago** y opción de **pago en efectivo**.  
- Aplicar **buenas prácticas de desarrollo web**, modularidad, componentes reutilizables y manejo de estados globales.  

---

## 🖼️ Vista previa del proyecto

<p align="center">
  <img src="./readme-assets/Inicio.png" width="600" alt="Página de inicio" />
  <br/>
  <em>Página principal con catálogo destacado</em>
</p>

<p align="center">
  <img src="./readme-assets/verMasInicio.png" width="600" alt="Vista ampliada del producto" />
  <br/>
  <em>Detalle individual del producto disponible</em>
</p>

<p align="center">
  <img src="./readme-assets/Tienda.png" width="600" alt="Página de la tienda" />
  <br/>
  <em>Página de la tienda con catálogo completo</em>
</p>

<p align="center">
  <img src="./readme-assets/Carrito.png" width="600" alt="Carrito de compras" />
  <br/>
  <em>Carrito de compras interactivo</em>
</p>

<p align="center">
  <img src="./readme-assets/MetodoDePago.png" width="600" alt="Método de pago" />
  <br/>
  <em>Selección de método de pago: Mercado Pago o efectivo</em>
</p>

<p align="center">
  <img src="./readme-assets/Administrador.png" width="600" alt="Panel del administrador" />
  <br/>
  <em>Panel del administrador para **crear, editar y eliminar productos**, gestionar pedidos y mantener actualizado el inventario</em>
</p>

<p align="center">
  <img src="./readme-assets/Error404.png" width="600" alt="Error 404" />
  <br/>
  <em>Página mostrada al ingresar a una ruta inexistente</em>
</p>

---

## 📈 Alcance del proyecto

El proyecto abarca **frontend y backend**, cubriendo todo el flujo de compra y gestión de productos.

### 🔹 Frontend

- Catálogo dinámico de productos con imágenes, precios y descripciones.  
- Carrito persistente con **localStorage**.  
- Integración con **Mercado Pago** y **pago en efectivo**.  
- Confirmaciones visuales y manejo de errores de pago.  
- Interfaz **responsiva y amigable**, desarrollada con **React** y **Bootstrap**.

### 🔹 Backend

- API RESTful con **Node.js**, **Express** y **MongoDB Atlas**.  
- **CRUD completo de productos**: alta, baja, actualización y listado.  
- Gestión de usuarios y autenticación con **JWT**.  
- Notificaciones automáticas por correo electrónico con **Nodemailer**.  
- Configuración de variables de entorno para seguridad y escalabilidad.  

### 🔹 Integraciones

- **Mercado Pago SDK** para pagos online.  
- **Nodemailer** para notificaciones automáticas.  

### 🚀 Futuras mejoras

- Panel administrativo con estadísticas de ventas.  
- Sistema de roles (admin / cliente).  
- Integración con almacenamiento en la nube para imágenes.  
- Notificaciones en tiempo real con WebSockets o Firebase.  

---

## ⚙️ Tecnologías utilizadas

### 🖥️ Frontend

| Tecnología | Versión | Uso |
|-------------|----------|-----|
| React | 19.1.1 | Creación de interfaces dinámicas |
| Vite | 7.1.2 | Herramienta de desarrollo rápida |
| React Router DOM | 7.9.2 | Navegación entre vistas |
| Bootstrap | 5.3.8 | Diseño responsivo y grillas |
| React Bootstrap | 2.10.10 | Componentes UI reutilizables |
| SweetAlert2 | 11.23.0 | Alertas personalizadas |
| @mercadopago/sdk-react | 1.0.6 | Integración de pagos |

### 🗄️ Backend

| Tecnología | Versión | Uso |
|------------|--------|-----|
| Node.js | 20.x | Servidor y API REST |
| Express.js | 5.1.0 | Framework backend |
| Mongoose | 8.19.1 | Conexión con MongoDB Atlas |
| MongoDB Atlas | — | Base de datos NoSQL |
| dotenv | 17.2.3 | Variables de entorno |
| bcrypt | 6.0.0 | Hashing de contraseñas |
| JWT | 9.0.2 | Autenticación basada en tokens |
| Nodemailer | 7.0.10 | Notificaciones automáticas |
| Mercado Pago SDK (Node) | 2.9.0 | Pagos online |

---

## 🧩 Funcionalidades principales

- 🛠️ **CRUD de productos:** alta, baja, modificación y listado.  
- 🛍️ **Visualización de catálogo:** listado dinámico y detalle individual.  
- 🛒 **Carrito de compras interactivo** con actualización en tiempo real.  
- 💳 **Integración con Mercado Pago** y **pago en efectivo**.  
- ✉️ **Notificaciones automáticas por correo** al vendedor con **Nodemailer**.  
- 📱 **Diseño responsivo** para móviles, tablets y desktop.  
- 🔗 **Comunicación full stack** entre frontend y backend.  
- ⚙️ **Gestión de errores y validaciones** robusta en ambas capas.  

---

## 👨‍💻 Responsable del Proyecto

**Cristian Díaz**  
*Líder Técnico Full Stack – Arquitectura Frontend & Backend*  

- Responsable de **planificación, estructura, desarrollo e integración técnica** del proyecto.  
- Especializado en **React, Node.js y MongoDB**, con foco en **rendimiento, calidad y seguridad**.  

## 👨‍💻 Equipo de desarrollo

| Rol | Nombre | GitHub | LinkedIn |
|-----|--------|--------|----------|
| Líder Técnico Backend | Diaz Cristian Ivan | <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" width="16"/> [GitHub](https://github.com/cristiandcode) | <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" width="16"/> [LinkedIn](https://www.linkedin.com/in/cristiandcode/) |
| Desarrollador | Cortez Hector | <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" width="16"/> [GitHub](https://github.com/CoraYako) | <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" width="16"/> [LinkedIn](https://www.linkedin.com/in/hector-cortez-cy/) |
| Desarrollador | Leytes Rodrigo | <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" width="16"/> [GitHub](https://github.com/Roddri19) | <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" width="16"/> [LinkedIn](https://www.linkedin.com/in/rodrigoleytes/) |
| Desarrollador | Gimenez Miqueas | <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" width="16"/> [GitHub](https://github.com/miquigz) | <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" width="16"/> [LinkedIn](https://www.linkedin.com/in/miqueasgimenez/) |
| Desarrollador | Paz Ezequiel | <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" width="16"/> [GitHub]() | <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" width="16"/> [LinkedIn]() |
| Desarrollador | Diaz Federico | <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" width="16"/> [GitHub]() | <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" width="16"/> [LinkedIn]() |
| Desarrollador | Vignati Mauro | <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" width="16"/> [GitHub]() | <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" width="16"/> [LinkedIn]() |

---


### 👨‍💻 Líder y responsable del proyecto

**Diaz Cristian Ivan**  
*Líder Técnico Backend y Frontend – Arquitecto del proyecto*  

Desarrollador y arquitecto principal del proyecto, responsable de la planificación, estructura, desarrollo e integración técnica de todo el sistema, tanto en **Frontend (React, Vite, Bootstrap)** como en **Backend (Node.js, Express, MongoDB / Mongo Atlas)**.  
Básicamente, el ideador de toda la arquitectura y flujo del proyecto.

### 📫 Contacto

- 💼 [LinkedIn](https://www.linkedin.com/in/cristiandcode/)  
- 💻 [GitHub](https://github.com/cristiandcode)  
- ✉️ diazcristian0210@gmail.com

---
🚀 Deploys

Frontend: https://chocodevs.netlify.app

Backend: https://dynamic-devs-proyecto-integrador-cu.vercel.app

## 🚀 Clonar y ejecutar el proyecto

### Frontend

```bash
git clone https://github.com/PowerSystem2024/DynamicDevs_ProyectoIntegrador_CuartoSemestre_Front.git
cd DynamicDevs_ProyectoIntegrador_CuartoSemestre_Front
npm install
npm run dev

# BACKEND
git clone https://github.com/PowerSystem2024/DynamicDevs_ProyectoIntegrador_CuartoSemestre_Backend.git
cd Proyecto4semestreBackend
npm install

#  Crear el archivo .env
MONGODB_URI=<URI_MONGO_ATLAS>
PORT=4001

# Ejecutar el backend
npm run dev
```
## 🙌 Agradecimientos

Agradecemos a la **Universidad Tecnológica Nacional Mendoza – FRSR** por el constante acompañamiento académico y por brindar los recursos necesarios para el desarrollo de este proyecto integrador.  
Queremos reconocer especialmente al **docente Ariel Betancud** por su guía, apoyo y valiosas sugerencias durante todo el proceso.