import os

from celery import Celery

celery = Celery(
    "job_tracker",
    broker=os.getenv(
        "CELERY_BROKER_URL",
        "redis://redis:6379/0"
    ),
    backend=os.getenv(
        "CELERY_RESULT_BACKEND",
        "redis://redis:6379/0"
    ),
    include=[
        "tasks.sample_tasks",
        "tasks.resume_tasks"
    ]
)