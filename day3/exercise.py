# Goal
# Read a file of TeleBirr transactions, summarise them by customer using a dictionary, 
# and handle a missing file gracefully.
# Steps
# 1.Read transactions.txt line by line (name,amount per line).
# 2.Build a dict mapping each customer to their total spend.
# 3.Print each customer and total, sorted highest first.
# 4.Wrap the file read in try / except for a missing file.
# 5.Write the summary to report.txt, then push to GitHub

try:
    # Dictionary to store customer totals
    customer_totals = {}

    # Read transactions file
    with open("transactions.txt", "r") as file:
        for line in file:
            line = line.strip()

            # Skip empty lines
            if not line:
                continue

            name, amount = line.split(",")
            amount = float(amount)

            # Add amount to customer's total
            customer_totals[name] = customer_totals.get(name, 0) + amount

    # Sort customers by total spend (highest first)
    sorted_totals = sorted(
        customer_totals.items(),
        key=lambda item: item[1],
        reverse=True
    )

    # Print summary
    print("Customer Spending Summary")
    print("-" * 30)

    for name, total in sorted_totals:
        print(f"{name}: {total:.2f}")

    # Write summary to report.txt
    with open("report.txt", "w") as report:
        report.write("Customer Spending Summary\n")
        report.write("-" * 30 + "\n")

        for name, total in sorted_totals:
            report.write(f"{name}: {total:.2f}\n")

    print("\nReport saved as report.txt")

except FileNotFoundError:
    print("Error: transactions.txt was not found.")