#Mã nguồn ban đầu
import Random
a = random.randint(1,12)
b = random.randint(1,12)
for i in range(10):
    question = "What is "+a+" x "+b+"? "
    answer = input(question)
    if answer = a*b
        print (Well done!)
    else:
        print("No.")



#Mã nguồn sau khi fix bug áp dụng 5S
import random

def multiplication_quiz():
    # Seed for reproducibility
    random.seed(42)

    for i in range(10):
        a = random.randint(1, 12)
        b = random.randint(1, 12)

        question = f"What is {a} x {b}? "
        try:
            answer = int(input(question))
            if answer == a * b:
                print("Well done!")
            else:
                print("No.")
        except ValueError:
            print("Invalid input. Please enter a number.")

# Run the quiz
multiplication_quiz()