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
