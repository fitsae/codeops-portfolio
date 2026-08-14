/* =====================================================
   DAY 20 - ASYNC JAVASCRIPT EXERCISES
===================================================== */

/* =====================================================
   EXERCISE 1
   Fetch USD → ETB exchange rate
===================================================== */

const rateBtn = document.getElementById("rateBtn");
const rateResult = document.getElementById("rateResult");

async function getUsdToEtbRate() {
  const response = await fetch(
    "https://api.frankfurter.dev/v2/rate/USD/ETB?providers=NBE",
  );

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  const data = await response.json();

  return data.rate;
}

rateBtn.addEventListener("click", async () => {
  rateResult.textContent = "Loading exchange rate...";

  try {
    const rate = await getUsdToEtbRate();

    rateResult.innerHTML = `
            <div class="rate-value">
                <span>1 USD =</span>

                <span class="rate-number">
                    ${rate.toFixed(2)}
                </span>

                <span>ETB</span>
            </div>
        `;
  } catch (error) {
    rateResult.className = "result error-box";

    rateResult.textContent = "Could not load the exchange rate.";

    console.error(error);
  }
});

/* =====================================================
   EXERCISE 2
   Rewrite:
   
   fetch()
      .then()
      .then()
      .then()

   Using async / await + try / catch
===================================================== */

const renderBtn = document.getElementById("renderBtn");
const renderResult = document.getElementById("renderResult");

async function loadRecipe() {
  try {
    renderResult.textContent = "Loading recipe...";

    // STEP 1
    const response = await fetch("https://dummyjson.com/recipes/1");

    // Check HTTP status
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    // STEP 2
    const recipe = await response.json();

    // STEP 3
    renderResult.innerHTML = `
            <div class="recipe-card">

                <img
                    src="${recipe.image}"
                    alt="${recipe.name}"
                >

                <div class="recipe-content">

                    <h3>
                        ${recipe.name}
                    </h3>

                    <p>
                        <strong>Cuisine:</strong>
                        ${recipe.cuisine}
                    </p>

                    <p>
                        <strong>Difficulty:</strong>
                        ${recipe.difficulty}
                    </p>

                    <p>
                        <strong>Rating:</strong>
                        ⭐ ${recipe.rating}
                    </p>

                    <span class="recipe-tag">
                        ${recipe.mealType[0]}
                    </span>

                </div>

            </div>
        `;
  } catch (error) {
    renderResult.className = "result error-box";

    renderResult.textContent = "Failed to load the recipe.";

    console.error(error);
  }
}

renderBtn.addEventListener("click", loadRecipe);

/* =====================================================
   EXERCISE 3
   Wrong URL vs HTTP 404
===================================================== */

const wrongUrlBtn = document.getElementById("wrongUrlBtn");

const notFoundBtn = document.getElementById("notFoundBtn");

const errorResult = document.getElementById("errorResult");

/*
    TEST 1:
    Deliberately invalid URL

    This normally causes fetch() itself to reject.
*/

wrongUrlBtn.addEventListener("click", async () => {
  errorResult.className = "result";

  errorResult.textContent = "Testing wrong URL...";

  try {
    const response = await fetch(
      "https://this-domain-does-not-exist-example.com/api",
    );

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();

    console.log(data);
  } catch (error) {
    errorResult.className = "result error-box";

    errorResult.innerHTML = `
                <strong>Catch block ran.</strong>
                <br><br>
                The request failed because the
                domain/URL could not be reached.
                <br><br>
                Error:
                ${error.message}
            `;

    console.error("Wrong URL error:", error);
  }
});

/*
    TEST 2:
    Real URL that returns HTTP 404

    fetch() itself succeeds,
    but response.ok is false.
*/

notFoundBtn.addEventListener("click", async () => {
  errorResult.className = "result";

  errorResult.textContent = "Testing HTTP 404...";

  try {
    const response = await fetch("https://dummyjson.com/http/404");

    console.log("response.ok:", response.ok);

    /*
                IMPORTANT:

                fetch() does NOT automatically throw
                for HTTP 404.

                Therefore we must check response.ok.
            */

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();

    console.log(data);
  } catch (error) {
    errorResult.className = "result error-box";

    errorResult.innerHTML = `
                <strong>Catch block ran.</strong>

                <br><br>

                The server responded,
                but with HTTP status:

                <strong>404</strong>

                <br><br>

                This is why we need:

                <br>

                <code>
                    if (!response.ok) {
                        throw new Error(...);
                    }
                </code>
            `;

    console.error("404 error:", error);
  }
});

/* =====================================================
   EXERCISE 4
   Promise.all()

   1. Fetch recipe list
   2. Get first two recipes
   3. Fetch both details in parallel
===================================================== */

const promiseBtn = document.getElementById("promiseBtn");

const promiseResult = document.getElementById("promiseResult");

promiseBtn.addEventListener("click", async () => {
  promiseResult.innerHTML = "<p>Loading recipes...</p>";

  try {
    /*
                STEP 1

                Get the recipe list.
            */

    const listResponse = await fetch("https://dummyjson.com/recipes?limit=2");

    if (!listResponse.ok) {
      throw new Error("Could not fetch recipe list");
    }

    const listData = await listResponse.json();

    /*
                Get the first two recipe IDs.
            */

    const firstTwo = listData.recipes.slice(0, 2);

    /*
                STEP 2

                Fetch both details at the same time.

                Promise.all waits for BOTH requests.
            */

    const recipePromises = firstTwo.map(async (recipe) => {
      const response = await fetch(
        `https://dummyjson.com/recipes/${recipe.id}`,
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch recipe ${recipe.id}`);
      }

      return response.json();
    });

    const recipes = await Promise.all(recipePromises);

    /*
                STEP 3

                Render both recipes.
            */

    promiseResult.innerHTML = recipes
      .map((recipe) => {
        return `
                            <div class="recipe-card">

                                <img
                                    src="${recipe.image}"
                                    alt="${recipe.name}"
                                >

                                <div class="recipe-content">

                                    <h3>
                                        ${recipe.name}
                                    </h3>

                                    <p>
                                        <strong>Cuisine:</strong>
                                        ${recipe.cuisine}
                                    </p>

                                    <p>
                                        <strong>Difficulty:</strong>
                                        ${recipe.difficulty}
                                    </p>

                                    <p>
                                        <strong>Rating:</strong>
                                        ⭐ ${recipe.rating}
                                    </p>

                                    <span
                                        class="recipe-tag"
                                    >
                                        Recipe #${recipe.id}
                                    </span>

                                </div>

                            </div>
                        `;
      })
      .join("");
  } catch (error) {
    promiseResult.innerHTML = `
                <div class="result error-box">
                    Failed to load the recipes.
                </div>
            `;

    console.error(error);
  }
});

/* =====================================================
   EXERCISE 5
   Loading → Success → Error

   This demonstrates the three common UI states.
===================================================== */

const liveBtn = document.getElementById("liveBtn");

const simulateErrorBtn = document.getElementById("simulateErrorBtn");

const statusResult = document.getElementById("statusResult");

/*
    SUCCESS / LIVE REQUEST
*/

async function loadLiveData() {
  /*
        STATE 1
        Loading
    */

  statusResult.className = "status-result";

  statusResult.innerHTML = `
        <strong>Loading...</strong>
        <br>
        Please wait while we contact the API.
    `;

  try {
    /*
            Add a small delay so the
            Loading state is visible.
        */

    await new Promise((resolve) => setTimeout(resolve, 700));

    const response = await fetch("https://dummyjson.com/recipes/1");

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();

    /*
            STATE 2
            Success
        */

    statusResult.className = "status-result success-box";

    statusResult.innerHTML = `
            <strong>✓ Success!</strong>

            <br><br>

            Loaded:

            <strong>
                ${data.name}
            </strong>

            <br>

            Cuisine:
            ${data.cuisine}
        `;
  } catch (error) {
    /*
            STATE 3
            Error
        */

    statusResult.className = "status-result error-box";

    statusResult.innerHTML = `
            <strong>✕ Error</strong>

            <br><br>

            We could not load the data.

            <br><br>

            ${error.message}
        `;
  }
}

/*
    SIMULATE ERROR
*/

async function simulateError() {
  /*
        Loading state
    */

  statusResult.className = "status-result";

  statusResult.innerHTML = `
        <strong>Loading...</strong>

        <br>

        Simulating a network failure...
    `;

  try {
    await new Promise((resolve) => setTimeout(resolve, 700));

    /*
            Deliberately wrong URL.
        */

    const response = await fetch("https://wrong-api-example-12345.com/data");

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();

    console.log(data);
  } catch (error) {
    /*
            Error state
        */

    statusResult.className = "status-result error-box";

    statusResult.innerHTML = `
            <strong>✕ Error State</strong>

            <br><br>

            The request failed.

            <br><br>

            This is where your application
            should show a friendly error message.
        `;

    console.error(error);
  }
}

liveBtn.addEventListener("click", loadLiveData);

simulateErrorBtn.addEventListener("click", simulateError);
