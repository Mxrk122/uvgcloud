import os

class Settings():
    SQLALCHEMY_DATABASE_URL: str = "postgresql://postgres:password@172.18.0.2:5432/mydatabase"

    class Config:
        env_file = ".env"

settings = Settings()
