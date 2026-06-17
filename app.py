from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import Config

db = SQLAlchemy()

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)

migrate = Migrate(app, db)

from models.user import User
from models.job_application import JobApplication

@app.route("/")
def home():
    return "Job Tracker Backend Running"

if __name__ == "__main__":
    app.run(debug=True)
