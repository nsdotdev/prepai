import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import { interviewAPI } from '../services/api';
import { Spinner } from '../components/LoadingSpinner';

const roles = [
  {
    id: 'Frontend',
    label: 'Frontend',
    icon: '🖥️',
    desc: 'React, Vue, CSS, JavaScript, browser APIs, performance, accessibility',
    tags: ['React', 'CSS', 'JS', 'DOM', 'Performance'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'Backend',
    label: 'Backend',
    icon: '⚙️',
    desc: 'Node.js, databases, REST APIs, system design, authentication, scaling',
    tags: ['Node.js', 'SQL', 'APIs', 'Auth', 'Scaling'],
    color: 'from-emerald-500 to-teal-500',
  },
  {
    id: 'Full Stack',
    label: 'Full Stack',
    icon: '🔗',
    desc: 'End-to-end architecture, frontend + backend integration, deployment',
    tags: ['MERN', 'APIs', 'Auth', 'Deploy', 'System Design'],
    color: 'from-primary-500 to-purple-500',
  },
];

const difficulties = [
  {
    id: 'Easy',
    icon: '🟢',
    label: 'Easy',
    desc: 'Core fundamentals, foundational concepts, basic problem-solving',
    forWho: 'For juniors or warming up',
    color: 'border-emerald-400 dark:border-emerald-500',
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400',
  },
  {
    id: 'Medium',
    icon: '🟡',
    label: 'Medium',
    desc: 'Intermediate depth, practical application, trade-offs and design decisions',
    forWho: 'For mid-level engineers',
    color: 'border-amber-400 dark:border-amber-500',
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400',
  },
  {
    id: 'Hard',
    icon: '🔴',
    label: 'Hard',
    desc: 'Advanced system design, architecture, performance at scale, expert knowledge',
    forWho: 'For senior engineers',
    color: 'border-red-400 dark:border-red-500',
    bg: 'bg-red-50 dark:bg-red-900/20',
    badge: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400',
  },
];

export default function InterviewSetup() {
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleStart = async () => {
    if (!selectedRole || !selectedDifficulty) {
      addToast('Please select both a role and difficulty level', 'warning');
      return;
    }
    setLoading(true);
    try {
      const { data } = await interviewAPI.start({ role: selectedRole, difficulty: selectedDifficulty });
      navigate('/interview/session', {
        state: {
          questions: data.questions,
          role: selectedRole,
          difficulty: selectedDifficulty,
        },
      });
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to generate questions. Please try again.', 'error');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-purple-600 shadow-xl mb-5">
            <span className="text-3xl">🎯</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-3">
            Set Up Your Interview
          </h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
            Choose your role and difficulty level to get a tailored set of 5 technical questions.
          </p>
        </div>

        {/* Role Selection */}
        <div className="mb-10">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary-600 text-white text-xs flex items-center justify-center font-black">1</span>
            Select Your Role
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`p-5 rounded-2xl border-2 text-left transition-all duration-200 hover:-translate-y-1 ${
                  selectedRole === role.id
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-lg shadow-primary-100 dark:shadow-primary-900/20'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-primary-300 dark:hover:border-primary-700'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${role.color} flex items-center justify-center text-2xl mb-4 shadow-md`}>
                  {role.icon}
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-slate-900 dark:text-white">{role.label}</h3>
                  {selectedRole === role.id && (
                    <div className="w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">{role.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {role.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty Selection */}
        <div className="mb-10">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary-600 text-white text-xs flex items-center justify-center font-black">2</span>
            Choose Difficulty
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {difficulties.map((diff) => (
              <button
                key={diff.id}
                onClick={() => setSelectedDifficulty(diff.id)}
                className={`p-5 rounded-2xl border-2 text-left transition-all duration-200 hover:-translate-y-1 ${
                  selectedDifficulty === diff.id
                    ? `${diff.color} ${diff.bg} shadow-lg`
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{diff.icon}</span>
                    <span className="font-bold text-slate-900 dark:text-white">{diff.label}</span>
                  </div>
                  {selectedDifficulty === diff.id && (
                    <div className="w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">{diff.desc}</p>
                <span className={`badge text-xs ${diff.badge}`}>{diff.forWho}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Summary + Start */}
        {selectedRole && selectedDifficulty && (
          <div className="card p-5 mb-6 bg-primary-50 dark:bg-primary-900/20 border-primary-100 dark:border-primary-800 animate-slide-up">
            <div className="flex items-center gap-3">
              <span className="text-2xl">✨</span>
              <div>
                <p className="font-bold text-slate-900 dark:text-white">Ready to go!</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  You'll receive 5 <strong>{selectedDifficulty}</strong> {selectedRole} questions tailored to your track.
                </p>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={handleStart}
          disabled={!selectedRole || !selectedDifficulty || loading}
          className="btn-primary w-full py-4 text-lg rounded-2xl disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Spinner size="sm" />
              Generating your questions...
            </>
          ) : (
            <>
              Start Interview Session
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </>
          )}
        </button>
        <p className="text-center text-sm text-slate-400 dark:text-slate-500 mt-3">
          5 questions · Unlimited time · AI-powered feedback
        </p>
      </div>
    </div>
  );
}
