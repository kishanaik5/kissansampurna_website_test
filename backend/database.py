
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("DATABASE_URL is not set")

# Fix for SQLAlchemy: postgres:// -> postgresql://
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

# Strip query/SSL params from URL as we pass them in connect_args
if "?" in DATABASE_URL:
    DATABASE_URL = DATABASE_URL.split("?")[0]

# Require SSL for Aiven
engine = create_engine(
    DATABASE_URL, 
    connect_args={"sslmode": "require"},
    pool_size=3,
    max_overflow=0,
    pool_pre_ping=True
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
