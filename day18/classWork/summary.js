import { withVat, format } from "./pricing.js";

const orders = [
  {
    id: 1,
    customer: "Abebe",
    items: [
      { name: "Laptop", price: 1000, qty: 1 },
      { name: "Mouse", price: 200, qty: 2 },
    ],
  },
  {
    id: 2,
    customer: "Sara",
    items: [
      { name: "Phone", price: 500, qty: 1 },
      { name: "Headphones", price: 100, qty: 1 },
    ],
  },
  {
    id: 3,
    customer: "John",
    items: [{ name: "Keyboard", price: 300, qty: 2 }],
  },
];

// 1. map through orders
// 2. reduce each order's items
// 3. destructure { price, qty }
// 4. use spread to create a new order with total

const ordersWithTotal = orders.map((order) => {
  const subtotal = order.items.reduce(
    (total, { price, qty }) => total + price * qty,
    0,
  );

  const total = withVat(subtotal);

  return {
    ...order,
    total,
  };
});

// Orders over 500 ETB
const expensiveOrders = ordersWithTotal.filter((order) => order.total > 500);

// Grand total using reduce
const grandTotal = ordersWithTotal.reduce(
  (total, order) => total + order.total,
  0,
);

// Print summary
console.log("ORDER SUMMARY");
console.log("-------------------------");

ordersWithTotal.forEach((order) => {
  console.log(`Order ${order.id} - ${order.customer}: ${format(order.total)}`);
});

console.log("-------------------------");
console.log(`Grand Total: ${format(grandTotal)}`);

console.log("\nOrders over 500 ETB:");
expensiveOrders.forEach((order) => {
  console.log(`Order ${order.id} - ${order.customer}: ${format(order.total)}`);
});
