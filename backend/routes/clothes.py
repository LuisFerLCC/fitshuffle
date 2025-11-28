from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from database import get_db
from models import Clothes
from schemas import ClothesCreate, ClothesOut
import os
import shutil
from PIL import Image
from rembg import remove



router = APIRouter(prefix="/clothes", tags=["Clothes"])

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@router.post("/", response_model=ClothesOut)
def create_clothes(
    owner_id: int = Form(...),
    name: str = Form(...),
    category: str = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    with open(file_path, "wb") as f:
        shutil.copyfileobj(file.file, f)

    with open(file_path, "rb") as f:
        input_data = f.read()
        output_data = remove(input_data)

    new_file_path = os.path.join(UPLOAD_FOLDER, f"no_bg_{file.filename}")
    with open(new_file_path, "wb") as f:
        f.write(output_data)

    new_item = Clothes(name=name, category=category, image_url=f"no_bg_{file.filename}", owner_id=owner_id)    
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return new_item

@router.get("/", response_model=list[ClothesOut])
def get_user_clothes(owner_id: int, category: str = None, db: Session = Depends(get_db)):
    query = db.query(Clothes).filter(Clothes.owner_id == owner_id)
    if category and category != "Todo":
        query = query.filter(Clothes.category == category)
    return query.all()

@router.delete("/{clothes_id}", response_model=dict)
def delete_clothes(clothes_id: int, db: Session = Depends(get_db)):
    item = db.query(Clothes).filter(Clothes.id == clothes_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Prenda no encontrada")

    file_path = os.path.join(UPLOAD_FOLDER, item.image_url)
    if os.path.exists(file_path):
        os.remove(file_path)

    db.delete(item)
    db.commit()

    return {"detail": "Prenda eliminada correctamente"}