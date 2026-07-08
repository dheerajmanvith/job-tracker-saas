from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_caching import Cache
from flask_mail import Mail

from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()

cache = Cache()

mail = Mail()

limiter = Limiter(
    key_func=get_remote_address,
    default_limits=["100 per minute"],
    storage_uri="redis://localhost:6379/0"
)