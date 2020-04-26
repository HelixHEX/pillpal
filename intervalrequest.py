import time, threading, requests

time = 1
url = 'http://bb56fb9c.ngrok.io/arduino/dispense'
result = requests.get(url = url)
def request():
    data = result.content
    print(data)
    threading.Timer(time, request).start()
request()
