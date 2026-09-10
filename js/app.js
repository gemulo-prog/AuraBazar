/*
 * Renderiza el catálogo a partir de PRODUCTS (js/products.js),
 * arma los filtros de categoría y la búsqueda por texto.
 * No depende de ninguna librería externa.
 */

// Colores de fondo para el cuadro-placeholder cuando un producto
// todavía no tiene foto (product.image === null).
const PLACEHOLDER_COLORS = {
  Cocina: "#1f6f5c",
  Hogar: "#b5502e",
  Decoración: "#6b4fa0"
};
const DEFAULT_PLACEHOLDER_COLOR = "#8a7f74";

const money = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0
});

const grid = document.getElementById("product-grid");
const emptyState = document.getElementById("empty-state");
const searchInput = document.getElementById("search");
const catNav = document.getElementById("cat-nav");

let activeCategory = "Todos";
let searchTerm = "";

function buildCategoryNav() {
  const categories = ["Todos", ...new Set(PRODUCTS.map((p) => p.category))];
  catNav.innerHTML = "";
  categories.forEach((cat) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "cat-btn" + (cat === activeCategory ? " active" : "");
    btn.textContent = cat;
    btn.addEventListener("click", () => {
      activeCategory = cat;
      render();
    });
    catNav.appendChild(btn);
  });
}

function cardMedia(product) {
  if (product.image) {
    return `<img src="${product.image}" alt="${product.name}" />`;
  }
  const color = PLACEHOLDER_COLORS[product.category] || DEFAULT_PLACEHOLDER_COLOR;
  return `
    <div class="card-media" style="background:${color}">
      <div>
        ${product.name}
        <span class="ph-label">Foto próximamente</span>
      </div>
    </div>
  `;
}

function render() {
  buildCategoryNav();

  const term = searchTerm.trim().toLowerCase();
  const filtered = PRODUCTS.filter((p) => {
    const matchesCategory = activeCategory === "Todos" || p.category === activeCategory;
    const matchesSearch = !term || p.name.toLowerCase().includes(term);
    return matchesCategory && matchesSearch;
  });

  emptyState.hidden = filtered.length !== 0;
  grid.innerHTML = filtered
    .map(
      (p) => `
    <article class="card">
      ${cardMedia(p)}
      <div class="card-body">
        <span class="card-cat">${p.category}</span>
        <h3 class="card-name">${p.name}</h3>
        <p class="card-desc">${p.description}</p>
        <div class="card-footer">
          <span class="card-price">${money.format(p.price)}</span>
          <button class="card-cta" disabled title="El carrito llega en la próxima etapa">Próximamente</button>
        </div>
      </div>
    </article>
  `
    )
    .join("");
}

searchInput.addEventListener("input", (e) => {
  searchTerm = e.target.value;
  render();
});

render();
