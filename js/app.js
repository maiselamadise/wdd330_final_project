// Search functionality
document.getElementById("searchBar").addEventListener("input", function(e) {
  const query = e.target.value.toLowerCase();
  document.querySelectorAll(".gear-card").forEach(card => {
    const text = card.innerText.toLowerCase();
    card.style.display = text.includes(query) ? "block" : "none";
  });
});

// Category filter + local storage
const categoryFilter = document.getElementById("categoryFilter");

function filterCategory(category) {
  localStorage.setItem("lastCategory", category);
  document.querySelectorAll(".gear-card").forEach(card => {
    card.style.display =
      category === "all" || card.dataset.category === category
        ? "block"
        : "none";
  });
}

categoryFilter.addEventListener("change", e => {
  filterCategory(e.target.value);
});

// Load last category on refresh
window.addEventListener("load", () => {
  const lastCategory = localStorage.getItem("lastCategory");
  if (lastCategory) {
    categoryFilter.value = lastCategory;
    filterCategory(lastCategory);
  }
});

// Weather integration (OpenWeatherMap)
async function getWeather(city) {
  const apiKey = "YOUR_API_KEY"; // replace with your key
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  );
  const data = await response.json();
  const temp = data.main.temp;

  let suggestion = "";
  if (temp < 10) suggestion = "Bundle up: thermal base layers, insulated jackets, and waterproof boots.";
  else if (temp < 20) suggestion = "Light jacket and hiking pants recommended.";
  else suggestion = "Breathable shirts, shorts, and sun protection.";

  document.getElementById("weatherSuggestion").innerText = suggestion;
}

// Example call
getWeather("Pretoria");
