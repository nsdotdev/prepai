import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const features = [
  {
    icon: '🤖',
    title: 'AI-Generated Questions',
    desc: 'Get fresh, role-specific questions tailored to your chosen tech stack and experience level — every session is unique.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: '⚡',
    title: 'Instant AI Feedback',
    desc: 'Receive detailed, structured feedback on every answer within seconds. Know exactly what you said well and what to improve.',
    color: 'from-primary-500 to-indigo-500',
  },
  {
    icon: '📊',
    title: 'Progress Tracking',
    desc: 'Monitor your improvement over time with session history, score trends, and detailed analytics across all interviews.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: '🎯',
    title: 'Role-Specific Practice',
    desc: 'Choose from Frontend, Backend, or Full Stack tracks. Each path has curated questions that match real interview expectations.',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: '📈',
    title: 'Difficulty Progression',
    desc: 'Start at Easy and work your way up. Our adaptive difficulty system keeps your practice sessions challenging and relevant.',
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: '💡',
    title: 'Model Answers',
    desc: 'Every evaluation includes a model answer — learn not just if your answer was right, but how an expert would phrase it.',
    color: 'from-rose-500 to-red-500',
  },
];

const steps = [
  {
    num: '01',
    title: 'Choose Your Track',
    desc: 'Select your role (Frontend, Backend, or Full Stack) and difficulty level to get perfectly calibrated questions.',
    icon: '🎯',
  },
  {
    num: '02',
    title: 'Answer 5 Questions',
    desc: 'Work through 5 carefully crafted technical questions at your own pace. Take your time to craft thoughtful answers.',
    icon: '✍️',
  },
  {
    num: '03',
    title: 'Get Detailed Feedback',
    desc: 'Receive AI-powered scoring, strengths analysis, improvement tips, and a model answer for each question.',
    icon: '🚀',
  },
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Frontend Engineer at Google',
    avatar: 'SC',
    color: 'from-blue-500 to-cyan-500',
    quote:
      'PrepAI completely transformed my interview preparation. I went from bombing technical screens to landing my dream job in 6 weeks. The AI feedback is genuinely insightful.',
    stars: 5,
  },
  {
    name: 'Marcus Johnson',
    role: 'Senior Backend Dev at Stripe',
    avatar: 'MJ',
    color: 'from-purple-500 to-pink-500',
    quote:
      'I was skeptical about AI-powered prep, but the quality of questions and depth of feedback blew me away. This is leagues above LeetCode grinding alone.',
    stars: 5,
  },
  {
    name: 'Priya Patel',
    role: 'Full Stack Engineer at Shopify',
    avatar: 'PP',
    color: 'from-emerald-500 to-teal-500',
    quote:
      'The progress tracking helped me identify my weak spots — system design and architecture questions. Three weeks later, I nailed my Shopify panel. Worth every minute.',
    stars: 5,
  },
];

const stats = [
  { value: '12,000+', label: 'Engineers Prepared' },
  { value: '89%', label: 'Success Rate' },
  { value: '50,000+', label: 'Sessions Completed' },
  { value: '4.9 / 5', label: 'Average Rating' },
];

function StarRating({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Landing() {
  return (
    <div className="overflow-x-hidden">
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-indigo-50 to-white dark:from-slate-950 dark:via-indigo-950 dark:to-slate-950 transition-colors duration-300">

        {/* Blobs — lighter in light mode */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-400/15 dark:bg-primary-600/20 rounded-full filter blur-[100px] animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-400/15 dark:bg-purple-600/20 rounded-full filter blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-400/10 dark:bg-indigo-800/10 rounded-full filter blur-[120px]" />
        </div>

        {/* Grid — adapts to mode */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#6366f115_1px,transparent_1px),linear-gradient(to_bottom,#6366f115_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-white/10 border border-primary-200 dark:border-white/20 text-sm text-primary-700 dark:text-slate-300 mb-8 backdrop-blur-sm animate-fade-in">
            <span className="w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full animate-pulse" />
            AI-Powered Interview Preparation Platform
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white mb-6 leading-tight tracking-tight animate-slide-up">
            Ace Every{' '}
            <span className="bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 dark:from-primary-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              Technical
            </span>
            <br />
            Interview
          </h1>

          {/* Sub */}
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Practice with AI-generated questions, get expert-level feedback, and track your progress.
            Land your dream engineering role at top tech companies.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link to="/register" className="btn-primary text-base py-4 px-8 rounded-2xl shadow-2xl shadow-primary-600/25">
              Start Practicing Free
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white dark:bg-white/10 hover:bg-slate-50 dark:hover:bg-white/15 border border-slate-200 dark:border-white/20 text-slate-800 dark:text-white font-semibold transition-all duration-200 shadow-sm"
            >
              Sign In
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.3s' }}>
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white/80 dark:bg-white/10 backdrop-blur-md border border-slate-200 dark:border-white/20 rounded-2xl p-4"
              >
                <div className="text-2xl font-black text-slate-900 dark:text-white">{stat.value}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-400 dark:text-slate-500 animate-bounce">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-semibold mb-4">
              Everything You Need
            </div>
            <h2 className="section-title">Built for serious candidates</h2>
            <p className="section-subtitle">
              Every feature is designed to maximize your chances of landing the job.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="card-hover p-6 group">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center text-2xl mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{f.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how-it-works" className="py-24 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-semibold mb-4">
              Simple Process
            </div>
            <h2 className="section-title">From zero to interview-ready</h2>
            <p className="section-subtitle">Three steps to transform your interview performance.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-14 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-primary-200 to-purple-200 dark:from-primary-800 dark:to-purple-800" />
            {steps.map((step, i) => (
              <div key={step.num} className="relative flex flex-col items-center text-center group">
                <div className="relative z-10 w-28 h-28 rounded-3xl bg-white dark:bg-slate-800 border-2 border-primary-100 dark:border-primary-900 shadow-xl flex items-center justify-center mb-6 group-hover:border-primary-400 transition-all duration-300">
                  <span className="text-4xl">{step.icon}</span>
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white text-xs font-black shadow-lg">
                    {i + 1}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{step.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/register" className="btn-primary text-base py-3.5 px-8">
              Get Started for Free
            </Link>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-sm font-semibold mb-4">
              Success Stories
            </div>
            <h2 className="section-title">Engineers who made it</h2>
            <p className="section-subtitle">Join thousands of developers who landed their dream roles using PrepAI.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="card-hover p-7">
                <StarRating count={t.stars} />
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed my-5 text-sm">"{t.quote}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white text-sm">{t.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-slate-100 dark:from-slate-950 dark:via-indigo-950 dark:to-slate-950 transition-colors duration-300">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-400/10 dark:bg-primary-600/15 rounded-full filter blur-[100px]" />
        </div>
        {/* Light mode grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#6366f110_1px,transparent_1px),linear-gradient(to_bottom,#6366f110_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
            Ready to ace your next
            <br />
            <span className="bg-gradient-to-r from-primary-600 to-purple-600 dark:from-primary-400 dark:to-purple-400 bg-clip-text text-transparent">
              technical interview?
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto">
            Join 12,000+ engineers who prep smarter with PrepAI. Start free — no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="btn-primary text-lg py-4 px-10 rounded-2xl shadow-2xl shadow-primary-600/25">
              Start Free Today
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
          <p className="mt-5 text-sm text-slate-500 dark:text-slate-500">No credit card required · Free forever plan</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
