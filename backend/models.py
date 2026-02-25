
from sqlalchemy import Column, String, Text, DateTime, func
from sqlalchemy.dialects.postgresql import UUID
import uuid
from .database import Base

from sqlalchemy import Boolean

class Blog(Base):
    __tablename__ = "blogs_ks"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    language = Column(String, nullable=False, default='en')
    blog_title = Column(String, nullable=False)
    blog_body = Column(Text, nullable=False)
    blog_img = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class UserPhone(Base):
    __tablename__ = "users_phone"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    phone_number = Column(String(15), nullable=False, unique=True)
    is_verified = Column(Boolean, nullable=False, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Product(Base):
    __tablename__ = "products_ks"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    product_name = Column(String, nullable=False)
    ordering_link = Column(String, nullable=True)
    image_path = Column(String, nullable=True)
    about_product = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())



