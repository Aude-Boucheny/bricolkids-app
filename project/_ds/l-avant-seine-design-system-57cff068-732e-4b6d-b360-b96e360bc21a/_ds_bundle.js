/* @ds-bundle: {"format":4,"namespace":"LAvantSeineDesignSystem_57cff0","components":[{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"DisplayTitle","sourcePath":"components/core/DisplayTitle.jsx"},{"name":"InfoBar","sourcePath":"components/core/InfoBar.jsx"},{"name":"SectionTitle","sourcePath":"components/core/SectionTitle.jsx"},{"name":"ShowCard","sourcePath":"components/core/ShowCard.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Icon","sourcePath":"components/icons/Icon.jsx"},{"name":"Motif","sourcePath":"components/motifs/Motif.jsx"}],"sourceHashes":{"components/core/Button.jsx":"d2dc95669462","components/core/DisplayTitle.jsx":"34aedde8cd56","components/core/InfoBar.jsx":"2766db8ca12a","components/core/SectionTitle.jsx":"70d86dd47382","components/core/ShowCard.jsx":"01d77e458e73","components/core/Tag.jsx":"ec0ddff18835","components/icons/Icon.jsx":"1885d8d104fd","components/motifs/Motif.jsx":"cbf8d20b2c58"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.LAvantSeineDesignSystem_57cff0 = window.LAvantSeineDesignSystem_57cff0 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const base = {
  fontFamily: 'var(--as-font-body)',
  fontWeight: 800,
  fontSize: 'var(--as-text-body)',
  lineHeight: 1,
  borderRadius: 'var(--as-radius-pill)',
  padding: 'var(--as-pad-btn)',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 'var(--as-space-2)',
  cursor: 'pointer',
  textDecoration: 'none',
  transition: 'transform 140ms ease, box-shadow 140ms ease, background 140ms ease'
};
const sizes = {
  sm: {
    padding: '10px 18px',
    fontSize: 'var(--as-text-info)'
  },
  md: {},
  lg: {
    padding: '18px 34px',
    fontSize: 'var(--as-text-lead)'
  }
};
function Button({
  variant = 'primary',
  size = 'md',
  as = 'button',
  disabled = false,
  fullWidth = false,
  style,
  children,
  ...rest
}) {
  const [pressed, setPressed] = React.useState(false);
  const Tag = as;
  const variants = {
    primary: {
      color: 'var(--as-ivory-text)',
      background: 'var(--as-ochre)',
      border: 'none',
      boxShadow: pressed ? 'var(--as-shadow-btn-press)' : 'var(--as-shadow-btn)',
      transform: pressed ? 'translateY(4px)' : 'none'
    },
    ghost: {
      color: 'var(--as-white)',
      background: 'transparent',
      border: '2px solid var(--as-veil-white-60)',
      padding: '12px 24px',
      transform: pressed ? 'translateY(2px)' : 'none'
    },
    outline: {
      color: 'var(--as-indigo)',
      background: 'transparent',
      border: '2px solid var(--as-indigo)',
      padding: '12px 24px',
      transform: pressed ? 'translateY(2px)' : 'none'
    },
    quiet: {
      color: 'var(--as-indigo)',
      background: 'var(--as-cream-alt)',
      border: 'none'
    }
  };
  return /*#__PURE__*/React.createElement(Tag, _extends({
    disabled: as === 'button' ? disabled : undefined,
    onPointerDown: () => !disabled && setPressed(true),
    onPointerUp: () => setPressed(false),
    onPointerLeave: () => setPressed(false),
    style: {
      ...base,
      ...variants[variant],
      ...sizes[size],
      width: fullWidth ? '100%' : undefined,
      justifyContent: fullWidth ? 'center' : undefined,
      opacity: disabled ? 0.45 : 1,
      pointerEvents: disabled ? 'none' : undefined,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/DisplayTitle.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function DisplayTitle({
  as = 'h1',
  size = 'xl',
  outlined = true,
  style,
  children,
  ...rest
}) {
  const Tag = as;
  const sizes = {
    xl: 'var(--as-text-display-xl)',
    md: 'var(--as-text-display)'
  };
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: {
      margin: 0,
      fontFamily: 'var(--as-font-display)',
      fontWeight: 800,
      fontSize: sizes[size],
      lineHeight: 'var(--as-leading-display)',
      letterSpacing: 'var(--as-tracking-display)',
      color: outlined ? 'var(--as-white)' : 'var(--as-indigo)',
      textShadow: outlined ? 'var(--as-title-outline)' : 'none',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { DisplayTitle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/DisplayTitle.jsx", error: String((e && e.message) || e) }); }

// components/core/InfoBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function InfoBar({
  date,
  time,
  price,
  separator = ' · ',
  style,
  children,
  ...rest
}) {
  const left = [date, time].filter(Boolean).join(separator);
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      fontFamily: 'var(--as-font-body)',
      fontWeight: 800,
      fontSize: 'var(--as-text-info)',
      color: 'var(--as-indigo)',
      background: 'var(--as-cream-alt)',
      borderRadius: 'var(--as-radius-sm)',
      padding: 'var(--as-pad-info)',
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--as-space-2)',
      flexWrap: 'wrap',
      ...style
    }
  }, rest), children || /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, left), price ? /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: 0.85
    }
  }, '— ' + price) : null));
}
Object.assign(__ds_scope, { InfoBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/InfoBar.jsx", error: String((e && e.message) || e) }); }

// components/core/SectionTitle.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function SectionTitle({
  as = 'h2',
  kicker,
  align = 'left',
  rule = false,
  style,
  children,
  ...rest
}) {
  const Tag = as;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--as-space-3)',
      alignItems: align === 'center' ? 'center' : 'flex-start',
      textAlign: align,
      ...style
    }
  }, kicker ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--as-font-body)',
      fontWeight: 800,
      fontSize: 'var(--as-text-tag)',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--as-ochre)'
    }
  }, kicker) : null, /*#__PURE__*/React.createElement(Tag, _extends({
    style: {
      margin: 0,
      fontFamily: 'var(--as-font-display)',
      fontWeight: 800,
      fontSize: 'var(--as-text-title)',
      lineHeight: 'var(--as-leading-title)',
      color: 'var(--as-indigo)'
    }
  }, rest), children), rule ? /*#__PURE__*/React.createElement("div", {
    className: "as-motif-wave",
    style: {
      width: 112
    }
  }) : null);
}
Object.assign(__ds_scope, { SectionTitle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SectionTitle.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Tag({
  tone = 'cream',
  style,
  children,
  ...rest
}) {
  const tones = {
    cream: {
      color: 'var(--as-indigo)',
      background: 'var(--as-cream-alt)'
    },
    indigo: {
      color: 'var(--as-white)',
      background: 'var(--as-indigo)'
    },
    ochre: {
      color: 'var(--as-ivory-text)',
      background: 'var(--as-ochre)'
    },
    outline: {
      color: 'var(--as-indigo)',
      background: 'transparent',
      boxShadow: 'inset 0 0 0 1.5px var(--as-indigo)'
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      fontFamily: 'var(--as-font-body)',
      fontWeight: 700,
      fontSize: 'var(--as-text-tag)',
      letterSpacing: 'var(--as-tracking-tag)',
      lineHeight: 1,
      borderRadius: 'var(--as-radius-pill)',
      padding: 'var(--as-pad-tag)',
      display: 'inline-flex',
      alignItems: 'center',
      whiteSpace: 'nowrap',
      ...tones[tone],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/core/ShowCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ShowCard({
  title,
  subtitle,
  description,
  tags = [],
  date,
  time,
  price,
  image,
  imageColor = 'var(--as-indigo)',
  href,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("article", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: 'var(--as-white)',
      borderRadius: 'var(--as-radius-md)',
      boxShadow: hover ? 'var(--as-shadow-card-hover)' : 'var(--as-shadow-card)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      transform: hover ? 'translateY(-3px)' : 'none',
      transition: 'transform 180ms ease, box-shadow 180ms ease',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: '4 / 3',
      background: image ? `center / cover no-repeat url(${image})` : imageColor,
      backgroundImage: image ? undefined : 'radial-gradient(rgba(255,255,255,0.28) 1px, transparent 1.4px)',
      backgroundSize: image ? undefined : '16px 16px',
      backgroundColor: image ? undefined : imageColor
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--as-pad-card)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--as-space-3)',
      flex: 1
    }
  }, subtitle ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--as-font-body)',
      fontWeight: 700,
      fontSize: 'var(--as-text-tag)',
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: 'var(--as-text-muted-gold)'
    }
  }, subtitle) : null, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: 'var(--as-font-display)',
      fontWeight: 700,
      fontSize: 'var(--as-text-card-title)',
      lineHeight: 'var(--as-leading-title)',
      color: 'var(--as-indigo)'
    }
  }, href ? /*#__PURE__*/React.createElement("a", {
    href: href,
    style: {
      color: 'inherit',
      textDecoration: 'none'
    }
  }, title) : title), tags.length ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 'var(--as-space-2)'
    }
  }, tags.map(t => /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    key: t
  }, t))) : null, description ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--as-font-body)',
      fontWeight: 600,
      fontSize: 'var(--as-text-body)',
      lineHeight: 'var(--as-leading-body)',
      color: 'var(--as-text-brown)'
    }
  }, description) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      paddingTop: 'var(--as-space-2)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.InfoBar, {
    date: date,
    time: time,
    price: price
  }))));
}
Object.assign(__ds_scope, { ShowCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/ShowCard.jsx", error: String((e && e.message) || e) }); }

// components/icons/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Aucun jeu d'icônes n'était fourni dans les sources : substitution Lucide
   (trait 2px, bouts arrondis), servi depuis lucide-static et recoloré par masque
   CSS pour suivre currentColor. */
const CDN = 'https://unpkg.com/lucide-static@0.451.0/icons/';
function Icon({
  name,
  size = 20,
  strokeColor = 'currentColor',
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    "aria-hidden": "true",
    style: {
      display: 'inline-block',
      width: size,
      height: size,
      flex: '0 0 auto',
      background: strokeColor,
      WebkitMaskImage: `url(${CDN}${name}.svg)`,
      maskImage: `url(${CDN}${name}.svg)`,
      WebkitMaskSize: 'contain',
      maskSize: 'contain',
      WebkitMaskRepeat: 'no-repeat',
      maskRepeat: 'no-repeat',
      WebkitMaskPosition: 'center',
      maskPosition: 'center',
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/icons/Icon.jsx", error: String((e && e.message) || e) }); }

// components/motifs/Motif.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Motif({
  kind = 'sun',
  size = 120,
  color,
  style,
  ...rest
}) {
  if (kind === 'sun') {
    return /*#__PURE__*/React.createElement("div", _extends({
      style: {
        width: size,
        height: size,
        borderRadius: '50%',
        background: `repeating-conic-gradient(${color || 'var(--as-ochre)'} 0deg 7.5deg, transparent 7.5deg 15deg)`,
        ...style
      }
    }, rest));
  }
  if (kind === 'wave') {
    return /*#__PURE__*/React.createElement("div", _extends({
      className: "as-motif-wave",
      style: {
        width: size,
        background: color || 'var(--as-ochre)',
        ...style
      }
    }, rest));
  }
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      width: size,
      height: size,
      backgroundImage: `radial-gradient(${color || 'var(--as-indigo)'} 1px, transparent 1.4px)`,
      backgroundSize: 'var(--as-dots-size) var(--as-dots-size)',
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Motif });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/motifs/Motif.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.DisplayTitle = __ds_scope.DisplayTitle;

__ds_ns.InfoBar = __ds_scope.InfoBar;

__ds_ns.SectionTitle = __ds_scope.SectionTitle;

__ds_ns.ShowCard = __ds_scope.ShowCard;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.Motif = __ds_scope.Motif;

})();
