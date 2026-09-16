import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useState } from 'react';
import { Screen, StatusBar, PrimaryButton, SecondaryButton, SectionLabel, Card } from '../components/ui';
import { FinishedPreview } from '../components/FinishedPreview';

const TABS = ['Aperçu', 'Matériel', 'Étapes', 'Patrons'];

export default function Fiche() {
  const navigate = useNavigate();
  const { activity, history, toggleFavorite } = useApp();
  const [favorite, setFavorite] = useState(false);

  if (!activity) {
    return (
      <Screen>
        <StatusBar />
        <div style={{ padding: 24, fontSize: 14 }}>
          Aucune activité sélectionnée — <a href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }}>revenir au brief</a>.
        </div>
      </Screen>
    );
  }

  function goTab(tab) {
    if (tab === 'Matériel') navigate('/activite/materiel');
    if (tab === 'Étapes') navigate('/activite/etapes');
    if (tab === 'Patrons') navigate('/activite/patrons');
  }

  function onToggleFavorite() {
    setFavorite((f) => !f);
    const entry = history.find((h) => h.activity.id === activity.id);
    if (entry) toggleFavorite(entry.key);
  }

  return (
    <Screen>
      <div
        style={{
          background: 'var(--lavender)',
          backgroundImage: 'radial-gradient(rgba(255,255,255,.3) 1px, transparent 1.4px)',
          backgroundSize: '16px 16px',
          padding: '13px 22px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontWeight: 800, color: '#E6E1FA' }}>
          <span>9:41</span>
          <span>▮▮▮</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 19, color: '#FFFFFF' }}>
          <button onClick={() => navigate('/propositions')} style={{ background: 'none', border: 'none', color: 'inherit', fontSize: 28, cursor: 'pointer', padding: 0 }}>←</button>
          <button onClick={onToggleFavorite} style={{ background: 'none', border: 'none', color: 'inherit', fontSize: 20, cursor: 'pointer', padding: 0 }}>
            {favorite ? '♥' : '♡'}
          </button>
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 30, lineHeight: 1.05, color: '#FFFFFF' }}>
          {activity.title}
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', fontWeight: 800, fontSize: 11.5, color: 'var(--ink)' }}>
          <span style={{ borderRadius: 999, background: '#FFFFFF', padding: '6px 12px' }}>{activity.duration} min</span>
          <span style={{ borderRadius: 999, background: '#FFFFFF', padding: '6px 12px' }}>{activity.ageMin} – {activity.ageMax} ans</span>
          <span style={{ borderRadius: 999, background: '#FFFFFF', padding: '6px 12px' }}>
            {activity.messiness === 'none' ? 'pas salissant' : 'peu salissant'}
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 16, padding: '14px 24px 0', borderBottom: '2px solid #E7E2F5' }}>
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => goTab(tab)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              paddingBottom: 9,
              marginBottom: -2,
              fontWeight: tab === 'Aperçu' ? 800 : 700,
              fontSize: 13.5,
              color: tab === 'Aperçu' ? 'var(--ink)' : 'var(--ink-mute)',
              borderBottom: tab === 'Aperçu' ? '3px solid var(--peach)' : '3px solid transparent',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div style={{ padding: '16px 24px 24px', display: 'flex', flexDirection: 'column', gap: 14, overflowY: 'auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ height: 150, borderRadius: 20, overflow: 'hidden', boxShadow: '0 8px 22px rgba(59,53,80,.08)' }}>
            <FinishedPreview type={activity.patterns[0]?.type} />
          </div>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-mute)', textAlign: 'center' }}>
            Aperçu du résultat une fois monté
          </div>
        </div>

        <Card style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.55 }}>{activity.blurb}</Card>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          <SectionLabel>Qui fait quoi</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 9 }}>
            {activity.ageRoles.map((r, i) => (
              <div key={i} style={{ borderRadius: 16, background: r.color.bg, color: r.color.ink, padding: 12, display: 'flex', flexDirection: 'column', gap: 5 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16 }}>{r.age} ans</div>
                <div style={{ fontSize: 11.5, fontWeight: 700, lineHeight: 1.35 }}>{r.role}</div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => navigate('/activite/patrons')}
          style={{ textAlign: 'left', border: 'none', cursor: 'pointer', background: '#FFFFFF', borderRadius: 20, boxShadow: '0 8px 22px rgba(59,53,80,.08)', padding: 14, display: 'flex', gap: 12, alignItems: 'center' }}
        >
          <div style={{ width: 42, height: 42, borderRadius: 14, background: 'var(--lavender-tint)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, color: 'var(--lavender)' }}>▤</div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, color: 'var(--ink)' }}>
              {activity.pageCount} planche{activity.pageCount > 1 ? 's' : ''} A4
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-soft)' }}>Découper · plier · colorier</div>
          </div>
          <div style={{ fontSize: 18, color: '#A49DC0' }}>›</div>
        </button>
      </div>

      <div style={{ marginTop: 'auto', padding: '14px 24px 28px', display: 'flex', gap: 10 }}>
        <SecondaryButton onClick={() => navigate('/activite/patrons')}>Imprimer</SecondaryButton>
        <PrimaryButton onClick={() => navigate('/activite/etapes')} style={{ flex: 1 }}>Commencer</PrimaryButton>
      </div>
    </Screen>
  );
}
