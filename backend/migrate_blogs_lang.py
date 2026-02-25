from backend.database import SessionLocal, engine
from sqlalchemy import text

def migrate():
    print("Starting migration...")
    db = SessionLocal()
    try:
        # Check if language column exists
        result = db.execute(text("SELECT column_name FROM information_schema.columns WHERE table_name='blogs_ks' AND column_name='language'"))
        if not result.fetchone():
            print("Adding 'language' column...")
            db.execute(text("ALTER TABLE blogs_ks ADD COLUMN language VARCHAR DEFAULT 'en'"))
            db.execute(text("UPDATE blogs_ks SET language = 'en' WHERE language IS NULL"))
            db.commit()
            print("Migration successful.")
        else:
            print("'language' column already exists.")
    except Exception as e:
        print(f"Migration error: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    migrate()
