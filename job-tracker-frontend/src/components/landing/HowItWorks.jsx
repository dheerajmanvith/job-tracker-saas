function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Create Your Account",
      description:
        "Sign up and create your personal job tracking workspace in just a few moments.",
    },
    {
      number: "02",
      title: "Add Your Applications",
      description:
        "Record the jobs you apply for and keep important application details organized.",
    },
    {
      number: "03",
      title: "Track Your Progress",
      description:
        "Monitor interviews, application statuses, reminders, and analytics from your dashboard.",
    },
  ];

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section heading */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            How It Works
          </p>

          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
            Start Tracking Your Job Search in Three Steps
          </h2>

          <p className="mt-4 text-lg text-gray-600">
            A simple workflow designed to help you stay organized throughout
            your job search.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative rounded-xl bg-white p-8 text-center shadow-sm border border-gray-200"
            >
              {/* Number */}
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
                {step.number}
              </div>

              {/* Title */}
              <h3 className="mt-6 text-xl font-semibold text-gray-900">
                {step.title}
              </h3>

              {/* Description */}
              <p className="mt-3 leading-7 text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default HowItWorks;
