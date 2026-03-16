import inspect
from openai import OpenAI

SURROUND = "You will be provided with a Python function enclosed with {{{ Function }}}."

SINGLE_TASK = "Your task is to generate Google Style docstring for it."

class Singleton:
    _instance = None

    def __call__(cls):
        if cls._instance is None:
            cls._instance = super(Singleton, cls).__call__(cls)
        return cls._instance

def get_user_prompt(func: callable) -> str:
    return f"""
FUNCTION: {{{{{{ {inspect.getsource(func)} }}}}}}
GOOGLE STYLE DOCSTRING:
"""

if __name__ == "__main__":
    client: OpenAI = OpenAI()
    completion: ChatCompletion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": f"{SURROUND} {SINGLE_TASK}"},
            {"role": "user", "content": get_user_prompt(Singleton.__call__)},
        ],
    )
    print(completion.choices[0].message.content)