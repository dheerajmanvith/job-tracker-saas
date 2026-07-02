"""Add role column to users

Revision ID: 8f60d66c0c8b
Revises: ee9cc05c248c
Create Date: 2026-07-02

"""

from alembic import op
import sqlalchemy as sa


# Use the values that were generated in your migration
revision = "8f60d66c0c8b"
down_revision = "ee9cc05c248c"
branch_labels = None
depends_on = None


def upgrade():
    with op.batch_alter_table("users", schema=None) as batch_op:
        batch_op.add_column(
            sa.Column(
                "role",
                sa.String(length=10),
                nullable=False,
                server_default="USER"
            )
        )

    # Remove the server default after existing rows are updated
    with op.batch_alter_table("users", schema=None) as batch_op:
        batch_op.alter_column(
            "role",
            server_default=None
        )


def downgrade():
    with op.batch_alter_table("users", schema=None) as batch_op:
        batch_op.drop_column("role")