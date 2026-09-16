import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Screen, StatusBar, TopBar, PrimaryButton, SecondaryButton } from '../components/ui';
import { FinishedPreview } from '../components/FinishedPreview';

export default function Propositions() {
  const navigate = useNavigate();
  const { brief, proposals, selectActivity } = useApp();
  const [main, ...rest] = proposals;

  function openActivity(activity) {
    selectActivity(activity);
    navigate('/activite');
  }

  function regenerate() {
    navigate('/generation', { state: { brief } });
  }

  if (!main) {
    return (
      <Screen>
        <StatusBar />
        <TopBar onBack={() => navigate('/')} title="Trois idées pour vous" />
        <div style={{ padding: 24, fontSize: 14 }}>
          Pas encore de proposition — <a href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }}>revenir au brief</a>.
        </div>
      </Screen>
    );
  }

  return (
    <Screen>
      <StatusBar />
      <TopBar onBack={() => navigate('/')} title="Trois idées pour vous" />
      <div style={{ padding: '10px 24px 0', display: 'flex', gap: 6, flexWrap: 'wrap', fontWeight: 700, fontSize: 12, color: 'var(--ink)' }}>
        <span style={{ borderRadius: 999, background: '#FFFFFF', padding: '6px 12px' }}>{brief.ages.length} enfant{brief.ages.length > 1 ? 's' : ''}</span>
        <span style={{ borderRadius: 999, background: '#FFFFFF', padding: '6px 12px' }}>{[...brief.ages].sort((a, b) => a - b).join('·')} ans</span>
        <span style={{ borderRadius: 999, background: '#FFFFFF', padding: '6px 12px' }}>{brief.duree} min</span>
      </div>

      <div style={{ padding: '16px 24px 24px', display: 'flex', flexDirection: 'column', gap: 14, overflowY: 'auto' }}>
        <button
          onClick={() => openActivity(main)}
          style={{ textAlign: 'left', border: 'none', padding: 0, background: '#FFFFFF', borderRadius: 22, boxShadow: '0 10px 26px rgba(59,53,80,.10)', overflow: 'hidden', cursor: 'pointer' }}
        >
          <div style={{ height: 140, position: 'relative' }}>
            <FinishedPreview type={main.patterns[0]?.type} />
            <div style={{ position: 'absolute', top: 11, right: 11, background: 'var(--yellow)', color: 'var(--yellow-ink)', fontWeight: 800, fontSize: 11, padding: '6px 12px', borderRadius: 999 }}>
              Recommandé
            </div>
          </div>
          <div style={{ padding: 15, display: 'flex', flexDirection: 'column', gap: 9 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, lineHeight: 1.15, color: 'var(--ink)' }}>{main.title}</div>
            <div style={{ fontSize: 13.5, fontWeight: 600, lineHeight: 1.5, color: 'var(--ink)' }}>{main.blurb}</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', fontWeight: 700, fontSize: 12, color: 'var(--ink)' }}>
              <span style={{ borderRadius: 999, background: 'var(--lavender-tint)', padding: '6px 12px' }}>{main.duration} min</span>
              <span style={{ borderRadius: 999, background: 'var(--lavender-tint)', padding: '6px 12px' }}>{main.pageCount} patron{main.pageCount > 1 ? 's' : ''}</span>
              <span style={{ borderRadius: 999, background: 'var(--lavender-tint)', padding: '6px 12px' }}>{main.materialLabel}</span>
            </div>
          </div>
        </button>

        {rest.map((activity) => (
          <button
            key={activity.id}
            onClick={() => openActivity(activity)}
            style={{ textAlign: 'left', border: 'none', padding: 0, background: '#FFFFFF', borderRadius: 22, boxShadow: '0 10px 26px rgba(59,53,80,.10)', display: 'flex', overflow: 'hidden', cursor: 'pointer' }}
          >
            <div style={{ width: 96, flex: '0 0 auto' }}>
              <FinishedPreview type={activity.patterns[0]?.type} />
            </div>
            <div style={{ padding: 13, display: 'flex', flexDirection: 'column', gap: 6, justifyContent: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, color: 'var(--ink)' }}>{activity.title}</div>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--ink)' }}>{activity.duration} min · {activity.pageCount} patron{activity.pageCount > 1 ? 's' : ''}</div>
            </div>
          </button>
        ))}
      </div>

      <div style={{ marginTop: 'auto', padding: '14px 24px 28px', display: 'flex', gap: 10 }}>
        <SecondaryButton onClick={regenerate}>Autres</SecondaryButton>
        <PrimaryButton onClick={() => openActivity(main)} style={{ flex: 1 }}>Voir le kit</PrimaryButton>
      </div>
    </Screen>
  );
}
