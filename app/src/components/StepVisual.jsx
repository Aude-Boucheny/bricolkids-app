// Illustration par étape : le type d'action (découper / colorier / plier /
// assembler) change le dessin, pour que chaque étape se distingue visuellement.
// La dernière étape montre le résultat fini (voir FinishedPreview).

function CutScene({ color }) {
  return (
    <g>
      <rect x="40" y="20" width="120" height="110" rx="10" fill="#FFFFFF" stroke={color} strokeWidth="2" />
      <line x1="100" y1="20" x2="100" y2="130" stroke="#3B3550" strokeWidth="2" strokeDasharray="6 5" />
      <g transform="translate(100 75) rotate(-12)">
        <circle cx="-9" cy="-6" r="7" fill="none" stroke="#3B3550" strokeWidth="2.5" />
        <circle cx="-9" cy="6" r="7" fill="none" stroke="#3B3550" strokeWidth="2.5" />
        <line x1="-3" y1="-2" x2="20" y2="0" stroke="#3B3550" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="-3" y1="2" x2="20" y2="0" stroke="#3B3550" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      <rect x="46" y="26" width="48" height="98" rx="6" fill={color} opacity="0.35" />
    </g>
  );
}

function ColorScene({ color }) {
  return (
    <g>
      <rect x="40" y="20" width="120" height="110" rx="10" fill="#FFFFFF" stroke="#3B3550" strokeWidth="2" />
      <path d="M55 100 Q75 60 95 100" stroke="var(--peach)" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M70 105 Q90 65 110 105" stroke="var(--green)" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M90 95 Q110 55 130 95" stroke="var(--yellow)" strokeWidth="6" fill="none" strokeLinecap="round" />
      <g transform="translate(128 45) rotate(35)">
        <rect x="-7" y="-34" width="14" height="40" rx="4" fill={color} />
        <polygon points="-7,-34 7,-34 0,-48" fill="#E7B98A" />
      </g>
    </g>
  );
}

function FoldScene({ color }) {
  return (
    <g>
      <polygon points="45,110 100,55 100,55 100,110" fill={color} opacity="0.85" />
      <polygon points="100,55 155,110 100,110" fill={color} opacity="0.55" />
      <line x1="100" y1="55" x2="100" y2="110" stroke="#3B3550" strokeWidth="2" strokeDasharray="5 4" />
      <path d="M78 40 Q100 28 122 40" stroke="#3B3550" strokeWidth="2.5" fill="none" strokeLinecap="round" markerEnd="url(#foldArrow)" />
      <defs>
        <marker id="foldArrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0 0 L8 4 L0 8 Z" fill="#3B3550" />
        </marker>
      </defs>
    </g>
  );
}

function AssembleScene({ color }) {
  return (
    <g>
      <rect x="28" y="55" width="55" height="55" rx="8" fill={color} opacity="0.85" />
      <rect x="117" y="55" width="55" height="55" rx="8" fill={color} opacity="0.5" />
      <path d="M88 82 L112 82" stroke="#3B3550" strokeWidth="2.5" strokeDasharray="4 4" markerEnd="url(#assembleArrow)" />
      <circle cx="100" cy="60" r="3" fill="#B8863A" />
      <circle cx="106" cy="66" r="3" fill="#B8863A" />
      <circle cx="94" cy="66" r="3" fill="#B8863A" />
      <defs>
        <marker id="assembleArrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0 0 L8 4 L0 8 Z" fill="#3B3550" />
        </marker>
      </defs>
    </g>
  );
}

function ViewScene({ color }) {
  return (
    <g>
      <rect x="55" y="20" width="90" height="110" rx="8" fill="#FFFFFF" stroke={color} strokeWidth="2" strokeDasharray="4 4" />
      <rect x="66" y="34" width="68" height="82" rx="4" fill={color} opacity="0.3" />
    </g>
  );
}

const SCENES = { cut: CutScene, color: ColorScene, fold: FoldScene, assemble: AssembleScene, view: ViewScene };

export function StepVisual({ kind, color, background = 'var(--lavender-tint)' }) {
  const SceneComponent = SCENES[kind] ?? ViewScene;
  return (
    <svg viewBox="0 0 200 150" width="100%" height="100%" role="img" aria-label={`Illustration de l'étape : ${kind}`}>
      <rect x="0" y="0" width="200" height="150" rx="18" fill={background} />
      <SceneComponent color={color} />
    </svg>
  );
}
