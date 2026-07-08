"""Add indexes to job_applications

Revision ID: acba7dd41736
Revises: b79563a4efa7
Create Date: 2026-07-08 16:09:34.382232

"""

from alembic import op


# revision identifiers, used by Alembic.
revision = "acba7dd41736"
down_revision = "b79563a4efa7"
branch_labels = None
depends_on = None


def upgrade():
    with op.batch_alter_table("job_applications", schema=None) as batch_op:
        batch_op.create_index(
            batch_op.f("ix_job_applications_created_at"),
            ["created_at"],
            unique=False,
        )

        batch_op.create_index(
            batch_op.f("ix_job_applications_status"),
            ["status"],
            unique=False,
        )

        batch_op.create_index(
            batch_op.f("ix_job_applications_user_id"),
            ["user_id"],
            unique=False,
        )


def downgrade():
    with op.batch_alter_table("job_applications", schema=None) as batch_op:
        batch_op.drop_index(
            batch_op.f("ix_job_applications_user_id")
        )

        batch_op.drop_index(
            batch_op.f("ix_job_applications_status")
        )

        batch_op.drop_index(
            batch_op.f("ix_job_applications_created_at")
        )