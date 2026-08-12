const VAT_RATE = 0.15;

// Add 15% VAT
export function withVat(price) {
  return price * (1 + VAT_RATE);
}

// Format amount as Ethiopian Birr
export function format(amount) {
  return `${amount.toFixed(2)} ETB`;
}
