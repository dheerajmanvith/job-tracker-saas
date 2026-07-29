"""add server default to is_active

Revision ID: e68d38e0e534
Revises: e600d02b0ad2
Create Date: 2026-07-29 14:14:42.025021

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e68d38e0e534'
down_revision = 'e600d02b0ad2'
branch_labels = None
depends_on = None


def upgrade():
    op.alter_column('users', 'is_active',
        server_default=sa.text('true')
    )


def downgrade():
    op.alter_column('users', 'is_active',
        server_default=None
    )