from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

from config import Config
from api.application_routes import application_bp

db = SQLAlchemy()
migrate = Migrate()

app = Flask(__name__)

app.config.from_object(Config)

db.init_app(app)
migrate.init_app(app, db)

@app.route("/")
def home():
    return "Day 4 Service Layer Running!"

app.register_blueprint(application_bp)

if __name__ == "__main__":
    app.run(debug=True)