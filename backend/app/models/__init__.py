# models/__init__.py

# Importa la base declarativa primero
from app.db.base import Base

# Luego importa los modelos específicos
from app.models.users import User

# Añade todos los modelos a __all__ para que sean accesibles al importar el paquete models
__all__ = ["Base", "User"]
