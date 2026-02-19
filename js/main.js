import { getProducts } from "./api.js";
import { renderProducts } from "./ui.js";
import { saveFavorites, loadFavorites } from "./storage.js";

const listElement = document.getElementById("productList");
const filterElement = document.getElementById("categoryFilter");

let allProducts = [];
let favorites = loadFavorites();

function updateUI(products) {
  renderProducts(products, listElement, favorites, toggleFavorite);
}

function toggleFavorite(productId) {
  if (favorites.includes(productId)) {
    favorites = favorites.filter(id => id !== productId);
  } else {
    favorites.push(productId);
  }
  saveFavorites(favorites);
  updateUI(allProducts);
}

function setupFilters(products) {
  const categories = ["all", ...new Set(products.map(p => p.category))];
  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    filterElement.appendChild(option);
  });

  filterElement.addEventListener("change", () => {
    const selected = filterElement.value;
    const filtered =
      selected === "all"
        ? products
        : products.filter(p => p.category === selected);
    updateUI(filtered);
  });
}

async function init() {
  try {
    allProducts = await getProducts();
    setupFilters(allProducts);
    updateUI(allProducts);
  } catch (error) {
    listElement.textContent = "Error loading products.";
  }
}

init();
