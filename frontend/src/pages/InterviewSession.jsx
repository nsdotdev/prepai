import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { interviewAPI } from '../services/api';
import { useToast } from '../context/ToastContext';
import { Spinner } from '../components/LoadingSpinner';
import ScoreRing from '../components/ScoreRing';
import demoAnswers from '../data/demoAnswers';

export default function InterviewSession() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const questions = state?.questions || [];
  const role = state?.role || 'Full Stack';
  const difficulty = state?.difficulty || 'Medium';

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [isDemoAnswer, setIsDemoAnswer] = useState(false);
  const [evaluating, setEvaluating] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState(null);
  const [results, setResults] = useState([]);

  const demoEntry = demoAnswers?.[role]?.[difficulty]?.[currentIndex];

  useEffect(() => {
    if (!questions.length) {
      navigate('/interview/setup');
    }
  }, [questions, navigate]);

  const wordCount = answer.trim().split(/\s+/).filter(Boolean).length;
  const progress = ((currentIndex) / questions.length) * 100;

  const handleFillDemo = () => {
    if (!demoEntry) return;
    setAnswer(demoEntry.answer);
    setIsDemoAnswer(true);
  };

  const handleSubmitAnswer = async () => {
    if (!answer.trim()) {
      addToast('Please write an answer before submitting', 'warning');
      return;
    }

    // Use pre-bundled evaluation for demo answers — bypasses mock scorer
    if (isDemoAnswer && demoEntry) {
      setEvaluating(true);
      await new Promise((r) => setTimeout(r, 900)); // brief realistic delay
      setCurrentFeedback(demoEntry.evaluation);
      setEvaluating(false);
      return;
    }

    setEvaluating(true);
    try {
      const { data } = await interviewAPI.evaluateAnswer({
        question: questions[currentIndex],
        answer: answer.trim(),
        role,
        difficulty,
      });
      setCurrentFeedback(data);
    } catch {
      addToast('Failed to evaluate answer. Using local scoring.', 'warning');
      const wordLen = answer.trim().split(/\s+/).length;
      setCurrentFeedback({
        score: Math.min(10, Math.max(1, Math.round(Math.min(wordLen / 12, 6)) + 3)),
        feedback: 'Your answer has been recorded. Keep practicing to improve your responses.',
        strengths: ['Attempted to answer the question'],
        weaknesses: ['Could not evaluate in detail due to a network error'],
        improvedAnswer: 'Please review documentation and practice more on this topic.',
      });
    } finally {
      setEvaluating(false);
    }
  };

  const handleNext = () => {
    if (!currentFeedback) return;
    const newResult = {
      question: questions[currentIndex],
      answer: answer.trim(),
      ...currentFeedback,
    };
    const updatedResults = [...results, newResult];
    setResults(updatedResults);

    if (currentIndex + 1 >= questions.length) {
      navigate('/interview/results', {
        state: { results: updatedResults, role, difficulty },
      });
    } else {
      setCurrentIndex((i) => i + 1);
      setAnswer('');
      setCurrentFeedback(null);
      setIsDemoAnswer(false);
    }
  };

  const handleSkip = () => {
    const skippedResult = {
      question: questions[currentIndex],
      answer: '',
      score: 0,
      feedback: 'Question skipped.',
      strengths: [],
      weaknesses: ['Skipped — no answer provided'],
      improvedAnswer: '',
    };
    const updatedResults = [...results, skippedResult];
    setResults(updatedResults);

    if (currentIndex + 1 >= questions.length) {
      navigate('/interview/results', {
        state: { results: updatedResults, role, difficulty },
      });
    } else {
      setCurrentIndex((i) => i + 1);
      setAnswer('');
      setCurrentFeedback(null);
    }
  };

  if (!questions.length) return null;

  const diffBadgeColor = {
    Easy: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    Medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    Hard: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Top bar */}
      <div className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between gap-4 mb-2.5">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-slate-900 dark:text-white">
                Question {currentIndex + 1}
                <span className="text-slate-400 dark:text-slate-500 font-medium"> / {questions.length}</span>
              </span>
              <span className={`badge text-xs ${diffBadgeColor[difficulty]}`}>{difficulty}</span>
              <span className="badge bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 text-xs">
                {role}
              </span>
            </div>
            <button
              onClick={handleSkip}
              disabled={!!currentFeedback}
              className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 disabled:opacity-40 transition-colors"
            >
              Skip →
            </button>
          </div>
          {/* Progress bar */}
          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary-500 to-purple-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-1">
            {questions.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i < currentIndex
                    ? 'bg-emerald-500'
                    : i === currentIndex
                    ? 'bg-primary-500 scale-125'
                    : 'bg-slate-200 dark:bg-slate-700'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Main question + answer */}
          <div className="lg:col-span-3 space-y-5">
            {/* Question */}
            <div className="card p-6">
              <div className="flex items-start gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white text-sm font-black flex-shrink-0">
                  Q{currentIndex + 1}
                </div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
                  {questions[currentIndex]}
                </h2>
              </div>
            </div>

            {/* Answer textarea */}
            {!currentFeedback ? (
              <div className="card p-5">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="label mb-0">Your Answer</label>
                  {demoEntry && (
                    <button
                      type="button"
                      onClick={handleFillDemo}
                      disabled={evaluating}
                      className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-700 hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors disabled:opacity-40"
                    >
                      <span>🎯</span>
                      Fill demo answer
                    </button>
                  )}
                </div>
                <textarea
                  value={answer}
                  onChange={(e) => {
                    setAnswer(e.target.value);
                    if (isDemoAnswer) setIsDemoAnswer(false);
                  }}
                  rows={8}
                  className="input resize-none font-mono text-sm leading-relaxed"
                  placeholder="Type your answer here. Be as detailed as possible — explain your thought process, give examples, and discuss trade-offs..."
                  disabled={evaluating}
                />
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-slate-400 dark:text-slate-500">
                    {wordCount} word{wordCount !== 1 ? 's' : ''}
                    {wordCount < 20 && wordCount > 0 && ' · try to write more'}
                    {wordCount >= 20 && wordCount < 50 && ' · decent length'}
                    {wordCount >= 50 && ' · great detail'}
                  </span>
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={evaluating || !answer.trim()}
                    className="btn-primary py-2.5 px-6 disabled:opacity-40"
                  >
                    {evaluating ? (
                      <>
                        <Spinner size="sm" />
                        Evaluating...
                      </>
                    ) : (
                      <>
                        Evaluate Answer
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              /* Feedback panel */
              <div className="space-y-4 animate-slide-up">
                {/* Score */}
                <div className="card p-5 flex items-center gap-6">
                  <ScoreRing score={currentFeedback.score} size={100} strokeWidth={10} label="This answer" />
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900 dark:text-white mb-2">AI Feedback</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {currentFeedback.feedback}
                    </p>
                  </div>
                </div>

                {/* Strengths & Weaknesses */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="card p-4 border-l-4 border-l-emerald-400">
                    <h4 className="font-semibold text-emerald-700 dark:text-emerald-400 mb-3 flex items-center gap-1.5 text-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Strengths
                    </h4>
                    <ul className="space-y-1.5">
                      {(currentFeedback.strengths || []).map((s, i) => (
                        <li key={i} className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-1.5">
                          <span className="text-emerald-500 mt-0.5 flex-shrink-0">+</span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="card p-4 border-l-4 border-l-red-400">
                    <h4 className="font-semibold text-red-600 dark:text-red-400 mb-3 flex items-center gap-1.5 text-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      To Improve
                    </h4>
                    <ul className="space-y-1.5">
                      {(currentFeedback.weaknesses || []).map((w, i) => (
                        <li key={i} className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-1.5">
                          <span className="text-red-500 mt-0.5 flex-shrink-0">△</span>
                          {w}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  onClick={handleNext}
                  className="btn-primary w-full py-3.5 text-base rounded-xl"
                >
                  {currentIndex + 1 >= questions.length ? (
                    <>
                      View Full Results
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </>
                  ) : (
                    <>
                      Next Question
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Sidebar: model answer */}
          <div className="lg:col-span-2">
            <div className="card p-5 sticky top-36">
              <h3 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2 text-sm">
                <span className="text-lg">💡</span>
                {currentFeedback ? 'Model Answer' : 'Tips'}
              </h3>
              {currentFeedback ? (
                <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900 rounded-xl p-4 border border-slate-100 dark:border-slate-700">
                  {currentFeedback.improvedAnswer}
                </div>
              ) : (
                <ul className="space-y-2.5">
                  {[
                    'Explain your thought process, not just the answer',
                    'Give concrete examples or code snippets when possible',
                    'Discuss trade-offs and when to use/avoid something',
                    'Mention best practices and common pitfalls',
                    'Longer, more detailed answers score higher',
                  ].map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <span className="text-primary-500 font-bold mt-0.5 flex-shrink-0">{i + 1}.</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              )}

              {/* Progress overview */}
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-700">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">Session Progress</p>
                <div className="space-y-1.5">
                  {questions.map((_, i) => {
                    const done = results[i];
                    return (
                      <div key={i} className={`flex items-center gap-2 p-2 rounded-lg text-xs transition-colors ${
                        i === currentIndex ? 'bg-primary-50 dark:bg-primary-900/20' : ''
                      }`}>
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                          done ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' :
                          i === currentIndex ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400' :
                          'bg-slate-100 dark:bg-slate-800 text-slate-400'
                        }`}>
                          {done ? '✓' : i + 1}
                        </div>
                        <span className={`truncate ${
                          i === currentIndex ? 'text-primary-700 dark:text-primary-300 font-medium' :
                          done ? 'text-emerald-600 dark:text-emerald-400' :
                          'text-slate-400'
                        }`}>
                          Q{i + 1}: {done ? `Score ${done.score}/10` : i === currentIndex ? 'In progress' : 'Upcoming'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
