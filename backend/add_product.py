import urllib.request
import json

url = "http://127.0.0.1:8000/products"
headers = {
    "Content-Type": "application/json"
}

data = {
    "product_name": "Premium Organic Fertilizer",
    "ordering_link": "https://wa.me/919876543210?text=I'm%20interested%20in%20Organic%20Fertilizer",
    "image_path": "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?q=80&w=1000&auto=format&fit=crop",
    "about_product": "Boost your crop yield naturally with our 100% organic fertilizer. Rich in nitrogen, phosphorus, and potassium, perfectly balanced for all soil types."
}

try:
    req = urllib.request.Request(url, data=json.dumps(data).encode('utf-8'), headers=headers)
    with urllib.request.urlopen(req) as response:
        response_data = response.read().decode('utf-8')
        print("Success! Product added:", response_data)
except Exception as e:
    print("Error adding product:", e)
