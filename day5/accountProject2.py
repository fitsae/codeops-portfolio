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
    def statement(self):
        print(f"***bank statement\nname:{self.owner}\naccount number:{self.account_number}\nbalance:{self.balance}")

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
    def withdraw(self,amount):
        if self.amount > self.balance + self.over_draft:
            raise ValueError("over draft limit reached")
        balance -=amount

accounts = [SavingAccount("abebe","10000",1000),
            CurrentAccount("hailu","10001",550)
]

for account in accounts:
    account.deposit(1000)
    account.statement()
    

