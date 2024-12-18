"""Initial migration2

Revision ID: a0984b273a84
Revises: 33a7072eb56d
Create Date: 2024-12-18 00:10:34.486918

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'a0984b273a84'
down_revision: Union[str, None] = '33a7072eb56d'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
