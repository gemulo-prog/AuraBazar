/*
 * PRODUCTOS DE EJEMPLO — reemplazá este array por los tuyos.
 *
 * Cada producto es un objeto con estos campos:
 *   id          identificador único (texto, sin espacios)
 *   name        nombre del producto
 *   category    categoría (se usa para los filtros de arriba)
 *   price       número, en pesos, sin puntos ni "$"
 *   description texto corto (una linea)
 *   image       ruta a la foto real, ej: "assets/products/set-vasos.jpg"
 *               dejalo en null mientras no tengas la foto: se muestra
 *               un cuadro de color con el nombre, en su lugar.
 *
 * Ver README.md → "Agregar un producto nuevo" para el paso a paso.
 */

const PRODUCTS = [
  {
    id: "set-vasos-vidrio",
    name: "Set de vasos de vidrio x6",
    category: "Cocina",
    price: 8500,
    description: "Vasos de vidrio templado, 300 ml, aptos lavavajillas.",
    image: null
  },
  {
    id: "juego-ollas",
    name: "Juego de ollas antiadherentes x3",
    category: "Cocina",
    price: 42000,
    description: "Ollas de 16, 20 y 24 cm con tapa de vidrio.",
    image: null
  },
  {
    id: "organizador-especias",
    name: "Organizador de especias giratorio",
    category: "Cocina",
    price: 6200,
    description: "12 compartimentos, base giratoria antideslizante.",
    image: null
  },
  {
    id: "mantel-yute",
    name: "Mantel individual de yute x4",
    category: "Hogar",
    price: 5400,
    description: "Set de 4 individuales tejidos, 30x45 cm.",
    image: null
  },
  {
    id: "set-repasadores",
    name: "Set de repasadores x4",
    category: "Hogar",
    price: 3800,
    description: "100% algodón, distintos estampados.",
    image: null
  },
  {
    id: "portavelas-ceramica",
    name: "Portavelas de cerámica",
    category: "Decoración",
    price: 4100,
    description: "Terminación mate, apto vela chica o mediana.",
    image: null
  },
  {
    id: "macetas-set",
    name: "Set de macetas de cerámica x3",
    category: "Decoración",
    price: 9700,
    description: "Tamaños chico, mediano y grande, con plato.",
    image: null
  },
  {
    id: "difusor-aromas",
    name: "Difusor de aromas por varillas",
    category: "Decoración",
    price: 3200,
    description: "150 ml, incluye 6 varillas de bambú.",
    image: null
  }
];
