// ================================
// 1. localStorage keys
// ================================

const PEOPLE_KEY = "signupPeople";
const LANGUAGE_KEY = "signupLanguage";

// ================================
// 2. save() and load() helpers
// ================================

function save(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Could not save data:", error);
  }
}

function load(key, defaultValue = null) {
  try {
    const data = localStorage.getItem(key);

    if (data === null) {
      return defaultValue;
    }

    return JSON.parse(data);
  } catch (error) {
    console.error("Could not load data:", error);
    return defaultValue;
  }
}

// ================================
// 3. Get elements
// ================================

const form = document.getElementById("signupForm");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const errorArea = document.getElementById("error");
const successArea = document.getElementById("success");
const countArea = document.getElementById("count");

const title = document.getElementById("title");
const nameLabel = document.getElementById("nameLabel");
const phoneLabel = document.getElementById("phoneLabel");
const submitButton = document.getElementById("submitButton");
const languageToggle = document.getElementById("languageToggle");

// ================================
// 4. Restore signup data
// ================================

let people = load(PEOPLE_KEY, []);

if (!Array.isArray(people)) {
  people = [];
}

// ================================
// 5. Update signup counter
// ================================

function updateCount() {
  if (currentLanguage === "am") {
    countArea.textContent = `${people.length} ሰዎች ተመዝግበዋል።`;
  } else {
    const word = people.length === 1 ? "person" : "people";
    countArea.textContent = `${people.length} ${word} have signed up.`;
  }
}

// ================================
// 6. Language / theme toggle
// ================================

let currentLanguage = load(LANGUAGE_KEY, "en");

function updateLanguage() {
  if (currentLanguage === "am") {
    title.textContent = "የምዝገባ ቅጽ";
    nameLabel.textContent = "ስም";
    phoneLabel.textContent = "ስልክ";
    nameInput.placeholder = "ስምዎን ያስገቡ";
    phoneInput.placeholder = "09XXXXXXXX ወይም +2519XXXXXXXX";
    submitButton.textContent = "ይመዝገቡ";
    languageToggle.textContent = "English";
  } else {
    title.textContent = "Signup Form";
    nameLabel.textContent = "Name";
    phoneLabel.textContent = "Phone";
    nameInput.placeholder = "Enter your name";
    phoneInput.placeholder = "09XXXXXXXX or +2519XXXXXXXX";
    submitButton.textContent = "Sign Up";
    languageToggle.textContent = "አማርኛ";
  }

  updateCount();
}

languageToggle.addEventListener("click", function () {
  currentLanguage = currentLanguage === "en" ? "am" : "en";

  // Save language choice
  save(LANGUAGE_KEY, currentLanguage);

  updateLanguage();
});

// ================================
// 7. Ethiopian phone validation
// ================================

// Accepts:
// 0912345678
// 0712345678
// +251912345678
// +251712345678
const ethiopianPhoneRegex = /^(?:0[79]\d{8}|\+251[79]\d{8})$/;

// ================================
// 8. Form submission and validation
// ================================

form.addEventListener("submit", function (event) {
  // Prevent page reload
  event.preventDefault();

  // Clear previous messages
  errorArea.textContent = "";
  successArea.textContent = "";

  // Read trimmed values
  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();

  // First problem: name
  if (name.length < 2) {
    if (currentLanguage === "am") {
      errorArea.textContent = "እባክዎ ቢያንስ 2 ፊደል ያለው ስም ያስገቡ።";
    } else {
      errorArea.textContent = "Please enter a name with at least 2 characters.";
    }

    nameInput.focus();
    return;
  }

  // Second problem: phone
  if (!ethiopianPhoneRegex.test(phone)) {
    if (currentLanguage === "am") {
      errorArea.textContent = "እባክዎ ትክክለኛ የኢትዮጵያ ስልክ ቁጥር ያስገቡ።";
    } else {
      errorArea.textContent = "Please enter a valid Ethiopian phone number.";
    }

    phoneInput.focus();
    return;
  }

  // ================================
  // 9. Successful signup
  // ================================

  const person = {
    name: name,
    phone: phone,
  };

  people.push(person);

  // Save the updated array as JSON
  save(PEOPLE_KEY, people);

  // Clear the form
  form.reset();

  // Update the number of people
  updateCount();

  // Show success message
  if (currentLanguage === "am") {
    successArea.textContent = "ምዝገባዎ ተሳክቷል!";
  } else {
    successArea.textContent = "Signup successful!";
  }
});

// ================================
// 10. Restore language and count
// on page load
// ================================

updateLanguage();
