const partySize = Number(prompt("insert party size"));
const bill = Number(prompt("insert bill"));
const total = (bill) =>
  bill > 300 ? (bill += bill * 0.01) : (bill += bill * 0.01);
const perP = (total, partySize) => total / partySize;
console.log(`total = ${total} per person = ${perP}`);
