export function saveFavorites(favorites) {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

export function loadFavorites() {
  return JSON.parse(localStorage.getItem("favorites")) || [];
}
