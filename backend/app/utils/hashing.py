# app/utils.py
import bcrypt

def hash_password(password: str) -> str:
    # Generar una sal y cifrar la contraseña
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed_password.decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    # Comparar la contraseña en texto plano con la contraseña cifrada
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))
