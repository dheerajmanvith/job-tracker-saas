from flask import (
    Flask,
    send_from_directory
)

from flask_swagger_ui import (
    get_swaggerui_blueprint
)

from flask_cors import (
    CORS
)

from flask_talisman import (
    Talisman
)

import os

from config import Config

from extensions import (
    db,
    migrate,
    jwt,
    cache,
    mail,
    limiter
)

app = Flask(__name__)

# -----------------------------
# Upload Folder
# -----------------------------
app.config.from_object(Config)

os.makedirs(
    app.config["UPLOAD_FOLDER"],
    exist_ok=True
)

# -----------------------------
# Flask Security
# -----------------------------

app.config[
    "RATELIMIT_HEADERS_ENABLED"
] = True

Talisman(
    app,
    content_security_policy=None,
    force_https=False
)

CORS(

    app,

    resources={

        r"/api/*": {

            "origins": "*"

        }

    }

)

# -----------------------------
# Initialize Extensions
# -----------------------------

db.init_app(app)

migrate.init_app(
    app,
    db
)

jwt.init_app(app)

cache.init_app(app)

mail.init_app(app)

limiter.init_app(
    app
)

with app.app_context():

    import models

    from models.token_blocklist import (
        TokenBlocklist
    )

# -----------------------------
# JWT Blocklist
# -----------------------------

@jwt.token_in_blocklist_loader
def check_if_token_revoked(
        jwt_header,
        jwt_payload):

    jti = jwt_payload["jti"]

    token = (
        TokenBlocklist.query.filter_by(
            jti=jti
        ).first()
    )

    return token is not None


# -----------------------------
# Global Error Handlers
# -----------------------------

from services.error_handlers import (
    register_error_handlers
)

register_error_handlers(
    app
)

# -----------------------------
# Blueprints
# -----------------------------

from api.v1.application_routes import (
    application_bp as application_bp_v1
)

from api.v2.application_routes import (
    application_bp as application_bp_v2
)

from api.auth_routes import (
    auth_bp
)

from api.jobs_routes import (
    jobs_bp
)

from api.email_routes import (
    email_bp
)

from api.csv_routes import (
    csv_bp
)

from api.analytics_routes import (
    analytics_bp
)

from api.admin_routes import (
    admin_bp
)

# -----------------------------
# Register Blueprints
# -----------------------------

app.register_blueprint(
    application_bp_v1
)

app.register_blueprint(
    application_bp_v2
)

app.register_blueprint(
    auth_bp
)

app.register_blueprint(
    jobs_bp
)

app.register_blueprint(
    email_bp
)

app.register_blueprint(
    csv_bp
)

app.register_blueprint(
    analytics_bp
)

app.register_blueprint(
    admin_bp
)

# -----------------------------
# Swagger Configuration
# -----------------------------

SWAGGER_URL = "/docs"

API_URL = "/swagger/swagger.json"

swaggerui_blueprint = (
    get_swaggerui_blueprint(
        SWAGGER_URL,
        API_URL,
        config={
            "app_name":
            "Job Tracker SaaS"
        }
    )
)

app.register_blueprint(
    swaggerui_blueprint,
    url_prefix=SWAGGER_URL
)


@app.route(
    "/swagger/swagger.json"
)
def swagger_json():

    return send_from_directory(
        "swagger",
        "swagger.json"
    )


# -----------------------------
# Home
# -----------------------------

@app.route("/")
def home():

    return (
        "Job Tracker SaaS Running!"
    )

@app.route("/health")
def health():
    return {
        "status": "healthy"
    }, 200

# -----------------------------
# Debug Routes
# -----------------------------

@app.route("/mail-debug")
def mail_debug():

    return {

        "MAIL_SERVER":
        app.config["MAIL_SERVER"],

        "MAIL_PORT":
        app.config["MAIL_PORT"],

        "MAIL_USERNAME":
        app.config["MAIL_USERNAME"],

        "MAIL_DEFAULT_SENDER":
        app.config["MAIL_DEFAULT_SENDER"],

        "MAIL_USE_TLS":
        app.config["MAIL_USE_TLS"],

        "MAIL_USE_SSL":
        app.config["MAIL_USE_SSL"]

    }


@app.route("/mail-password")
def mail_password():

    return {

        "password_length":
        len(
            app.config["MAIL_PASSWORD"]
        ),

        "starts_with":
        app.config["MAIL_PASSWORD"][:4]

    }


@app.route("/routes")
def routes():

    return {

        "routes": sorted(

            [

                str(rule)

                for rule in app.url_map.iter_rules()

            ]

        )

    }


# -----------------------------
# Main
# -----------------------------

if __name__ == "__main__":

    from scheduler import (
        start_scheduler
    )

    start_scheduler(
        app
    )

    app.run(
    host="0.0.0.0",
    port=5000,
    debug=False,
    use_reloader=False
)