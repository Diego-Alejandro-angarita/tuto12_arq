// Catalogo de productos de DSJ Jewelry expuesto por el servicio web.
// Los productos con stock 0 existen en el catalogo pero NO se listan como
// "en venta" en /api/products.
const products = [
  {
    id: 1,
    nombre: 'Anillo Luna',
    descripcion: 'Anillo de plata con acabado satinado.',
    categoria: 'Anillos',
    material: 'Plata 925',
    precio: 180000,
    stock: 12,
  },
  {
    id: 2,
    nombre: 'Anillo Solsticio',
    descripcion: 'Anillo de oro rosa con circon central.',
    categoria: 'Anillos',
    material: 'Oro rosa 18k',
    precio: 940000,
    stock: 4,
  },
  {
    id: 3,
    nombre: 'Collar Aurora',
    descripcion: 'Collar de plata con dije de cuarzo rosa.',
    categoria: 'Collares',
    material: 'Plata 925',
    precio: 260000,
    stock: 7,
  },
  {
    id: 4,
    nombre: 'Aretes Estrella',
    descripcion: 'Aretes en oro amarillo con forma de estrella.',
    categoria: 'Aretes',
    material: 'Oro 18k',
    precio: 520000,
    stock: 0,
  },
  {
    id: 5,
    nombre: 'Pulsera Marea',
    descripcion: 'Pulsera tejida con cuentas de plata y cierre de mosqueton.',
    categoria: 'Pulseras',
    material: 'Plata 925',
    precio: 150000,
    stock: 15,
  },
  {
    id: 6,
    nombre: 'Anillo Eclipse',
    descripcion: 'Anillo de oro blanco con zafiro azul.',
    categoria: 'Anillos',
    material: 'Oro blanco 18k',
    precio: 1250000,
    stock: 0,
  },
]

module.exports = products
