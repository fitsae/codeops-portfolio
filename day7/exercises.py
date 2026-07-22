"""
day07/exercises.py

Day 7 Exercises
"""

import time
from collections import deque

# ==========================================================
# Exercise 1: Big-O
# ==========================================================

print("===== Exercise 1: Big-O =====")

numbers = [10, 20, 30, 40, 50]

# O(1)
# List indexing takes constant time because Python can directly
# access the element by its position.
print(numbers[2])

# O(n)
# The loop visits each element exactly once.
for num in numbers:
    print(num, end=" ")
print()

# O(n²)
# Every element is compared with every other element.
for i in numbers:
    for j in numbers:
        pass

# O(1)
# Dictionary lookup uses hashing (average case).
accounts = {
    "1001": "Alice",
    "1002": "Bob",
    "1003": "Charlie"
}

print(accounts["1002"])


# O(log n)
# Binary search halves the search space each iteration.
def binary_search(arr, target):
    left = 0
    right = len(arr) - 1

    while left <= right:
        mid = (left + right) // 2

        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1


nums = list(range(100))
print(binary_search(nums, 75))


# ==========================================================
# Exercise 2: List vs Dict Lookup
# ==========================================================

print("\n===== Exercise 2: List vs Dict Lookup =====")

SIZE = 100000

account_list = [f"ACC{i}" for i in range(SIZE)]
account_dict = {f"ACC{i}": i for i in range(SIZE)}

target = f"ACC{SIZE-2}"

start = time.perf_counter()
target in account_list
list_time = time.perf_counter() - start

start = time.perf_counter()
target in account_dict
dict_time = time.perf_counter() - start

print("List lookup:", list_time)
print("Dict lookup:", dict_time)


# ==========================================================
# Exercise 3: Stack
# ==========================================================

print("\n===== Exercise 3: Stack =====")


class Stack:

    def __init__(self):
        self.items = []

    def push(self, item):
        self.items.append(item)

    def pop(self):
        if self.items:
            return self.items.pop()

    def peek(self):
        if self.items:
            return self.items[-1]

    def is_empty(self):
        return len(self.items) == 0


names = ["Alice", "Bob", "Charlie", "David"]

stack = Stack()

for name in names:
    stack.push(name)

reversed_names = []

while not stack.is_empty():
    reversed_names.append(stack.pop())

print("Original:", names)
print("Reversed:", reversed_names)


# ==========================================================
# Exercise 4: Queue
# ==========================================================

print("\n===== Exercise 4: Queue =====")

bank_queue = deque()

customers = ["John", "Mary", "Sam", "Lisa", "James"]

for customer in customers:
    bank_queue.append(customer)
    print(customer, "joined the queue")

print()

while bank_queue:
    print("Serving", bank_queue.popleft())


# ==========================================================
# Exercise 5: Singly Linked List
# ==========================================================

print("\n===== Exercise 5: Linked List =====")


class Node:

    def __init__(self, data):
        self.data = data
        self.next = None


class LinkedList:

    def __init__(self):
        self.head = None

    def push_front(self, value):
        new_node = Node(value)
        new_node.next = self.head
        self.head = new_node

    def print_all(self):
        current = self.head

        while current:
            print(current.data)
            current = current.next


linked = LinkedList()

linked.push_front("Charlie")
linked.push_front("Bob")
linked.push_front("Alice")

linked.print_all()
