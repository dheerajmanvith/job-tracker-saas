function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Everything you need to get started.",
      features: [
        "Track job applications",
        "Manage application statuses",
        "Basic dashboard",
        "Resume management",
      ],
      button: "Get Started",
      highlighted: false,
    },
    {
      name: "Pro",
      price: "$9",
      description: "Advanced tools for an organized job search.",
      features: [
        "Everything in Free",
        "Advanced analytics",
        "Interview reminders",
        "Smart notifications",
        "Priority support",
      ],
      button: "Start Pro",
      highlighted: true,
    },
  ];

  return (
    <section id="pricing" className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section heading */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Pricing
          </p>

          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
            Simple Pricing for Your Job Search
          </h2>

          <p className="mt-4 text-lg text-gray-600">
            Start for free and upgrade when you need more powerful tools.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="mt-12 grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border p-8 shadow-sm ${
                plan.highlighted
                  ? "border-blue-600 shadow-lg"
                  : "border-gray-200"
              }`}
            >
              {/* Popular badge */}
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-1 text-sm font-semibold text-white">
                  Most Popular
                </div>
              )}

              {/* Plan name */}
              <h3 className="text-xl font-semibold text-gray-900">
                {plan.name}
              </h3>

              {/* Description */}
              <p className="mt-2 text-gray-600">
                {plan.description}
              </p>

              {/* Price */}
              <div className="mt-6">
                <span className="text-5xl font-bold text-gray-900">
                  {plan.price}
                </span>

                {plan.name === "Pro" && (
                  <span className="ml-2 text-gray-500">
                    / month
                  </span>
                )}
              </div>

              {/* Features */}
              <ul className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-gray-700"
                  >
                    <span className="mt-0.5 text-green-600">
                      ✓
                    </span>

                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Button */}
              <button
                type="button"
                className={`mt-8 w-full rounded-lg px-5 py-3 font-semibold transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  plan.highlighted
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {plan.button}
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Pricing;