import React, { useState, useEffect } from 'react';
import './Website.css';

export default function Website({ onStartSession, onOpenApp }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const TECHNIQUES = [
    {
      name: 'Box Breathing',
      tags: 'Stress · Focus',
      time: '1–2 min',
      desc: 'Inhale 4, hold 4, exhale 4, hold 4. Used by Navy SEALs under pressure.',
    },
    {
      name: '4-7-8 Breathing',
      tags: 'Anxiety · Sleep',
      time: '1–3 min',
      desc: "Inhale 4, hold 7, exhale 8. Dr. Weil's well-studied calming method.",
    },
    {
      name: 'Deep Belly Breath',
      tags: 'Calm · Reset',
      time: '1–2 min',
      desc: 'Slow diaphragmatic breathing that activates the parasympathetic nervous system.',
    },
    {
      name: '5-4-3-2-1 Grounding',
      tags: 'Anxiety · Panic',
      time: '3–5 min',
      desc: 'Use your five senses to pull attention back to the present moment.',
    },
  ];

  return (
    <div className="site">
      <nav className={`site-nav${scrolled ? ' site-nav--solid' : ''}`}>
        <div className="nav-row">
          <span className="nav-brand">Present</span>
          <div className="nav-links">
            <a href="#techniques">Techniques</a>
            <a href="#about">About</a>
          </div>
          <button className="nav-cta" onClick={onOpenApp}>Open App</button>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-orb-wrap">
          <div className="hero-orb" />
        </div>
        <div className="hero-copy">
          <h1>Breathe with intention.</h1>
          <p>
            Guided breathing and grounding exercises — no account, no ads, no noise.
            Just your breath.
          </p>
          <button className="cta-btn" onClick={onStartSession}>Start a session →</button>
        </div>
      </section>

      {/* Techniques */}
      <section id="techniques" className="techniques">
        <div className="section-inner">
          <div className="section-head">
            <h2>Techniques</h2>
            <p>Science-backed methods for stress, sleep, energy, and focus.</p>
          </div>
          <div className="tech-grid">
            {TECHNIQUES.map(t => (
              <div key={t.name} className="tech-card">
                <div className="tech-meta">
                  <span className="tech-tag">{t.tags}</span>
                  <span className="tech-time">{t.time}</span>
                </div>
                <h3>{t.name}</h3>
                <p>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="about">
        <div className="section-inner about-inner">
          <div className="about-copy">
            <h2>No fluff. Just breathing.</h2>
            <p>
              Present is a simple breathwork tool. No subscription, no streak tracking,
              no push notifications asking you to "maintain your streak."
            </p>
            <p>Pick an exercise. Follow along. Feel the difference.</p>
            <button className="cta-btn" onClick={onStartSession} style={{ marginTop: 24 }}>
              Try it now →
            </button>
          </div>
          <div className="about-features">
            <div className="feature-row">
              <span className="feature-title">12+ exercises</span>
              <span className="feature-desc">Breathing, grounding, calm, and energy</span>
            </div>
            <div className="feature-row">
              <span className="feature-title">No headphones needed</span>
              <span className="feature-desc">Visual-only guidance — use anywhere, quietly</span>
            </div>
            <div className="feature-row">
              <span className="feature-title">Quick or full sessions</span>
              <span className="feature-desc">Every exercise has a 30–60 second quick mode</span>
            </div>
            <div className="feature-row">
              <span className="feature-title">Works offline</span>
              <span className="feature-desc">No network required once the page loads</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-row">
          <span className="nav-brand">Present</span>
          <span className="footer-note">Made for calm minds.</span>
        </div>
      </footer>
    </div>
  );
}
