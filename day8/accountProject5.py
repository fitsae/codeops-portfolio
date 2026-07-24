class Account:
    def __init__(self, owner, account_number, balance=0):
        self.owner = owner
        self.account_number = account_number
        self.__balance = balance  # Private attribute
        self._observers = []
        self.transaction_history = []
    def subscribe(self, obs):
        self._observers.append(obs)
    def _notify(self, event):
        for obs in self._observers:
            obs.update(event)

    @property
    def balance(self):
        """Read-only access to account balance."""
        return self.__balance

    def deposit(self, amount):
        if amount <= 0:
            print("Deposit failed: Amount must be greater than zero.")
            return
        self.transaction_history.append(f"Deposit +{amount}")
        self._notify(f"Deposited {amount} ETB")
        self.__balance += amount
        # print(f"Deposit successful. New balance: {self.__balance:.2f}")

    def withdraw(self, amount):
        if amount <= 0:
            print("Withdrawal failed: Amount must be greater than zero.")
            return

        if amount > self.__balance:
            print("Withdrawal failed: Insufficient funds.")
            return

        self.__balance -= amount
        self.transaction_history.append(f"Withdraw -{amount}")
        self._notify(f"-{amount} ETB")
    def statement(self):
        print(f"***bank statement\nname:{self.owner}\naccount number:{self.account_number}\nbalance:{self.balance}")

    def show_transactions(self):
        print("\nTransaction History (Newest First)")
        for transaction in reversed(self.transaction_history):
            print(transaction)

    def total_transactions(self):
        return self._count_transactions(self.transaction_history)

    def _count_transactions(self, transactions):
        if not transactions:
            return 0
        return 1 + self._count_transactions(transactions[1:])

    def transaction_values(self):
        """Convert transaction history into numeric values."""
        values = []

        for transaction in self.transaction_history:
            amount = transaction.split()[-1]   # +2000 or -1500
            values.append(float(amount))

        return values

    def best_three_transaction_stretch(self):
        """Return the highest-sum window of 3 consecutive transactions."""
        values = self.transaction_values()

        if len(values) < 3:
            return None, 0

        # Initial window
        current_sum = sum(values[:3])
        best_sum = current_sum
        best_index = 0

        # Slide the window
        for i in range(3, len(values)):
            current_sum = current_sum - values[i - 3] + values[i]

            if current_sum > best_sum:
                best_sum = current_sum
                best_index = i - 2

        return (
            self.transaction_history[best_index:best_index + 3],
            best_sum
        )

    

class SavingAccount(Account):
    def __init__(self, owner, account_number, balance=0, rate=0.05):
        super().__init__(owner, account_number, balance)
        self.rate = rate
    def add_interest():
        self.rate = rate
        self.balance = balance * rate




class CurrentAccount(Account):  
    def __init__(self,owner,account_number,balance,over_draft=1000):
        super().__init__(owner,account_number,balance) 
        self.over_draft=over_draft


    
class SMSAlert:
    def update(self, event):
        print(f"[TeleBirr SMS] {event}")

class AuditLog:
    def update(self, event):
        print(f"[Log] {event}")

class AccountFactory:

    @staticmethod
    def create(kind, owner, account_number, balance):

        if kind.lower() == "saving":
            return SavingAccount(owner, account_number, balance)

        elif kind.lower() == "current":
            return CurrentAccount(owner, account_number, balance)

        else:
            raise ValueError("Unknown account type")

class AlertService:
    def send(self, message):
        print(f"ALERT: {message}")


class BankRegistry:
    def __init__(self):
        # Dictionary gives O(1) lookup
        self.accounts = {}

    def add_account(self, account):
        self.accounts[account.account_number] = account

    def find_account(self, account_number):
        return self.accounts.get(account_number)

    def show_accounts(self):
        print("\nAccounts in Bank")
        for account in self.accounts.values():
            print(account.owner, "-", account.account_number)

    def top_by_balance(self, n):
        return sorted(
            self.accounts.values(),
            key=lambda account: account.balance,
            reverse=True
        )[:n]

    def binary_search(self, account_list, target):
        left = 0
        right = len(account_list) - 1

        while left <= right:
            mid = (left + right) // 2

            if account_list[mid].account_number == target:
                return account_list[mid]

            elif account_list[mid].account_number < target:
                left = mid + 1

            else:
                right = mid - 1

        return None

    def find_by_number(self, account_number):
        sorted_accounts = sorted(
            self.accounts.values(),
            key=lambda account: account.account_number
        )
        return self.binary_search(sorted_accounts, account_number)
    def sliding_window_report(self):
        print("\n=== Best 3-Transaction Stretch ===")

        for account in self.accounts.values():
            stretch, total = account.best_three_transaction_stretch()

            print(f"\n{account.owner} ({account.account_number})")

            if stretch is None:
                print("Not enough transactions.")
            else:
                print("Transactions:")
                for t in stretch:
                    print(" ", t)
                print(f"Total = {total} ETB")

BankRegistry = BankRegistry()
acc1 = AccountFactory.create("saving", "Hailu", "1001", 10000)
acc2 = AccountFactory.create("current", "Abel", "1002", 5000)

acc1.subscribe(SMSAlert())
acc1.subscribe(AuditLog())

BankRegistry.add_account(acc1)
BankRegistry.add_account(acc2)

# O(1) lookup
account = BankRegistry.find_account("1001")

account.deposit(2000)
account.withdraw(1500)
account.deposit(500)

account.statement()

account.show_transactions()

BankRegistry.show_accounts()

print("\nTop Accounts by Balance")
for acc in BankRegistry.top_by_balance(2):
    print(acc.owner, "-", acc.balance)

print("\nBinary Search")
found = BankRegistry.find_by_number("1001")
if found:
    print("Found:", found.owner, found.balance)
else:
    print("Account not found")

print("\nTotal Transactions")
print(account.owner, "has", account.total_transactions(), "transactions.")

BankRegistry.sliding_window_report()