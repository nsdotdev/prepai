import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { interviewAPI } from '../services/api';
import { useToast } from '../context/ToastContext';
import { Spinner } from '../components/LoadingSpinner';
import ScoreRing from '../components/ScoreRing';

const scoreColor = (s) => {
  if (s >= 8) return 'text-emerald-600 dark:text-emerald-400';
  if (s >= 6) return 'text-amber-600 dark:text-amber-400';
  if (s >= 4) return 'text-orange-600 dark:text-orange-400';
  return 'text-red-600 dark:text-red-400';
};

const scoreBarColor = (s) => {
  if (s >= 8) return 'from-emerald-400 to-emerald-500';
  if (s >= 6) return 'from-amber-400 to-amber-500';
  if (s >= 4) return 'from-orange-400 to-orange-500';
  return 'from-red-400 to-red-500';
};

export default function Results() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const results = state?.results || [];
  const role = state?.role || 'Full Stack';
  const difficulty = state?.difficulty || 'Medium';

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);

  if (!results.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="text-center">
          <p className="text-slate-500 dark:text-slate-400 mb-4">No results to display.</p>
          <Link to="/interview/setup" className="btn-primary">Start New Interview</Link>
        </div>
      </div>
    );
  }

  const totalScore = results.reduce((s, r) => s + (r.score || 0), 0);
  const avgScore = parseFloat((totalScore / results.length).toFixed(1));

  const allStrengths = [...new Set(results.flatMap((r) => r.strengths || []))].slice(0, 4);
  const allWeaknesses = [...new Set(results.flatMap((r) => r.weaknesses || []))].slice(0, 4);

  const getOverallGrade = (avg) => {
    if (avg >= 8.5) return { label: 'Outstanding', emoji: '🏆', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/20' };
    if (avg >= 7) return { label: 'Excellent', emoji: '🌟', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20' };
    if (avg >= 5.5) return { label: 'Good Progress', emoji: '📈', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/20' };
    if (avg >= 4) return { label: 'Keep Practicing', emoji: '💪', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-900/20' };
    return { label: 'Needs Improvement', emoji: '📚', color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-900/20' };
  };

  const grade = getOverallGrade(avgScore);

  const handleSave = async () => {
    if (saved) return;
    setSaving(true);
    try {
      await interviewAPI.save({ role, difficulty, questions: results });
      setSaved(true);
      addToast('Session saved to your history!', 'success');
    } catch {
      addToast('Failed to save session. Please try again.', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${grade.bg} border border-current/10 mb-4`}>
            <span className="text-2xl">{grade.emoji}</span>
            <span className={`font-bold ${grade.color}`}>{grade.label}</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2">Session Complete!</h1>
          <p className="text-slate-500 dark:text-slate-400">
            {role} · {difficulty} · {results.length} questions
          </p>
        </div>

        {/* Score overview */}
        <div className="card p-8 mb-6">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <ScoreRing score={avgScore} size={160} strokeWidth={14} label="Average Score" />
            </div>
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
              {results.map((r, i) => (
                <div key={i} className="text-center p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Q{i + 1}</p>
                  <p className={`text-2xl font-black ${scoreColor(r.score)}`}>{r.score}</p>
                  <div className="mt-1.5 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${scoreBarColor(r.score)} rounded-full transition-all duration-1000`}
                      style={{ width: `${(r.score / 10) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Strengths */}
          <div className="card p-6 border-l-4 border-l-emerald-400">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Key Strengths
            </h3>
            {allStrengths.length > 0 ? (
              <ul className="space-y-2.5">
                {allStrengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">✓</span>
                    <span className="text-sm text-slate-600 dark:text-slate-300">{s}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-slate-400">No specific strengths noted.</p>
            )}
          </div>

          {/* Weaknesses */}
          <div className="card p-6 border-l-4 border-l-amber-400">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Areas to Improve
            </h3>
            {allWeaknesses.length > 0 ? (
              <ul className="space-y-2.5">
                {allWeaknesses.map((w, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">!</span>
                    <span className="text-sm text-slate-600 dark:text-slate-300">{w}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-slate-400">Great job — no major weaknesses.</p>
            )}
          </div>
        </div>

        {/* Per-question breakdown */}
        <div className="card mb-6">
          <div className="p-5 border-b border-slate-100 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white">Question-by-Question Breakdown</h3>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-700">
            {results.map((r, i) => (
              <div key={i}>
                <button
                  onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                  className="w-full p-5 flex items-start gap-4 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black text-white flex-shrink-0 bg-gradient-to-br ${scoreBarColor(r.score)}`}>
                    {r.score}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white line-clamp-2">{r.question}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 truncate">
                      {r.answer || 'No answer provided'}
                    </p>
                  </div>
                  <svg
                    className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform ${expandedIndex === i ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {expandedIndex === i && (
                  <div className="px-5 pb-5 space-y-3 bg-slate-50/50 dark:bg-slate-900/20 animate-fade-in">
                    <div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">Your Answer</p>
                      <p className="text-sm text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 rounded-xl p-3 border border-slate-100 dark:border-slate-700 leading-relaxed">
                        {r.answer || '(No answer)'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">AI Feedback</p>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{r.feedback}</p>
                    </div>
                    {r.improvedAnswer && (
                      <div>
                        <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1.5">💡 Model Answer</p>
                        <p className="text-sm text-slate-600 dark:text-slate-300 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-3 border border-emerald-100 dark:border-emerald-900/40 leading-relaxed">
                          {r.improvedAnswer}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleSave}
            disabled={saving || saved}
            className="btn-primary flex-1 py-3.5 disabled:opacity-60"
          >
            {saving ? <Spinner size="sm" /> : null}
            {saved ? '✓ Saved to History' : saving ? 'Saving...' : 'Save Session'}
          </button>
          <Link to="/interview/setup" className="btn-secondary flex-1 py-3.5 text-center">
            Practice Again
          </Link>
          <Link to="/dashboard" className="btn-ghost flex-1 py-3.5 text-center">
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
