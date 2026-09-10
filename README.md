# AuraBazar

Catálogo de artículos de bazar. Sitio estático simple (sin frameworks,
sin paso de build) para arrancar rápido y sumar el carrito/checkout
más adelante.

## Ver el sitio

Abrí `index.html` con doble clic, o hacé clic derecho → "Abrir con" →
tu navegador. No necesita servidor ni instalación.

## Agregar un producto nuevo

1. Abrí `js/products.js`.
2. Copiá uno de los objetos existentes dentro del array `PRODUCTS` y
   pegalo como una entrada nueva.
3. Completá `id` (sin espacios ni tildes), `name`, `category`,
   `price` (número, sin puntos ni "$"), `description`.
4. Mientras no tengas la foto real, dejá `image: null` — el sitio va
   a mostrar un cuadro de color con el nombre en su lugar.
5. Guardá y recargá `index.html` en el navegador.

## Agregar la foto real de un producto

1. Guardá la imagen dentro de `assets/products/` (creá la carpeta si
   no existe), con un nombre simple, por ejemplo `set-vasos.jpg`.
2. En `js/products.js`, cambiá el campo `image` de ese producto a
   `"assets/products/set-vasos.jpg"`.

## Los dos agentes de este proyecto

Este repo incluye dos agentes de Claude Code en `.claude/agents/`,
pensados para trabajar en él una vez que tengas
[ECC](https://github.com/affaan-m/ECC) instalado como plugin:

- **catalog-keeper** — productos, categorías y contenido del sitio.
- **sales-flow-builder** — carrito, checkout y pagos (para la próxima
  etapa, cuando el catálogo ya tenga productos reales).

Se los pedís por nombre en una sesión de Claude Code, por ejemplo:
`Usá catalog-keeper para agregar la categoría "Textiles".`

## Próximos pasos

- [ ] Sumar las fotos reales de los productos
- [ ] Revisar precios y descripciones
- [ ] Carrito de compras (`sales-flow-builder`)
- [ ] Checkout e integración de pago
