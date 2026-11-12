export class OrderNotFoundError extends Error {
  constructor(public readonly id: number) {
    super(`Order ${id} not found`);
    this.name = 'OrderNotFoundError';
  }
}

export class PaymentDeclinedError extends Error {
  constructor(
    public readonly phone: string,
    public readonly reason: string,
  ) {
    super(`Payment declined for ${phone}: ${reason}`);
    this.name = 'PaymentDeclinedError';
  }
}
