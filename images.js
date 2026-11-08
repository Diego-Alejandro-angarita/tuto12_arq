// Genera la imagen SVG de cada producto, servida en /images/:id.svg.
// El color depende del material y la figura de la categoria.

const palettes = {
  plata: ['#eef1f5', '#b8c0cc', '#7d8796'],
  oroRosa: ['#fbe9e4', '#e8b4a6', '#b97462'],
  oroBlanco: ['#f6f6f2', '#d9d9cf', '#9a9a8c'],
  oro: ['#fdf4dc', '#e8c66a', '#b08a2e'],
}

function paletteFor(material) {
  const m = material.toLowerCase()
  if (m.includes('rosa')) return palettes.oroRosa
  if (m.includes('blanco')) return palettes.oroBlanco
  if (m.includes('oro')) return palettes.oro
  return palettes.plata
}

// Figura sencilla segun la categoria (lienzo 600x600, centro 300,260).
function shapeFor(categoria, metal, dark) {
  const stroke = `stroke="${metal}" stroke-width="18" fill="none" stroke-linecap="round"`
  switch (categoria.toLowerCase()) {
    case 'collares':
      return `<path d="M170 120 Q300 400 430 120" ${stroke}/>
        <path d="M300 262 l-32 40 l32 40 l32 -40 z" fill="${dark}"/>`
    case 'aretes':
      return `<circle cx="230" cy="170" r="14" fill="${dark}"/>
        <path d="M230 184 v60" ${stroke}/>
        <path d="M230 250 l-34 50 l34 50 l34 -50 z" fill="${metal}"/>
        <circle cx="370" cy="170" r="14" fill="${dark}"/>
        <path d="M370 184 v60" ${stroke}/>
        <path d="M370 250 l-34 50 l34 50 l34 -50 z" fill="${metal}"/>`
    case 'pulseras':
      return `<ellipse cx="300" cy="260" rx="150" ry="95" ${stroke}/>
        ${[0, 1, 2, 3, 4, 5, 6, 7]
          .map((i) => {
            const a = (i / 8) * Math.PI * 2
            return `<circle cx="${(300 + 150 * Math.cos(a)).toFixed(1)}" cy="${(260 + 95 * Math.sin(a)).toFixed(1)}" r="16" fill="${dark}"/>`
          })
          .join('')}`
    default: // anillos
      return `<circle cx="300" cy="290" r="110" ${stroke}/>
        <path d="M300 130 l-40 46 l40 46 l40 -46 z" fill="${dark}"/>`
  }
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function productSvg(product) {
  const [light, metal, dark] = paletteFor(product.material)
  return `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600" role="img" aria-label="${escapeXml(product.nombre)}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ffffff"/>
      <stop offset="1" stop-color="${light}"/>
    </linearGradient>
  </defs>
  <rect width="600" height="600" fill="url(#bg)"/>
  ${shapeFor(product.categoria, metal, dark)}
  <text x="300" y="490" text-anchor="middle" font-family="Georgia, serif" font-size="40" fill="#2b2b2b">${escapeXml(product.nombre)}</text>
  <text x="300" y="535" text-anchor="middle" font-family="system-ui, sans-serif" font-size="22" fill="${dark}">${escapeXml(product.material)}</text>
</svg>`
}

module.exports = { productSvg }
