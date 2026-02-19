export function renderProducts(products, container, favorites, onFavoriteToggle) {
  container.innerHTML = "";

  products.forEach(product => {
    const li = document.createElement("li");

    const title = document.createElement("span");
    title.textContent = product.title;

    const button = document.createElement("button");
    button.textContent = favorites.includes(product.id)
      ? "Remove Favorite"
      : "Add Favorite";

    button.addEventListener("click", () => onFavoriteToggle(product.id));

    li.appendChild(title);
    li.appendChild(button);
    container.appendChild(li);
  });
}
