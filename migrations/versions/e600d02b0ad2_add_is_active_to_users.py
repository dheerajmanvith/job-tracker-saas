"""add is_active to users

Revision ID: e600d02b0ad2
Revises: 83ad8573eaad
Create Date: 2026-07-29 13:36:46.631058

"""

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


# revision identifiers, used by Alembic.
revision = "e600d02b0ad2"
down_revision = "83ad8573eaad"
branch_labels = None
depends_on = None


def upgrade():

    # ==========================
    # Create audit_logs table
    # ==========================

    op.create_table(
        "audit_logs",

        sa.Column(
            "id",
            sa.Integer(),
            nullable=False
        ),

        sa.Column(
            "admin_id",
            sa.Integer(),
            nullable=False
        ),

        sa.Column(
            "action",
            sa.String(length=255),
            nullable=False
        ),

        sa.Column(
            "created_at",
            sa.DateTime(),
            nullable=False
        ),

        sa.ForeignKeyConstraint(
            ["admin_id"],
            ["users.id"]
        ),

        sa.PrimaryKeyConstraint(
            "id"
        )
    )


    # ==========================
    # Add is_active column
    # ==========================

    with op.batch_alter_table(
        "users",
        schema=None
    ) as batch_op:

        batch_op.add_column(
            sa.Column(
                "is_active",
                sa.Boolean(),
                nullable=False,
                server_default=sa.true()
            )
        )


    # ==========================
    # Create role enum safely
    # ==========================

    role_enum = sa.Enum(
        "USER",
        "ADMIN",
        name="role"
    )

    role_enum.create(
        op.get_bind(),
        checkfirst=True
    )


    # Convert role column
    op.execute(
        """
        ALTER TABLE users
        ALTER COLUMN role TYPE role
        USING role::role
        """
    )


    # Remove temporary default

    with op.batch_alter_table(
        "users",
        schema=None
    ) as batch_op:

        batch_op.alter_column(
            "is_active",
            server_default=None
        )


    # ==========================
    # Job Applications updates
    # ==========================

    with op.batch_alter_table(
        "job_applications",
        schema=None
    ) as batch_op:

        batch_op.alter_column(
            "applied_date",
            existing_type=postgresql.TIMESTAMP(),
            nullable=False
        )

        batch_op.drop_index(
            batch_op.f("idx_applied_date")
        )

        batch_op.create_index(
            batch_op.f("ix_job_applications_applied_date"),
            ["applied_date"],
            unique=False
        )

        batch_op.drop_column(
            "job_url"
        )

        batch_op.drop_column(
            "location"
        )


    # ==========================
    # Token blocklist update
    # ==========================

    with op.batch_alter_table(
        "token_blocklist",
        schema=None
    ) as batch_op:

        batch_op.alter_column(
            "created_at",
            existing_type=postgresql.TIMESTAMP(),
            nullable=False
        )


def downgrade():

    # Remove is_active

    with op.batch_alter_table(
        "users",
        schema=None
    ) as batch_op:

        batch_op.drop_column(
            "is_active"
        )


    # Remove role enum

    role_enum = sa.Enum(
        "USER",
        "ADMIN",
        name="role"
    )

    role_enum.drop(
        op.get_bind(),
        checkfirst=True
    )


    # Restore job_application columns

    with op.batch_alter_table(
        "job_applications",
        schema=None
    ) as batch_op:

        batch_op.add_column(
            sa.Column(
                "job_url",
                sa.VARCHAR(length=255),
                nullable=True
            )
        )

        batch_op.add_column(
            sa.Column(
                "location",
                sa.VARCHAR(length=100),
                nullable=True
            )
        )


    # Remove audit logs

    op.drop_table(
        "audit_logs"
    )