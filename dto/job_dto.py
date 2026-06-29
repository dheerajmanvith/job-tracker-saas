class JobDTO:

    def __init__(self, job):

        self.title = job.get(
            "title"
        )

        company = job.get(
            "company",
            {}
        )

        self.company = company.get(
            "display_name"
        )

        self.location = (
            job.get(
                "location",
                {}
            )
            .get(
                "display_name"
            )
        )

        self.salary_min = job.get(
            "salary_min"
        )

        self.salary_max = job.get(
            "salary_max"
        )

    def to_dict(self):

        return {
            "title":
            self.title,

            "company":
            self.company,

            "location":
            self.location,

            "salary_min":
            self.salary_min,

            "salary_max":
            self.salary_max
        }