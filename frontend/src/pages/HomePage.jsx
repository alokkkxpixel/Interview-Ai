import { useAuth } from "@/features/auth/hooks/useAuth";
import {
  FileText,
  BarChart3,
  Calendar,
  CheckCircle,
  Download,
  FileSearch,
  LayoutGrid,
  Menu,
  Sparkles,
  Target,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-semibold text-slate-900">
                InterviewMentor
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-8 md:flex">
              <Link
                to="/dashboard"
                className="text-sm font-medium text-slate-600 hover:text-slate-900"
              >
                Solutions
              </Link>

              <Link
                to="/dashboard"
                className="text-sm font-medium text-slate-600 hover:text-slate-900"
              >
                Resources
              </Link>
            </div>

            {/* Desktop CTA */}

            <div className="hidden items-center gap-4 md:flex">
              {user ? (
                <Link
                  to="/dashboard"
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/auth/login"
                    className="text-sm font-medium text-slate-600 hover:text-slate-900"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/dashboard"
                    className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-slate-600" />
              ) : (
                <Menu className="h-6 w-6 text-slate-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-slate-100 bg-white px-4 py-4 md:hidden">
            <div className="flex flex-col gap-4">
              <Link
                to="/dashboard"
                className="text-sm font-medium text-slate-600"
              >
                Solutions
              </Link>
              <Link
                to="/dashboard"
                className="text-sm font-medium text-slate-600"
              >
                Pricing
              </Link>
              <Link
                to="/dashboard"
                className="text-sm font-medium text-slate-600"
              >
                Resources
              </Link>
              <hr className="border-slate-100" />
              {user ? (
                <Link
                  to="/dashboard"
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/auth/login"
                    className="text-left text-sm font-medium text-slate-600"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/dashboard"
                    className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/50 to-white px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pt-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
            {/* Left Content */}
            <div className="flex flex-col justify-center">
              <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1">
                <div className="h-1.5 w-1.5 rounded-full bg-indigo-600"></div>
                <span className="text-xs font-medium text-indigo-700">
                  AI-POWERED CAREER INTELLIGENCE
                </span>
              </div>
              <h1 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Data-Driven
                <br />
                <span className="text-indigo-600">Interview Mastery</span>
                <br />
                for Experts.
              </h1>
              <p className="mb-6 max-w-lg text-sm leading-relaxed text-slate-600 sm:text-base">
                Generate comprehensive interview reports based on your resume,
                self-description, and target job description. Get your real-time
                Match Score and a personalized prep plan.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link to="/dashboard">
                  <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700">
                    Generate My Report
                  </button>
                </Link>
                <Link to="/dashboard">
                  <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">
                    <FileText className="h-4 w-4" />
                    View Sample Report
                  </button>
                </Link>
              </div>
            </div>

            {/* Right Content - Report Card */}
            <div className="relative flex items-center justify-center lg:justify-end">
              <div className="w-full max-w-sm rounded-2xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/50">
                <div className="mb-6 flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Interview Readiness Report
                    </h3>
                    <p className="text-xs text-slate-500">
                      Based on Resume + JD Analysis
                    </p>
                  </div>
                  <button className="rounded-lg border border-slate-200 p-1.5 hover:bg-slate-50">
                    <Download className="h-4 w-4 text-slate-600" />
                  </button>
                </div>

                {/* Score Circle */}
                <div className="mb-6 flex justify-center">
                  <div className="relative">
                    <svg className="h-40 w-40 -rotate-90">
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="currentColor"
                        strokeWidth="10"
                        fill="transparent"
                        className="text-slate-100"
                      />
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="currentColor"
                        strokeWidth="10"
                        fill="transparent"
                        strokeDasharray={440}
                        strokeDashoffset={440 * (1 - 0.82)}
                        strokeLinecap="round"
                        className="text-indigo-600"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-bold text-slate-900">
                        82%
                      </span>
                      <span className="text-xs font-medium text-slate-500">
                        MATCH SCORE
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-indigo-600" />
                      <span className="text-sm font-medium text-slate-700">
                        Resume Alignment
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-slate-900">
                      High
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-indigo-600" />
                      <span className="text-sm font-medium text-slate-700">
                        7-Day Roadmap Ready
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-emerald-600">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="border-y border-slate-100 bg-slate-50/50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-6 text-center text-xs font-semibold uppercase tracking-wider text-slate-400">
            Trusted by candidates now at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-50 grayscale">
            {["Google", "Meta", "Amazon", "Microsoft", "Apple"].map(
              (company) => (
                <div
                  key={company}
                  className="flex h-8 items-center justify-center text-lg font-bold text-slate-600"
                >
                  {company}
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-2xl font-bold text-slate-900 sm:text-3xl">
              The Professional's Preparation Suite
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-slate-600">
              We analyze every dimension of your professional profile to give
              you the exact edge needed for high-stakes roles.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
                <BarChart3 className="h-5 w-5 text-indigo-600" />
              </div>
              <h3 className="mb-2 text-base font-semibold text-slate-900">
                Precision Match Score
              </h3>
              <p className="text-sm leading-relaxed text-slate-600">
                Instantly see how your resume and self-description align with
                the job requirements. Get specific feedback on missing keywords
                and technical gaps.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
                <Calendar className="h-5 w-5 text-indigo-600" />
              </div>
              <h3 className="mb-2 text-base font-semibold text-slate-900">
                Structured 7-Day Roadmap
              </h3>
              <p className="text-sm leading-relaxed text-slate-600">
                A day-by-day guide tailored to your timeline. Master core
                competencies, system design, and behavioral cues in a logical,
                data-backed sequence.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
                <FileSearch className="h-5 w-5 text-indigo-600" />
              </div>
              <h3 className="mb-2 text-base font-semibold text-slate-900">
                Adaptive Technical Questions
              </h3>
              <p className="text-sm leading-relaxed text-slate-600">
                Deep-dive into technical questions generated from the job
                description. Practice the exact domain-specific challenges
                you'll face in the live interview.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ATS Resume Section */}
      <section className="bg-indigo-50/50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left Content */}
            <div>
              <div className="mb-3 inline-flex rounded-full border border-indigo-200 bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                OPTIMIZE FOR SUCCESS
              </div>
              <h2 className="mb-4 text-2xl font-bold text-slate-900 sm:text-3xl">
                ATS-Friendly Resume Generation by AI
              </h2>
              <p className="mb-6 text-sm leading-relaxed text-slate-600">
                Don't let legacy filters block your dream job. Our AI
                re-engineers your existing resume into a high-performance,
                ATS-optimized document that highlights exactly what hiring
                managers (and algorithms) are looking for.
              </p>
              <ul className="mb-6 space-y-3">
                {[
                  "Automatic keyword optimization based on Job Description",
                  "Industry-standard formatting that guarantees readability",
                  "Quantified achievements generated from your experience",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-indigo-600" />
                    <span className="text-sm text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
              <button className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800">
                Build My Resume
              </button>
            </div>

            {/* Right Content - Resume Mockup */}
            <div className="relative">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
                <div className="mb-6 flex items-center gap-4 border-b border-slate-100 pb-4">
                  <div className="h-12 w-12 rounded-full bg-slate-200"></div>
                  <div>
                    <div className="h-4 w-32 rounded bg-slate-200"></div>
                    <div className="mt-2 h-3 w-24 rounded bg-slate-100"></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-3 w-full rounded bg-slate-100"></div>
                  <div className="h-3 w-5/6 rounded bg-slate-100"></div>
                  <div className="h-3 w-4/6 rounded bg-slate-100"></div>
                </div>
                <div className="mt-6 space-y-3">
                  <div className="h-8 w-24 rounded bg-slate-200"></div>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <div className="h-6 w-20 rounded-full bg-indigo-100"></div>
                      <div className="h-6 w-24 rounded-full bg-indigo-100"></div>
                      <div className="h-6 w-16 rounded-full bg-indigo-100"></div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <span className="text-xs font-medium text-indigo-600">
                    ATS SCORE: 95/100
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Features - Only visible on mobile */}
      <section className="bg-slate-50 px-4 py-12 sm:hidden">
        <div className="mx-auto max-w-sm">
          <h2 className="mb-8 text-center text-xl font-bold text-slate-900">
            Your Personal Prep Engine
          </h2>
          <div className="mb-6 flex justify-center">
            <div className="h-1 w-12 rounded-full bg-indigo-600"></div>
          </div>

          <div className="space-y-4">
            {/* Mobile Feature 1 */}
            <div className="rounded-xl bg-white p-5 shadow-sm">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
                <FileText className="h-5 w-5 text-indigo-600" />
              </div>
              <h3 className="mb-2 font-semibold text-slate-900">
                Hyper-Personalized Reports
              </h3>
              <p className="text-sm text-slate-600">
                We analyze your resume, self-description, and target JD to
                predict exact interview questions and optimal answers.
              </p>
            </div>

            {/* Mobile Feature 2 */}
            <div className="rounded-xl bg-white p-5 shadow-sm">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
                <BarChart3 className="h-5 w-5 text-indigo-600" />
              </div>
              <h3 className="mb-2 font-semibold text-slate-900">
                Match Score & Tech Drills
              </h3>
              <p className="text-sm text-slate-600">
                Get an instant ATS Match Score and deep-dive technical questions
                specific to your stack and seniority level.
              </p>
            </div>

            {/* Mobile Feature 3 */}
            <div className="rounded-xl bg-white p-5 shadow-sm">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
                <Calendar className="h-5 w-5 text-indigo-600" />
              </div>
              <h3 className="mb-2 font-semibold text-slate-900">
                7-Day Success Roadmap
              </h3>
              <p className="text-sm text-slate-600">
                A day-by-day structured plan to ensure you're fully prepared and
                confident by your interview date.
              </p>
            </div>
          </div>

          {/* Mobile ATS Section */}
          <div className="mt-8 rounded-xl bg-white p-5 shadow-sm">
            <div className="mb-2 inline-block rounded-full bg-indigo-100 px-2 py-1 text-xs font-semibold text-indigo-700">
              NEW FEATURE
            </div>
            <h3 className="mb-2 text-lg font-bold text-slate-900">
              AI ATS Resume Optimization
            </h3>
            <p className="mb-4 text-sm text-slate-600">
              Don't get ghosted. Our AI rewrites your resume bullet points to
              align perfectly with the job description while maintaining your
              authentic professional voice.
            </p>
            <ul className="mb-4 space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-indigo-600" />
                <span className="text-sm text-slate-700">
                  Keyword Alignment
                </span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-indigo-600" />
                <span className="text-sm text-slate-700">
                  Quantified Achievements
                </span>
              </li>
            </ul>
            <div className="overflow-hidden rounded-xl">
              <div className="aspect-video bg-gradient-to-br from-slate-900 to-slate-800"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl bg-slate-900 px-6 py-12 text-center sm:px-12 sm:py-16">
            <h2 className="mb-3 text-2xl font-bold text-white sm:text-3xl">
              Your Next Role is Waiting.
              <br />
              Be Ready for It.
            </h2>
            <p className="mx-auto mb-6 max-w-lg text-sm text-slate-400">
              Join 10,000+ candidates who used InterviewMentor to secure their
              positions at Tier 1 tech companies. Get your AI-generated report
              today.
            </p>
            <button className="mb-2 rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-indigo-700">
              Get Started Now
            </button>
            <p className="text-xs text-slate-500">FREE 7-DAY TRIAL INCLUDED</p>
          </div>
        </div>
      </section>

      {/* Mobile CTA - Dark */}
      <section className="bg-indigo-700 px-4 py-10 sm:hidden">
        <div className="mx-auto max-w-sm text-center">
          <h2 className="mb-3 text-xl font-bold text-white">
            Stop guessing. Start practicing.
          </h2>
          <p className="mb-6 text-sm text-indigo-200">
            Join candidates at top-tier firms using AI to secure their offers.
          </p>
          <button className="mb-3 w-full rounded-lg bg-white px-5 py-3 text-sm font-medium text-indigo-700">
            Start My Free Analysis
          </button>
          <p className="text-xs text-indigo-300">No credit card required</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Mobile Footer */}
          <div className="sm:hidden">
            <div className="mb-6 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-semibold text-slate-900">
                InterviewMentor
              </span>
            </div>
            <p className="mb-6 text-sm text-slate-600">
              AI Intelligence for the modern professional.
            </p>
            <div className="grid grid-cols-2 gap-6 text-sm">
              <div>
                <h4 className="mb-3 font-semibold text-slate-900">Legal</h4>
                <ul className="space-y-2 text-slate-600">
                  <li>
                    <a href="#">Privacy</a>
                  </li>
                  <li>
                    <a href="#">Terms</a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="mb-3 font-semibold text-slate-900">Social</h4>
                <ul className="space-y-2 text-slate-600">
                  <li>
                    <a href="#">Twitter</a>
                  </li>
                  <li>
                    <a href="#">LinkedIn</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Desktop Footer */}
          <div className="hidden grid-cols-4 gap-8 sm:grid">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <span className="text-lg font-semibold text-slate-900">
                  InterviewMentor
                </span>
              </div>
              <p className="text-xs text-slate-600">
                The premium AI-driven platform for elite career preparation.
                Data-backed intelligence for high-stakes moments.
              </p>
            </div>
            <div>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-900">
                Product
              </h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <Link href="/dashboard" className="hover:text-slate-900">
                    Reports
                  </Link>
                </li>
                <li>
                  <Link href="/analysis/new" className="hover:text-slate-900">
                    Roadmaps
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-slate-900">
                    ATS Resume
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-900">
                Legal
              </h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <a href="#" className="hover:text-slate-900">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-slate-900">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-900">
                Connect
              </h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <a
                    href="https://x.com/AlokkxPithale_/"
                    className="flex items-center gap-2 hover:text-slate-900"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/alokk-pithale-02a4972a8/"
                    className="flex items-center gap-2 hover:text-slate-900"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-slate-100 pt-8 text-center">
            <p className="text-xs text-slate-500">
              © 2024 InterviewMentor AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 border-t border-slate-200 bg-white px-4 py-2 sm:hidden">
        <div className="flex items-center justify-around">
          <a
            href="#"
            className="flex flex-col items-center gap-1 text-indigo-600"
          >
            <LayoutGrid className="h-5 w-5" />
            <span className="text-[10px] font-medium">Home</span>
          </a>
          <a
            href="#"
            className="flex flex-col items-center gap-1 text-slate-400"
          >
            <FileText className="h-5 w-5" />
            <span className="text-[10px] font-medium">Report</span>
          </a>
          <a
            href="#"
            className="flex flex-col items-center gap-1 text-slate-400"
          >
            <Sparkles className="h-5 w-5" />
            <span className="text-[10px] font-medium">ATS Pro</span>
          </a>
          <a
            href="#"
            className="flex flex-col items-center gap-1 text-slate-400"
          >
            <User className="h-5 w-5" />
            <span className="text-[10px] font-medium">Profile</span>
          </a>
        </div>
      </nav>

      {/* Padding for mobile bottom nav */}
      <div className="h-16 sm:hidden"></div>
    </div>
  );
}
