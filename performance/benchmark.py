import time
import requests

URL = "http://127.0.0.1:5000/analytics"

NUM_REQUESTS = 20

times = []

print(f"Testing {NUM_REQUESTS} requests...\n")

for i in range(NUM_REQUESTS):

    start = time.perf_counter()

    response = requests.get(URL)

    end = time.perf_counter()

    elapsed = (end - start) * 1000

    times.append(elapsed)

    print(
        f"Request {i+1:02d}: "
        f"{elapsed:.2f} ms "
        f"Status: {response.status_code}"
    )

print("\n---------------------------")

print(f"Minimum : {min(times):.2f} ms")

print(f"Maximum : {max(times):.2f} ms")

print(f"Average : {sum(times)/len(times):.2f} ms")