import time, threading, requests

time = 1
url = 'https://6e1099e6.ngrok.io/arduino'
result = requests.get(url = url)
def request():
    data = result.json()
    print(data)
    threading.Timer(time, request).start()

request()
