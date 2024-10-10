# app/db/crud.py

from sqlalchemy.orm import Session
from app.models.cloud_machine import Cloud_Machine
import uuid
from app.models.users import User
from app.models.cloud_machine import Cloud_Machine
from app.utils.hashing import hash_password, verify_password

# CREATE
def create_cloud_machine(db: Session,id: str, owner: str, vm_name: str, vm_size: str, os: str, status: str) -> Cloud_Machine:
    db_cloud_machine = Cloud_Machine(id=id, owner=owner, vm_name=vm_name, vm_size=vm_size, os=os, status=status)
    db.add(db_cloud_machine)
    db.commit()
    db.refresh(db_cloud_machine)
    return db_cloud_machine

# READ
def get_cloud_machines(db: Session, user_id: uuid.UUID):
    return db.query(Cloud_Machine).filter(Cloud_Machine.owner == user_id).all()

def get_cloud_machine(db: Session, machine_id: str):
    return db.query(Cloud_Machine).filter(Cloud_Machine.id == machine_id).first()

# UPDATE
def update_cloud_machine(db: Session, machine_id: str, vm_name: str = None, vm_size: str = None, os: str = None):
    # Obtener la máquina existente por su ID
    db_cloud_machine = db.query(Cloud_Machine).filter(Cloud_Machine.id == machine_id).first()

    if not db_cloud_machine:
        return None  # Si no se encuentra la máquina, retornar None o lanzar una excepción

    # Actualizar los campos solo si se pasan nuevos valores
    if vm_name != None:
        db_cloud_machine.vm_name = vm_name
    # if vm_size:
    #     db_cloud_machine.vm_size = vm_size
    # if os:
    #     db_cloud_machine.os = os

    # Commit para guardar los cambios
    db.commit()
    db.refresh(db_cloud_machine)  # Refrescar la instancia para obtener los valores actualizados
    return db_cloud_machine

# DELETE
def delete_cloud_machine(db: Session, machine_id: str):
    # Buscar la máquina por su ID
    machine_to_delete = db.query(Cloud_Machine).filter(Cloud_Machine.id == machine_id).first()
    
    # Si la máquina existe, la elimina
    if machine_to_delete:
        db.delete(machine_to_delete)
        db.commit()  # Confirmar los cambios en la base de datos
        return True  # Retorna True si fue eliminada exitosamente
    else:
        return False  # Retorna False si la máquina no fue encontrada
