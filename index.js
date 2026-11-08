const express = require('express')
const os = require('os')
const products = require('./products')

const app = express()
const port = process.env.PORT || 80

// Detras del balanceador/proxy, usar el host y protocolo originales para
// armar los enlaces absolutos de cada producto.
app.set('trust proxy', true)

const phrases = [
  'Get ready to be inspired…',
  'See rejection as redirection.',
  'There is beauty in simplicity.',
  'You can’t be late until you show up.',
  'Maybe life is testing you. Don’t give up.',
  'Impossible is just an opinion.',
  'Alone or not you gonna walk forward.',
]

// URL base publica: se puede fijar con PUBLIC_BASE_URL; si no, se deduce de la peticion.
function baseUrl(req) {
  if (process.env.PUBLIC_BASE_URL) {
    return process.env.PUBLIC_BASE_URL.replace(/\/+$/, '')
  }
  return `${req.protocol}://${req.get('host')}`
}

function toJson(product, req) {
  return {
    ...product,
    moneda: 'COP',
    url: `${baseUrl(req)}/products/${product.id}`,
  }
}

function findProduct(id) {
  return products.find((p) => p.id === Number(id))
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

app.get('/', (req, res) => {
  const number = Math.floor(Math.random() * phrases.length)
  res.send(phrases[number] + '-container ID: ' + os.hostname())
})

// Servicio web: productos en stock y en venta, con enlace a su visualizacion.
app.get('/api/products', (req, res) => {
  const inStock = products.filter((p) => p.stock > 0).map((p) => toJson(p, req))
  res.json({
    tienda: 'DSJ Jewelry',
    total: inStock.length,
    containerId: os.hostname(),
    productos: inStock,
  })
})

app.get('/api/products/:id', (req, res) => {
  const product = findProduct(req.params.id)
  if (!product) {
    return res.status(404).json({ error: 'Producto no encontrado' })
  }
  res.json(toJson(product, req))
})

// Visualizacion de un producto (destino del campo "url" del JSON).
app.get('/products/:id', (req, res) => {
  const product = findProduct(req.params.id)
  if (!product) {
    return res.status(404).send('<h1>Producto no encontrado</h1>')
  }
  const p = Object.fromEntries(
    Object.entries(product).map(([k, v]) => [k, escapeHtml(v)])
  )
  const precio = product.precio.toLocaleString('es-CO')
  const disponibilidad = product.stock > 0 ? `${p.stock} unidades disponibles` : 'Agotado'
  res.send(`<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${p.nombre} - DSJ Jewelry</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 640px; margin: 40px auto; padding: 0 16px; color: #222; }
    .card { border: 1px solid #ddd; border-radius: 8px; padding: 24px; }
    .precio { font-size: 1.5rem; font-weight: bold; }
    .meta { color: #666; }
  </style>
</head>
<body>
  <div class="card">
    <p class="meta">${p.categoria}</p>
    <h1>${p.nombre}</h1>
    <p>${p.descripcion}</p>
    <p><strong>Material:</strong> ${p.material}</p>
    <p class="precio">$${precio} COP</p>
    <p>${disponibilidad}</p>
  </div>
  <p><a href="/api/products">Ver todos los productos (JSON)</a></p>
  <p class="meta">Container ID: ${escapeHtml(os.hostname())}</p>
</body>
</html>`)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
