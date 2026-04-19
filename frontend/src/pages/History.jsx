import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { interviewAPI } from '../services/api';
import { CardSkeleton } from '../components/LoadingSpinner';

const difficultyColors = {
  Easy: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  Medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  Hard: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

const scoreColor = (s) => {
  if (s >= 8) return 'text-emerald-600 dark:text-emerald-400';
  if (s >= 6) return 'text-amber-600 dark:text-amber-400';
  return 'text-red-600 dark:text-red-400';
};

const roleIcon = { Frontend: 'FE', Backend: 'BE', 'Full Stack': 'FS' };
const roleGradient = {
  Frontend: 'from-blue-500 to-cyan-500',
  Backend: 'from-emerald-500 to-teal-500',
  'Full Stack': 'from-primary-500 to-purple-500',
};

export default function History() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [filter, setFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    interviewAPI.getHistory()
      .then(({ data }) => setSessions(data.sessions || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filters = ['All', 'Frontend', 'Backend', 'Full Stack'];

  const filtered = sessions
    .filter((s) => filter === 'All' || s.role === filter)
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === 'highest') return (b.averageScore || 0) - (a.averageScore || 0);
      if (sortBy === 'lowest') return (a.averageScore || 0) - (b.averageScore || 0);
      return 0;
    });

  const totalSessions = sessions.length;
  const avgScore = totalSessions
    ? (sessions.reduce((s, x) => s + (x.averageScore || 0), 0) / totalSessions).toFixed(1)
    : '0';
  const bestScore = totalSessions
    ? Math.max(...sessions.map((s) => s.averageScore || 0)).toFixed(1)
    : '0';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white">Interview History</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              {totalSessions} session{totalSessions !== 1 ? 's' : ''} completed
            </p>
          </div>
          <Link to="/interview/setup" className="btn-primary">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Session
          </Link>
        </div>

        {/* Stats row */}
        {totalSessions > 0 && (
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: 'Total Sessions', value: totalSessions, icon: '🎯' },
              { label: 'Average Score', value: `${avgScore}/10`, icon: '📊' },
              { label: 'Best Score', value: `${bestScore}/10`, icon: '🏆' },
            ].map((s) => (
              <div key={s.label} className="card p-4 text-center">
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="text-xl font-black text-slate-900 dark:text-white">{s.value}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Filters & Sort */}
        {totalSessions > 0 && (
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="flex bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-1 gap-1 flex-wrap">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    filter === f
                      ? 'bg-primary-600 text-white shadow-sm'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input py-2 text-sm sm:w-40"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="highest">Highest score</option>
              <option value="lowest">Lowest score</option>
            </select>
          </div>
        )}

        {/* Sessions list */}
        {loading ? (
          <CardSkeleton count={4} />
        ) : filtered.length === 0 ? (
          <div className="card p-16 text-center">
            <div className="text-6xl mb-5">{totalSessions === 0 ? '📋' : '🔍'}</div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              {totalSessions === 0 ? 'No sessions yet' : 'No sessions match this filter'}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6">
              {totalSessions === 0
                ? 'Complete your first interview session to see your history here.'
                : 'Try a different filter or start a new session.'}
            </p>
            <Link to="/interview/setup" className="btn-primary">
              Start Your First Interview
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((session) => (
              <div key={session._id} className="card overflow-hidden">
                {/* Session header */}
                <button
                  onClick={() => setExpandedId(expandedId === session._id ? null : session._id)}
                  className="w-full p-5 flex items-center gap-4 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${roleGradient[session.role]} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                    {roleIcon[session.role]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-slate-900 dark:text-white">
                        {session.role} Interview
                      </span>
                      <span className={`badge ${difficultyColors[session.difficulty]}`}>
                        {session.difficulty}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                      {new Date(session.createdAt).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                      {' · '}
                      {session.questions?.length || 5} questions
                    </p>
                  </div>
                  <div className="text-right flex items-center gap-4">
                    <div>
                      <p className={`text-2xl font-black ${scoreColor(session.averageScore)}`}>
                        {session.averageScore?.toFixed(1)}
                      </p>
                      <p className="text-xs text-slate-400">avg / 10</p>
                    </div>
                    <svg
                      className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform ${expandedId === session._id ? 'rotate-180' : ''}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {/* Expanded session details */}
                {expandedId === session._id && (
                  <div className="border-t border-slate-100 dark:border-slate-700 animate-fade-in">
                    {/* Score row */}
                    <div className="px-5 py-4 bg-slate-50 dark:bg-slate-900/30 flex gap-3 overflow-x-auto">
                      {(session.questions || []).map((q, i) => (
                        <div key={i} className="flex-shrink-0 text-center min-w-[48px]">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-black text-white mx-auto ${
                            q.score >= 8 ? 'bg-emerald-500' :
                            q.score >= 6 ? 'bg-amber-500' :
                            q.score >= 4 ? 'bg-orange-500' : 'bg-red-500'
                          }`}>
                            {q.score}
                          </div>
                          <p className="text-xs text-slate-400 mt-1">Q{i + 1}</p>
                        </div>
                      ))}
                    </div>

                    {/* Q&A breakdown */}
                    <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
                      {(session.questions || []).map((q, i) => (
                        <div key={i} className="p-5">
                          <div className="flex items-start gap-3 mb-3">
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-white flex-shrink-0 mt-0.5 ${
                              q.score >= 8 ? 'bg-emerald-500' :
                              q.score >= 6 ? 'bg-amber-500' : 'bg-red-500'
                            }`}>{q.score}</span>
                            <p className="text-sm font-semibold text-slate-900 dark:text-white">{q.question}</p>
                          </div>
                          {q.answer && (
                            <div className="ml-9 mb-2">
                              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Your answer:</p>
                              <p className="text-xs text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-lg p-2.5 leading-relaxed">
                                {q.answer}
                              </p>
                            </div>
                          )}
                          {q.feedback && (
                            <div className="ml-9">
                              <p className="text-xs font-medium text-primary-600 dark:text-primary-400 mb-1">Feedback:</p>
                              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{q.feedback}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
