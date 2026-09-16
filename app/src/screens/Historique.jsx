import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Screen, StatusBar } from '../components/ui';

const FILTERS = ['Tout', 'Favoris', 'Faites'];

export default function Historique() {
  const navigate = useNavigate();
  const { history, reopenFromHistory, setBrief } = useApp();
  const [filter, setFilter] = useState('Tout');

  const visible = history.filter((h) => {
    if (filter === 'Favoris') return h.favorite;
    if (filter === 'Faites') return h.done;
    return true;
  });

  function open(entry) {
    reopenFromHistory(entry);
    navigate('/activite');
  }

  function redo(entry, e) {
    e.stopPropagation();
    setBrief(entry.brief);
    navigate('/');
  }

  return (
    <Screen>
      <StatusBar />
      <div style={{ padding: '16px 24px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: 'inherit' }}>←</button>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 24 }}>Historique</div>
      </div>

      <div style={{ padding: '14px 24px 0', display: 'flex', gap: 8 }}>
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              border: 'none',
              borderRadius: 999,
              padding: '6px 14px',
              fontSize: 12,
              fontWeight: 700,
              cursor: 'pointer',
              background: filter === f ? 'var(--ink)' : '#FFFFFF',
              color: filter === f ? 'var(--page)' : 'var(--ink-mute)',
            }}
          >
            {f}
          </button>
        ))}
      </div>

      <div style={{ padding: '16px 24px 24px', display: 'flex', flexDirection: 'column', gap: 11, overflowY: 'auto' }}>
        {visible.length === 0 && (
          <div style={{ fontSize: 13.5, color: 'var(--ink-mute)', padding: '20px 0' }}>
            Rien ici pour l'instant — vos activités générées apparaîtront dans cette liste.
          </div>
        )}
        {visible.map((entry) => (
          <div
            key={entry.key}
            role="button"
            tabIndex={0}
            onClick={() => open(entry)}
            onKeyDown={(e) => { if (e.key === 'Enter') open(entry); }}
            style={{ display: 'flex', gap: 12, border: 'none', background: '#FFFFFF', borderRadius: 16, padding: 12, cursor: 'pointer', textAlign: 'left', boxShadow: '0 6px 18px rgba(59,53,80,.06)' }}
          >
            <div style={{ width: 64, height: 64, borderRadius: 12, background: entry.activity.patterns[0]?.color ?? 'var(--lavender)', flex: '0 0 auto' }} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5, justifyContent: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color: 'var(--ink)' }}>{entry.activity.title}</div>
              <div style={{ fontSize: 12, color: 'var(--ink-soft)', fontWeight: 600 }}>
                {entry.favorite ? '★ ' : ''}{entry.activity.duration} min · {entry.activity.ageMin}-{entry.activity.ageMax} ans{entry.done ? ' · faite' : ''}
              </div>
              <button
                onClick={(e) => redo(entry, e)}
                style={{ alignSelf: 'flex-start', background: 'none', border: 'none', padding: 0, fontSize: 11, fontWeight: 800, color: 'var(--label)', cursor: 'pointer' }}
              >
                Refaire avec les mêmes réglages
              </button>
            </div>
          </div>
        ))}
      </div>
    </Screen>
  );
}
