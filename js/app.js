/*
 * Renderiza el catálogo a partir de PRODUCTS (js/products.js),
 * arma los filtros de categoría, la búsqueda por texto y la ficha
 * de detalle (modal) que se abre al hacer click en un producto.
 * No depende de ninguna librería externa.
 */

// Número de WhatsApp para el botón "Consultar por WhatsApp",
// en formato internacional sin "+" ni espacios.
const WHATSAPP_NUMBER = "5491134131283";

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

const modalBackdrop = document.getElementById("modal-backdrop");
const modalClose = document.getElementById("modal-close");
const modalMedia = document.getElementById("modal-media");
const modalCat = document.getElementById("modal-cat");
const modalName = document.getElementById("modal-name");
const modalDesc = document.getElementById("modal-desc");
const modalPrice = document.getElementById("modal-price");
const modalWhatsapp = document.getElementById("modal-whatsapp");

let lastFocusedElement = null;

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

function mediaMarkup(product, { placeholderClass = "card-media" } = {}) {
  if (product.image) {
    return `<img src="${product.image}" alt="${product.name}" />`;
  }
  const color = PLACEHOLDER_COLORS[product.category] || DEFAULT_PLACEHOLDER_COLOR;
  return `
    <div class="${placeholderClass}" style="background:${color}">
      <div>
        ${product.name}
        <span class="ph-label">Foto próximamente</span>
      </div>
    </div>
  `;
}

function whatsappLink(product) {
  const message = `Hola! Quiero consultar por: ${product.name} (${money.format(product.price)}).`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function openModal(product) {
  lastFocusedElement = document.activeElement;
  modalMedia.innerHTML = mediaMarkup(product, { placeholderClass: "modal-placeholder" });
  modalCat.textContent = product.category;
  modalName.textContent = product.name;
  modalDesc.textContent = product.description;
  modalPrice.textContent = money.format(product.price);
  modalWhatsapp.href = whatsappLink(product);

  modalBackdrop.hidden = false;
  document.body.style.overflow = "hidden";
  modalClose.focus();
}

function closeModal() {
  modalBackdrop.hidden = true;
  document.body.style.overflow = "";
  if (lastFocusedElement) lastFocusedElement.focus();
}

modalClose.addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", (e) => {
  if (e.target === modalBackdrop) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modalBackdrop.hidden) closeModal();
});

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
    <article class="card" tabindex="0" role="button" aria-label="Ver ${p.name}" data-id="${p.id}">
      ${mediaMarkup(p)}
      <div class="card-body">
        <span class="card-cat">${p.category}</span>
        <h3 class="card-name">${p.name}</h3>
        <p class="card-desc">${p.description}</p>
        <div class="card-footer">
          <span class="card-price">${money.format(p.price)}</span>
          <span class="card-more">Ver más →</span>
        </div>
      </div>
    </article>
  `
    )
    .join("");

  grid.querySelectorAll(".card").forEach((card) => {
    const product = PRODUCTS.find((p) => p.id === card.dataset.id);
    card.addEventListener("click", () => openModal(product));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(product);
      }
    });
  });
}

searchInput.addEventListener("input", (e) => {
  searchTerm = e.target.value;
  render();
});

render();
