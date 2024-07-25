import uuid
from sqlalchemy import Column, String
from sqlalchemy.dialects.postgresql import UUID
from app.db.base import Base

class User(Base):
    __tablename__ = 'Users'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)

    def __str__(self):
        return f'email: {self.email}'