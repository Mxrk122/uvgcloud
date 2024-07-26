# app/api/users.py

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.db import crud
import subprocess
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
    return {"Hello": "Commands"}

@router.get("/do_command/", response_model=None)
def do_command(db: Session = Depends(get_db)):
    command = ['microstack', 'launch', 'cirros', '-n', 'virtu']
    try:
        result = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, check=True)
        print("Output:\n", result.stdout)
        return result.stdout
    except subprocess.CalledProcessError as e:
        print("Error:\n", e.stderr)
        return e.stderr
