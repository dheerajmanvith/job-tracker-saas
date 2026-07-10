"""rename created_at to applied_date

Revision ID: 9077f822d927
Revises: cf154ff047c1
"""

from alembic import op
import sqlalchemy as sa

revision = "9077f822d927"
down_revision = "cf154ff047c1"
branch_labels = None
depends_on = None


def upgrade():
    # 1. Add the new column
    op.add_column(
        "job_applications",
        sa.Column("applied_date", sa.DateTime(), nullable=True),
    )

    # 2. Copy data
    op.execute("""
        UPDATE job_applications
        SET applied_date = created_at
    """)

    # 3. Remove old indexes if they exist
    try:
        op.drop_index("ix_job_applications_created_at", table_name="job_applications")
    except Exception:
        pass

    # 4. Drop old column
    op.drop_column("job_applications", "created_at")

    # 5. Create new index
    op.create_index(
        "idx_applied_date",
        "job_applications",
        ["applied_date"],
        unique=False,
    )


def downgrade():
    op.add_column(
        "job_applications",
        sa.Column("created_at", sa.DateTime(), nullable=True),
    )

    op.execute("""
        UPDATE job_applications
        SET created_at = applied_date
    """)

    op.drop_index("idx_applied_date", table_name="job_applications")

    op.drop_column("job_applications", "applied_date")

    op.create_index(
        "ix_job_applications_created_at",
        "job_applications",
        ["created_at"],
        unique=False,
    )