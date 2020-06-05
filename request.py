import requests
import sys

# url = sys.argv[1]
url = 'https://jsonplaceholder.typicode.com/todos/1'

res = requests.get(url)

print(res.text)
# print(res.json())

sys.stdout.flush()