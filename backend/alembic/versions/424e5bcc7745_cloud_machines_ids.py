"""cloud machines ids

Revision ID: 424e5bcc7745
Revises: 9f9d9cdab74a
Create Date: 2024-09-05 13:18:44.013948

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '424e5bcc7745'
down_revision: Union[str, None] = '9f9d9cdab74a'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
