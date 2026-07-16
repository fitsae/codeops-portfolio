class Product:
    def __init__(self, name, price, qty):
        self.name = name

        if price < 0:
            raise ValueError("Price cannot be negative.")
        if qty < 0:
            raise ValueError("Quantity cannot be negative.")

        self.__price = price
        self.__qty = qty

    @property
    def price(self):
        """Read-only access to product price."""
        return self.__price

    @property
    def qty(self):
        """Read-only access to product quantity."""
        return self.__qty

    def restock(self, amount):
        if amount <= 0:
            print("Restock failed: Amount must be greater than zero.")
            return

        self.__qty += amount
        print(f"Restocked {amount} units. New quantity: {self.__qty}")

    def sell(self, amount):
        if amount <= 0:
            print("Sale failed: Amount must be greater than zero.")
            return

        if amount > self.__qty:
            print("Sale failed: Not enough stock.")
            return

        self.__qty -= amount
        print(f"Sold {amount} units. Remaining quantity: {self.__qty}")

    def total_value(self):
        return self.__price * self.__qty

# Create products
product1 = Product("Laptop", 50000, 10)
product2 = Product("Mouse", 800, 25)

# Transactions
print(f"{product1.name}: Price = {product1.price}, Qty = {product1.qty}")
product1.sell(3)
product1.restock(5)
product1.sell(20)  # Invalid sale

print()

print(f"{product2.name}: Price = {product2.price}, Qty = {product2.qty}")
product2.sell(10)
product2.restock(15)

print()

print("Inventory Summary")
print(f"{product1.name}: Qty = {product1.qty}, Total Value = {product1.total_value():.2f}")
print(f"{product2.name}: Qty = {product2.qty}, Total Value = {product2.total_value():.2f}")