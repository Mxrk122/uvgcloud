"""cloud machines added

Revision ID: 9f9d9cdab74a
Revises: f54c2fba441b
Create Date: 2024-08-05 22:24:12.803052

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '9f9d9cdab74a'
down_revision: Union[str, None] = 'f54c2fba441b'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
