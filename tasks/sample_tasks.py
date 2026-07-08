import time

from celery_app import celery


@celery.task
def long_running_task():
    print("Task Started")

    time.sleep(10)

    print("Task Finished")

    return "Success"