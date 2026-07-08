from flask import (
    Flask,
    send_from_directory,
    jsonify
)

from api.resume_routes import resume_bp

from flask_swagger_ui import (
    get_swaggerui_blueprint
)

from flask_talisman import Talisman
from flask_cors import CORS

from config import Config

from extensions import (
    db,
    migrate,
    jwt,
    cache,
    mail,
    limiter
)

from scheduler import start_scheduler

app = Flask(__name__)

# -------------------------------------------------
# Load Configuration
# -------------------------------------------------
app.config.from_object(Config)

# -------------------------------------------------
# Security
# -------------------------------------------------
Talisman(
    app,
    force_https=False,
    content_security_policy=None
)

# Enable CORS
CORS(app)

# -------------------------------------------------
# Initialize Extensions
# -------------------------------------------------
db.init_app(app)

migrate.init_app(
    app,
    db
)

jwt.init_app(app)

cache.init_app(app)

mail.init_app(app)

limiter.init_app(app)

# -------------------------------------------------
# Initialize Celery
# -------------------------------------------------

# -------------------------------------------------
# Import Models
# -------------------------------------------------
with app.app_context():

    import models

    from models.token_blocklist import (
        TokenBlocklist
    )

# -------------------------------------------------
# JWT Token Blocklist Checker
# -------------------------------------------------
@jwt.token_in_blocklist_loader
def check_if_token_revoked(
    jwt_header,
    jwt_payload
):

    jti = jwt_payload["jti"]

    token = TokenBlocklist.query.filter_by(
        jti=jti
    ).first()

    return token is not None

# -------------------------------------------------
# Register Error Handlers
# -------------------------------------------------
from services.error_handlers import (
    register_error_handlers
)

register_error_handlers(app)

# -------------------------------------------------
# Register Blueprints
# -------------------------------------------------
from api.application_routes import (
    application_bp
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

app.register_blueprint(application_bp)

app.register_blueprint(auth_bp)

app.register_blueprint(jobs_bp)

app.register_blueprint(
    email_bp,
    url_prefix="/email"
)
app.register_blueprint(
    resume_bp,
    url_prefix="/api"
)


app.register_blueprint(csv_bp)

app.register_blueprint(
    analytics_bp,
    url_prefix="/api"
)

# -------------------------------------------------
# Swagger UI
# -------------------------------------------------
SWAGGER_URL = "/docs"
API_URL = "/swagger/swagger.json"

swaggerui_blueprint = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={
        "app_name": "Job Tracker SaaS"
    }
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

    return jsonify({
        "message": "Job Tracker SaaS Running!",
        "status": "success"
    })

# -------------------------------------------------
# Start APScheduler
# -------------------------------------------------
start_scheduler(app)

# -------------------------------------------------
# Run Application
# -------------------------------------------------
if __name__ == "__main__":

    app.run(
        debug=False,
        use_reloader=False
    )