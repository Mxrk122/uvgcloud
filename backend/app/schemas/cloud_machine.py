from pydantic import BaseModel

class MachineCreate(BaseModel):
    id: str
    owner: str
    name: str
    flavor: str
    os: str
