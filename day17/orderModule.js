const subTotal = (...prices) => {
  return prices.reduce((sum, p) => sum + p, 0);
};

const discountedBy = (rate) => {
  return (n) => n * (1 - rate);
};

const withVat = (n) => n * 1.15;

const toETB = (n) => `${n.toFixed(2)} ETB`;

function makeReceiptMaker() {
  let orderNo = 0;

  const memberOff = discountedBy(0.1);

  return function (...items) {
    orderNo++;

    const gross = subTotal(...items);
    const net = withVat(memberOff(gross));

    return `#${orderNo}: ${toETB(net)}`;
  };
}

const receipt = makeReceiptMaker();

console.log(receipt(34, 60, 55));
console.log(receipt(100, 200));
