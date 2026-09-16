// Aperçu "résultat fini" : à quoi ressemble l'activité une fois montée,
// par opposition aux patrons à plat (voir Pattern.jsx) qui servent à l'impression.

function Scene({ type }) {
  switch (type) {
    case 'tower':
      return (
        <g>
          <rect x="20" y="130" width="160" height="16" rx="4" fill="#C9BFA8" />
          <g>
            <rect x="30" y="70" width="34" height="62" fill="#8B7BD8" />
            <polygon points="30,70 47,42 64,70" fill="#6C63C4" />
            <rect x="44" y="100" width="12" height="30" fill="#5B4A9E" />
            <rect x="34" y="80" width="8" height="8" fill="#F6F3FF" />
          </g>
          <g>
            <rect x="80" y="52" width="40" height="80" fill="#FFB9A3" />
            <polygon points="80,52 100,20 120,52" fill="#F2916F" />
            <rect x="94" y="98" width="14" height="34" fill="#6B3423" />
            <rect x="86" y="66" width="9" height="9" fill="#FFFFFF" />
            <rect x="105" y="66" width="9" height="9" fill="#FFFFFF" />
            <rect x="98" y="14" width="3" height="12" fill="#5B4A9E" />
            <polygon points="101,14 116,19 101,24" fill="#7FCBB4" />
          </g>
          <g>
            <rect x="136" y="70" width="34" height="62" fill="#7FCBB4" />
            <polygon points="136,70 153,42 170,70" fill="#57A98C" />
            <rect x="147" y="100" width="12" height="30" fill="#1F4438" />
            <rect x="158" y="80" width="8" height="8" fill="#F6F3FF" />
          </g>
        </g>
      );
    case 'animal':
      return (
        <g>
          <path d="M10 40 Q100 90 190 40" stroke="#B8B0CC" strokeWidth="3" fill="none" />
          {[
            { cx: 45, fill: '#FFB9A3', ear: '#F2916F' },
            { cx: 100, fill: '#7FCBB4', ear: '#57A98C' },
            { cx: 155, fill: '#FFE08A', ear: '#E8C15C' },
          ].map((a, i) => (
            <g key={i} transform={`translate(${a.cx} ${58 + (i % 2 === 1 ? 10 : 0)})`}>
              <circle cx="-14" cy="-20" r="9" fill={a.ear} />
              <circle cx="14" cy="-20" r="9" fill={a.ear} />
              <circle cx="0" cy="0" r="26" fill={a.fill} />
              <circle cx="-9" cy="-4" r="3" fill="#3B3550" />
              <circle cx="9" cy="-4" r="3" fill="#3B3550" />
              <circle cx="0" cy="8" r="3" fill="#3B3550" />
            </g>
          ))}
        </g>
      );
    case 'mask':
      return (
        <g>
          <circle cx="100" cy="86" r="58" fill="#FFE3D3" />
          <path d="M45 70 C45 40 75 22 100 22 C125 22 155 40 155 70 C155 96 130 108 100 108 C70 108 45 96 45 70 Z" fill="var(--yellow)" opacity="0.95" />
          <ellipse cx="76" cy="66" rx="14" ry="10" fill="#FFFFFF" />
          <ellipse cx="124" cy="66" rx="14" ry="10" fill="#FFFFFF" />
          <circle cx="76" cy="66" r="4" fill="#3B3550" />
          <circle cx="124" cy="66" r="4" fill="#3B3550" />
          <path d="M84 128 Q100 140 116 128" stroke="#6B3423" strokeWidth="4" fill="none" strokeLinecap="round" />
        </g>
      );
    case 'crown':
      return (
        <g>
          <ellipse cx="100" cy="140" rx="70" ry="10" fill="#EFEAE0" />
          <polygon points="35,120 35,75 62,100 100,55 138,100 165,75 165,120" fill="var(--peach)" />
          <circle cx="100" cy="48" r="8" fill="#FFE08A" />
          <circle cx="62" cy="93" r="6" fill="#7FCBB4" />
          <circle cx="138" cy="93" r="6" fill="#7FCBB4" />
          <rect x="35" y="120" width="130" height="14" fill="#F2916F" />
        </g>
      );
    case 'pennant':
      return (
        <g>
          <path d="M10 30 Q100 70 190 30" stroke="#B8B0CC" strokeWidth="3" fill="none" />
          {[
            { x: 30, fill: 'var(--lavender)' },
            { x: 70, fill: 'var(--yellow)' },
            { x: 110, fill: 'var(--peach)' },
            { x: 150, fill: 'var(--green)' },
          ].map((p, i) => {
            const y = 30 + Math.sin((p.x / 190) * Math.PI) * 32;
            return <polygon key={i} points={`${p.x - 16},${y} ${p.x + 16},${y} ${p.x},${y + 46}`} fill={p.fill} />;
          })}
        </g>
      );
    case 'puppet':
    default:
      return (
        <g>
          <rect x="10" y="128" width="180" height="14" rx="4" fill="#EFEAE0" />
          {[
            { x: 55, fill: 'var(--green)' },
            { x: 100, fill: 'var(--peach)' },
            { x: 145, fill: 'var(--yellow)' },
          ].map((p, i) => (
            <g key={i} transform={`translate(${p.x} 0)`}>
              <rect x="-16" y="70" width="32" height="58" rx="14" fill={p.fill} />
              <circle cx="0" cy="60" r="22" fill="#FFE3D3" />
              <circle cx="-8" cy="56" r="3" fill="#3B3550" />
              <circle cx="8" cy="56" r="3" fill="#3B3550" />
              <path d="M-7 66 Q0 72 7 66" stroke="#3B3550" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </g>
          ))}
        </g>
      );
  }
}

export function FinishedPreview({ type, background = 'var(--lavender-tint)' }) {
  return (
    <svg viewBox="0 0 200 150" width="100%" height="100%" role="img" aria-label="Aperçu du résultat une fois monté">
      <rect x="0" y="0" width="200" height="150" rx="18" fill={background} />
      <Scene type={type} />
    </svg>
  );
}
