export const totalByType = (txns, type) => {
  return txns
    .filter((t) => t.type === type)
    .reduce((sum, { amount }) => sum + amount, 0);
};

export const formatReceipts = (txns) => {
  return txns.map(({ customer, amount }) => {
    return `${customer}: ${amount} ETB`;
  });
};
