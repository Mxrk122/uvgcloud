# app/db/crud.py

from sqlalchemy.orm import Session
from app.models.users import User
import uuid
from app.utils.hashing import hash_password, verify_password

# CREATE
def create_user(db: Session, email: str, password: str) -> User:
    user_id = uuid.uuid4()  # Generar un UUID para el nuevo usuario
    hashed_password = hash_password(password)
    db_user = User(id=user_id, email=email, password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# READ
def get_user(db: Session, user_id: uuid.UUID) -> User:
    return db.query(User).filter(User.id == user_id).first()

def get_user_by_email(db: Session, email: str) -> User:
    return db.query(User).filter(User.email == email).first()

def authenticate_user(db: Session, email: str, password: str) -> User:
    user = get_user_by_email(db, email)
    if user and verify_password(password, user.password):
        return user
    return None

# UPDATE

# DELETE