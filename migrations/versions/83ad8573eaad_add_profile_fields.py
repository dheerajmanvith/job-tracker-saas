"""Add profile fields

Revision ID: 83ad8573eaad
Revises: b55fac6c7622
Create Date: 2026-07-22 13:17:58.006760

"""

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "83ad8573eaad"
down_revision = "b55fac6c7622"
branch_labels = None
depends_on = None


def upgrade():

    with op.batch_alter_table("users", schema=None) as batch_op:

        batch_op.add_column(
            sa.Column(
                "timezone",
                sa.String(length=100),
                nullable=False,
                server_default="UTC"
            )
        )

        batch_op.add_column(
            sa.Column(
                "webhook_url",
                sa.String(length=500),
                nullable=True
            )
        )

        batch_op.add_column(
            sa.Column(
                "created_at",
                sa.DateTime(),
                server_default=sa.text("now()"),
                nullable=False
            )
        )

        batch_op.add_column(
            sa.Column(
                "updated_at",
                sa.DateTime(),
                server_default=sa.text("now()"),
                nullable=False
            )
        )


def downgrade():

    with op.batch_alter_table("users", schema=None) as batch_op:

        batch_op.drop_column("updated_at")

        batch_op.drop_column("created_at")

        batch_op.drop_column("webhook_url")

        batch_op.drop_column("timezone")