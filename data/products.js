// product.js

export async function getProducts() {
  try {
    const response = await fetch("./data/products.json");
    if (!response.ok) {
      throw new Error("Failed to fetch product data");
    }
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error("Error loading products:", error);
    return [];
  }
}

export function filterProductsByCategory(products, category) {
  if (category === "all") {
    return products;
  }
  return products.filter(product => product.category === category);
}