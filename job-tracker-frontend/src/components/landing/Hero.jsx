import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="min-h-[80vh] flex items-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="max-w-4xl mx-auto text-center">

          {/* Badge */}
          <div className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 mb-6">
            🚀 Simplify Your Job Search
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">
            Organize Your Job Search
            <span className="block text-blue-600">
              In One Place
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Track applications, manage interviews, organize resumes,
            and stay on top of your job search with a simple and powerful
            job tracking platform.
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">

            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Get Started
            </Link>

            <a
              href="#features"
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-base font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Explore Features
            </a>

          </div>

          {/* Trust text */}
          <p className="mt-6 text-sm text-gray-500">
            Track applications • Manage interviews • Build your career
          </p>

        </div>
      </div>
    </section>
  );
}

export default Hero;