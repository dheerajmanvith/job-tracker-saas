import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid gap-10 md:grid-cols-4">

          {/* Brand */}
          <div className="md:col-span-2">
            <Link
              to="/"
              className="text-2xl font-bold text-white"
            >
              Job Tracker
            </Link>

            <p className="mt-4 max-w-md leading-7 text-gray-400">
              A simple and powerful platform to organize your job search,
              track applications, manage interviews, and stay focused on
              your next career opportunity.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-white">
              Product
            </h3>

            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="#features"
                  className="transition hover:text-white"
                >
                  Features
                </a>
              </li>

              <li>
                <a
                  href="#pricing"
                  className="transition hover:text-white"
                >
                  Pricing
                </a>
              </li>

              <li>
                <a
                  href="#faq"
                  className="transition hover:text-white"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="font-semibold text-white">
              Account
            </h3>

            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  to="/login"
                  className="transition hover:text-white"
                >
                  Login
                </Link>
              </li>

              <li>
                <Link
                  to="/login"
                  className="transition hover:text-white"
                >
                  Get Started
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col gap-4 border-t border-gray-800 pt-6 text-sm md:flex-row md:items-center md:justify-between">
          <p>
            © {currentYear} Job Tracker. All rights reserved.
          </p>

          <p className="text-gray-500">
            Built to make your job search easier.
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;