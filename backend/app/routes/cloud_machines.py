from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.db import cloud_machine_crud
from app.schemas.cloud_machine import MachineCreate, MachineEdit  
import subprocess
import uuid

import os



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
    machine_id = str(uuid.uuid4())

    # Llama al script de Bash con los parámetros necesarios
    script_path = os.path.join('sudo', os.path.dirname(__file__), 'createvm.sh')
    bash_command = [script_path, machine_id, machine.flavor, machine.os]

    

    try:
        # Ejecutar el script de Bash
        port_result = subprocess.run("sudo", bash_command, 
        capture_output=True,  # Captura stdout y stderr
        text=True,  # Asegura que la salida se capture como una cadena
        check=True  # Lanza una excepción si el script devuelve un error)
        )

        # Extraer el puerto de la salida del script
        lines = port_result.stdout.splitlines()  # Divide la salida en líneas
        port = lines[-1].strip() # Aquí tienes el puerto de la máquina

        # Guardar la máquina y su puerto en la base de datos
        machine_entry = cloud_machine_crud.create_cloud_machine(
            db, machine_id, machine.owner, machine.name, machine.flavor, machine.os, "new", #port
        )

        

        # Devolver el puerto como respuesta
        return {"machine_id": machine_id, "port": port}

    except subprocess.CalledProcessError as e:
        print("Error:\n", e.stderr)
        return {"error": str(e)}
    
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
def get_machine(machine_id: str, db: Session = Depends(get_db)):
    cloud_machine = cloud_machine_crud.get_cloud_machine(db, machine_id=machine_id)
    if not cloud_machine:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No cloud machines found for this user"
        )
    return cloud_machine

@router.put("/edit_machine/{machine_id}", response_model=None)
def edit_machine(
    machine_id: str,  # Asegúrate de que el tipo sea `str` si es así
    machine: MachineEdit,  # Este es el cuerpo de la solicitud
    db: Session = Depends(get_db)
):
    updated_cloud_machine = cloud_machine_crud.update_cloud_machine(
        db, machine_id=machine_id, vm_name = machine.name, vm_size = machine.flavor, os=machine.os  
    )
    if not updated_cloud_machine:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Internal error: no Cloud Machine founded"
        )
    return updated_cloud_machine

@router.delete("/delete_machine/{machine_id}", response_model=None)
def delete_machine(machine_id: str, db: Session = Depends(get_db)):
    command = ['microstack.openstack', 'server', 'delete', machine_id]

    print(command)
    try:
        result = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, check=True)
        print("Output:\n", result.stdout)

    except subprocess.CalledProcessError as e:
        print("Error:\n", e.stderr)
        return e.stderr
    
    # Llamada a la función del CRUD para eliminar la máquina
    deleted_machine = cloud_machine_crud.delete_cloud_machine(db, machine_id=machine_id)
    
    if not deleted_machine:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No cloud machine found to delete"
        )
    
    return {"message": f"Machine {machine_id} deleted successfully"}

@router.put("/reboot_machine/{machine_id}", response_model=None)
def delete_machine(machine_id: str, db: Session = Depends(get_db)):
    command = ['microstack.openstack', 'server', 'reboot', "--soft", machine_id]

    print(command)
    try:
        result = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, check=True)
        print("Output:\n", result.stdout)

    except subprocess.CalledProcessError as e:
        print("Error:\n", e.stderr)
        return e.stderr
    
    return {"message": f"Machine {machine_id} rebooted successfully"}
