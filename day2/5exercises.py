# 1. Temperature label. Ask for a temperature in °C, then print "cold" below 15, "warm" from 15
# 28, and "hot" above 28, using if / elif / else. 
# 2. Receipt loop. Use a for loop and range to print receipt numbers 1 through 10, each on its own 
# line as "Receipt #N". 
# 3. Even numbers. Print every even number from 1 to 20 using a loop and the modulo operator %. 
# 4. Discount function. Write apply_discount(price, percent=10) that returns the price after the 
# discount. Test it with and without the default. 
# 5. Countdown. Use a while loop to count down from 5 to 1, printing each number, then print 
# "Liftoff!".

#1
temprature = float(input("inter temprature in °C"))
if temprature < 15:
    print("cold")
elif temprature >= 15 and temprature <= 28:
    print("warm")
else:
    print("hot")

#     #2
for x in range(1,10):
    print(f"reciept no {x} " )



#     #3
for x in range(1,20):
        if x%2 == 0:
            print(x)

    #4
    #without default
price = float(input("inter price"))
percent = float(input("inter percent discount"))
def apply_discount(price, percent):
    return(price - price/percent)
    #discount = apply_discount(price,percent)
    print(f"discounted price = {discount}")

#  #default
def apply_discount2(price2=500, percent2=10):
    return(price2 - price2/percent2)
    #discount = apply_discount2(price2,percent2)
    print(f"discounted price = {discount}")
discount = apply_discount(price,percent)
discount2 = apply_discount2(price2=500,percent2=10)
print(f"discounted price 1 = {discount}")
print(f"discounted price 2 = {discount2}")

    #5
y=5
for x in range(0,5):
    print(y)
    y = y-1
print("Liftoff!")