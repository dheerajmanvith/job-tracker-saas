from flask import Flask

from config import Config

from extensions import (
    db,
    migrate
)

app = Flask(__name__)

app.config.from_object(Config)

db.init_app(app)
migrate.init_app(app, db)

with app.app_context():
    import models

from services.error_handlers import (
    register_error_handlers
)

register_error_handlers(app)

from api.application_routes import (
    application_bp
)

app.register_blueprint(
    application_bp
)


@app.route("/")
def home():
    return "Day 5 Running!"


if __name__ == "__main__":
    app.run(
    debug=True,
    use_reloader=False
)