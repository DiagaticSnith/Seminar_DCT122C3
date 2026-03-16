import inspect
from openai import OpenAI

SURROUND = "You are a Python expert. Fix coding errors based on the provided context."
SINGLE_TASK = "TASK: Fix the errors in the provided code."

def multiplication_quiz_with_errors():
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

def get_user_prompt(func: callable, errors: str) -> str:
    code = inspect.getsource(func)
    return f"""
    {SINGLE_TASK}
    CONTEXT: {{{SURROUND}}}
    CODE_TO_FIX: {{{code}}}
    SPECIFIC_ERRORS_TO_ADDRESS: {{{errors}}}
    """

if __name__ == "__main__":
    client = OpenAI()

    error_list = [
        "1. Compilation errors, 2. Logical scoping of variables, 3. Input type casting"
    ]

    for err in error_list:
        user_prompt = get_user_prompt(multiplication_quiz_with_errors, err)

        completion = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.2,
        )

        print(f"--- AI RESPONSE FOR LAB 4.2 ---")
        print(completion.choices[0].message.content)