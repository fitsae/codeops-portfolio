const facts = document.querySelector("#facts");

const searchForm = document.querySelector("#searchForm");

const countryInput = document.querySelector("#countryInput");

/* =========================================
   API URL
========================================= */

const API_URL = "https://countries.dev";

/* =========================================
   RENDER A FACT
========================================= */

function renderFact(parent, label, value, icon) {
  const fact = document.createElement("div");

  fact.className = "fact";

  const iconElement = document.createElement("div");

  iconElement.className = "fact-icon";

  iconElement.textContent = icon;

  const info = document.createElement("div");

  info.className = "fact-info";

  const labelElement = document.createElement("span");

  labelElement.textContent = label;

  const valueElement = document.createElement("strong");

  valueElement.textContent = value;

  info.appendChild(labelElement);

  info.appendChild(valueElement);

  fact.appendChild(iconElement);

  fact.appendChild(info);

  parent.appendChild(fact);
}

/* =========================================
   RENDER CURRENCIES
========================================= */

function renderCurrencies(parent, currencies) {
  const fact = document.createElement("div");

  fact.className = "fact";

  const icon = document.createElement("div");

  icon.className = "fact-icon";

  icon.textContent = "💰";

  const info = document.createElement("div");

  info.className = "fact-info";

  const label = document.createElement("span");

  label.textContent = "Currencies";

  const currencyList = document.createElement("div");

  currencyList.className = "currency-list";

  /*
        countries.dev returns currencies
        as an array.

        Example:

        [
            {
                code: "ETB",
                name: "Ethiopian birr",
                symbol: "Br"
            }
        ]
    */

  if (Array.isArray(currencies) && currencies.length > 0) {
    currencies.forEach((currency) => {
      const item = document.createElement("span");

      item.className = "currency";

      item.textContent = `${currency.name} (${currency.code})`;

      currencyList.appendChild(item);
    });
  } else {
    const item = document.createElement("span");

    item.className = "currency";

    item.textContent = "No currency information";

    currencyList.appendChild(item);
  }

  info.appendChild(label);

  info.appendChild(currencyList);

  fact.appendChild(icon);

  fact.appendChild(info);

  parent.appendChild(fact);
}

/* =========================================
   SHOW ERROR
========================================= */

function showError(message) {
  facts.className = "error";

  facts.innerHTML = "";

  const icon = document.createElement("div");

  icon.className = "error-icon";

  icon.textContent = "🌍";

  const title = document.createElement("h2");

  title.textContent = "Country not found";

  const text = document.createElement("p");

  text.textContent = message;

  facts.appendChild(icon);

  facts.appendChild(title);

  facts.appendChild(text);
}

/* =========================================
   FIND COUNTRY CODE
========================================= */

async function findCountryCode(name) {
  /*
        Fetch all countries.

        The API supports:

        GET /countries
    */

  const response = await fetch(`${API_URL}/countries`);

  /*
        Check HTTP response.
    */

  if (!response.ok) {
    throw new Error("Unable to load country list");
  }

  const data = await response.json();

  /*
        The API returns a list of
        country records.

        We search by country name.
    */

  const countries = Array.isArray(data) ? data : data.data || [];

  const searchName = name.trim().toLowerCase();

  const country = countries.find((item) => {
    const countryName = (item.name || "").toLowerCase();

    return countryName === searchName;
  });

  /*
        If exact match wasn't found,
        try a partial match.
    */

  if (!country) {
    const partialCountry = countries.find((item) => {
      const countryName = (item.name || "").toLowerCase();

      return countryName.includes(searchName);
    });

    if (partialCountry) {
      return partialCountry.alpha2Code || partialCountry.code;
    }

    throw new Error("Country not found");
  }

  return country.alpha2Code || country.code;
}

/* =========================================
   SHOW COUNTRY
========================================= */

async function showCountry(name) {
  const countryName = name.trim();

  /*
        Empty input
    */

  if (!countryName) {
    showError("Please enter a country name.");

    return;
  }

  /* =====================================
       STATE 1 — LOADING
    ===================================== */

  facts.className = "loading";

  facts.textContent = "Loading...";

  try {
    /*
            STEP 1

            Find the country's ISO code.
        */

    const countryCode = await findCountryCode(countryName);

    /*
            STEP 2

            Fetch the detailed country record.
        */

    const response = await fetch(`${API_URL}/alpha/${countryCode}`);

    /*
            IMPORTANT:

            fetch() doesn't automatically
            reject on HTTP 404/500.

            Therefore we check response.ok.
        */

    if (!response.ok) {
      throw new Error("Country not found");
    }

    /*
            STEP 3

            Convert response to JSON.
        */

    const country = await response.json();

    /* =================================
           STATE 2 — SUCCESS
        ================================= */

    facts.className = "country-card";

    facts.innerHTML = "";

    /*
            =================================
            COUNTRY HEADER
        =================================
        */

    const countryHeader = document.createElement("div");

    countryHeader.className = "country-header";

    /*
            Flag

            countries.dev provides a
            flag emoji.

            We use the emoji as the flag.
        */

    const flag = document.createElement("div");

    flag.className = "country-flag";

    flag.style.display = "flex";

    flag.style.justifyContent = "center";

    flag.style.alignItems = "center";

    flag.style.fontSize = "100px";

    flag.style.background = "#ffffff";

    flag.textContent = country.flag || "🌍";

    /*
            Country information
        */

    const countryInfo = document.createElement("div");

    const title = document.createElement("h2");

    title.textContent = country.name;

    const officialName = document.createElement("p");

    officialName.className = "official-name";

    officialName.textContent = `ISO Code: ${
      country.alpha2Code || country.code || "N/A"
    }`;

    countryInfo.appendChild(title);

    countryInfo.appendChild(officialName);

    countryHeader.appendChild(flag);

    countryHeader.appendChild(countryInfo);

    facts.appendChild(countryHeader);

    /*
            =================================
            FACTS GRID
        =================================
        */

    const factsGrid = document.createElement("div");

    factsGrid.className = "facts-grid";

    /*
            Capital
        */

    renderFact(factsGrid, "Capital", country.capital || "N/A", "🏛️");

    /*
            Population

            Example:

            132000000

            becomes:

            132,000,000
        */

    const population = Number(country.population);

    const formattedPopulation = Number.isFinite(population)
      ? population.toLocaleString()
      : "N/A";

    renderFact(factsGrid, "Population", formattedPopulation, "👥");

    /*
            Region
        */

    renderFact(factsGrid, "Region", country.region || "N/A", "🌍");

    /*
            Continent
        */

    renderFact(factsGrid, "Continent", country.continent || "N/A", "🗺️");

    /*
            Currency
        */

    renderCurrencies(factsGrid, country.currencies);

    /*
            Append facts
        */

    facts.appendChild(factsGrid);
  } catch (error) {
    /* =================================
           STATE 3 — ERROR
        ================================= */

    console.error("API Error:", error);

    showError(
      error.message === "Country not found"
        ? "We couldn't find that country. Please check the spelling and try again."
        : "Something went wrong while loading the country. Please try again.",
    );
  }
}

/* =========================================
   SEARCH FORM
========================================= */

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const country = countryInput.value;

  showCountry(country);
});

/* =========================================
   DEFAULT COUNTRY
========================================= */

showCountry("Ethiopia");
