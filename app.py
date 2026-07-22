from models.resume import Resume

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

from api.resume_routes import (
    resume_bp
)

import os

from config import (
    Config,
    TestingConfig
)

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
# Configuration
# -----------------------------

config_class = (
    TestingConfig
    if os.getenv("FLASK_ENV") == "testing"
    else Config
)

app.config.from_object(
    config_class
)


os.makedirs(
    app.config["UPLOAD_FOLDER"],
    exist_ok=True
)


# -----------------------------
# Rate Limiter
# -----------------------------

app.config[
    "RATELIMIT_HEADERS_ENABLED"
] = True



# -----------------------------
# CORS
# -----------------------------

CORS(
    app,
    resources={
        r"/*": {
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

jwt.init_app(
    app
)

cache.init_app(
    app
)

mail.init_app(
    app
)

limiter.init_app(
    app
)



# -----------------------------
# Load Models
# -----------------------------

with app.app_context():

    import models

    from models.token_blocklist import (
        TokenBlocklist
    )



# -----------------------------
# JWT Token Blocklist
# -----------------------------

@jwt.token_in_blocklist_loader
def check_if_token_revoked(
        jwt_header,
        jwt_payload):

    jti = jwt_payload["jti"]

    token = (
        TokenBlocklist.query
        .filter_by(
            jti=jti
        )
        .first()
    )

    return token is not None



# -----------------------------
# Error Handlers
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


# Day 32 Notification System

from api.notification_routes import (
    notification_bp
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
    resume_bp
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


# Notification API

app.register_blueprint(
    notification_bp
)



# -----------------------------
# Swagger
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



@app.route("/routes")
def routes():

    return {

        "routes":

        sorted(

            [
                str(rule)

                for rule

                in app.url_map.iter_rules()

            ]

        )

    }



@app.route("/redis-debug")
def redis_debug():

    return {

        "CACHE_TYPE":
        app.config["CACHE_TYPE"],

        "CACHE_REDIS_HOST":
        app.config["CACHE_REDIS_HOST"],

        "CACHE_REDIS_PORT":
        app.config["CACHE_REDIS_PORT"],

        "REDIS_HOST_ENV":
        os.getenv("REDIS_HOST"),

        "REDIS_PORT_ENV":
        os.getenv("REDIS_PORT")

    }



@app.route("/config-debug")
def config_debug():

    return {

        "HAS_ADZUNA_APP_ID":
        "ADZUNA_APP_ID" in app.config,

        "ADZUNA_APP_ID":
        app.config.get(
            "ADZUNA_APP_ID"
        ),

        "ADZUNA_APP_KEY":
        app.config.get(
            "ADZUNA_APP_KEY"
        ),

        "CACHE_REDIS_PORT":
        app.config.get(
            "CACHE_REDIS_PORT"
        )

    }



# -----------------------------
# Run Application
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
        debug=True,
        use_reloader=False
    )