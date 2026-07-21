class Account:
    def __init__(self, owner, account_number, balance=0):
        self.owner = owner
        self.account_number = account_number
        self.__balance = balance  # Private attribute
        self._observers = []
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
        self._notify(f"-{amount} ETB")
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

class SMSAlert:

    def update(self, message):
        print(f"SMS: {message}")


acc = AccountFactory.create("saving", "hailu", "CBE",10000)
acc.subscribe(SMSAlert())
acc.subscribe(AuditLog())
acc.withdraw(5000) 
acc.deposit(10000)
acc.withdraw(5000) 
