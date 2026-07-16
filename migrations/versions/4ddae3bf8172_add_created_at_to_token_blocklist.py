"""add created_at to token_blocklist

Revision ID: <keep the generated id>
Revises: <keep the generated down_revision, should be 33438912a8ec>
Create Date: ...
"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '<generated>'
down_revision = '33438912a8ec'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column(
        'token_blocklist',
        sa.Column('created_at', sa.DateTime(), nullable=True)
    )
    # backfill existing rows so nullable can be tightened later if desired
    op.execute("UPDATE token_blocklist SET created_at = now() WHERE created_at IS NULL")


def downgrade():
    op.drop_column('token_blocklist', 'created_at')