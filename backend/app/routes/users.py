# app/api/users.py

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.db import user_crud
from app.schemas.users import UserCreate  
import uuid

router = APIRouter()

# Dependencia para obtener la sesión de la base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/")
def user_root():
    return {"Hello": "Users"}

@router.post("/create_user/", response_model=None)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    return user_crud.create_user(db, user.email, user.password)

@router.post("/login/", response_model=None)
def login(user: UserCreate, db: Session = Depends(get_db)):
    user = user_crud.authenticate_user(db, user.email, user.password)
    print(user)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    return {"message": "Login successful", "user_id": str(user.id)}
