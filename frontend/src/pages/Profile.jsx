import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { authAPI } from '../services/api';
import { interviewAPI } from '../services/api';
import { Spinner, CardSkeleton } from '../components/LoadingSpinner';

export default function Profile() {
  const { user, updateUser } = useAuth();
  const { addToast } = useToast();

  const [form, setForm] = useState({ name: user?.name || '', bio: user?.bio || '' });
  const [saving, setSaving] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [loadingSessions, setLoadingSessions] = useState(true);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    interviewAPI.getHistory()
      .then(({ data }) => setSessions(data.sessions || []))
      .catch(console.error)
      .finally(() => setLoadingSessions(false));
  }, []);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSave = async () => {
    if (!form.name.trim()) {
      addToast('Name cannot be empty', 'error');
      return;
    }
    setSaving(true);
    try {
      const { data } = await authAPI.updateProfile({ name: form.name.trim(), bio: form.bio.trim() });
      updateUser(data);
      setEditMode(false);
      addToast('Profile updated successfully!', 'success');
    } catch {
      addToast('Failed to update profile', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setForm({ name: user?.name || '', bio: user?.bio || '' });
    setEditMode(false);
  };

  const totalSessions = sessions.length;
  const avgScore = totalSessions
    ? (sessions.reduce((s, x) => s + (x.averageScore || 0), 0) / totalSessions).toFixed(1)
    : '—';
  const bestScore = totalSessions
    ? Math.max(...sessions.map((s) => s.averageScore || 0)).toFixed(1)
    : '—';
  const roleCounts = sessions.reduce((acc, s) => ({ ...acc, [s.role]: (acc[s.role] || 0) + 1 }), {});
  const favRole = Object.entries(roleCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || '—';

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  const joinDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : '';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-8">My Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Profile card */}
          <div className="lg:col-span-1 space-y-5">
            <div className="card p-6 text-center">
              {/* Avatar */}
              <div className="relative inline-block mb-4">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white text-3xl font-black shadow-xl mx-auto">
                  {initials}
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-800" />
              </div>

              <h2 className="text-xl font-black text-slate-900 dark:text-white">{user?.name}</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{user?.email}</p>
              {user?.bio && (
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">{user.bio}</p>
              )}
              {joinDate && (
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-3">
                  Member since {joinDate}
                </p>
              )}

              {!editMode && (
                <button
                  onClick={() => setEditMode(true)}
                  className="btn-secondary w-full mt-4 text-sm py-2.5"
                >
                  Edit Profile
                </button>
              )}
            </div>

            {/* Stats */}
            <div className="card p-5">
              <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-sm">Performance Stats</h3>
              <div className="space-y-3">
                {[
                  { label: 'Total Sessions', value: totalSessions, icon: '🎯' },
                  { label: 'Average Score', value: avgScore !== '—' ? `${avgScore}/10` : '—', icon: '📊' },
                  { label: 'Best Score', value: bestScore !== '—' ? `${bestScore}/10` : '—', icon: '🏆' },
                  { label: 'Favorite Track', value: favRole, icon: '💻' },
                  { label: 'Questions Done', value: totalSessions * 5, icon: '❓' },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700 last:border-0">
                    <span className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <span>{stat.icon}</span>
                      {stat.label}
                    </span>
                    <span className="font-bold text-slate-900 dark:text-white text-sm">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Edit form + recent sessions */}
          <div className="lg:col-span-2 space-y-5">
            {/* Edit form */}
            {editMode ? (
              <div className="card p-6 animate-slide-up">
                <h3 className="font-bold text-slate-900 dark:text-white mb-5">Edit Profile</h3>
                <div className="space-y-4">
                  <div>
                    <label className="label">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="input"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="label">Email Address</label>
                    <input
                      type="email"
                      value={user?.email}
                      className="input opacity-60 cursor-not-allowed"
                      disabled
                    />
                    <p className="text-xs text-slate-400 mt-1">Email cannot be changed.</p>
                  </div>
                  <div>
                    <label className="label">Bio</label>
                    <textarea
                      name="bio"
                      value={form.bio}
                      onChange={handleChange}
                      rows={3}
                      className="input resize-none"
                      placeholder="Tell us about yourself..."
                      maxLength={300}
                    />
                    <p className="text-xs text-slate-400 mt-1 text-right">{form.bio.length}/300</p>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button onClick={handleSave} disabled={saving} className="btn-primary flex-1 py-2.5">
                      {saving ? <Spinner size="sm" /> : null}
                      {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button onClick={handleCancel} className="btn-secondary flex-1 py-2.5">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : null}

            {/* Difficulty breakdown */}
            {totalSessions > 0 && (
              <div className="card p-5">
                <h3 className="font-bold text-slate-900 dark:text-white mb-4">Sessions by Track</h3>
                <div className="space-y-3">
                  {Object.entries(roleCounts).map(([role, count]) => (
                    <div key={role}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-slate-700 dark:text-slate-300 font-medium">{role}</span>
                        <span className="text-slate-500 dark:text-slate-400">{count} session{count !== 1 ? 's' : ''}</span>
                      </div>
                      <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary-500 to-purple-500 rounded-full transition-all duration-700"
                          style={{ width: `${(count / totalSessions) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent sessions */}
            <div className="card p-5">
              <h3 className="font-bold text-slate-900 dark:text-white mb-4">Recent Sessions</h3>
              {loadingSessions ? (
                <CardSkeleton count={2} />
              ) : sessions.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-5xl mb-3">📋</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">No sessions yet.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {sessions.slice(0, 5).map((session) => (
                    <div key={session._id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {session.role === 'Frontend' ? 'FE' : session.role === 'Backend' ? 'BE' : 'FS'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                          {session.role} · {session.difficulty}
                        </p>
                        <p className="text-xs text-slate-400">
                          {new Date(session.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className={`text-lg font-black ${
                        session.averageScore >= 8 ? 'text-emerald-500' :
                        session.averageScore >= 6 ? 'text-amber-500' : 'text-red-500'
                      }`}>
                        {session.averageScore?.toFixed(1)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
