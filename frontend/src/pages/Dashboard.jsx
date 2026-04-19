import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { interviewAPI } from '../services/api';
import { CardSkeleton } from '../components/LoadingSpinner';

const StatCard = ({ label, value, icon, color, sub }) => (
  <div className="card p-6 flex items-center gap-4">
    <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center text-2xl flex-shrink-0`}>
      {icon}
    </div>
    <div>
      <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{label}</p>
      <p className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">{value}</p>
      {sub && <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{sub}</p>}
    </div>
  </div>
);

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

export default function Dashboard() {
  const { user } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    interviewAPI.getHistory()
      .then(({ data }) => setSessions(data.sessions || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const totalSessions = sessions.length;
  const avgScore = totalSessions
    ? (sessions.reduce((s, x) => s + (x.averageScore || 0), 0) / totalSessions).toFixed(1)
    : '—';
  const bestScore = totalSessions
    ? Math.max(...sessions.map((s) => s.averageScore || 0)).toFixed(1)
    : '—';

  const recentSessions = sessions.slice(0, 5);

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{getGreeting()},</p>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white mt-1">
              {user?.name?.split(' ')[0]} 👋
            </h1>
          </div>
          <Link to="/interview/setup" className="btn-primary">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Interview
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          <StatCard
            label="Total Sessions"
            value={totalSessions}
            icon="🎯"
            color="bg-primary-50 dark:bg-primary-900/20"
            sub="Interview sessions"
          />
          <StatCard
            label="Average Score"
            value={avgScore !== '—' ? `${avgScore}/10` : '—'}
            icon="📊"
            color="bg-amber-50 dark:bg-amber-900/20"
            sub="Across all sessions"
          />
          <StatCard
            label="Best Score"
            value={bestScore !== '—' ? `${bestScore}/10` : '—'}
            icon="🏆"
            color="bg-emerald-50 dark:bg-emerald-900/20"
            sub="Personal best"
          />
          <StatCard
            label="Questions"
            value={totalSessions * 5 || 0}
            icon="❓"
            color="bg-purple-50 dark:bg-purple-900/20"
            sub="Total answered"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick actions */}
          <div className="lg:col-span-1">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Quick Actions</h2>
            <div className="space-y-3">
              {[
                {
                  to: '/interview/setup',
                  icon: '🚀',
                  label: 'Start Interview',
                  desc: 'Begin a new practice session',
                  color: 'from-primary-500 to-indigo-500',
                },
                {
                  to: '/history',
                  icon: '📜',
                  label: 'View History',
                  desc: 'Review past sessions & feedback',
                  color: 'from-amber-500 to-orange-500',
                },
                {
                  to: '/profile',
                  icon: '⚙️',
                  label: 'Edit Profile',
                  desc: 'Update your information',
                  color: 'from-emerald-500 to-teal-500',
                },
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex items-center gap-4 p-4 card hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group"
                >
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-xl shadow-md group-hover:scale-110 transition-transform`}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white text-sm">{item.label}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
                  </div>
                  <svg className="w-4 h-4 text-slate-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>

            {totalSessions === 0 && !loading && (
              <div className="mt-6 p-5 rounded-2xl bg-gradient-to-br from-primary-50 to-indigo-50 dark:from-primary-900/20 dark:to-indigo-900/20 border border-primary-100 dark:border-primary-800">
                <div className="text-3xl mb-3">🎯</div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">Ready to start?</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  Take your first interview session and get AI-powered feedback instantly.
                </p>
                <Link to="/interview/setup" className="btn-primary text-sm py-2.5 w-full">
                  Start First Interview
                </Link>
              </div>
            )}
          </div>

          {/* Recent sessions */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Recent Sessions</h2>
              {sessions.length > 0 && (
                <Link to="/history" className="text-sm text-primary-600 dark:text-primary-400 hover:underline font-medium">
                  View all
                </Link>
              )}
            </div>

            {loading ? (
              <CardSkeleton count={3} />
            ) : recentSessions.length === 0 ? (
              <div className="card p-10 text-center">
                <div className="text-5xl mb-4">📋</div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">No sessions yet</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  Your interview history will appear here after your first session.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentSessions.map((session) => (
                  <div key={session._id} className="card p-5 hover:shadow-md transition-all duration-200">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                          {session.role === 'Frontend' ? 'FE' : session.role === 'Backend' ? 'BE' : 'FS'}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-slate-900 dark:text-white text-sm">
                              {session.role} Interview
                            </span>
                            <span className={`badge ${difficultyColors[session.difficulty]}`}>
                              {session.difficulty}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            {new Date(session.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                            {' · '}
                            {session.questions?.length || 5} questions
                          </p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className={`text-xl font-black ${scoreColor(session.averageScore)}`}>
                          {session.averageScore?.toFixed(1)}
                        </p>
                        <p className="text-xs text-slate-400 dark:text-slate-500">/ 10</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
