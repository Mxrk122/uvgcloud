import uuid
from sqlalchemy import Column, String, Text
from sqlalchemy.dialects.postgresql import UUID
from app.db.base import Base

class Cloud_Machine(Base):
    __tablename__ = 'Cloud_machines'
    id = Column(String, primary_key=True, default=str(uuid.uuid4), unique=True, index=True)
    owner = Column(UUID(as_uuid=True), nullable=False, index=True)
    vm_name = Column(String, index=True)
    vm_size = Column(String, index=True)
    os = Column(String, nullable=True)
    port = Column(String, index=True)
