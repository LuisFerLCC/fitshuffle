# routes/users.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from models import User
from schemas import UserCreate, UserOut

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/register", response_model=UserOut)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.username == user.username).first()
    if existing:
        raise HTTPException(status_code=400, detail="Este usuario ya existe")

    new_user = User(username=user.username, password=user.password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.get("/login")
def login_user(username: str, password: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(
        User.username == username,
        User.password == password
    ).first()

    if not user:
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")

    return {"success": True, "user_id": user.id}
