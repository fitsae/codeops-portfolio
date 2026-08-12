import { transactions } from "./transactions.js";
import { totalByType, formatReceipts } from "./report.js";

// Calculate totals
const totalCredits = totalByType(transactions, "credit");
const totalDebits = totalByType(transactions, "debit");

// Create receipt list
const receipts = formatReceipts(transactions);

// Use spread to create an updated copy
const originalTransaction = transactions[0];

const correctedTransaction = {
  ...originalTransaction,
  amount: 300,
};

console.log("=== TeleBirr Transaction Report ===");
console.log(`Total Credits: ${totalCredits} ETB`);
console.log(`Total Debits: ${totalDebits} ETB`);

console.log("\nReceipts:");
receipts.forEach((receipt) => console.log(receipt));

console.log("\nOriginal Transaction:");
console.log(originalTransaction);

console.log("\nCorrected Transaction:");
console.log(correctedTransaction);
