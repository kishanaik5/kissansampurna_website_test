from backend.database import SessionLocal
from sqlalchemy import text

def check_blogs():
    db = SessionLocal()
    with open("db_check_result.txt", "w", encoding="utf-8") as f:
        try:
            # Use raw SQL to see what's actually in the DB, bypassing model validation
            result = db.execute(text("SELECT id, blog_title FROM blogs_ks"))
            f.write("\n--- Blogs in DB ---\n")
            for row in result:
                f.write(f"ID: {row[0]} (Type: {type(row[0])}) - Title: {row[1]}\n")
        except Exception as e:
            f.write(f"Error querying DB: {e}\n")
        finally:
            db.close()

if __name__ == "__main__":
    check_blogs()
