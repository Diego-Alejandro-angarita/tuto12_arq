# tuto12_arq

Servicio Express desplegado en Docker Swarm (GCP).

## Endpoints

| Ruta | Descripción |
|------|-------------|
| `GET /` | Frase aleatoria + ID del contenedor que respondió |
| `GET /api/products` | **Servicio web JSON**: productos en stock y en venta, cada uno con `url` a su visualización |
| `GET /api/products/:id` | JSON de un producto (incluido si está agotado) |
| `GET /products/:id` | Página HTML de visualización del producto |
| `GET /images/:id.svg` | Imagen del producto (campo `imagen` del JSON) |

La API tiene **CORS habilitado**, así que se puede consumir con `fetch()` desde
páginas web de cualquier dominio:

```js
const res = await fetch('http://34.136.95.17/api/products')
const { productos } = await res.json()
// productos[i].imagen -> URL de la imagen, productos[i].url -> página del producto
```

Los enlaces `url` se arman con el host de la petición. Para fijarlos a un dominio
concreto, definir la variable de entorno `PUBLIC_BASE_URL` (p. ej. `http://mi-dominio.com`).

Ejemplo de respuesta de `/api/products`:

```json
{
  "tienda": "DSJ Jewelry",
  "total": 4,
  "containerId": "a1b2c3d4e5f6",
  "productos": [
    {
      "id": 1,
      "nombre": "Anillo Luna",
      "descripcion": "Anillo de plata con acabado satinado.",
      "categoria": "Anillos",
      "material": "Plata 925",
      "precio": 180000,
      "stock": 12,
      "moneda": "COP",
      "imagen": "http://<ip-o-dominio>/images/1.svg",
      "url": "http://<ip-o-dominio>/products/1"
    }
  ]
}
```
