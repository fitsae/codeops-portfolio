/* =========================================================
   BIRR BUDGET
   Personal Finance Tracker
   Main Application JavaScript
========================================================= */

"use strict";

/* =========================================================
   1. CONSTANTS
========================================================= */

const DATA_URL = "data/transactions.json";
const STORAGE_KEY = "birrBudgetTransactions";
const THEME_KEY = "birrBudgetTheme";

/* =========================================================
   2. APPLICATION STATE
========================================================= */

const state = {
  transactions: [],
  filteredTransactions: [],

  isLoading: false,
  error: null,

  editingId: null,

  filters: {
    search: "",
    type: "all",
    category: "all",
    sort: "newest",
  },

  theme: "light",
};

/* =========================================================
   3. DOM ELEMENT REFERENCES
========================================================= */

const elements = {
  /* -------------------------------------------------------
     Dashboard
  ------------------------------------------------------- */

  totalBalance: document.querySelector("#totalBalance"),

  totalIncome: document.querySelector("#totalIncome"),

  totalExpenses: document.querySelector("#totalExpenses"),

  transactionCount: document.querySelector("#transactionCount"),

  /* -------------------------------------------------------
     Search / Filters
  ------------------------------------------------------- */

  searchInput: document.querySelector("#searchInput"),

  typeFilter: document.querySelector("#typeFilter"),

  categoryFilter: document.querySelector("#categoryFilter"),

  sortFilter: document.querySelector("#sortFilter"),

  /* -------------------------------------------------------
     Application states
  ------------------------------------------------------- */

  loadingState: document.querySelector("#loadingState"),

  errorState: document.querySelector("#errorState"),

  emptyState: document.querySelector("#emptyState"),

  /* -------------------------------------------------------
     Transaction list
  ------------------------------------------------------- */

  transactionList: document.querySelector("#transactionList"),

  /* -------------------------------------------------------
     Retry
  ------------------------------------------------------- */

  retryButton: document.querySelector("#retryButton"),

  /* -------------------------------------------------------
     Theme
  ------------------------------------------------------- */

  themeToggle: document.querySelector("#themeToggle"),

  /* -------------------------------------------------------
     Modal
  ------------------------------------------------------- */

  transactionModal: document.querySelector("#transactionModal"),

  openTransactionModal: document.querySelector("#openTransactionModal"),

  closeTransactionModal: document.querySelector("#closeTransactionModal"),

  cancelTransaction: document.querySelector("#cancelTransaction"),

  /* -------------------------------------------------------
     Modal title
  ------------------------------------------------------- */

  modalTitle: document.querySelector("#modalTitle"),

  /* -------------------------------------------------------
     Form
  ------------------------------------------------------- */

  transactionForm: document.querySelector("#transactionForm"),

  transactionTitle: document.querySelector("#transactionTitle"),

  transactionAmount: document.querySelector("#transactionAmount"),

  transactionType: document.querySelector("#transactionType"),

  transactionCategory: document.querySelector("#transactionCategory"),

  transactionDate: document.querySelector("#transactionDate"),

  transactionDescription: document.querySelector("#transactionDescription"),

  /* -------------------------------------------------------
     Form errors
  ------------------------------------------------------- */

  titleError: document.querySelector("#titleError"),

  amountError: document.querySelector("#amountError"),

  typeError: document.querySelector("#typeError"),

  categoryError: document.querySelector("#categoryError"),

  dateError: document.querySelector("#dateError"),
};

/* =========================================================
   4. INITIALIZE APPLICATION
========================================================= */

async function initializeApp() {
  console.log("Birr Budget starting...");

  loadTheme();

  bindEvents();

  showLoading();

  try {
    await fetchTransactions();

    populateCategoryFilter();

    applyFilters();

    updateDashboard();

    renderTransactions();

    console.log("Birr Budget initialized successfully.");
  } catch (error) {
    console.error("Application initialization failed:", error);

    showError("Unable to load your transactions. Please try again.");
  }
}

/* =========================================================
   5. EVENT LISTENERS
========================================================= */

function bindEvents() {
  /* Search */

  elements.searchInput?.addEventListener("input", handleSearch);

  /* Type filter */

  elements.typeFilter?.addEventListener("change", handleFilterChange);

  /* Category filter */

  elements.categoryFilter?.addEventListener("change", handleFilterChange);

  /* Sort */

  elements.sortFilter?.addEventListener("change", handleFilterChange);

  /* Add transaction */

  elements.openTransactionModal?.addEventListener("click", openAddModal);

  /* Close modal */

  elements.closeTransactionModal?.addEventListener(
    "click",
    closeTransactionModal,
  );

  /* Cancel */

  elements.cancelTransaction?.addEventListener("click", closeTransactionModal);

  /* Form */

  elements.transactionForm?.addEventListener("submit", handleFormSubmit);

  /* Retry */

  elements.retryButton?.addEventListener("click", retryLoading);

  /* Dark mode */

  elements.themeToggle?.addEventListener("click", toggleTheme);

  /* Transaction actions */

  elements.transactionList?.addEventListener("click", handleTransactionAction);

  /* Dialog backdrop */

  elements.transactionModal?.addEventListener("click", handleModalClick);

  /* Escape */

  document.addEventListener("keydown", handleKeyboard);
}

/* =========================================================
   6. FETCH TRANSACTION DATA
========================================================= */

async function fetchTransactions() {
  state.isLoading = true;
  state.error = null;

  try {
    /*
      First check localStorage.

      This allows user-created transactions
      to survive page refreshes.
    */

    const savedData = localStorage.getItem(STORAGE_KEY);

    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);

        if (Array.isArray(parsedData)) {
          state.transactions = parsedData;

          console.log(
            "Transactions loaded from localStorage:",
            state.transactions.length,
          );

          return;
        }
      } catch (storageError) {
        console.warn(
          "Invalid localStorage data. Loading JSON instead.",
          storageError,
        );
      }
    }

    /*
      If no localStorage data exists,
      load the JSON file.
    */

    const response = await fetch(DATA_URL);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();

    if (!data || !Array.isArray(data.transactions)) {
      throw new Error("Invalid transaction data format.");
    }

    state.transactions = data.transactions;

    saveTransactions();

    console.log("Transactions loaded from JSON:", state.transactions.length);
  } catch (error) {
    state.error = error;

    throw error;
  } finally {
    state.isLoading = false;
  }
}

/* =========================================================
   7. SAVE TO LOCAL STORAGE
========================================================= */

function saveTransactions() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.transactions));
}

/* =========================================================
   8. SEARCH
========================================================= */

function handleSearch(event) {
  state.filters.search = event.target.value;

  applyFilters();

  renderTransactions();
}

/* =========================================================
   9. FILTER / SORT
========================================================= */

function handleFilterChange() {
  state.filters.type = elements.typeFilter?.value || "all";

  state.filters.category = elements.categoryFilter?.value || "all";

  state.filters.sort = elements.sortFilter?.value || "newest";

  applyFilters();

  renderTransactions();
}

/* =========================================================
   10. APPLY SEARCH + FILTERS + SORT
========================================================= */

function applyFilters() {
  let results = [...state.transactions];

  /* -------------------------------------------------------
     Search
  ------------------------------------------------------- */

  const searchTerm = state.filters.search.trim().toLowerCase();

  if (searchTerm) {
    results = results.filter((transaction) => {
      const searchableText = [
        transaction.title,

        transaction.description,

        transaction.category,

        transaction.type,

        transaction.paymentMethod,

        transaction.amount,

        transaction.date,
      ]
        .filter((value) => value !== undefined)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(searchTerm);
    });
  }

  /* -------------------------------------------------------
     Type
  ------------------------------------------------------- */

  if (state.filters.type !== "all") {
    results = results.filter(
      (transaction) => transaction.type === state.filters.type,
    );
  }

  /* -------------------------------------------------------
     Category
  ------------------------------------------------------- */

  if (state.filters.category !== "all") {
    results = results.filter(
      (transaction) => transaction.category === state.filters.category,
    );
  }

  /* -------------------------------------------------------
     Sorting
  ------------------------------------------------------- */

  results.sort((a, b) => {
    switch (state.filters.sort) {
      case "oldest":
        return new Date(a.date) - new Date(b.date);

      case "highest":
        return Number(b.amount) - Number(a.amount);

      case "lowest":
        return Number(a.amount) - Number(b.amount);

      case "newest":

      default:
        return new Date(b.date) - new Date(a.date);
    }
  });

  state.filteredTransactions = results;
}

/* =========================================================
   11. UPDATE DASHBOARD
========================================================= */

function updateDashboard() {
  let totalIncome = 0;

  let totalExpenses = 0;

  state.transactions.forEach((transaction) => {
    const amount = Number(transaction.amount);

    if (transaction.type === "income") {
      totalIncome += amount;
    } else if (transaction.type === "expense") {
      totalExpenses += amount;
    }
  });

  const totalBalance = totalIncome - totalExpenses;

  /* Income */

  if (elements.totalIncome) {
    elements.totalIncome.textContent = formatCurrency(totalIncome);
  }

  /* Expenses */

  if (elements.totalExpenses) {
    elements.totalExpenses.textContent = formatCurrency(totalExpenses);
  }

  /* Balance */

  if (elements.totalBalance) {
    elements.totalBalance.textContent = formatCurrency(totalBalance);
  }

  /* Transaction count */

  if (elements.transactionCount) {
    elements.transactionCount.textContent = state.transactions.length;
  }
}

/* =========================================================
   12. FORMAT CURRENCY
========================================================= */

function formatCurrency(amount) {
  return `${Number(amount).toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })} ETB`;
}

/* =========================================================
   13. RENDER TRANSACTIONS
========================================================= */

function renderTransactions() {
  hideLoading();

  hideError();

  if (state.filteredTransactions.length === 0) {
    clearTransactionList();

    showEmpty();

    return;
  }

  hideEmpty();

  elements.transactionList.innerHTML = state.filteredTransactions
    .map((transaction) => createTransactionHTML(transaction))
    .join("");
}

/* =========================================================
   14. CREATE TRANSACTION HTML
========================================================= */

function createTransactionHTML(transaction) {
  const isIncome = transaction.type === "income";

  const title =
    transaction.title || transaction.description || "Untitled Transaction";

  const description =
    transaction.title &&
    transaction.description &&
    transaction.title !== transaction.description
      ? transaction.description
      : "";

  const icon = isIncome ? "↗" : "↘";

  const amountPrefix = isIncome ? "+" : "-";

  const amountClass = isIncome ? "transaction-income" : "transaction-expense";

  return `
    <article
      class="transaction-item"
      data-id="${transaction.id}"
    >

      <div
        class="transaction-icon ${amountClass}"
        aria-hidden="true"
      >
        ${icon}
      </div>


      <div class="transaction-details">

        <h3 class="transaction-title">
          ${escapeHTML(title)}
        </h3>

        ${
          description
            ? `
              <p class="transaction-description">
                ${escapeHTML(description)}
              </p>
            `
            : ""
        }

        <div class="transaction-meta">

          <span class="transaction-category">
            ${escapeHTML(transaction.category || "Other")}
          </span>

          <span aria-hidden="true">
            •
          </span>

          <time
            datetime="${escapeHTML(transaction.date || "")}"
          >
            ${formatDate(transaction.date)}
          </time>

          ${
            transaction.paymentMethod
              ? `
                <span aria-hidden="true">
                  •
                </span>

                <span>
                  ${escapeHTML(transaction.paymentMethod)}
                </span>
              `
              : ""
          }

        </div>

      </div>


      <div class="transaction-right">

        <strong
          class="transaction-amount ${amountClass}"
        >
          ${amountPrefix}${formatCurrency(transaction.amount)}
        </strong>


        <div class="transaction-actions">

          <button
            type="button"
            class="transaction-action edit-action"
            data-action="edit"
            data-id="${transaction.id}"
          >
            Edit
          </button>


          <button
            type="button"
            class="transaction-action delete-action"
            data-action="delete"
            data-id="${transaction.id}"
          >
            Delete
          </button>

        </div>

      </div>

    </article>
  `;
}

/* =========================================================
   15. TRANSACTION ACTIONS
========================================================= */

function handleTransactionAction(event) {
  const button = event.target.closest("[data-action]");

  if (!button) {
    return;
  }

  const id = Number(button.dataset.id);

  const action = button.dataset.action;

  if (action === "edit") {
    openEditModal(id);
  }

  if (action === "delete") {
    deleteTransaction(id);
  }
}

/* =========================================================
   16. FORMAT DATE
========================================================= */

function formatDate(dateString) {
  if (!dateString) {
    return "No date";
  }

  const date = new Date(`${dateString}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/* =========================================================
   17. OPEN ADD TRANSACTION MODAL
========================================================= */

function openAddModal() {
  state.editingId = null;

  elements.modalTitle.textContent = "Add Transaction";

  elements.transactionForm.reset();

  clearFormErrors();

  elements.transactionDate.value = getTodayDate();

  elements.transactionModal.showModal();
}

/* =========================================================
   18. OPEN EDIT TRANSACTION MODAL
========================================================= */

function openEditModal(id) {
  const transaction = state.transactions.find(
    (item) => Number(item.id) === Number(id),
  );

  if (!transaction) {
    console.error("Transaction not found:", id);

    return;
  }

  state.editingId = Number(id);

  elements.modalTitle.textContent = "Edit Transaction";

  clearFormErrors();

  elements.transactionTitle.value =
    transaction.title || transaction.description || "";

  elements.transactionAmount.value = transaction.amount;

  elements.transactionType.value = transaction.type;

  ensureFormCategory(transaction.category);

  elements.transactionCategory.value = transaction.category;

  elements.transactionDate.value = transaction.date;

  elements.transactionDescription.value = transaction.description || "";

  elements.transactionModal.showModal();
}

/* =========================================================
   19. CLOSE MODAL
========================================================= */

function closeTransactionModal() {
  if (elements.transactionModal?.open) {
    elements.transactionModal.close();
  }

  state.editingId = null;

  clearFormErrors();
}

/* =========================================================
   20. MODAL BACKDROP CLICK
========================================================= */

function handleModalClick(event) {
  if (event.target === elements.transactionModal) {
    closeTransactionModal();
  }
}

/* =========================================================
   21. KEYBOARD
========================================================= */

function handleKeyboard(event) {
  if (event.key === "Escape" && elements.transactionModal?.open) {
    closeTransactionModal();
  }
}

/* =========================================================
   22. HANDLE FORM SUBMIT
========================================================= */

function handleFormSubmit(event) {
  event.preventDefault();

  clearFormErrors();

  const formData = new FormData(elements.transactionForm);

  const transaction = {
    title: String(formData.get("title") || "").trim(),

    amount: Number(formData.get("amount")),

    type: String(formData.get("type") || ""),

    category: String(formData.get("category") || ""),

    date: String(formData.get("date") || ""),

    description: String(formData.get("description") || "").trim(),
  };

  if (!validateTransaction(transaction)) {
    return;
  }

  if (state.editingId !== null) {
    updateTransaction(state.editingId, transaction);
  } else {
    addTransaction(transaction);
  }

  saveTransactions();

  populateCategoryFilter();

  applyFilters();

  updateDashboard();

  renderTransactions();

  closeTransactionModal();
}

/* =========================================================
   23. VALIDATE FORM
========================================================= */

function validateTransaction(transaction) {
  let valid = true;

  /* -------------------------------------------------------
     Title
  ------------------------------------------------------- */

  if (!transaction.title || transaction.title.length < 2) {
    setFormError(elements.titleError, "Please enter a valid title.");

    valid = false;
  }

  /* -------------------------------------------------------
     Amount
  ------------------------------------------------------- */

  if (!Number.isFinite(transaction.amount) || transaction.amount <= 0) {
    setFormError(elements.amountError, "Amount must be greater than 0.");

    valid = false;
  }

  /* -------------------------------------------------------
     Type
  ------------------------------------------------------- */

  if (!["income", "expense"].includes(transaction.type)) {
    setFormError(elements.typeError, "Please select income or expense.");

    valid = false;
  }

  /* -------------------------------------------------------
     Category
  ------------------------------------------------------- */

  if (!transaction.category) {
    setFormError(elements.categoryError, "Please select a category.");

    valid = false;
  }

  /* -------------------------------------------------------
     Date
  ------------------------------------------------------- */

  if (!transaction.date) {
    setFormError(elements.dateError, "Please select a date.");

    valid = false;
  }

  return valid;
}

/* =========================================================
   24. ADD TRANSACTION
========================================================= */

function addTransaction(data) {
  const newTransaction = {
    id: generateId(),

    type: data.type,

    category: data.category,

    title: data.title,

    description: data.description || data.title,

    amount: data.amount,

    date: data.date,

    paymentMethod: "Cash",
  };

  state.transactions.unshift(newTransaction);

  console.log("Transaction added:", newTransaction);
}

/* =========================================================
   25. UPDATE TRANSACTION
========================================================= */

function updateTransaction(id, data) {
  const index = state.transactions.findIndex(
    (transaction) => Number(transaction.id) === Number(id),
  );

  if (index === -1) {
    return;
  }

  const oldTransaction = state.transactions[index];

  state.transactions[index] = {
    ...oldTransaction,

    title: data.title,

    type: data.type,

    category: data.category,

    description: data.description || data.title,

    amount: data.amount,

    date: data.date,
  };

  console.log("Transaction updated:", state.transactions[index]);
}

/* =========================================================
   26. DELETE TRANSACTION
========================================================= */

function deleteTransaction(id) {
  const transaction = state.transactions.find(
    (item) => Number(item.id) === Number(id),
  );

  if (!transaction) {
    return;
  }

  const title =
    transaction.title || transaction.description || "this transaction";

  const confirmed = window.confirm(
    `Are you sure you want to delete "${title}"?`,
  );

  if (!confirmed) {
    return;
  }

  state.transactions = state.transactions.filter(
    (item) => Number(item.id) !== Number(id),
  );

  saveTransactions();

  populateCategoryFilter();

  applyFilters();

  updateDashboard();

  renderTransactions();

  console.log("Transaction deleted:", id);
}

/* =========================================================
   27. GENERATE UNIQUE ID
========================================================= */

function generateId() {
  if (state.transactions.length === 0) {
    return 1;
  }

  const ids = state.transactions.map(
    (transaction) => Number(transaction.id) || 0,
  );

  return Math.max(...ids) + 1;
}

/* =========================================================
   28. CATEGORY FILTER
========================================================= */

function populateCategoryFilter() {
  if (!elements.categoryFilter) {
    return;
  }

  const currentCategory = state.filters.category;

  const categories = [
    ...new Set(
      state.transactions
        .map((transaction) => transaction.category)
        .filter(Boolean),
    ),
  ].sort((a, b) => a.localeCompare(b));

  elements.categoryFilter.innerHTML = `

    <option value="all">
      All Categories
    </option>

    ${categories
      .map(
        (category) => `
          <option value="${escapeHTML(category)}">
            ${escapeHTML(category)}
          </option>
        `,
      )
      .join("")}

  `;

  if (categories.includes(currentCategory)) {
    elements.categoryFilter.value = currentCategory;
  } else {
    elements.categoryFilter.value = "all";

    state.filters.category = "all";
  }
}

/* =========================================================
   29. ENSURE FORM CATEGORY EXISTS
========================================================= */

function ensureFormCategory(category) {
  if (!category) {
    return;
  }

  const exists = Array.from(elements.transactionCategory.options).some(
    (option) => option.value === category,
  );

  if (!exists) {
    const option = document.createElement("option");

    option.value = category;

    option.textContent = category;

    elements.transactionCategory.appendChild(option);
  }
}

/* =========================================================
   30. LOADING STATE
========================================================= */

function showLoading() {
  elements.loadingState?.classList.remove("hidden");

  elements.errorState?.classList.add("hidden");

  elements.emptyState?.classList.add("hidden");

  if (elements.transactionList) {
    elements.transactionList.innerHTML = "";
  }
}

function hideLoading() {
  elements.loadingState?.classList.add("hidden");
}

/* =========================================================
   31. ERROR STATE
========================================================= */

function showError(message) {
  hideLoading();

  elements.errorState?.classList.remove("hidden");

  elements.emptyState?.classList.add("hidden");

  const paragraph = elements.errorState?.querySelector("p");

  if (paragraph) {
    paragraph.textContent = message;
  }

  if (elements.transactionList) {
    elements.transactionList.innerHTML = "";
  }
}

function hideError() {
  elements.errorState?.classList.add("hidden");
}

/* =========================================================
   32. EMPTY STATE
========================================================= */

function showEmpty() {
  hideLoading();

  hideError();

  elements.emptyState?.classList.remove("hidden");
}

function hideEmpty() {
  elements.emptyState?.classList.add("hidden");
}

/* =========================================================
   33. CLEAR TRANSACTION LIST
========================================================= */

function clearTransactionList() {
  if (elements.transactionList) {
    elements.transactionList.innerHTML = "";
  }
}

/* =========================================================
   34. RETRY
========================================================= */

async function retryLoading() {
  showLoading();

  try {
    await fetchTransactions();

    populateCategoryFilter();

    applyFilters();

    updateDashboard();

    renderTransactions();
  } catch (error) {
    console.error("Retry failed:", error);

    showError(
      "Unable to load transactions. Please check your data file and try again.",
    );
  }
}

/* =========================================================
   35. FORM ERRORS
========================================================= */

function setFormError(element, message) {
  if (element) {
    element.textContent = message;
  }
}

function clearFormErrors() {
  const errors = [
    elements.titleError,

    elements.amountError,

    elements.typeError,

    elements.categoryError,

    elements.dateError,
  ];

  errors.forEach((element) => {
    if (element) {
      element.textContent = "";
    }
  });
}

/* =========================================================
   36. TODAY'S DATE
========================================================= */

function getTodayDate() {
  const today = new Date();

  const year = today.getFullYear();

  const month = String(today.getMonth() + 1).padStart(2, "0");

  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

/* =========================================================
   37. DARK MODE
========================================================= */

function loadTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);

  if (savedTheme === "dark" || savedTheme === "light") {
    state.theme = savedTheme;
  } else {
    state.theme = "light";
  }

  applyTheme();
}

/* =========================================================
   38. TOGGLE DARK MODE
========================================================= */

function toggleTheme() {
  state.theme = state.theme === "light" ? "dark" : "light";

  applyTheme();

  localStorage.setItem(THEME_KEY, state.theme);
}

/* =========================================================
   39. APPLY THEME
========================================================= */

function applyTheme() {
  document.documentElement.dataset.theme = state.theme;

  if (elements.themeToggle) {
    elements.themeToggle.textContent = state.theme === "dark" ? "☀️" : "🌙";

    elements.themeToggle.setAttribute(
      "aria-label",
      state.theme === "dark" ? "Switch to light mode" : "Toggle dark mode",
    );
  }
}

/* =========================================================
   40. ESCAPE HTML
   Protect user-generated content
========================================================= */

function escapeHTML(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/* =========================================================
   41. START APPLICATION
========================================================= */

document.addEventListener("DOMContentLoaded", initializeApp);
