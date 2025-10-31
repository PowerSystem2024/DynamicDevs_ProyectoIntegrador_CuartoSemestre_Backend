# 🚀 Guía Rápida de Inicio - Integración Mercado Pago

## ✅ Checklist de Configuración

### 1. Actualizar el archivo `.env`

Agrega estas líneas a tu archivo `.env`:

```env
# Ya existentes
PORT=4001
MONGODB_URI=tu_uri_de_mongodb
SECRET_JWT=CH0C0D3V5_S3CR3T

# NUEVAS - Agregar estas:
MERCADOPAGO_ACCESS_TOKEN=TEST-tu-access-token-de-prueba
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:4001
```

**📌 Obtener Access Token de Mercado Pago:**
1. Crea una cuenta en https://www.mercadopago.com.ar
2. Ve a https://www.mercadopago.com.ar/developers
3. Crea una aplicación nueva
4. En "Credenciales de prueba", copia el **Access Token** (empieza con `TEST-`)

---

## 🏃 Iniciar el Servidor

```bash
npm run dev
```

Deberías ver:
```
Base de datos conectada
Estoy escuchando el puerto 4001
```

---

## 🧪 Testing Paso a Paso (Con Postman)

### Paso 1: Registrar un Usuario

**POST** `http://localhost:4001/api/usuarios/registrar`

Body (JSON):
```json
{
  "email": "test@chocodevs.com",
  "password": "Choco1234",
  "nombreUsuario": "testchoco"
}
```

**Respuesta esperada:**
```json
{
  "mensaje": "Usuario creado correctamente"
}
```

---

### Paso 2: Hacer Login

**POST** `http://localhost:4001/api/usuarios`

Body (JSON):
```json
{
  "email": "test@chocodevs.com",
  "password": "Choco1234"
}
```

**Respuesta esperada:**
```json
{
  "mensaje": "Los datos del usuario son validos",
  "email": "test@chocodevs.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**🔑 Copia el `token` - lo necesitarás para los siguientes pasos**

---

### Paso 3: Crear un Producto

**POST** `http://localhost:4001/api/productos`

**Headers:**
- `x-token`: (pega el token que copiaste)
- `Content-Type`: application/json

Body (JSON):
```json
{
  "nombreProducto": "Alfajor de Chocolate Premium",
  "precio": 450,
  "imagen": "https://picsum.photos/200/300",
  "categoria": "Dulce",
  "descripcion_breve": "Alfajor triple de chocolate artesanal",
  "descripcion_amplia": "Delicioso alfajor elaborado con chocolate belga de alta calidad, relleno con dulce de leche artesanal y bañado en chocolate semi-amargo"
}
```

**Respuesta esperada:**
```json
{
  "mensaje": "Producto creado con exito",
  "producto": {
    "_id": "67xxxxxxxxxxxxx",
    "nombreProducto": "Alfajor de Chocolate Premium",
    ...
  }
}
```

**📝 Copia el `_id` del producto**

---

### Paso 4: Crear Preferencia de Pago

**POST** `http://localhost:4001/api/pagos/crear-preferencia`

**Headers:**
- `x-token`: (tu token JWT)
- `Content-Type`: application/json

Body (JSON):
```json
{
  "productos": [
    {
      "id": "67xxxxxxxxxxxxx",
      "cantidad": 2
    }
  ],
  "usuario": "67yyyyyyyyyyyyy"
}
```

> 💡 Reemplaza:
> - `67xxxxxxxxxxxxx` con el ID del producto que creaste
> - `67yyyyyyyyyyyyy` con el ID de usuario (lo puedes obtener del login o de MongoDB)

**Respuesta esperada:**
```json
{
  "mensaje": "Preferencia creada exitosamente",
  "preferenceId": "123456789-abcd...",
  "initPoint": "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=...",
  "pedidoId": "67zzzzzzzzzzzz"
}
```

---

### Paso 5: Probar el Pago

1. **Copia la URL del `initPoint`**
2. **Pégala en tu navegador**
3. **Selecciona "Tarjeta de crédito"** (NO débito)
4. **Usa estos datos de prueba para pago APROBADO:**
   - **Tarjeta:** `5031 4332 1540 6351`
   - **Vencimiento:** `11/25`
   - **CVV:** `123`
   - **Nombre:** `APRO`
   - **DNI:** `12345678`

5. Completa el pago

> **💡 Otras tarjetas de prueba:**
> - **Rechazada:** `5031 7557 3453 0604` con nombre `OTHE`
> - **Pendiente:** `5031 4332 1540 6351` con nombre `PEND`

---

### Paso 6: Verificar el Estado del Pedido

**GET** `http://localhost:4001/api/pagos/pedido/67zzzzzzzzzzzz`

**Headers:**
- `x-token`: (tu token JWT)

> Reemplaza `67zzzzzzzzzzzz` con el `pedidoId` que recibiste en el Paso 4

**Respuesta esperada:**
```json
{
  "_id": "67zzzzzzzzzzzz",
  "usuario": {
    "nombreUsuario": "testchoco",
    "email": "test@chocodevs.com"
  },
  "productos": [
    {
      "nombreProducto": "Alfajor de Chocolate Premium",
      "precio": 450,
      "imagen": "https://..."
    }
  ],
  "total": 900,
  "estado": "PENDIENTE",
  "metodoPago": "PENDIENTE",
  "fechaCreacion": "2025-10-27T..."
}
```

---

## 📊 Ver Todos los Pedidos de un Usuario

**GET** `http://localhost:4001/api/pagos/pedidos/usuario/67yyyyyyyyyyyyy`

**Headers:**
- `x-token`: (tu token JWT)

---

## 🎨 Importar Colección en Postman

1. Abre Postman
2. Click en "Import"
3. Selecciona el archivo `postman_collection.json` de este proyecto
4. La colección "ChocoDevs - Mercado Pago Integration" aparecerá
5. Actualiza las variables:
   - `JWT_TOKEN`: Tu token después del login
   - `USUARIO_ID`: ID del usuario creado
   - `PRODUCTO_ID`: ID del producto creado

---

## 🐛 Problemas Comunes

### Error: "No hay token en la peticion"
**Solución:** Asegúrate de agregar el header `x-token` con tu JWT en los endpoints protegidos.

### Error: "Token expirado"
**Solución:** Los tokens expiran en 3 horas. Haz login nuevamente para obtener un nuevo token.

### Error: "Algunos productos no existen en la base de datos"
**Solución:** Verifica que los IDs de productos que envías existan. Usa el endpoint `GET /api/productos` para listar todos.

### Error: "Cannot read property 'client' of undefined"
**Solución:** Verifica que `MERCADOPAGO_ACCESS_TOKEN` esté correctamente configurado en tu `.env`.

---

## 📚 Documentación Adicional

- [MERCADOPAGO_INTEGRATION.md](./MERCADOPAGO_INTEGRATION.md) - Documentación completa de la integración
- [README.md](./README.md) - Información general del proyecto

---

## 🎯 Próximos Pasos

1. ✅ Configurar variables de entorno
2. ✅ Crear usuario y producto de prueba
3. ✅ Generar preferencia de pago
4. ✅ Probar flujo completo con tarjeta de prueba
5. 🔄 Implementar webhook en producción (requiere dominio público)
6. 🚀 Conectar con el frontend

---

## 💡 Tips

- **Modo desarrollo:** Usa credenciales de prueba (comienzan con `TEST-`)
- **Modo producción:** Usa credenciales de producción y configura webhooks con dominio real
- **Testing local de webhooks:** Usa [ngrok](https://ngrok.com/) para exponer tu servidor local

```bash
# Instalar ngrok
npm install -g ngrok

# Exponer puerto 4001
ngrok http 4001

# Copia la URL https://xxxx.ngrok.io y úsala como BACKEND_URL
```
