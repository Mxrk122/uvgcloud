from pydantic import BaseModel

class MachineCreate(BaseModel):
    owner: str
    name: str
    flavor: str
    os: str
