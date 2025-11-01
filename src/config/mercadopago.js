import { MercadoPagoConfig } from 'mercadopago';

// Configuración del cliente de Mercado Pago
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
  options: {
    timeout: 5000
  }
});

export default client;
