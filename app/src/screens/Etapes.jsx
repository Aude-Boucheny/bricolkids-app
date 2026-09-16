import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Screen, StatusBar, PrimaryButton } from '../components/ui';
import { StepVisual } from '../components/StepVisual';
import { FinishedPreview } from '../components/FinishedPreview';

export default function Etapes() {
  const navigate = useNavigate();
  const { activity, history, markDone } = useApp();
  const [index, setIndex] = useState(0);

  if (!activity) {
    navigate('/');
    return null;
  }

  const steps = activity.steps;
  const step = steps[index];
  const isLast = index === steps.length - 1;

  function next() {
    if (isLast) {
      const entry = history.find((h) => h.activity.id === activity.id);
      if (entry) markDone(entry.key);
      navigate('/activite');
    } else {
      setIndex((i) => i + 1);
    }
  }

  function prev() {
    if (index === 0) navigate('/activite');
    else setIndex((i) => i - 1);
  }

  return (
    <Screen>
      <StatusBar />
      <div style={{ padding: '12px 24px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={prev} style={{ background: 'none', border: 'none', fontSize: 28, cursor: 'pointer', color: 'inherit', padding: 4 }}>←</button>
        <div style={{ flex: 1, fontSize: 13, fontWeight: 700 }}>Étape {index + 1} sur {steps.length}</div>
        <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--label)' }}>Mode mains libres</div>
      </div>

      <div style={{ display: 'flex', gap: 5, padding: '12px 24px 0' }}>
        {steps.map((_, i) => (
          <div key={i} style={{ flex: 1, height: 4, borderRadius: 999, background: i <= index ? 'var(--lavender)' : '#E7E2F5' }} />
        ))}
      </div>

      <div style={{ margin: '16px 24px 0', height: 180, borderRadius: 20, overflow: 'hidden' }}>
        {isLast ? (
          <FinishedPreview type={activity.patterns[0]?.type} />
        ) : (
          <StepVisual kind={step.visual} color={activity.patterns[0]?.color ?? 'var(--lavender)'} />
        )}
      </div>

      <div style={{ padding: '18px 24px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, lineHeight: 1.25, color: 'var(--ink)' }}>
          {step.title}
        </div>
        <div style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.55, color: 'var(--ink-soft)' }}>{step.description}</div>
      </div>

      <div
        style={{
          margin: '16px 24px 0',
          background: '#FFFFFF',
          borderRadius: 14,
          padding: 12,
          display: 'flex',
          gap: 10,
          alignItems: 'center',
          boxShadow: '0 6px 18px rgba(59,53,80,.07)',
        }}
      >
        <div style={{ width: 22, height: 22, borderRadius: 999, background: 'var(--yellow)', flex: '0 0 auto' }} />
        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-soft)' }}>{step.ageNote}</div>
      </div>

      <div style={{ marginTop: 'auto', padding: '14px 24px 28px', display: 'flex', gap: 10 }}>
        <button
          onClick={prev}
          style={{ width: 56, height: 54, borderRadius: 16, border: '2px solid var(--ink)', background: 'none', color: 'var(--ink)', fontSize: 18, cursor: 'pointer' }}
        >
          ‹
        </button>
        <PrimaryButton onClick={next} style={{ flex: 1 }}>{isLast ? "C'est terminé !" : 'Étape suivante'}</PrimaryButton>
      </div>
    </Screen>
  );
}
