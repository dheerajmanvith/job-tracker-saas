import { Link } from "react-router-dom";
import {
  ArrowRight,
  BriefcaseBusiness,
  BarChart3,
  Search,
  CheckCircle2,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ==========================
          Navbar
      ========================== */}
      <header className="border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 font-bold tracking-tight"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <BriefcaseBusiness className="h-5 w-5" />
            </div>

            <span className="text-lg">
              JobTracker
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden items-center gap-6 md:flex">
            <a
              href="#features"
              className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
            >
              Features
            </a>

            <a
              href="#how-it-works"
              className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
            >
              How It Works
            </a>

            <Link
              to="/login"
              className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
            >
              Login
            </Link>

            <Link
              to="/login"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      {/* ==========================
          Hero Section
      ========================== */}
      <main>
        <section className="relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-muted/50 px-4 py-2 text-sm font-medium">
                <CheckCircle2 className="h-4 w-4 text-primary" />

                <span>
                  Organize your job search smarter
                </span>
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                Your entire job search.
                <span className="block text-primary">
                  One powerful workspace.
                </span>
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
                Track applications, discover opportunities, monitor your
                progress, and stay organized throughout your job search —
                all from one place.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
                >
                  Start Tracking
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <a
                  href="#features"
                  className="inline-flex items-center justify-center rounded-lg border px-6 py-3 text-sm font-semibold transition hover:bg-muted"
                >
                  Explore Features
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================
            Features
        ========================== */}
        <section
          id="features"
          className="border-y bg-muted/30"
        >
          <div className="mx-auto max-w-7xl px-6 py-20">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                Features
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Everything you need to manage your search
              </h2>

              <p className="mt-4 text-muted-foreground">
                Stop managing your applications across spreadsheets,
                bookmarks, and scattered notes.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {/* Feature 1 */}
              <div className="rounded-xl border bg-background p-6 shadow-sm">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <BriefcaseBusiness className="h-5 w-5" />
                </div>

                <h3 className="text-lg font-semibold">
                  Application Tracking
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Keep every application organized with company,
                  position, status, notes, dates, and other important
                  details.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="rounded-xl border bg-background p-6 shadow-sm">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Search className="h-5 w-5" />
                </div>

                <h3 className="text-lg font-semibold">
                  Job Discovery
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Search for relevant opportunities and keep promising
                  jobs organized alongside your applications.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="rounded-xl border bg-background p-6 shadow-sm">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <BarChart3 className="h-5 w-5" />
                </div>

                <h3 className="text-lg font-semibold">
                  Analytics & Insights
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Understand your job search with useful statistics,
                  response rates, application trends, and progress.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================
            How It Works
        ========================== */}
        <section id="how-it-works">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                How It Works
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Simple from application to offer
              </h2>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  1
                </div>

                <h3 className="mt-5 font-semibold">
                  Add Applications
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Record the jobs you've applied for and keep all
                  important information in one place.
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  2
                </div>

                <h3 className="mt-5 font-semibold">
                  Track Progress
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Move applications through stages such as applied,
                  interview, offer, or rejected.
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  3
                </div>

                <h3 className="mt-5 font-semibold">
                  Analyze & Improve
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Use your analytics to understand what's working
                  and improve your job-search strategy.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================
            CTA
        ========================== */}
        <section className="border-t bg-muted/30">
          <div className="mx-auto max-w-4xl px-6 py-20 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to take control of your job search?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Start organizing your applications and make every
              opportunity easier to manage.
            </p>

            <Link
              to="/login"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>

      {/* ==========================
          Footer
      ========================== */}
      <footer className="border-t">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} JobTracker. All rights reserved.
          </p>

          <div className="flex gap-5">
            <Link
              to="/login"
              className="transition hover:text-foreground"
            >
              Login
            </Link>

            <Link
              to="/settings"
              className="transition hover:text-foreground"
            >
              Settings
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}