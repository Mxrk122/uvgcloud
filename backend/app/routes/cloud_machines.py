# app/api/users.py

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.db import crud
from app.schemas.cloud_machine import MachineCreate  
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

@router.get("/create_machine/", response_model=None)
def do_command(machine: MachineCreate, db: Session = Depends(get_db)):
    command = ['microstack', 'launch', machine.os, '-n', machine.name, "-f", machine.flavor]
    try:
        result = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, check=True)
        print("Output:\n", result.stdout)
        return result.stdout
    except subprocess.CalledProcessError as e:
        print("Error:\n", e.stderr)
        return e.stderr
