from flask import Flask

from config import Config

from extensions import (
    db,
    migrate,
    jwt
)

app = Flask(__name__)

# Load config
app.config.from_object(Config)

# Temporary direct JWT config
app.config["JWT_SECRET_KEY"] = "super-secret-key"

print("JWT_SECRET_KEY =", app.config.get("JWT_SECRET_KEY"))
print("DATABASE_URL =", app.config.get("SQLALCHEMY_DATABASE_URI"))

# Initialize extensions
db.init_app(app)

migrate.init_app(
    app,
    db
)

jwt.init_app(app)

# Import models
with app.app_context():
    import models

# Register error handlers
from services.error_handlers import (
    register_error_handlers
)

register_error_handlers(app)

# Register blueprints
from api.application_routes import (
    application_bp
)

from api.auth_routes import (
    auth_bp
)

app.register_blueprint(
    application_bp
)

app.register_blueprint(
    auth_bp
)


@app.route("/")
def home():

    return (
        "Day 7 JWT Authentication Running!"
    )


if __name__ == "__main__":

    app.run(
        debug=True,
        use_reloader=False
    )