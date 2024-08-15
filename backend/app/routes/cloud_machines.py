from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.db import cloud_machine_crud
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

@router.post("/create_machine/", response_model=None)
def create_machine(machine: MachineCreate, db: Session = Depends(get_db)):
    command = ['microstack', 'launch', machine.os, '-n', machine.name, "-f", machine.flavor]
    try:
        result = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, check=True)
        print("Output:\n", result.stdout)

        # listar la maquina en la base de datos
        machine = cloud_machine_crud.create_cloud_machine(
            db, machine.owner, machine.name, machine.flavor, machine.os, "new"
        )

        return result.stdout
    except subprocess.CalledProcessError as e:
        print("Error:\n", e.stderr)
        return e.stderr
    
@router.get("/get_machines/{user_id}", response_model=None)
def get_machines(user_id: uuid.UUID, db: Session = Depends(get_db)):
    cloud_machines = cloud_machine_crud.get_cloud_machines(db, user_id=user_id)
    if not cloud_machines:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No cloud machines found for this user"
        )
    return cloud_machines

@router.get("/get_machine/{machine_id}", response_model=None)
def get_machines(machine_id: uuid.UUID, db: Session = Depends(get_db)):
    cloud_machines = cloud_machine_crud.get_cloud_machine(db, machine_id=machine_id)
    if not cloud_machines:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No cloud machines found for this user"
        )
    return cloud_machines