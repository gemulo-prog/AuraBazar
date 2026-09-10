# CLAUDE.md

Contexto para Claude Code al trabajar en este repositorio.

## Qué es este proyecto

AuraBazar: catálogo de artículos de bazar. Por ahora es un sitio
estático simple (HTML/CSS/JS sin frameworks ni build step), pensado
para arrancar rápido y sumar el carrito/checkout más adelante.

## Estructura

- `index.html` — página única del catálogo
- `css/styles.css` — estilos
- `js/products.js` — datos de los productos (editar acá para agregar/quitar productos)
- `js/app.js` — renderizado del catálogo, filtros y búsqueda
- `assets/products/` — fotos reales de productos (cuando existan)
- `.claude/agents/` — agentes de este proyecto: `catalog-keeper` (catálogo y contenido) y `sales-flow-builder` (carrito, checkout, pagos)

## Convenciones

- Vanilla JS, sin dependencias externas ni paso de build.
- Los productos sin foto real usan `image: null` y se muestran con un
  cuadro de color — no inventar imágenes ni URLs de fotos.
- Cualquier cambio de precios, stock o checkout necesita tests antes
  de darse por terminado.
