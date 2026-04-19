import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center">
                <span className="text-white text-sm font-bold">P</span>
              </div>
              <span className="text-xl font-bold text-white">
                Prep<span className="gradient-text">AI</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              AI-powered technical interview preparation. Practice smarter, land your dream role.
            </p>
            <div className="flex gap-3 mt-5">
              {['Twitter', 'GitHub', 'LinkedIn'].map((s) => (
                <a key={s} href="#" className="px-3 py-1.5 text-xs text-slate-400 hover:text-white border border-slate-700 hover:border-slate-500 rounded-lg transition-colors">
                  {s}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Product</h4>
            <ul className="space-y-2.5">
              {[['Features', '#features'], ['How it works', '#how-it-works'], ['Pricing', '#'], ['Changelog', '#']].map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="text-sm hover:text-white transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Company</h4>
            <ul className="space-y-2.5">
              {[['About', '#'], ['Blog', '#'], ['Privacy Policy', '#'], ['Terms of Service', '#']].map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="text-sm hover:text-white transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-slate-500">© {new Date().getFullYear()} PrepAI. All rights reserved.</p>
          <p className="text-sm text-slate-500">Built with React, Node.js & OpenAI</p>
        </div>
      </div>
    </footer>
  );
}
