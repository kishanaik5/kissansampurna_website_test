import requests
import time

BASE_URL = 'http://127.0.0.1:8000'

def test_flow():
    # TEST PRODUCTS
    print("\n--- Testing Products ---")
    new_product = {
        "product_name": f"Test Product {int(time.time())}",
        "about_product": "Auto-generated test product",
        "ordering_link": "http://test.com",
        "image_path": "http://test.com/img.png"
    }
    
    # Create
    try:
        resp = requests.post(f"{BASE_URL}/products", json=new_product)
        if resp.status_code == 200:
            pid = resp.json()['id']
            print(f"Created product: {pid}")
            
            # Verify in list
            resp_list = requests.get(f"{BASE_URL}/products")
            items = resp_list.json()
            if any(i['id'] == pid for i in items):
                print("SUCCESS: Product found in list")
            else:
                print("FAILURE: Product NOT found in list")
        else:
            print(f"FAILURE: Could not create product. {resp.status_code} {resp.text}")
            
    except Exception as e:
        print(f"EXCEPTION in Products: {e}")

    # TEST BLOGS
    print("\n--- Testing Blogs ---")
    new_blog = {
        "blog_title": f"Test Blog {int(time.time())}",
        "blog_body": "This is a test blog body content.",
        "blog_img": "http://test.com/blog.png"
    }
    
    # Create
    try:
        resp = requests.post(f"{BASE_URL}/blogs", json=new_blog)
        if resp.status_code == 200:
            bid = resp.json()['id']
            print(f"Created blog: {bid}")
            
            # Verify in list
            resp_list = requests.get(f"{BASE_URL}/blogs")
            items = resp_list.json()
            if any(i['id'] == bid for i in items):
                print("SUCCESS: Blog found in list")
            else:
                print("FAILURE: Blog NOT found in list")
        else:
            print(f"FAILURE: Could not create blog. {resp.status_code} {resp.text}")
            
    except Exception as e:
        print(f"EXCEPTION in Blogs: {e}")

if __name__ == "__main__":
    test_flow()
