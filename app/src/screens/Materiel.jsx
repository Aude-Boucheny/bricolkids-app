import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Screen, StatusBar, SectionLabel, PrimaryButton, SecondaryButton } from '../components/ui';

export default function Materiel() {
  const navigate = useNavigate();
  const { activity } = useApp();
  const [checked, setChecked] = useState({});
  const [shared, setShared] = useState(false);

  if (!activity) {
    navigate('/');
    return null;
  }

  const items = [
    ...activity.have.map((name) => ({ name, group: 'have' })),
    ...activity.need.map((name) => ({ name, group: 'need' })),
  ];
  const missing = activity.need.filter((name) => !checked[name]);

  function toggle(name) {
    setChecked((c) => ({ ...c, [name]: !c[name] }));
  }

  async function share() {
    const text = `Matériel pour « ${activity.title} » :\n${items.map((i) => `- ${i.name}`).join('\n')}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: activity.title, text });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
      }
      setShared(true);
      setTimeout(() => setShared(false), 1800);
    } catch {
      // partage annulé par l'utilisateur : rien à faire
    }
  }

  return (
    <Screen>
      <StatusBar />
      <div style={{ padding: '12px 24px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => navigate('/activite')} style={{ background: 'none', border: 'none', fontSize: 28, cursor: 'pointer', color: 'inherit', padding: 4 }}>←</button>
        <div style={{ flex: 1, fontSize: 15, fontWeight: 700 }}>Matériel</div>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-mute)' }}>
          {Object.values(checked).filter(Boolean).length}/{items.length}
        </div>
      </div>

      <div style={{ padding: '16px 24px 24px', display: 'flex', flexDirection: 'column', gap: 20, overflowY: 'auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          <SectionLabel>Vous avez sûrement</SectionLabel>
          {activity.have.map((name) => (
            <ItemRow key={name} name={name} checked={!!checked[name]} onToggle={() => toggle(name)} />
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          <SectionLabel>À prévoir</SectionLabel>
          {activity.need.map((name) => (
            <ItemRow key={name} name={name} checked={!!checked[name]} onToggle={() => toggle(name)} />
          ))}
        </div>
        {missing.length > 0 && (
          <div style={{ border: '1.5px dashed #C7BEE8', borderRadius: 14, padding: 13, fontSize: 12, color: 'var(--ink-soft)', lineHeight: 1.5 }}>
            Il vous manque {missing.length} item{missing.length > 1 ? 's' : ''} → cochez au fur et à mesure, ou adaptez l'activité sans.
          </div>
        )}
        {shared && (
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--label)' }}>Liste copiée / partagée ✓</div>
        )}
      </div>

      <div style={{ marginTop: 'auto', padding: '14px 24px 28px', display: 'flex', gap: 10 }}>
        <SecondaryButton style={{ flex: 1 }} onClick={share}>Partager la liste</SecondaryButton>
        <PrimaryButton onClick={() => navigate('/activite')} style={{ flex: 1 }}>C'est prêt</PrimaryButton>
      </div>
    </Screen>
  );
}

function ItemRow({ name, checked, onToggle }) {
  return (
    <button
      onClick={onToggle}
      style={{
        display: 'flex',
        gap: 12,
        alignItems: 'center',
        border: 'none',
        background: '#FFFFFF',
        borderRadius: 14,
        padding: 12,
        cursor: 'pointer',
        textAlign: 'left',
        boxShadow: '0 4px 14px rgba(59,53,80,.06)',
      }}
    >
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: 6,
          background: checked ? 'var(--ink)' : 'transparent',
          border: checked ? 'none' : '1.5px solid #C7C0E4',
          color: '#fff',
          fontSize: 12,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flex: '0 0 auto',
        }}
      >
        {checked ? '✓' : ''}
      </div>
      <div style={{ flex: 1, fontSize: 13.5, fontWeight: 600, color: 'var(--ink)', textDecoration: checked ? 'line-through' : 'none', opacity: checked ? 0.6 : 1 }}>
        {name}
      </div>
    </button>
  );
}
