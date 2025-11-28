from sqlalchemy import Column, Integer, String, ForeignKey, Table
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)

    clothes = relationship("Clothes", back_populates="owner")
    outfits = relationship("Outfit", back_populates="owner")

class Clothes(Base):
    __tablename__ = "clothes"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    category = Column(String, nullable=False)
    image_url = Column(String, nullable=True)
    owner_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="clothes")
    outfits = relationship("Outfit", secondary="outfit_clothes", back_populates="clothes")

# Tabla intermedia muchos a muchos
outfit_clothes = Table(
    "outfit_clothes",
    Base.metadata,
    Column("outfit_id", ForeignKey("outfits.id"), primary_key=True),
    Column("clothes_id", ForeignKey("clothes.id"), primary_key=True)
)

class Outfit(Base):
    __tablename__ = "outfits"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    owner_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="outfits")
    clothes = relationship("Clothes", secondary=outfit_clothes, back_populates="outfits")
