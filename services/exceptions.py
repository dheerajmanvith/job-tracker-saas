class ApplicationNotFound(Exception):
    pass


class DuplicateApplication(Exception):
    pass


class UnauthorizedAccess(Exception):
    pass


class ValidationError(Exception):
    pass