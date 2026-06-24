from flask import (
    Flask,
    send_from_directory
)

from flask_swagger_ui import (
    get_swaggerui_blueprint
)

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

# ----------------------------
# Swagger Configuration
# ----------------------------

SWAGGER_URL = "/docs"
API_URL = "/swagger/swagger.json"

swaggerui_blueprint = (
    get_swaggerui_blueprint(
        SWAGGER_URL,
        API_URL,
        config={
            "app_name": "Job Tracker SaaS"
        }
    )
)

app.register_blueprint(
    swaggerui_blueprint,
    url_prefix=SWAGGER_URL
)


@app.route("/swagger/swagger.json")
def swagger_json():

    return send_from_directory(
        "swagger",
        "swagger.json"
    )


@app.route("/")
def home():

    return (
        "Day 8 CRUD APIs + Swagger Running!"
    )


if __name__ == "__main__":

    app.run(
        debug=True,
        use_reloader=False
    )