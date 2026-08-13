// ==========================================
// Cache DOM elements
// ==========================================

const form = document.querySelector("#add-form");
const nameInput = document.querySelector("#name");
const priceInput = document.querySelector("#price");
const list = document.querySelector("#list");
const totalEl = document.querySelector("#total");

// ==========================================
// Add a new row
// ==========================================

function addRow(itemName, itemPrice) {
  // Create the list item
  const li = document.createElement("li");

  // Create item information container
  const itemInfo = document.createElement("div");
  itemInfo.classList.add("item-info");

  // Create item name
  const nameEl = document.createElement("span");
  nameEl.classList.add("item-name");
  nameEl.textContent = itemName;

  // Create item price
  const priceEl = document.createElement("span");
  priceEl.classList.add("item-price");
  priceEl.textContent = `${itemPrice.toFixed(2)} ETB`;

  // Create delete button
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("del");
  deleteButton.textContent = "Delete";
  deleteButton.type = "button";

  // Store the price on the row
  li.dataset.price = itemPrice;

  // Build the row
  itemInfo.append(nameEl);
  itemInfo.append(priceEl);

  li.append(itemInfo);
  li.append(deleteButton);

  // Add row to the list
  list.append(li);
}

// ==========================================
// Update running total
// ==========================================

function updateTotal() {
  let total = 0;

  const rows = list.querySelectorAll("li");

  rows.forEach(function (row) {
    total += Number(row.dataset.price);
  });

  totalEl.textContent = total.toFixed(2);
}

// ==========================================
// Form submission
// ==========================================

form.addEventListener("submit", function (e) {
  // Prevent page reload
  e.preventDefault();

  // Get form values
  const itemName = nameInput.value.trim();
  const itemPrice = Number(priceInput.value);

  // Validate both fields
  if (!itemName || !itemPrice || itemPrice <= 0) {
    alert("Please enter an item name and a valid price.");
    return;
  }

  // Add item
  addRow(itemName, itemPrice);

  // Clear the form
  form.reset();

  // Update total
  updateTotal();
});

// ==========================================
// Event delegation
// One listener handles the entire list
// ==========================================

list.addEventListener("click", function (e) {
  // Delete an item
  if (e.target.matches(".del")) {
    const row = e.target.closest("li");

    row.remove();

    updateTotal();

    return;
  }

  // Toggle bought state
  if (e.target.closest("li")) {
    const row = e.target.closest("li");

    row.classList.toggle("bought");
  }
});
