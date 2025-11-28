from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Outfit, Clothes, outfit_clothes
from schemas import OutfitCreate, OutfitOut

router = APIRouter(prefix="/outfits", tags=["Outfits"])

@router.post("/", response_model=OutfitOut)
def create_outfit(outfit: OutfitCreate, owner_id: int, db: Session = Depends(get_db)):
    new_outfit = Outfit(name=outfit.name, owner_id=owner_id)
    db.add(new_outfit)
    db.commit()
    db.refresh(new_outfit)

    clothes_items = db.query(Clothes).filter(Clothes.id.in_(outfit.clothes_ids)).all()
    for item in clothes_items:
        new_outfit.clothes.append(item)

    db.commit()
    db.refresh(new_outfit)
    return new_outfit

@router.get("/", response_model=list[OutfitOut])
def get_user_outfits(owner_id: int, db: Session = Depends(get_db)):
    return db.query(Outfit).filter(Outfit.owner_id==owner_id).all()
