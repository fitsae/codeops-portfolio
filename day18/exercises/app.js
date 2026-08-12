import { addVat, VAT } from "./money.js";

const price = 500;

console.log("VAT:", VAT);
console.log("Price with VAT:", addVat(price));
