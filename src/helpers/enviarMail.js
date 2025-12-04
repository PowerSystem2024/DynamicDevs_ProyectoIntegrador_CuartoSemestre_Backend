import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// Generador detalle de productos
const generarDetalleProductos = (items) => {
  if (!items || items.length === 0) return "No hay productos.";
  return items
    .map(i => `${i.nombreProducto} x${i.cantidad} = $${i.precio * i.cantidad}`)
    .join("\n");
};

// Validar horario permitido
const validarHorario = (horario) => {
  const [h, m] = horario.split(":").map(Number);
  if (!h && h !== 0) return false;

  const minutos = h * 60 + m;

  const rango1 = [8 * 60, 13 * 60];   // 08:00 a 13:00
  const rango2 = [17 * 60, 21 * 60];  // 17:00 a 21:00

  const dentroRango1 = minutos >= rango1[0] && minutos <= rango1[1];
  const dentroRango2 = minutos >= rango2[0] && minutos <= rango2[1];

  return dentroRango1 || dentroRango2;
};

/**
 * Enviar mail
 */
export const enviarMail = async ({
  subject,
  items,
  metodoPago,
  nombreCliente,
  notaCliente,
  horarioRetiro,
  nombreRetira,
  fechaRetira,
  horaRetira,
  text,
  html
}) => {

  try {
    let cuerpo = "";

    // Validar horario
    if ((horarioRetiro || horaRetira) && !validarHorario(horarioRetiro || horaRetira)) {
      cuerpo += "⚠️ *Horario fuera de rango permitido*\nHorarios válidos: 08:00–13:00 / 17:00–21:00\n\n";
    }

    // Método de pago
    if (metodoPago === "EFECTIVO") {
      cuerpo += "💵 Pagará en el local con efectivo.\n\n";
    } else if (metodoPago === "MP") {
      cuerpo += "Pedido PAGADO con Mercado Pago ✅\n\n";
    }

    // Nombre del cliente
    if (nombreCliente || nombreRetira) {
      cuerpo += `👤 Cliente: ${nombreCliente || nombreRetira}\n\n`;
    }

    // Fecha y hora de retiro
    if (fechaRetira) {
      cuerpo += `📅 Fecha de retiro: ${fechaRetira}\n`;
    }
    if (horaRetira || horarioRetiro) {
      cuerpo += `🕒 Hora de retiro: ${horaRetira || horarioRetiro}\n\n`;
    }

    // Productos
    if (items) {
      const detalle = generarDetalleProductos(items);
      const total = items.reduce((acc, i) => acc + i.precio * i.cantidad, 0);

      cuerpo += `Total: $${total}\n\n`;
      cuerpo += `🛒 Productos:\n${detalle}\n\n`;
    }

    // Nota o reseña del cliente
    if (notaCliente) {
      cuerpo += `📝 Nota del cliente:\n"${notaCliente}"\n\n`;
    }

  
    if (text) {
      cuerpo += `\n${text}`;
    }

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: process.env.MAIL_TO,
      subject: subject || "Nuevo Pedido",
      text: cuerpo,
      html: html || undefined,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Mail enviado:", info.response);

  } catch (error) {
    console.error("❌ Error al enviar mail:", error);
  }
};
