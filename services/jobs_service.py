import requests

from flask import current_app

from dto.job_dto import (
    JobDTO
)

from extensions import (
    cache
)


class JobsService:

    @staticmethod
    def search_jobs(
            keyword,
            location):

        cache_key = (
            f"{keyword}:{location}"
        )

        cached_jobs = (
            cache.get(
                cache_key
            )
        )

        if cached_jobs:

            print(
                f"CACHE HIT: {cache_key}"
            )

            return cached_jobs

        print(
            f"CACHE MISS: {cache_key}"
        )

        app_id = (
            current_app.config[
                "ADZUNA_APP_ID"
            ]
        )

        app_key = (
            current_app.config[
                "ADZUNA_APP_KEY"
            ]
        )

        url = (
            "https://api.adzuna.com/v1/api/jobs/in/search/1"
        )

        params = {
            "app_id":
            app_id,

            "app_key":
            app_key,

            "what":
            keyword,

            "where":
            location,

            "results_per_page":
            5
        }

        response = requests.get(
            url,
            params=params
        )

        response.raise_for_status()

        data = response.json()

        jobs = []

        for job in data.get(
                "results",
                []
        ):

            jobs.append(
                JobDTO(job).to_dict()
            )

        cache.set(
            cache_key,
            jobs,
            timeout=1800
        )

        return jobs