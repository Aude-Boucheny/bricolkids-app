// Patrons imprimables : formes vectorielles simples, prêtes à imprimer.
// Trait plein = découper, trait pointillé = plier.

const CUT = { stroke: '#3B3550', strokeWidth: 2, fill: 'none' };
const FOLD = { stroke: '#3B3550', strokeWidth: 1.5, strokeDasharray: '5 4', fill: 'none' };

function Shape({ type, fill }) {
  switch (type) {
    case 'tower':
      return (
        <g>
          <rect x="60" y="90" width="90" height="120" style={{ ...CUT, fill }} rx="4" />
          <polygon points="60,90 105,40 150,90" style={{ ...CUT, fill }} />
          <line x1="60" y1="150" x2="150" y2="150" style={FOLD} />
          <rect x="90" y="150" width="30" height="60" style={{ ...CUT, fill: 'none' }} />
          <line x1="80" y1="90" x2="80" y2="120" style={CUT} />
          <line x1="130" y1="90" x2="130" y2="120" style={CUT} />
        </g>
      );
    case 'animal':
      return (
        <g>
          <ellipse cx="105" cy="140" rx="55" ry="42" style={{ ...CUT, fill }} />
          <circle cx="150" cy="105" r="26" style={{ ...CUT, fill }} />
          <circle cx="165" cy="88" r="9" style={{ ...CUT, fill }} />
          <circle cx="140" cy="82" r="9" style={{ ...CUT, fill }} />
          <circle cx="10" cy="6" r="3" style={{ stroke: '#3B3550', strokeWidth: 2, fill: '#3B3550' }} transform="translate(150 100)" />
          <line x1="105" y1="182" x2="105" y2="198" style={FOLD} />
        </g>
      );
    case 'mask':
      return (
        <g>
          <path d="M20 110 C20 60 60 30 105 30 C150 30 190 60 190 110 C190 145 160 160 105 160 C50 160 20 145 20 110 Z" style={{ ...CUT, fill }} />
          <ellipse cx="65" cy="105" rx="20" ry="14" style={{ stroke: '#3B3550', strokeWidth: 2, fill: '#fff' }} />
          <ellipse cx="145" cy="105" rx="20" ry="14" style={{ stroke: '#3B3550', strokeWidth: 2, fill: '#fff' }} />
          <circle cx="18" cy="108" r="4" style={{ fill: '#3B3550' }} />
          <circle cx="192" cy="108" r="4" style={{ fill: '#3B3550' }} />
        </g>
      );
    case 'crown':
      return (
        <g>
          <polygon points="20,150 20,100 55,130 90,80 105,130 120,80 155,130 190,100 190,150" style={{ ...CUT, fill }} />
          <line x1="20" y1="150" x2="190" y2="150" style={FOLD} />
          <circle cx="105" cy="70" r="6" style={{ fill }} />
        </g>
      );
    case 'pennant':
      return (
        <g>
          <polygon points="55,30 155,30 105,180" style={{ ...CUT, fill }} />
          <line x1="55" y1="30" x2="155" y2="30" style={FOLD} />
          <circle cx="65" cy="20" r="4" style={{ stroke: '#3B3550', strokeWidth: 2, fill: '#fff' }} />
          <circle cx="145" cy="20" r="4" style={{ stroke: '#3B3550', strokeWidth: 2, fill: '#fff' }} />
        </g>
      );
    case 'puppet':
    default:
      return (
        <g>
          <circle cx="105" cy="55" r="30" style={{ ...CUT, fill }} />
          <path d="M60 100 C60 85 150 85 150 100 L150 190 C150 200 60 200 60 190 Z" style={{ ...CUT, fill }} />
          <line x1="70" y1="190" x2="140" y2="190" style={FOLD} />
        </g>
      );
  }
}

export function PatternPage({ type, color, index, total, showGuides = true, coloringMode = false }) {
  const fill = coloringMode ? 'none' : color;
  return (
    <svg viewBox="0 0 210 220" width="100%" height="100%" role="img" aria-label={`Patron ${index + 1} sur ${total}`}>
      {showGuides && (
        <rect x="6" y="6" width="198" height="208" style={{ stroke: '#B8B0CC', strokeWidth: 1.5, strokeDasharray: '4 4', fill: 'none' }} />
      )}
      <Shape type={type} fill={fill} />
    </svg>
  );
}
