from locust import HttpUser, task, between


class JobTrackerUser(HttpUser):

    wait_time = between(1, 3)


    @task
    def health_check(self):

        self.client.get(
            "/"
        )


    @task(3)
    def get_jobs(self):

        self.client.get(
            "/api/jobs/search",
            params={
                "query": "python developer"
            }
        )


    @task(2)
    def analytics(self):

        self.client.get(
            "/analytics"
        )