import requests
import json

BASE_URL = 'http://127.0.0.1:8000'

def check_endpoint(endpoint):
    print(f"\n--- Checking {endpoint} ---")
    try:
        response = requests.get(f"{BASE_URL}{endpoint}")
        print(f"Status Code: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"Item count: {len(data)}")
            if data:
                print("First item:", json.dumps(data[0], indent=2))
            else:
                print("No items found.")
        else:
            print(f"Failed to fetch {endpoint}")
            print(response.text)
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    check_endpoint('/blogs')
    check_endpoint('/products')
