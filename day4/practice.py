# Goal
# Build the first version of the Addis Bank Account class — encapsulated balance, 
# validated deposits and withdrawals. This is the start of your larger project.
# Steps
# 1.Define Account with owner, account_number, and a private __balance.
# 2.Add a @property to read the balance (no direct edits).
# 3.Write deposit() and withdraw() that validate the amount.
# 4.Reject negative deposits and overdrafts with a clear message.
# 5.Create two accounts, run some transactions, and push to day04

class Account:
    def __init__(self, owner, account_number, balance=0):
        self.owner = owner
        self.account_number = account_number
        self.__balance = balance  # Private attribute

    @property
    def balance(self):
        """Read-only access to account balance."""
        return self.__balance

    def deposit(self, amount):
        if amount <= 0:
            print("Deposit failed: Amount must be greater than zero.")
            return

        self.__balance += amount
        print(f"Deposit successful. New balance: {self.__balance:.2f}")

    def withdraw(self, amount):
        if amount <= 0:
            print("Withdrawal failed: Amount must be greater than zero.")
            return

        if amount > self.__balance:
            print("Withdrawal failed: Insufficient funds.")
            return

        self.__balance -= amount
        print(f"Withdrawal successful. New balance: {self.__balance:.2f}")



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



# Create two accounts
account1 = Account("Abebe Kebede", "100001", 1000)
account2 = Account("Hana Bekele", "100002", 500)

# Transactions
print(f"{account1.owner}'s Balance: {account1.balance}")
account1.deposit(300)
account1.withdraw(200)
account1.withdraw(2000)   # Overdraft attempt
account1.deposit(-50)     # Invalid deposit

print()

print(f"{account2.owner}'s Balance: {account2.balance}")
account2.deposit(500)
account2.withdraw(250)
account2.deposit(0)       # Invalid deposit
account2.withdraw(1000)   # Overdraft attempt

print()

# Final balances
print("\nFinal Balances")
print(f"{account1.owner}: {account1.balance:.2f}")
print(f"{account2.owner}: {account2.balance:.2f}\n")


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