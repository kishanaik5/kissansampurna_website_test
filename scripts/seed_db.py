
import json
import os
import sys

# Ensure we can import backend modules (add root to path)
# This must happen before importing 'backend'
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy.orm import Session
from backend.database import SessionLocal, engine
from backend.models import Blog, Base

def seed_blogs():
    db = SessionLocal()
    try:
        # Path to mockData.json
        json_path = os.path.join(os.path.dirname(__file__), '../src/data/mockData.json')
        
        with open(json_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            
        blogs_data = data.get('blogs', [])
        print(f"Found {len(blogs_data)} blogs in JSON.")

        for item in blogs_data:
            # Check if blog with same title exists to avoid duplicates (simple check)
            exists = db.query(Blog).filter(Blog.blog_title == item['title']).first()
            if exists:
                print(f"Skipping '{item['title']}' (already exists)")
                continue

            new_blog = Blog(
                blog_title=item['title'],
                blog_body=item['content'], # Mapping content -> blog_body
                blog_img=item['image']
            )
            db.add(new_blog)
            print(f"Adding '{item['title']}'...")

        db.commit()
        print("Seeding completed successfully.")

    except Exception as e:
        print("Error seeding database:", e)
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_blogs()
