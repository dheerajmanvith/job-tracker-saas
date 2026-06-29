from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_caching import Cache
from flask_mail import Mail

# Database
db = SQLAlchemy()

# Database migrations
migrate = Migrate()

# JWT Authentication
jwt = JWTManager()

# Redis Cache
cache = Cache()

# Flask-Mail
mail = Mail()