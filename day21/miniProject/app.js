// ========================================
// Ethiopian phone number regex
// ========================================

const PHONE = /^(?:\+251|0)9\d{8}$/;

// ========================================
// localStorage key
// ========================================

const STORAGE_KEY = "signupEntries";

// ========================================
// Get HTML elements
// ========================================

const form = document.getElementById("signupForm");

const nameInput = document.getElementById("name");

const phoneInput = document.getElementById("phone");

const errorArea = document.getElementById("error");

const successArea = document.getElementById("success");

const signupCount = document.getElementById("signupCount");

// ========================================
// Save helper
// Converts array to JSON and saves it
// ========================================

function save(entries) {
  try {
    const jsonData = JSON.stringify(entries);

    localStorage.setItem(STORAGE_KEY, jsonData);
  } catch (error) {
    console.error("Could not save data:", error);
  }
}

// ========================================
// Load helper
// Gets JSON from localStorage and parses it
// ========================================

function load() {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);

    // No saved data
    if (storedData === null) {
      return [];
    }

    const entries = JSON.parse(storedData);

    // Make sure the data is an array
    if (!Array.isArray(entries)) {
      return [];
    }

    return entries;
  } catch (error) {
    // Handles corrupt JSON
    console.error("Could not load data:", error);

    return [];
  }
}

// ========================================
// Validate function
// ========================================

function validate(name, phone) {
  if (name.trim().length < 2) {
    return "Enter your full name.";
  }

  if (!PHONE.test(phone)) {
    return "Enter a valid Ethiopian phone number.";
  }

  return "";
}

// ========================================
// Load existing entries when page starts
// ========================================

let entries = load();

// ========================================
// Update signup count
// ========================================

function updateSignupCount() {
  const numberOfPeople = entries.length;

  if (numberOfPeople === 1) {
    signupCount.textContent = "1 person has signed up.";
  } else {
    signupCount.textContent = `${numberOfPeople} people have signed up.`;
  }
}

// Show saved number immediately
updateSignupCount();

// ========================================
// Form submit
// ========================================

form.addEventListener("submit", function (event) {
  // Prevent the browser from refreshing the page
  event.preventDefault();

  // Clear previous messages
  errorArea.textContent = "";

  successArea.textContent = "";

  // ========================================
  // Read and trim input values
  // ========================================

  const name = nameInput.value.trim();

  const phone = phoneInput.value.trim();

  // ========================================
  // Validate
  // ========================================

  const errorMessage = validate(name, phone);

  // ========================================
  // If there is an error
  // ========================================

  if (errorMessage !== "") {
    errorArea.textContent = errorMessage;

    return;
  }

  // ========================================
  // Create a new signup entry
  // ========================================

  const newEntry = {
    name: name,
    phone: phone,
  };

  // ========================================
  // Add entry to array
  // ========================================

  entries.push(newEntry);

  // ========================================
  // Save array as JSON
  // ========================================

  save(entries);

  // ========================================
  // Clear the form
  // ========================================

  form.reset();

  // ========================================
  // Update number of people
  // ========================================

  updateSignupCount();

  // ========================================
  // Show success message
  // ========================================

  successArea.textContent = "Signup successful!";
});
