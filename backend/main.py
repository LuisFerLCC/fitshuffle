# main.py
from fastapi import FastAPI
from database import Base, engine
from routes.users import router as users_router
from routes.clothes import router as clothes_router
from routes.outfits import router as outfits_router
from fastapi.staticfiles import StaticFiles
import os

# Crear las tablas
Base.metadata.create_all(bind=engine)

app = FastAPI()

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app.mount("/uploads", StaticFiles(directory=UPLOAD_FOLDER), name="uploads")

app.include_router(users_router, tags=["Users"])
app.include_router(clothes_router, tags=["Clothes"])
app.include_router(outfits_router, tags=["Outfits"])
