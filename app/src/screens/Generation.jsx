import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Screen, StatusBar } from '../components/ui';

const STEPS = ['Idée choisie', 'Étapes adaptées aux âges', 'Patrons à imprimer'];
const TOTAL_MS = 1800;

export default function Generation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { runGeneration } = useApp();
  const [progress, setProgress] = useState(0);
  const doneRef = useRef(false);

  useEffect(() => {
    const brief = location.state?.brief;
    const start = performance.now();
    let raf;

    function tick(now) {
      const pct = Math.min(1, (now - start) / TOTAL_MS);
      setProgress(pct);
      if (pct < 1) {
        raf = requestAnimationFrame(tick);
      } else if (!doneRef.current) {
        doneRef.current = true;
        runGeneration(brief);
        navigate('/propositions', { replace: true });
      }
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const doneCount = Math.min(STEPS.length, Math.floor(progress * (STEPS.length + 0.3)));
  const seconds = Math.max(0, Math.ceil((TOTAL_MS * (1 - progress)) / 1000));

  return (
    <Screen>
      <StatusBar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 26, padding: '0 34px' }}>
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: 32,
            background: 'var(--lavender)',
            backgroundImage: 'radial-gradient(rgba(255,255,255,.35) 1.5px, transparent 2px)',
            backgroundSize: '18px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 40,
            animation: 'bk-pulse 1.1s ease-in-out infinite',
          }}
        >
          ✂️
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20, textAlign: 'center', color: 'var(--ink)' }}>
          On assemble votre kit…
        </div>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {STEPS.map((label, i) => (
            <div key={label} style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: 13.5, fontWeight: 700, color: i < doneCount ? 'var(--ink)' : 'var(--ink-mute)' }}>
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 999,
                  background: i < doneCount ? 'var(--lavender)' : 'transparent',
                  border: i < doneCount ? 'none' : '1.5px solid #C7C0E4',
                  color: '#fff',
                  fontSize: 11,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {i < doneCount ? '✓' : ''}
              </div>
              {label}
            </div>
          ))}
        </div>
        <div style={{ width: '100%', height: 6, background: '#E7E2F5', borderRadius: 999, overflow: 'hidden' }}>
          <div style={{ width: `${progress * 100}%`, height: '100%', background: 'var(--lavender)', transition: 'width .1s linear' }} />
        </div>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-mute)' }}>≈ {seconds} s</div>
      </div>
      <style>{`
        @keyframes bk-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.06); }
        }
      `}</style>
    </Screen>
  );
}
