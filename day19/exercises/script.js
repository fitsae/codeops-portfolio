// ==========================================
// Exercise 1
// textContent + classList.toggle()
// ==========================================

const title = document.querySelector("#title");
const changeTitleButton = document.querySelector("#changeTitle");

changeTitleButton.addEventListener("click", function () {
  title.textContent = "JavaScript Changed My Heading!";

  title.classList.toggle("highlight");
});

// ==========================================
// Exercise 2
// createElement() + append()
// ==========================================

const cities = ["Addis Ababa", "Gondar", "Hawassa"];

const cityList = document.querySelector("#cityList");

cities.forEach(function (city) {
  const listItem = document.createElement("li");

  listItem.textContent = city;

  cityList.append(listItem);
});

// ==========================================
// Exercise 3
// event.target + event bubbling
// ==========================================

const clickButton = document.querySelector("#clickButton");
const bubbleBox = document.querySelector("#bubbleBox");

clickButton.addEventListener("click", function (event) {
  console.log("Button listener:");
  console.log(event.target);
});

bubbleBox.addEventListener("click", function (event) {
  console.log("Div listener - event bubbled up!");

  console.log(event.target);
});

// ==========================================
// Exercise 4
// Event delegation
// ==========================================

const itemList = document.querySelector("#itemList");

itemList.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete")) {
    event.target.parentElement.remove();
  }
});

// ==========================================
// Exercise 5
// Form + preventDefault() + input.value
// ==========================================

const itemForm = document.querySelector("#itemForm");
const itemInput = document.querySelector("#itemInput");
const formList = document.querySelector("#formList");

itemForm.addEventListener("submit", function (event) {
  // Stop the page from refreshing
  event.preventDefault();

  // Get the user's input
  const itemText = itemInput.value;

  // Create a new list item
  const newItem = document.createElement("li");

  // Put the input text inside the list item
  newItem.textContent = itemText;

  // Add the item to the list
  formList.append(newItem);

  // Clear the input
  itemInput.value = "";
});
