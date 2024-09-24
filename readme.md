# UVGCloud

**UVGCloud** es una plataforma desarrollada para la Universidad del Valle de Guatemala, que permite el despliegue y gestión de máquinas virtuales utilizando herramientas como **Microstack**, **Docker** y **Python**.

## Requisitos Previos
Es recomendable utilizar un sistema con Linux para ejecutar la plataforma

Antes de comenzar, asegúrate de tener los siguientes componentes instalados en tu máquina:

- **Microstack** funcionando en tu sistema (El proyecto está construido para funcionar con los comandos específicos de Microstack)
- **Python 3** (preferentemente Python 3.8 o superior)
- **Docker** (para ejecutar la base de datos)
- **Git** (opcional, para clonar el repositorio)
- **Node** (18.16.1 o superior)
- **npm** (9.8.1 o superior)

## Pasos para Levantar la Plataforma
El orden de los pasos es crítico para el correcto funcionamiento

### 1. Instalar las dependencias de Python

Puedes utilizar un venv. Las dependencias se encuentran en el archivo **requirements.txt**

```bash
pip install -r requirements.txt
```
Deberas asegurarte de que las librerias de python puedan ejecutarse en cmd (añadirlas a las variables de entorno).
### 2 Levantar la base de datos con Docker
Deberas dirigirte al directorio **database** y ejecutar el siguiente comando:
```bash
docker-compose up --build -d
```
Opcional: puedes acceder al archivo docker-compose para cambiar el nombre del contenedor, puerto, etc.
### 3. Consultar la ip del contenedor de la base de datos de Docker
Nos será útil para establecer conexión entre la base de datos y el  API
```bash
docker inspect <nombre_contenedor> | grep "IPAddress"
```
### 4. Actualizar Configuraciones con la IP obtenida
Actualiza los archivos de configuración con la IP obtenida del contenedor:
- Modifica el archivo **backend/alembic/alembic.ini** y actualiza la línea correspondiente a la dirección IP de la base de datos.
```python
sqlalchemy.url = postgresql://postgres:password@<ip_contenedor>:5432/<nombre_base_de_datos>
```
- Modifica **backend/app/core/config.py** para reflejar la nueva IP de la base de datos.
```python
SQLALCHEMY_DATABASE_URL: str = "postgresql://postgres:password@<ip_contenedor>:5432/<nombre_base_de_datos>"
```
### 5. Aplicar la última versión de la base de datos almacenada con Alembic
Dentro de alembic se encuentra el contenedor con las versiones de la base de datos. Este directorio es crítico y no debe ser modificado. Para aplicar las migraciones ejecutamos el siguiente comando:
```bash
alembic upgrade head
```
### 6. Levantar el API
Dirígete a la carpeta **backend** y utiliza el siguiente comando para levantar el API:
```bash
uvicorn app.main:app --host 0.0.0.0 --port 8080 --reload --reload-dir ./app
```
**--reload-dir ./app** indica que, al hacer cambios en el directorio, el API se reiniciará automáticamente
### 7. Levantar el frontend
Dirigirse al directorio **frontend** e isntalar todas las dependencias:
```bash
npm i
```
Ejecutar la aplicación de vite
```bash
npm run dev
```
# Uso