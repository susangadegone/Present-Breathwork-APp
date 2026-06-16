import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// ── Exercise data ────────────────────────────────────────────────────────────

const EXERCISES = {
  boxBreathing: {
    name: 'Box Breathing',
    duration: 120,
    quickDuration: 60,
    category: 'breathing',
    description: 'Navy SEAL technique for instant calm',
    phases: [
      { name: 'Inhale', key: 'inhale', duration: 4, instruction: 'Breathe in through your nose' },
      { name: 'Hold',   key: 'hold',   duration: 4, instruction: 'Hold gently' },
      { name: 'Exhale', key: 'exhale', duration: 4, instruction: 'Release through your mouth' },
      { name: 'Hold',   key: 'hold',   duration: 4, instruction: 'Rest empty' },
    ],
  },
  deepBelly: {
    name: 'Deep Belly Breath',
    duration: 120,
    quickDuration: 60,
    category: 'breathing',
    description: 'Activate your parasympathetic nervous system',
    phases: [
      { name: 'Inhale', key: 'inhale', duration: 5, instruction: 'Breathe deep into your belly' },
      { name: 'Exhale', key: 'exhale', duration: 7, instruction: 'Release completely' },
    ],
  },
  calming478: {
    name: '4-7-8 Breathing',
    duration: 96,
    quickDuration: 48,
    category: 'breathing',
    description: "Dr. Weil's natural tranquilizer",
    phases: [
      { name: 'Inhale', key: 'inhale', duration: 4, instruction: 'Inhale through your nose' },
      { name: 'Hold',   key: 'hold',   duration: 7, instruction: 'Hold the breath' },
      { name: 'Exhale', key: 'exhale', duration: 8, instruction: 'Exhale fully through your mouth' },
    ],
  },
  equalBreath: {
    name: 'Equal Breath',
    duration: 80,
    quickDuration: 40,
    category: 'breathing',
    description: 'Balanced in and out for equilibrium',
    phases: [
      { name: 'Inhale', key: 'inhale', duration: 4, instruction: 'Breathe in slowly' },
      { name: 'Exhale', key: 'exhale', duration: 4, instruction: 'Breathe out slowly' },
    ],
  },
  fiveSenses: {
    name: '5-4-3-2-1 Grounding',
    duration: 180,
    quickDuration: 90,
    category: 'grounding',
    description: 'Anchor yourself in the present moment',
    phases: [
      { name: 'See',   key: 'notice', duration: 30, instruction: 'Name 5 things you can see' },
      { name: 'Feel',  key: 'notice', duration: 30, instruction: 'Notice 4 things you can feel' },
      { name: 'Hear',  key: 'notice', duration: 30, instruction: 'Identify 3 things you can hear' },
      { name: 'Smell', key: 'notice', duration: 30, instruction: 'Find 2 things you can smell' },
      { name: 'Taste', key: 'notice', duration: 30, instruction: '1 thing you can taste' },
    ],
  },
  bodyScan: {
    name: 'Body Scan',
    duration: 200,
    quickDuration: 100,
    category: 'grounding',
    description: 'Mindful awareness through the body',
    phases: [
      { name: 'Feet',  key: 'scan', duration: 40, instruction: 'Notice your feet and toes' },
      { name: 'Legs',  key: 'scan', duration: 40, instruction: 'Scan your calves and thighs' },
      { name: 'Torso', key: 'scan', duration: 40, instruction: 'Feel your chest and belly' },
      { name: 'Arms',  key: 'scan', duration: 40, instruction: 'Notice your arms and hands' },
      { name: 'Head',  key: 'scan', duration: 40, instruction: 'Relax your jaw, face, and scalp' },
    ],
  },
  mindfulPause: {
    name: 'Mindful Pause',
    duration: 120,
    quickDuration: 60,
    category: 'grounding',
    description: 'Stop, observe, return to now',
    phases: [
      { name: 'Observe', key: 'pause', duration: 30, instruction: 'Simply observe your breath' },
    ],
  },
  anxietyRelief: {
    name: 'Anxiety Relief',
    duration: 108,
    quickDuration: 54,
    category: 'calm',
    description: 'Extended exhales activate the calm response',
    phases: [
      { name: 'Inhale', key: 'inhale', duration: 3, instruction: 'Slow, gentle inhale' },
      { name: 'Exhale', key: 'exhale', duration: 6, instruction: 'Long, slow exhale' },
    ],
  },
  eveningCalm: {
    name: 'Evening Calm',
    duration: 120,
    quickDuration: 60,
    category: 'calm',
    description: 'Wind down at the end of the day',
    phases: [
      { name: 'Inhale', key: 'inhale', duration: 5, instruction: 'Breathe in slowly' },
      { name: 'Exhale', key: 'exhale', duration: 7, instruction: 'Release the day' },
    ],
  },
  deepRelaxation: {
    name: 'Deep Relaxation',
    duration: 160,
    quickDuration: 80,
    category: 'calm',
    description: 'Full body and mind release',
    phases: [
      { name: 'Inhale', key: 'inhale', duration: 6,  instruction: 'Deep, slow breath in' },
      { name: 'Exhale', key: 'exhale', duration: 10, instruction: 'Complete release' },
    ],
  },
  energizingBreath: {
    name: 'Energizing Breath',
    duration: 60,
    quickDuration: 30,
    category: 'energy',
    description: 'Crisp rhythm to wake up body and mind',
    phases: [
      { name: 'Inhale', key: 'inhale', duration: 2, instruction: 'Quick energizing inhale' },
      { name: 'Exhale', key: 'exhale', duration: 2, instruction: 'Forceful exhale' },
    ],
  },
  morningBoost: {
    name: 'Morning Boost',
    duration: 60,
    quickDuration: 30,
    category: 'energy',
    description: 'Start the day with intention',
    phases: [
      { name: 'Inhale', key: 'inhale', duration: 4, instruction: 'Breathe in deeply' },
      { name: 'Hold',   key: 'hold',   duration: 2, instruction: 'Feel energized' },
      { name: 'Exhale', key: 'exhale', duration: 4, instruction: 'Release and start fresh' },
    ],
  },
};

const CATEGORIES = {
  breathing: {
    name: 'Breathing',
    description: 'Breathwork for calm and focus',
    exercises: ['boxBreathing', 'deepBelly', 'calming478', 'equalBreath'],
  },
  grounding: {
    name: 'Grounding',
    description: 'Present-moment awareness',
    exercises: ['fiveSenses', 'bodyScan', 'mindfulPause'],
  },
  calm: {
    name: 'Calm',
    description: 'Find stillness and ease',
    exercises: ['anxietyRelief', 'eveningCalm', 'deepRelaxation'],
  },
  energy: {
    name: 'Energy',
    description: 'Boost alertness and focus',
    exercises: ['energizingBreath', 'morningBoost'],
  },
};

// ── Assessment ───────────────────────────────────────────────────────────────

const QUESTIONS = [
  {
    id: 'feeling',
    q: 'How are you feeling right now?',
    opts: [
      { value: 'anxious',   label: 'Stressed or anxious' },
      { value: 'tired',     label: 'Tired, low energy' },
      { value: 'restless',  label: "Restless, can't settle" },
      { value: 'focus',     label: 'Want to focus' },
      { value: 'exploring', label: 'Just exploring' },
    ],
  },
  {
    id: 'time',
    q: 'How much time do you have?',
    opts: [
      { value: 'short',  label: 'About a minute' },
      { value: 'medium', label: '2–3 minutes' },
      { value: 'long',   label: '5 minutes or more' },
    ],
  },
];

const RECOMMEND_MAP = {
  anxious:   { short: 'boxBreathing',    medium: 'calming478',    long: 'deepRelaxation' },
  tired:     { short: 'energizingBreath', medium: 'morningBoost', long: 'morningBoost' },
  restless:  { short: 'anxietyRelief',   medium: 'eveningCalm',   long: 'deepRelaxation' },
  focus:     { short: 'equalBreath',     medium: 'boxBreathing',  long: 'deepBelly' },
  exploring: { short: 'deepBelly',       medium: 'boxBreathing',  long: 'calming478' },
};

const FEELING_CONTEXT = {
  anxious:   'To calm your nervous system and ease stress',
  tired:     'To wake up your body and restore energy',
  restless:  'To slow racing thoughts and help you settle',
  focus:     'To clear mental noise and sharpen attention',
  exploring: 'A solid, well-rounded place to start',
};

const getRecommendation = (feeling, time) =>
  RECOMMEND_MAP[feeling]?.[time] || 'boxBreathing';

// ── Helpers ──────────────────────────────────────────────────────────────────

const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

// ── Main component ───────────────────────────────────────────────────────────

export default function App({ onExit, initialView = 'home' }) {
  const [view, setView] = useState(initialView);

  // Browse state
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Assessment state
  const [assessStep, setAssessStep] = useState(0);
  const [assessAnswers, setAssessAnswers] = useState({});
  const [recommendedKey, setRecommendedKey] = useState(null);

  // Exercise state
  const [exercise, setExercise] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [phaseTimeLeft, setPhaseTimeLeft] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

  const phaseRef = useRef({ index: 0, timeLeft: 0 });

  const startExercise = (key, quick = false) => {
    const ex = EXERCISES[key];
    const duration = quick ? ex.quickDuration : ex.duration;
    setExercise({ key, ...ex, actualDuration: duration });
    setTotalTime(duration);
    setPhaseIndex(0);
    setPhaseTimeLeft(ex.phases[0].duration);
    setShowFeedback(false);
    setIsActive(true);
    setView('exercise');
  };

  const stopExercise = () => {
    setIsActive(false);
    setShowFeedback(true);
  };

  const finishSession = () => {
    setExercise(null);
    setIsActive(false);
    setShowFeedback(false);
    setView('home');
  };

  // Total countdown
  useEffect(() => {
    if (!isActive) return;
    const id = setInterval(() => {
      setTotalTime(t => {
        if (t <= 1) { setIsActive(false); setShowFeedback(true); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [isActive]);

  // Phase tracking
  useEffect(() => {
    if (!isActive || !exercise) return;
    phaseRef.current = { index: 0, timeLeft: exercise.phases[0].duration };
    setPhaseIndex(0);
    setPhaseTimeLeft(exercise.phases[0].duration);

    const id = setInterval(() => {
      let { index, timeLeft } = phaseRef.current;
      timeLeft--;
      if (timeLeft <= 0) {
        index = (index + 1) % exercise.phases.length;
        timeLeft = exercise.phases[index].duration;
      }
      phaseRef.current = { index, timeLeft };
      setPhaseIndex(index);
      setPhaseTimeLeft(timeLeft);
    }, 1000);

    return () => clearInterval(id);
  }, [isActive, exercise]);

  // ── Render ────────────────────────────────────────────────────────────────

  if (showFeedback) {
    return <FeedbackScreen onDone={finishSession} exerciseName={exercise?.name} />;
  }

  if (view === 'exercise' && exercise) {
    const phase = exercise.phases[phaseIndex];
    const progress = ((exercise.actualDuration - totalTime) / exercise.actualDuration) * 100;
    return (
      <div className="ex-screen">
        <div className="ex-topbar">
          <button className="ex-stop" onClick={stopExercise} aria-label="Stop">✕</button>
          <span className="ex-title">{exercise.name}</span>
          <span className="ex-clock">{fmt(totalTime)}</span>
        </div>

        <div className="orb-wrap">
          <div
            className={`orb orb--${phase.key}`}
            style={{ '--dur': `${phase.duration}s` }}
          >
            <div className="orb-inner">
              <span className="orb-phase">{phase.name}</span>
              <span className="orb-count">{phaseTimeLeft}</span>
            </div>
          </div>
        </div>

        <p className="ex-instruction">{phase.instruction}</p>

        <div className="ex-footer">
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
    );
  }

  // Assessment — question flow
  if (view === 'assessment') {
    const q = QUESTIONS[assessStep];
    const isFirst = assessStep === 0;

    const handleBack = () => {
      if (!isFirst) {
        setAssessStep(s => s - 1);
      } else if (onExit) {
        onExit();
      } else {
        setView('home');
      }
    };

    const handleOption = (val) => {
      const next = { ...assessAnswers, [q.id]: val };
      setAssessAnswers(next);

      if (assessStep < QUESTIONS.length - 1) {
        setAssessStep(s => s + 1);
      } else {
        const key = getRecommendation(next.feeling, next.time);
        setRecommendedKey(key);
        setView('recommendation');
      }
    };

    return (
      <div className="app-screen">
        <header className="app-header">
          <button className="back-link" onClick={handleBack}>
            {isFirst ? '← Home' : '← Back'}
          </button>
          <span className="header-brand">Present</span>
          <span className="assess-progress">
            {assessStep + 1}&thinsp;/&thinsp;{QUESTIONS.length}
          </span>
        </header>

        <main className="assess-main">
          <h2 className="assess-q">{q.q}</h2>
          <div className="assess-opts">
            {q.opts.map(opt => (
              <button
                key={opt.value}
                className="assess-opt"
                onClick={() => handleOption(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </main>
      </div>
    );
  }

  // Recommendation
  if (view === 'recommendation' && recommendedKey) {
    const ex = EXERCISES[recommendedKey];
    const isQuick = assessAnswers.time === 'short';
    const duration = isQuick ? ex.quickDuration : ex.duration;
    const context = FEELING_CONTEXT[assessAnswers.feeling];

    const handleBack = () => {
      setAssessStep(QUESTIONS.length - 1);
      setView('assessment');
    };

    return (
      <div className="app-screen">
        <header className="app-header">
          <button className="back-link" onClick={handleBack}>← Back</button>
          <span className="header-brand">Present</span>
          <span />
        </header>

        <main className="rec-main">
          <p className="rec-eyebrow">Recommended for you</p>

          <div className="rec-card">
            <h2 className="rec-name">{ex.name}</h2>
            <p className="rec-desc">{ex.description}</p>
            <div className="rec-meta">
              <span>{fmt(duration)}</span>
              <span className="rec-dot">·</span>
              <span>{CATEGORIES[ex.category].name}</span>
            </div>
            {context && (
              <p className="rec-context">{context}</p>
            )}
          </div>

          <button
            className="btn btn--primary btn--full rec-start"
            onClick={() => startExercise(recommendedKey, isQuick)}
          >
            Start session →
          </button>
          <button
            className="btn btn--ghost btn--full"
            onClick={() => setView('home')}
          >
            Browse all exercises
          </button>
        </main>
      </div>
    );
  }

  // Category view
  if (view === 'category' && selectedCategory) {
    const cat = CATEGORIES[selectedCategory];
    return (
      <div className="app-screen">
        <header className="app-header">
          <button className="back-link" onClick={() => setView('home')}>← Back</button>
          <span className="header-title">{cat.name}</span>
          <span />
        </header>
        <main className="list-main">
          {cat.exercises.map(key => {
            const ex = EXERCISES[key];
            return (
              <div key={key} className="ex-row">
                <div className="ex-row-info">
                  <h3>{ex.name}</h3>
                  <p>{ex.description}</p>
                </div>
                <div className="ex-row-actions">
                  <button className="btn btn--ghost" onClick={() => startExercise(key, true)}>
                    {fmt(ex.quickDuration)}
                  </button>
                  <button className="btn btn--primary" onClick={() => startExercise(key, false)}>
                    {fmt(ex.duration)}
                  </button>
                </div>
              </div>
            );
          })}
        </main>
      </div>
    );
  }

  // Home — browse categories
  return (
    <div className="app-screen">
      <header className="app-header">
        {onExit
          ? <button className="back-link" onClick={onExit}>← Home</button>
          : <span />
        }
        <span className="header-brand">Present</span>
        <span />
      </header>
      <main className="home-main">
        <h1 className="home-heading">What do you need?</h1>
        <div className="cat-grid">
          {Object.entries(CATEGORIES).map(([key, cat]) => (
            <button
              key={key}
              className="cat-card"
              onClick={() => { setSelectedCategory(key); setView('category'); }}
            >
              <span className="cat-name">{cat.name}</span>
              <span className="cat-desc">{cat.description}</span>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}

// ── Feedback ─────────────────────────────────────────────────────────────────

function FeedbackScreen({ onDone, exerciseName }) {
  const [answers, setAnswers] = useState({});
  const questions = [
    { id: 'feeling', q: 'How do you feel?',    opts: ['Much better', 'Better', 'Same', 'Worse'] },
    { id: 'helpful', q: 'Was this helpful?', opts: ['Very', 'Helpful', 'Somewhat', 'Not really'] },
  ];
  const allAnswered = questions.every(q => answers[q.id]);

  return (
    <div className="fb-screen">
      <div className="fb-card">
        <h2>Session complete</h2>
        {exerciseName && <p className="fb-sub">{exerciseName}</p>}

        <div className="fb-questions">
          {questions.map(({ id, q, opts }) => (
            <div key={id} className="fb-q">
              <p className="fb-label">{q}</p>
              <div className="fb-opts">
                {opts.map(opt => (
                  <button
                    key={opt}
                    className={`fb-opt${answers[id] === opt ? ' selected' : ''}`}
                    onClick={() => setAnswers(a => ({ ...a, [id]: opt }))}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          className="btn btn--primary btn--full"
          onClick={onDone}
          disabled={!allAnswered}
        >
          Done
        </button>
        <button className="btn btn--ghost btn--full" onClick={onDone}>
          Skip
        </button>
      </div>
    </div>
  );
}
