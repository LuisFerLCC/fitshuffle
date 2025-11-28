from pydantic import BaseModel
from typing import List, Optional

class UserCreate(BaseModel):
    username: str
    password: str

class UserOut(BaseModel):
    id: int
    username: str

    class Config:
        from_attributes = True

class ClothesCreate(BaseModel):
    name: str
    category: str
    image_url: Optional[str]

class ClothesOut(ClothesCreate):
    id: int
    owner_id: int
    class Config:
        orm_mode = True

class OutfitCreate(BaseModel):
    name: str
    clothes_ids: List[int]

class OutfitOut(BaseModel):
    id: int
    name: str
    owner_id: int
    clothes: List[ClothesOut]
    class Config:
        orm_mode = True