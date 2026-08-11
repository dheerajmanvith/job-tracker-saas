function Features() {
  const features = [
    {
      icon: "📊",
      title: "Application Tracking",
      description:
        "Keep all your job applications organized and track their progress from one simple dashboard.",
    },
    {
      icon: "📅",
      title: "Interview Management",
      description:
        "Keep track of upcoming interviews, interview stages, and important dates so you never miss an opportunity.",
    },
    {
      icon: "📄",
      title: "Resume Management",
      description:
        "Upload and manage your resumes so you can keep everything related to your job search in one place.",
    },
    {
      icon: "🔔",
      title: "Smart Notifications",
      description:
        "Stay informed about important updates, reminders, and upcoming events throughout your job search.",
    },
    {
      icon: "📈",
      title: "Job Search Analytics",
      description:
        "Understand your job search performance with useful statistics and application insights.",
    },
    {
      icon: "🔐",
      title: "Secure & Private",
      description:
        "Your job search data is protected with authentication and secure access controls.",
    },
  ];

  return (
    <section id="features" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section heading */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Features
          </p>

          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
            Everything You Need to Manage Your Job Search
          </h2>

          <p className="mt-4 text-lg text-gray-600">
            Stay organized, save time, and focus on finding your next
            opportunity.
          </p>
        </div>

        {/* Feature cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Icon */}
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-2xl">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="mt-5 text-xl font-semibold text-gray-900">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="mt-3 leading-7 text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Features;