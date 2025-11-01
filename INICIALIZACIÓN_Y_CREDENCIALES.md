# 🔑 Guía de Credenciales de Mercado Pago

## 🎭 Roles en Mercado Pago

### Vendedor (Tu aplicación)
- Usa **credenciales de PRUEBA del VENDEDOR**
- Configuradas en el `.env` del backend
- Estas credenciales procesan los pagos

### Comprador (Usuario que paga)
- Debe **iniciar sesión en Mercado Pago** durante el checkout
- Usa **credenciales de PRUEBA del COMPRADOR**
- Se verifica con los últimos 6 dígitos del User ID

---

## 📋 Pasos para Configurar Correctamente

### 1. Crear Usuarios de Prueba

Ve a: https://www.mercadopago.com.ar/developers/panel/test-users

**Crear 2 usuarios:**

#### Usuario Vendedor (Seller)
```
Tipo: Vendedor
País: Argentina
Sitio: Mercado Libre Argentina
```

Recibirás:
- Email: `TEST123456@testuser.com`
- Password: `qatest1234`
- **User ID**: `123456789` (últimos 6 dígitos para verificación)

#### Usuario Comprador (Buyer)
```
Tipo: Comprador
País: Argentina  
Sitio: Mercado Libre Argentina
```

**Credenciales configuradas:**
- **Usuario**: `TESTUSER113832215074536643`
- **Password**: `m3OD3j7GtY`
- **User ID**: `2952278826`
- **Últimos 6 dígitos**: `278826` (para verificación)

---

### 2. Configurar Credenciales del Vendedor

1. **Inicia sesión** en el panel de desarrolladores con el **usuario VENDEDOR**
2. Ve a tu aplicación → **Credenciales de prueba**
3. Copia el **Access Token** (empieza con `TEST-`)
4. Pégalo en tu `.env`:

```env
MERCADOPAGO_ACCESS_TOKEN=TEST-1234567890-abcdef-xyz123-vendedor
MP_PUBLIC_KEY=TEST-abcd1234-5678-90ef-ghij-klmnopqrstuv
```

---

### 3. Realizar un Pago de Prueba

#### En tu aplicación:
1. Agrega productos al carrito
2. Click en "Pagar con Mercado Pago"
3. Serás redirigido al checkout de Mercado Pago

#### En el checkout de Mercado Pago:
1. **Inicia sesión** con las credenciales del **COMPRADOR**
   - **Usuario**: `TESTUSER113832215074536643`
   - **Password**: `m3OD3j7GtY`

2. **Verificación de email:**
   - Te pedirá verificar la cuenta
   - **Ingresa**: `278826` (últimos 6 dígitos del User ID)

3. **Completa el pago** con tarjeta de crédito de prueba (Mastercard):
   - **Número**: `5031 4332 1540 6351`
   - **Vencimiento**: `11/25`
   - **CVV**: `123`
   - **Nombre**: `APRO`
   - **DNI**: `12345678`

---

## 🧪 Tarjetas de Prueba

### ✅ Para PAGO APROBADO (Visa Débito):
```
Número: 4509 9535 6623 3704
Vencimiento: 11/25
CVV: 123
Nombre: APRO
DNI: 12345678
```
**⚠️ IMPORTANTE**: Selecciona "Tarjeta de débito" o "Tarjeta de crédito" en el checkout, NO uses "Dinero en Mercado Pago" (no funciona en sandbox).

### ❌ Para PAGO RECHAZADO:
```
Número: 5031 7557 3453 0604
Vencimiento: 11/25
CVV: 123
Nombre: OTHE
DNI: 12345678
```

### ⏳ Para PAGO PENDIENTE:
```
Número: 5031 4332 1540 6351
Vencimiento: 11/25
CVV: 123
Nombre: PEND
DNI: 12345678
```

## 🎯 Flujo Completo

```
1. Usuario agrega productos al carrito
   ↓
2. Backend crea preferencia con UUID único
   ↓
3. Usuario redirigido a Mercado Pago
   ↓
4. Usuario inicia sesión con COMPRADOR de prueba
   ↓
5. Verifica email con últimos 6 dígitos del User ID
   ↓
6. Completa pago con tarjeta de prueba
   ↓
7. MP notifica al backend vía webhook
   ↓
8. Backend actualiza estado del pedido
   ↓
9. Usuario redirigido a página de éxito
```{/* Botón de Mercado Pago Estético */}
<button
  onClick={handleCheckout}
  className="btn-mercadopago"
  disabled={carrito.length === 0}
>
  <svg
    width="24"
    height="24"
    viewBox="0 0 256 256"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="mp-icon"
  >
    <path
      d="M127.5 0C57.15 0 0 57.15 0 127.5S57.15 255 127.5 255 255 197.85 255 127.5 197.85 0 127.5 0z"
      fill="#009EE3"
    />
    <path
      d="M122.55 73.95c-18.3 0-33.15 14.85-33.15 33.15v73.95h24.9V107.1c0-4.5 3.75-8.25 8.25-8.25s8.25 3.75 8.25 8.25v73.95h24.9V107.1c0-18.3-14.85-33.15-33.15-33.15z"
      fill="#fff"
    />
  </svg>
  <span>Pagar con Mercado Pago</span>
</button>{/* Botón de Mercado Pago Estético */}
<button
  onClick={handleCheckout}
  className="btn-mercadopago"
  disabled={carrito.length === 0}
>
  <svg
    width="24"
    height="24"
    viewBox="0 0 256 256"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="mp-icon"
  >
    <path
      d="M127.5 0C57.15 0 0 57.15 0 127.5S57.15 255 127.5 255 255 197.85 255 127.5 197.85 0 127.5 0z"
      fill="#009EE3"
    />
    <path
      d="M122.55 73.95c-18.3 0-33.15 14.85-33.15 33.15v73.95h24.9V107.1c0-4.5 3.75-8.25 8.25-8.25s8.25 3.75 8.25 8.25v73.95h24.9V107.1c0-18.3-14.85-33.15-33.15-33.15z"
      fill="#fff"
    />
  </svg>
  <span>Pagar con Mercado Pago</span>
</button>

## 🐛 Solución de Problemas

### "No es posible continuar el pago con esta tarjeta"
**Causa**: Credenciales incorrectas o usuario no verificado
**Solución**: 
1. Verifica que estés usando credenciales de PRUEBA del VENDEDOR en el `.env`
2. Inicia sesión con el COMPRADOR de prueba en el checkout
3. Usa los últimos 6 dígitos del User ID del comprador para verificar

### "Pagos bloqueados o duplicados"
**Causa**: IdempotencyKey hardcodeado
**Solución**: ✅ Ya corregido - ahora usa UUID único

### "Cannot read property 'client' of undefined"
**Causa**: MERCADOPAGO_ACCESS_TOKEN no configurado
**Solución**: Verifica tu archivo `.env`

---

## 📚 Recursos

- [Usuarios de Prueba](https://www.mercadopago.com.ar/developers/es/docs/checkout-api/testing)
- [Tarjetas de Prueba](https://www.mercadopago.com.ar/developers/es/docs/checkout-api/testing/test-cards)
- [Panel de Desarrolladores](https://www.mercadopago.com.ar/developers/panel)

---

## ✅ Checklist Final

Antes de probar, verifica:

- [ ] Tienes 2 usuarios de prueba creados (Vendedor y Comprador)
- [ ] Credenciales del VENDEDOR en el `.env` del backend
- [ ] Código actualizado con randomUUID
- [ ] Backend corriendo (`npm run dev`)
- [ ] Frontend corriendo (`npm run dev`)
- [ ] Conoces los últimos 6 dígitos del User ID del COMPRADOR
- [ ] Tienes las credenciales de login del COMPRADOR anotadas

¡Ahora sí deberías poder completar pagos sin problemas! 🎉
