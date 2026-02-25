from fastapi import FastAPI, Depends, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime
import uuid

from . import models, database

app = FastAPI(title="Kissan Sampurna API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic Schemas
class BlogBase(BaseModel):
    language: str = "en"
    blog_title: str
    blog_body: str
    blog_img: Optional[str] = None

class BlogCreate(BlogBase):
    pass

class BlogResponse(BlogBase):
    id: uuid.UUID
    created_at: datetime
    
    class Config:
        from_attributes = True

class ProductBase(BaseModel):
    product_name: str
    ordering_link: Optional[str] = None
    image_path: Optional[str] = None
    about_product: Optional[str] = None

class ProductCreate(ProductBase):
    pass

class ProductResponse(ProductBase):
    id: uuid.UUID
    created_at: datetime
    
    class Config:
        from_attributes = True



# Dependency
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Create tables on startup
@app.on_event("startup")
def startup_event():
    try:
        print("Starting database table creation...")
        models.Base.metadata.create_all(bind=database.engine)
        print("Database tables created successfully.")
    except Exception as e:
        print(f"Error creating database tables: {e}")

@app.get("/api")
def read_root():
    return {"message": "Welcome to Kissan Sampurna API"}

# Token Authentication Dependency
AUTH_TOKEN = "KISSANSAMPURNA@2026"
security = HTTPBearer()

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    if credentials.credentials != AUTH_TOKEN:
        raise HTTPException(
            status_code=403,
            detail="Invalid authentication token",
        )
    return credentials.credentials

# --- BLOGS ENDPOINTS ---

@app.get("/api/blogs", response_model=List[BlogResponse])
def get_blogs(lang: Optional[str] = None, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    try:
        query = db.query(models.Blog)
        if lang:
            query = query.filter(models.Blog.language == lang)
        blogs = query.order_by(models.Blog.created_at.desc()).offset(skip).limit(limit).all()
        return blogs
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

@app.post("/api/blogs", response_model=BlogResponse, status_code=201)
def create_blog(blog: BlogCreate, db: Session = Depends(get_db), token: str = Depends(verify_token)):
    try:
        db_blog = models.Blog(**blog.dict())
        db.add(db_blog)
        db.commit()
        db.refresh(db_blog)
        return db_blog
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"Failed to create blog: {str(e)}")

# --- PRODUCTS ENDPOINTS ---

@app.get("/api/products", response_model=List[ProductResponse])
def get_products(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    try:
        products = db.query(models.Product).order_by(models.Product.created_at.desc()).offset(skip).limit(limit).all()
        return products
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

@app.post("/api/products", response_model=ProductResponse, status_code=201)
def create_product(product: ProductCreate, db: Session = Depends(get_db), token: str = Depends(verify_token)):
    try:
        db_product = models.Product(**product.dict())
        db.add(db_product)
        db.commit()
        db.refresh(db_product)
        return db_product
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"Failed to create product: {str(e)}")

class PhoneCreate(BaseModel):
    phone_number: str

class PhoneResponse(BaseModel):
    id: uuid.UUID
    phone_number: str
    is_verified: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

# --- PHONE REGISTRATION ENDPOINT ---

@app.post("/api/phone-register", response_model=PhoneResponse, status_code=201)
def register_phone(phone: PhoneCreate, db: Session = Depends(get_db)):
    # Basic validation: 10 digits
    import re
    if not re.match(r'^\d{10}$', phone.phone_number):
        raise HTTPException(status_code=400, detail="Phone number must be exactly 10 digits")
        
    try:
        # Check if already exists
        existing = db.query(models.UserPhone).filter(models.UserPhone.phone_number == phone.phone_number).first()
        if existing:
            return existing # Return existing if already registered
            
        db_phone = models.UserPhone(phone_number=phone.phone_number)
        db.add(db_phone)
        db.commit()
        db.refresh(db_phone)
        return db_phone
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"Failed to register phone: {str(e)}")
