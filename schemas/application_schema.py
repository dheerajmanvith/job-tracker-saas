from marshmallow import (
    Schema,
    fields,
    validates,
    ValidationError
)

from datetime import date


class ApplicationSchema(Schema):

    company = fields.Str(required=True)

    role = fields.Str(required=True)

    applied_date = fields.Date(required=False)

    @validates("company")
    def validate_company(self, value, **kwargs):

        if not value.strip():
            raise ValidationError(
                "Company cannot be empty"
            )

    @validates("applied_date")
    def validate_date(self, value, **kwargs):

        if value > date.today():
            raise ValidationError(
                "Date cannot be in future"
            )