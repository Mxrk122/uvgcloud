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
    return db.query(Cloud_Machine).filter(Cloud_Machine.id == machine_id)

# UPDATE

# DELETE