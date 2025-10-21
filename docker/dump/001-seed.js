// Script de seed para MongoDB (se ejecuta al iniciar el contenedor si la DB está vacía)
// Inserta datos de ejemplo basados en los modelos: usuarios, productos y un pedido

// NOTA: Las contraseñas están pre-hasheadas con bcrypt (cost 10) para el valor 'password'
// Hash: $2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36Z9YjRzCQXDpUe1koXSPi.

/* global db */
(function seed() {
  const databaseName = 'chocodevs';
  const database = db.getSiblingDB(databaseName);

  const now = new Date();
  const passwordHash = '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36Z9YjRzCQXDpUe1koXSPi.'; // 'password'

  // Usuarios
  const usuariosInsert = database.usuarios.insertMany([
    {
      nombre: 'Admin',
      apellido: 'ChocoDevs',
      email: 'admin@chocodevs.dev',
      password: passwordHash,
      rol: 'ADMIN',
      fechaRegistro: now,
    },
    {
      nombre: 'Juana',
      apellido: 'Pérez',
      email: 'juana@chocodevs.dev',
      password: passwordHash,
      rol: 'CLIENTE',
      fechaRegistro: now,
    },
  ]);

  const adminId = Array.isArray(usuariosInsert.insertedIds)
    ? usuariosInsert.insertedIds[0]
    : usuariosInsert.insertedIds['0'];

  // Productos
  const productosInsert = database.productos.insertMany([
    {
      nombreProducto: 'Alfajor de Chocolate',
      precio: 800,
      imagen: 'https://example.com/img/alfajor-chocolate.jpg',
      categoria: 'Dulce',
      descripcion_breve: 'Clásico alfajor bañado en chocolate.',
      descripcion_amplia: 'Alfajor artesanal relleno de dulce de leche, cubierto con chocolate semiamargo.'
    },
    {
      nombreProducto: 'Café Latte',
      precio: 650,
      imagen: 'https://example.com/img/cafe-latte.jpg',
      categoria: 'Infusiones',
      descripcion_breve: 'Café con leche espumosa.',
      descripcion_amplia: 'Shot de espresso con leche vaporizada y una fina capa de espuma.'
    },
    {
      nombreProducto: 'Batido de Frutilla',
      precio: 1200,
      imagen: 'https://example.com/img/batido-frutilla.jpg',
      categoria: 'Batidos',
      descripcion_breve: 'Batido cremoso de frutilla.',
      descripcion_amplia: 'Frutillas frescas licuadas con leche entera y un toque de vainilla.'
    },
    {
      nombreProducto: 'Tostado de Jamón y Queso',
      precio: 1500,
      imagen: 'https://example.com/img/tostado-jyq.jpg',
      categoria: 'Sandwich',
      descripcion_breve: 'Sandwich tostado clásico.',
      descripcion_amplia: 'Pan de miga con jamón cocido y queso barra, tostado a la plancha.'
    },
    {
      nombreProducto: 'Medialuna',
      precio: 300,
      imagen: 'https://example.com/img/medialuna.jpg',
      categoria: 'Dulce',
      descripcion_breve: 'Medialuna de manteca.',
      descripcion_amplia: 'Masa hojaldrada, glaseada, ideal para acompañar el café.'
    },
    {
      nombreProducto: 'Empanada Salada',
      precio: 800,
      imagen: 'https://example.com/img/empanada-salada.jpg',
      categoria: 'Salado',
      descripcion_breve: 'Empanada de carne sabrosa.',
      descripcion_amplia: 'Relleno de carne cortada a cuchillo, huevo y aceitunas, horno de barro.'
    }
  ]);

  const productoIds = Array.isArray(productosInsert.insertedIds)
    ? productosInsert.insertedIds
    : Object.keys(productosInsert.insertedIds).map((k) => productosInsert.insertedIds[k]);

  // Pedido de ejemplo (pendiente)
  const totalEjemplo = 800 + 650; // Alfajor + Latte
  database.pedidos.insertOne({
    usuario: adminId,
    productos: [productoIds[0], productoIds[1]],
    total: totalEjemplo,
    metodoPago: 'EFECTIVO',
    estado: 'PENDIENTE',
    fechaCreacion: now,
  });
})();


