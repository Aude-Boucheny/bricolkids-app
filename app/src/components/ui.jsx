// Primitives d'UI partagées, calquées sur l'identité 4a — Lavande.

export function Screen({ children, bg = 'var(--page)' }) {
  return (
    <div
      style={{
        minHeight: '100svh',
        background: bg,
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 480,
        margin: '0 auto',
        fontFamily: 'var(--font-body)',
        color: 'var(--ink)',
      }}
    >
      {children}
    </div>
  );
}

export function TopBar({ onBack, title, right }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '20px 24px 0' }}>
      {onBack && (
        <button
          onClick={onBack}
          aria-label="Retour"
          style={{
            background: 'none',
            border: 'none',
            fontSize: 22,
            color: 'inherit',
            cursor: 'pointer',
            padding: 4,
            lineHeight: 1,
          }}
        >
          ←
        </button>
      )}
      {title && (
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 24, flex: 1 }}>{title}</div>
      )}
      {right}
    </div>
  );
}

export function PrimaryButton({ children, onClick, disabled, style, type = 'button' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        flex: 1,
        height: 54,
        border: 'none',
        borderRadius: 999,
        color: 'var(--cta-ink)',
        fontWeight: 800,
        fontSize: 16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: disabled ? 'none' : '0px 5px 0px 0px var(--cta-shadow)',
        background: disabled ? '#C9BFA8' : 'var(--cta)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.7 : 1,
        ...style,
      }}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({ children, onClick, style }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '0 18px',
        height: 52,
        borderRadius: 999,
        border: '2px solid var(--ink)',
        color: 'var(--ink)',
        background: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 800,
        fontSize: 14,
        cursor: 'pointer',
        ...style,
      }}
    >
      {children}
    </button>
  );
}

export function SectionLabel({ children }) {
  return (
    <div
      style={{
        fontWeight: 800,
        fontSize: 11,
        letterSpacing: '.12em',
        textTransform: 'uppercase',
        color: 'var(--label)',
      }}
    >
      {children}
    </div>
  );
}

export function Card({ children, style }) {
  return (
    <div
      style={{
        background: '#FFFFFF',
        borderRadius: 20,
        boxShadow: '0 8px 22px rgba(59,53,80,.08)',
        padding: 15,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function StatusBar() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '13px 22px',
        fontSize: 11,
        fontWeight: 800,
        color: '#A49DC0',
      }}
    >
      <span>9:41</span>
      <span>▮▮▮</span>
    </div>
  );
}
