# tuto12_arq

Servicio Express desplegado en Docker Swarm (GCP).

## Endpoints

| Ruta | Descripción |
|------|-------------|
| `GET /` | Frase aleatoria + ID del contenedor que respondió |
| `GET /api/products` | **Servicio web JSON**: productos en stock y en venta, cada uno con `url` a su visualización |
| `GET /api/products/:id` | JSON de un producto (incluido si está agotado) |
| `GET /products/:id` | Página HTML de visualización del producto |

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
      "url": "http://<ip-o-dominio>/products/1"
    }
  ]
}
```
