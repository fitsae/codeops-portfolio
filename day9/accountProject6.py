import heapq
from collections import deque

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

class Branch:
    def __init__(self, name):
        self.name = name
        self.children = []
        self.accounts = []

    def add_branch(self, branch):
        self.children.append(branch)

    def add_account(self, account):
        self.accounts.append(account)

    def total_balance(self):
        """
        Recursive total balance for this branch and all children.
        """
        total = sum(acc.balance for acc in self.accounts)

        for child in self.children:
            total += child.total_balance()

        return total


class TransferGraph:
    def __init__(self):
        self.graph = {}

    def add_branch(self, branch):
        if branch not in self.graph:
            self.graph[branch] = []

    def connect(self, source, destination):
        self.add_branch(source)
        self.add_branch(destination)
        self.graph[source].append(destination)

    def bfs(self, start):
        visited = set()
        queue = deque([start])
        order = []

        while queue:
            node = queue.popleft()

            if node not in visited:
                visited.add(node)
                order.append(node)

                for neighbour in self.graph[node]:
                    if neighbour not in visited:
                        queue.append(neighbour)

        return order

    # DFS Cycle Detection
    def has_cycle(self):

        visited = set()
        recursion = set()

        def dfs(node):
            visited.add(node)
            recursion.add(node)

            for neighbour in self.graph.get(node, []):
                if neighbour not in visited:
                    if dfs(neighbour):
                        return True
                elif neighbour in recursion:
                    return True

            recursion.remove(node)
            return False

        for node in self.graph:
            if node not in visited:
                if dfs(node):
                    return True

        return False


class PaymentQueue:

    def __init__(self):
        self.heap = []

    def add_payment(self, priority, sender, receiver, amount):

        heapq.heappush(
            self.heap,
            (-priority, sender, receiver, amount)
        )

    def process_payment(self):

        if not self.heap:
            print("No pending payments.")
            return

        priority, sender, receiver, amount = heapq.heappop(self.heap)

        print(
            f"Processed payment "
            f"{sender} -> {receiver} : {amount} ETB "
            f"(priority {-priority})"
        )

    def show(self):
        print("\nPending Payments")
        for item in sorted(self.heap):
            print(item)


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

print("\n==============================")
print("BRANCH TREE")
print("==============================")

# Create branches
head_office = Branch("Head Office")

north_region = Branch("North Region")
south_region = Branch("South Region")

cbe1 = Branch("CBE-1")
cbe2 = Branch("CBE-2")
cbe3 = Branch("CBE-3")

# Build the tree
head_office.add_branch(north_region)
head_office.add_branch(south_region)

north_region.add_branch(cbe1)
north_region.add_branch(cbe2)

south_region.add_branch(cbe3)

# Add existing accounts to branches
cbe1.add_account(acc1)
cbe2.add_account(acc2)

print("Head Office Total:", head_office.total_balance())
print("North Region Total:", north_region.total_balance())
print("South Region Total:", south_region.total_balance())
print("CBE-1 Total:", cbe1.total_balance())

print("\n==============================")
print("TRANSFER GRAPH")
print("==============================")

graph = TransferGraph()

graph.connect("CBE-1", "CBE-2")
graph.connect("CBE-2", "CBE-3")
graph.connect("CBE-3", "CBE-1")   # creates a cycle
graph.connect("CBE-1", "CBE-4")

print("Transfer Graph")
print(graph.graph)


print("\n==============================")
print("BFS")
print("==============================")

reachable = graph.bfs("CBE-1")

print("Branches reachable from CBE-1:")
print(reachable)


print("\n==============================")
print("DFS CYCLE DETECTION")
print("==============================")

if graph.has_cycle():
    print("Transfer cycle detected.")
else:
    print("No transfer cycle found.")


print("\n==============================")
print("PAYMENT QUEUE")
print("==============================")

payments = PaymentQueue()

payments.add_payment(2, "Hailu", "Abel", 2000)
payments.add_payment(5, "Abel", "Hailu", 1000)
payments.add_payment(1, "Bank", "Supplier", 5000)
payments.add_payment(4, "Payroll", "Employees", 8000)

payments.show()


print("\nProcessing Payments")

while payments.heap:
    payments.process_payment()


