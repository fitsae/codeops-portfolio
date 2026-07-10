bill_total = 1200.00  # ETB
number_of_people = 4

# List of friends
friends = ["Abel", "Hana", "Miki", "Samuel"]

def split_bill(total, people, tip_rate=0.10):
    tip = total * tip_rate
    total_with_tip = total + tip
    return total_with_tip / people

# Calculate each person's share
share = split_bill(bill_total, number_of_people)

# Display the result
print(f"Bill Total: ETB {bill_total:}")
print(f"Tip Rate: 10%")
print(f"Each person pays: ETB {share:}\n")

# Loop through the names
for friend in friends:
    print(f"{friend} pays ETB {share:}")
