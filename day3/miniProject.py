import os

INVENTORY_FILE = "inventory.txt"


def load_inventory():
    """Load inventory from a text file into a dictionary."""
    inventory = {}

    if not os.path.exists(INVENTORY_FILE):
        return inventory

    with open(INVENTORY_FILE, "r") as file:
        for line in file:
            line = line.strip()
            if line:
                item, quantity = line.split(",")
                inventory[item] = int(quantity)

    return inventory


def save_inventory(inventory):
    """Save inventory dictionary to a text file."""
    with open(INVENTORY_FILE, "w") as file:
        for item, quantity in inventory.items():
            file.write(f"{item},{quantity}\n")


def update_item(inventory):
    item = input("Enter item name: ").strip().lower()

    try:
        quantity = int(input("Enter quantity change (+/-): "))
    except ValueError:
        print("Invalid quantity.")
        return

    inventory[item] = inventory.get(item, 0) + quantity

    if inventory[item] <= 0:
        del inventory[item]
        print(f"{item} removed from inventory.")
    else:
        print(f"{item}: {inventory[item]}")


def display_inventory(inventory):
    if not inventory:
        print("\nInventory is empty.\n")
        return

    print("\nCurrent Inventory")
    print("-" * 20)
    for item, quantity in inventory.items():
        print(f"{item}: {quantity}")
    print()


def main():
    inventory = load_inventory()

    while True:
        print("1. View Inventory")
        print("2. Update Item")
        print("3. Save & Exit")

        choice = input("Enter your choice: ")

        if choice == "1":
            display_inventory(inventory)
        elif choice == "2":
            update_item(inventory)
        elif choice == "3":
            save_inventory(inventory)
            print("Inventory saved successfully.")
            break
        else:
            print("Invalid choice.")


if __name__ == "__main__":
    main()