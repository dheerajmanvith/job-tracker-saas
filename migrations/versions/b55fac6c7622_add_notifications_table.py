"""add notifications table

Revision ID: b55fac6c7622
Revises: 05dee91db60b
Create Date: 2026-07-22 10:57:14.749689
"""

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = "b55fac6c7622"
down_revision = "05dee91db60b"
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "notifications",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column("title", sa.String(150), nullable=False),
        sa.Column("message", sa.Text(), nullable=False),
        sa.Column("is_read", sa.Boolean(), nullable=False, server_default=sa.false()),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(
            ["user_id"],
            ["users.id"],
        ),
    )

    op.create_index(
        "ix_notifications_user_id",
        "notifications",
        ["user_id"],
    )


def downgrade():
    op.drop_index(
        "ix_notifications_user_id",
        table_name="notifications",
    )

    op.drop_table("notifications")