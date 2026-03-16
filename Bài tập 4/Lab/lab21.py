import openai
from openai import OpenAI
from dotenv import load_dotenv


load_dotenv() 

if __name__ == "__main__":

    client: OpenAI = OpenAI()

    completion: openai.ChatCompletion = (
        client.chat.completions.create(
            model="gpt-3.5-turbo",  
            messages=[
                {"role": "user", "content": "What is the FizzBuzz problem?."}
            ]  
        ))

    print(completion.choices[0].message.content)