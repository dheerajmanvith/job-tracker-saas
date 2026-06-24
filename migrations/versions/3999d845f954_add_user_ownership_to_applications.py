"""add user ownership to applications

Revision ID: 3999d845f954
Revises: bc2b2d361c3f
Create Date: 2026-06-24 11:20:23.651296
"""

from alembic import op
import sqlalchemy as sa


revision = "3999d845f954"
down_revision = "bc2b2d361c3f"
branch_labels = None
depends_on = None


def upgrade():

    with op.batch_alter_table(
        "job_applications"
    ) as batch_op:

        batch_op.add_column(
            sa.Column(
                "user_id",
                sa.Integer(),
                nullable=True
            )
        )

        batch_op.create_foreign_key(
            "fk_job_applications_user_id",
            "users",
            ["user_id"],
            ["id"]
        )


def downgrade():

    with op.batch_alter_table(
        "job_applications"
    ) as batch_op:

        batch_op.drop_constraint(
            "fk_job_applications_user_id",
            type_="foreignkey"
        )

        batch_op.drop_column(
            "user_id"
        )