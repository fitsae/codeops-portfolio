const prices = [500, 800, 1200, 300, 1500];

const total = prices
  .map((price) => price * 1.15) // Add 15% VAT
  .filter((price) => price < 1000) // Keep prices under 1000
  .reduce((sum, price) => sum + price, 0); // Grand total

console.log(total);

const customer = {
  name: "Mikiyas",
  city: "Addis Ababa",
  balance: 2500,
};

for (const [key, value] of Object.entries(customer)) {
  console.log(key, value);
}

const customer = {
  name: "Mikiyas",
  city: "Addis Ababa",
  balance: 2500,
};

const { name, city } = customer;

function greet({ name }) {
  console.log(`Hello, ${name}!`);
}

greet(customer);

const customer = {
  name: "Mikiyas",
  city: "Addis Ababa",
  balance: 2500,
};

const updatedCustomer = {
  ...customer,
  city: "Bahir Dar",
  phone: "0912345678",
};

console.log(updatedCustomer);
console.log(customer); // Original is unchanged
