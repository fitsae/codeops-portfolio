const loading = document.getElementById("loading");
const error = document.getElementById("error");
const dishList = document.getElementById("dishList");
const refreshBtn = document.getElementById("refreshBtn");

async function load() {
  // Show loading message
  loading.textContent = "Loading...";
  error.textContent = "";
  dishList.innerHTML = "";

  try {
    // Fetch data from API
    const res = await fetch("https://dummyjson.com/recipes");

    // Check if request was successful
    if (!res.ok) {
      throw new Error("Failed to fetch dishes");
    }

    // Convert response to JSON
    const data = await res.json();

    // Render each dish
    data.recipes.forEach((dish) => {
      const card = document.createElement("div");

      card.className = "dish-card";

      card.innerHTML = `
                <img 
                    src="${dish.image}" 
                    alt="${dish.name}"
                >

                <div class="dish-content">
                    <h2>${dish.name}</h2>

                    <p>
                        <strong>Cuisine:</strong>
                        ${dish.cuisine}
                    </p>

                    <p>
                        <strong>Difficulty:</strong>
                        ${dish.difficulty}
                    </p>

                    <p class="rating">
                        ⭐ ${dish.rating}
                    </p>
                </div>
            `;

      dishList.appendChild(card);
    });
  } catch (err) {
    // Show friendly error message
    error.textContent = "Sorry! We couldn't load the dishes. Please try again.";
  } finally {
    // Remove loading message
    loading.textContent = "";
  }
}

// Refresh button
refreshBtn.addEventListener("click", load);

// Load dishes when page opens
load();
