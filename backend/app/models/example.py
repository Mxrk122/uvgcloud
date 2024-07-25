# models/users.py

from sqlalchemy import Column, Integer, String
from app.db.base import Base  # Asegúrate de que la importación sea correcta

class Example(Base):
    __tablename__ = 'example'
    
    __table_args__ = {'extend_existing': True}  # <-- Añade esta línea

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, index=True)
    password = Column(String, index=True)
    
        