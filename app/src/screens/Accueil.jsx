import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Screen, StatusBar, SectionLabel, PrimaryButton } from '../components/ui';

const OCCASIONS = ['Anniversaire', 'Mercredi', 'Jour de pluie', 'Atelier'];
const CONTRAINTES = ['Pas salissant', 'Sans ciseaux', "Récup'"];
const DUREES = [15, 30, 45, 60];
const AGE_CYCLE = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function nextAge(age) {
  const i = AGE_CYCLE.indexOf(age);
  return AGE_CYCLE[(i + 1) % AGE_CYCLE.length];
}

export default function Accueil() {
  const navigate = useNavigate();
  const { brief, setBrief } = useApp();
  const [local, setLocal] = useState(brief);
  const [precisionOpen, setPrecisionOpen] = useState(Boolean(brief.precision));

  const countActive = local.ages.length <= 3 ? local.ages.length : '4+';

  function setCount(n) {
    setLocal((b) => {
      if (n === '4+') {
        if (b.ages.length >= 4) return b;
        const defaults = [4, 6, 8, 10, 12];
        return { ...b, ages: [...b.ages, ...defaults.slice(0, 4 - b.ages.length)] };
      }
      if (b.ages.length === n) return b;
      if (b.ages.length > n) return { ...b, ages: b.ages.slice(0, n) };
      const defaults = [4, 6, 8, 10, 12];
      const extra = defaults.slice(b.ages.length, n);
      while (extra.length < n - b.ages.length) extra.push(6);
      return { ...b, ages: [...b.ages, ...extra] };
    });
  }

  function cycleAge(index) {
    setLocal((b) => ({
      ...b,
      ages: b.ages.map((a, i) => (i === index ? nextAge(a) : a)),
    }));
  }

  function addAge() {
    setLocal((b) => ({ ...b, ages: [...b.ages, 6] }));
  }

  function setOccasion(o) {
    setLocal((b) => ({ ...b, occasion: o }));
  }

  function toggleContrainte(c) {
    setLocal((b) => ({
      ...b,
      contraintes: b.contraintes.includes(c)
        ? b.contraintes.filter((x) => x !== c)
        : [...b.contraintes, c],
    }));
  }

  function reset() {
    setLocal({ ages: [4, 7, 9], occasion: 'Anniversaire', duree: 45, contraintes: ['Pas salissant'], precision: '' });
  }

  function submit() {
    setBrief(local);
    navigate('/generation', { state: { brief: local } });
  }

  return (
    <Screen>
      <StatusBar />
      <div style={{ padding: '4px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 27, color: 'var(--ink)' }}>
          Nouveau brief
        </div>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <button
            onClick={() => navigate('/historique')}
            style={{ background: 'none', border: 'none', fontSize: 12, fontWeight: 800, color: 'var(--label)', cursor: 'pointer' }}
          >
            Historique
          </button>
          <button
            onClick={reset}
            style={{ background: 'none', border: 'none', fontSize: 12, fontWeight: 800, color: 'var(--label)', cursor: 'pointer' }}
          >
            Réinit.
          </button>
        </div>
      </div>
      <div style={{ padding: '4px 24px 0', fontSize: 13.5, fontWeight: 600, color: 'var(--ink-soft)' }}>
        Cinq réglages, et on fabrique.
      </div>

      <div style={{ padding: '16px 24px 24px', display: 'flex', flexDirection: 'column', gap: 13, overflowY: 'auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <SectionLabel>Combien d'enfants</SectionLabel>
          <div style={{ display: 'flex', gap: 7 }}>
            {[1, 2, 3, '4+'].map((n) => (
              <button
                key={n}
                onClick={() => setCount(n)}
                style={{
                  flex: 1,
                  textAlign: 'center',
                  padding: '11px 0',
                  borderRadius: 999,
                  border: 'none',
                  background: countActive === n ? 'var(--lavender)' : '#FFFFFF',
                  color: countActive === n ? '#FFFFFF' : 'var(--ink)',
                  fontWeight: 800,
                  fontSize: 15,
                  cursor: 'pointer',
                }}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <SectionLabel>Âges — touche pour ajuster</SectionLabel>
          <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
            {local.ages.map((age, i) => {
              const colors = ['var(--green)', 'var(--peach)', 'var(--yellow)'];
              const inks = ['var(--green-ink)', 'var(--peach-ink)', 'var(--yellow-ink)'];
              const c = colors[i % 3];
              const ink = inks[i % 3];
              return (
                <button
                  key={i}
                  onClick={() => cycleAge(i)}
                  style={{
                    border: 'none',
                    borderRadius: 999,
                    background: c,
                    color: ink,
                    padding: '8px 15px',
                    fontWeight: 800,
                    fontSize: 13,
                    cursor: 'pointer',
                  }}
                >
                  {age} ans
                </button>
              );
            })}
            <button
              onClick={addAge}
              style={{
                borderRadius: 999,
                background: '#FFFFFF',
                color: 'var(--ink-mute)',
                padding: '8px 15px',
                fontWeight: 700,
                fontSize: 13,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              + ajouter
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <SectionLabel>Occasion</SectionLabel>
          <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
            {OCCASIONS.map((o) => (
              <button
                key={o}
                onClick={() => setOccasion(o)}
                style={{
                  border: 'none',
                  borderRadius: 999,
                  padding: '8px 15px',
                  fontWeight: 700,
                  fontSize: 13,
                  background: local.occasion === o ? 'var(--ink)' : '#FFFFFF',
                  color: local.occasion === o ? 'var(--page)' : 'var(--ink)',
                  cursor: 'pointer',
                }}
              >
                {o}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <SectionLabel>Durée</SectionLabel>
          <div style={{ display: 'flex', gap: 7 }}>
            {DUREES.map((d) => (
              <button
                key={d}
                onClick={() => setLocal((b) => ({ ...b, duree: d }))}
                style={{
                  flex: 1,
                  textAlign: 'center',
                  padding: '11px 0',
                  borderRadius: 999,
                  border: 'none',
                  background: local.duree === d ? 'var(--lavender)' : '#FFFFFF',
                  color: local.duree === d ? '#FFFFFF' : 'var(--ink)',
                  fontWeight: 800,
                  fontSize: 14,
                  cursor: 'pointer',
                }}
              >
                {d === 60 ? '1 h+' : `${d}′`}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <SectionLabel>Contraintes</SectionLabel>
          <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
            {CONTRAINTES.map((c) => (
              <button
                key={c}
                onClick={() => toggleContrainte(c)}
                style={{
                  border: 'none',
                  borderRadius: 999,
                  padding: '8px 15px',
                  fontWeight: 700,
                  fontSize: 13,
                  background: local.contraintes.includes(c) ? 'var(--ink)' : '#FFFFFF',
                  color: local.contraintes.includes(c) ? 'var(--page)' : 'var(--ink)',
                  cursor: 'pointer',
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 'auto', padding: '10px 24px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        {precisionOpen ? (
          <input
            autoFocus
            value={local.precision}
            onChange={(e) => setLocal((b) => ({ ...b, precision: e.target.value }))}
            placeholder="Autre chose à préciser ?"
            style={{
              background: '#FFFFFF',
              border: 'none',
              borderRadius: 14,
              padding: '12px 16px',
              fontSize: 13.5,
              fontWeight: 600,
              color: 'var(--ink-mute)',
              boxShadow: '0 6px 18px rgba(59,53,80,.07)',
            }}
          />
        ) : (
          <button
            onClick={() => setPrecisionOpen(true)}
            style={{
              alignSelf: 'flex-start',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: 'none',
              border: 'none',
              padding: '4px 2px',
              fontSize: 12.5,
              fontWeight: 700,
              color: 'var(--ink-mute)',
              cursor: 'pointer',
            }}
          >
            <span
              style={{
                width: 20,
                height: 20,
                borderRadius: 999,
                border: '1.5px solid var(--ink-mute)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 13,
                lineHeight: 1,
              }}
            >
              +
            </span>
            Autre chose à préciser ?
          </button>
        )}
        <PrimaryButton onClick={submit} style={{ height: 60, fontSize: 18 }}>
          Fabriquer l'activité
        </PrimaryButton>
      </div>
    </Screen>
  );
}
