import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Screen, StatusBar, PrimaryButton, SecondaryButton } from '../components/ui';
import { PatternPage } from '../components/Pattern';

function Toggle({ on, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 38,
        height: 22,
        borderRadius: 999,
        background: on ? 'var(--ink)' : '#E0DCEF',
        border: 'none',
        position: 'relative',
        cursor: 'pointer',
        flex: '0 0 auto',
      }}
    >
      <div style={{ position: 'absolute', top: 2, left: on ? 18 : 2, width: 18, height: 18, borderRadius: 999, background: '#fff', transition: 'left .15s ease' }} />
    </button>
  );
}

export default function Patrons() {
  const navigate = useNavigate();
  const { activity } = useApp();
  const [pageIndex, setPageIndex] = useState(0);
  const [guides, setGuides] = useState(true);
  const [coloring, setColoring] = useState(false);
  const [childName, setChildName] = useState(true);

  if (!activity) {
    navigate('/');
    return null;
  }

  const patterns = activity.patterns;
  const current = patterns[pageIndex];
  const childForPage = activity.ageRoles[pageIndex % activity.ageRoles.length];

  return (
    <Screen>
      <StatusBar />
      <div style={{ padding: '12px 24px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => navigate('/activite')} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: 'inherit' }}>←</button>
        <div style={{ flex: 1, fontSize: 15, fontWeight: 700 }}>Patrons à imprimer</div>
      </div>

      <div
        style={{
          margin: '14px 24px 0',
          height: 260,
          border: '1.5px solid #DDD5F0',
          borderRadius: 12,
          background: '#FAFAFF',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
        }}
      >
        <div style={{ width: 150, height: 190 }}>
          <PatternPage
            type={current.type}
            color={current.color}
            index={pageIndex}
            total={patterns.length}
            showGuides={guides}
            coloringMode={coloring}
          />
        </div>
        {childName && (
          <div style={{ position: 'absolute', bottom: 34, left: 0, right: 0, textAlign: 'center', fontSize: 11, fontWeight: 700, color: 'var(--ink-soft)' }}>
            {childForPage.age} ans
          </div>
        )}
        <div style={{ position: 'absolute', bottom: 10, left: 0, right: 0, textAlign: 'center', fontSize: 10, color: '#A49DC0' }}>
          A4 · page {pageIndex + 1} / {patterns.length} · trait plein = découper · pointillé = plier
        </div>
      </div>

      <div style={{ padding: '14px 24px 0', display: 'flex', gap: 8 }}>
        {patterns.map((p, i) => (
          <button
            key={i}
            onClick={() => setPageIndex(i)}
            style={{
              width: 44,
              height: 56,
              borderRadius: 4,
              border: i === pageIndex ? '1.5px solid var(--ink)' : '1.5px solid #DDD5F0',
              background: '#fff',
              cursor: 'pointer',
              padding: 4,
            }}
          >
            <PatternPage type={p.type} color={p.color} index={i} total={patterns.length} showGuides={false} coloringMode={coloring} />
          </button>
        ))}
      </div>

      <div style={{ padding: '16px 24px 24px', display: 'flex', flexDirection: 'column', gap: 11, overflowY: 'auto' }}>
        <Row label="Format">
          <span style={{ fontFamily: 'monospace', border: '1.5px solid #DDD5F0', borderRadius: 6, padding: '4px 10px', fontSize: 11 }}>A4 · 100 %</span>
        </Row>
        <Row label="Repères de découpe">
          <Toggle on={guides} onClick={() => setGuides((v) => !v)} />
        </Row>
        <Row label="Zone à colorier vierge">
          <Toggle on={coloring} onClick={() => setColoring((v) => !v)} />
        </Row>
        <Row label="Nom / âge sur la pièce">
          <Toggle on={childName} onClick={() => setChildName((v) => !v)} />
        </Row>
      </div>

      <div style={{ marginTop: 'auto', padding: '14px 24px 28px', display: 'flex', gap: 10 }}>
        <SecondaryButton style={{ flex: 1 }} onClick={() => window.print()}>PDF</SecondaryButton>
        <PrimaryButton style={{ flex: 2 }} onClick={() => window.print()}>Imprimer</PrimaryButton>
      </div>

      <div id="print-area" style={{ display: 'none' }}>
        {patterns.map((p, i) => (
          <div key={i} className="print-page">
            <PatternPage type={p.type} color={p.color} index={i} total={patterns.length} showGuides={guides} coloringMode={coloring} />
          </div>
        ))}
      </div>
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #print-area, #print-area * { visibility: visible; }
          #print-area { display: block !important; position: absolute; inset: 0; }
          .print-page { width: 100%; height: 100vh; page-break-after: always; display: flex; align-items: center; justify-content: center; }
        }
      `}</style>
    </Screen>
  );
}

function Row({ label, children }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
      <span>{label}</span>
      {children}
    </div>
  );
}
