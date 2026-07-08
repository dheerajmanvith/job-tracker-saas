from celery import Celery

celery = Celery(
    "job_tracker",
    broker="redis://localhost:6379/0",
    backend="redis://localhost:6379/0",
    include=[
        "tasks.sample_tasks",
        "tasks.resume_tasks"
    ]
)