// Petit jeu de données "activités" + moteur de génération simulé.
// Remplace un vrai appel IA : filtre/score un catalogue local selon le brief.

export const AGE_BANDS = [
  { bg: 'var(--green)', ink: 'var(--green-ink)' },
  { bg: 'var(--peach)', ink: 'var(--peach-ink)' },
  { bg: 'var(--yellow)', ink: 'var(--yellow-ink)' },
];

export function ageColor(index) {
  return AGE_BANDS[index % AGE_BANDS.length];
}

const TEMPLATES = [
  {
    id: 'chateau-dragons',
    title: 'Le château de dragons',
    blurb:
      "Une forteresse à quatre tours montée depuis des planches à imprimer. Chacun décore la sienne, on assemble à la fin.",
    duration: 45,
    ageMin: 4,
    ageMax: 10,
    messiness: 'low',
    needsScissors: true,
    useLeftovers: false,
    occasions: ['Anniversaire', 'Atelier', 'Mercredi'],
    materialLabel: 'planches A4',
    roleSequence: ['Gommettes et coloriage', 'Découpe des tours', 'Montage et pont-levis'],
    have: ['Ciseaux à bout rond', 'Colle', 'Feutres ou crayons de couleur'],
    need: ['Carton fin ou bristol', 'Ruban adhésif'],
    steps: [
      { title: 'Découper les planches', description: "Sortir les {count} planches imprimées et découper les tours le long du trait plein.", ageNote: "Pour {youngest} ans : l'adulte tient, l'enfant guide les ciseaux.", visual: 'cut' },
      { title: 'Colorier chaque tour', description: 'Chaque enfant décore sa tour aux crayons ou feutres — les créneaux, les fenêtres, un drapeau.', ageNote: 'Libre pour tous les âges, aucune limite de temps.', visual: 'color' },
      { title: 'Plier les fonds de tour', description: 'Plier le long des pointillés pour former la base de chaque tour et coller la languette.', ageNote: 'Pour {oldest} ans : peut plier et coller seul·e.', visual: 'fold' },
      { title: "Assembler la forteresse", description: 'Coller les quatre tours sur la planche de base, dans les encoches prévues.', ageNote: 'Travail en équipe, un enfant par tour.', visual: 'assemble' },
      { title: 'Poser le pont-levis', description: 'Découper le pont-levis, le fixer avec une attache parisienne pour qu\'il puisse s\'ouvrir.', ageNote: "Pour {oldest} ans : montage de l'attache.", visual: 'assemble' },
      { title: 'Dernière touche', description: 'Ajouter les drapeaux en papier sur des piques en bois au sommet de chaque tour.', ageNote: 'Un petit temps calme pour finir en douceur.', visual: 'assemble' },
    ],
    patterns: [
      { type: 'tower', color: 'var(--lavender)' },
      { type: 'tower', color: 'var(--peach)' },
      { type: 'tower', color: 'var(--green)' },
    ],
  },
  {
    id: 'guirlande-animaux',
    title: "Guirlande d'animaux",
    blurb:
      "Une farandole d'animaux en papier à découper et enfiler sur un fil, à suspendre dans la chambre.",
    duration: 30,
    ageMin: 3,
    ageMax: 8,
    messiness: 'none',
    needsScissors: false,
    useLeftovers: true,
    occasions: ['Mercredi', 'Jour de pluie', 'Atelier'],
    materialLabel: 'planches d’animaux',
    roleSequence: ['Coloriage des animaux', "Perforation à la pince", 'Enfilage sur le fil'],
    have: ['Feutres ou crayons', 'Ficelle ou fil de coton'],
    need: ['Perforatrice à motif ou pince à trous'],
    steps: [
      { title: 'Détacher les animaux', description: 'Détacher les {count} silhouettes pré-découpées le long du trait pointillé.', ageNote: 'Sans ciseaux : les silhouettes se détachent à la main.', visual: 'cut' },
      { title: 'Colorier', description: "Chaque enfant colorie ses animaux comme il l'entend.", ageNote: "Pour {youngest} ans : gros feutres, pas de contrainte.", visual: 'color' },
      { title: 'Faire les trous', description: 'Faire un trou en haut de chaque animal avec la pince ou la perforatrice.', ageNote: "L'adulte perfore, l'enfant vise l'emplacement.", visual: 'assemble' },
      { title: 'Enfiler', description: 'Enfiler les animaux sur la ficelle dans l\'ordre choisi par les enfants.', ageNote: 'Tous les âges peuvent enfiler.', visual: 'assemble' },
      { title: 'Suspendre', description: 'Accrocher la guirlande avec un peu de ruban adhésif.', ageNote: "Pour {oldest} ans : choisir l'emplacement et fixer.", visual: 'assemble' },
    ],
    patterns: [
      { type: 'animal', color: 'var(--green)' },
      { type: 'animal', color: 'var(--peach)' },
    ],
  },
  {
    id: 'masques-fete',
    title: 'Masques de fête',
    blurb:
      "Des masques à colorier et à porter, prêts en quelques minutes, un par enfant.",
    duration: 20,
    ageMin: 4,
    ageMax: 11,
    messiness: 'low',
    needsScissors: true,
    useLeftovers: false,
    occasions: ['Anniversaire', 'Atelier'],
    materialLabel: 'masques',
    roleSequence: ['Coloriage', 'Découpe des yeux', 'Pose de l’élastique'],
    have: ['Crayons de couleur', 'Ciseaux'],
    need: ['Élastique fin', "Perforatrice"],
    steps: [
      { title: 'Colorier le masque', description: 'Chaque enfant colorie son masque avant découpe, c\'est plus simple à plat.', ageNote: 'Aucune limite d\'âge.', visual: 'color' },
      { title: 'Découper le contour', description: 'Découper le masque le long du trait plein.', ageNote: "Pour {youngest} ans : l'adulte découpe, l'enfant tient le papier.", visual: 'cut' },
      { title: 'Découper les yeux', description: 'Découper les deux ouvertures pour les yeux.', ageNote: "L'adulte s'en charge pour les plus jeunes.", visual: 'cut' },
      { title: "Fixer l'élastique", description: "Percer un trou de chaque côté et nouer l'élastique à la bonne longueur.", ageNote: "Pour {oldest} ans : ajuster et nouer seul·e.", visual: 'assemble' },
    ],
    patterns: [{ type: 'mask', color: 'var(--yellow)' }],
  },
  {
    id: 'couronne-fete',
    title: 'Couronne de fête',
    blurb:
      "Une couronne ajustable à décorer de gommettes et de papiers de couleur, pour se sentir roi ou reine du jour.",
    duration: 25,
    ageMin: 3,
    ageMax: 8,
    messiness: 'low',
    needsScissors: false,
    useLeftovers: true,
    occasions: ['Anniversaire', 'Atelier'],
    materialLabel: 'bandes de couronne',
    roleSequence: ['Décoration aux gommettes', 'Collage des pointes', 'Ajustage et agrafage'],
    have: ['Gommettes', 'Colle', 'Chutes de papier couleur'],
    need: ['Agrafeuse ou adhésif double-face'],
    steps: [
      { title: 'Décorer la bande', description: 'Coller gommettes et papiers colorés sur la bande de couronne.', ageNote: 'Idéal pour les plus jeunes, aucune découpe.', visual: 'color' },
      { title: 'Ajouter les pointes', description: 'Coller les pointes pré-découpées en haut de la bande.', ageNote: "Pour {oldest} ans : positionner et coller seul·e.", visual: 'assemble' },
      { title: 'Ajuster au tour de tête', description: "Mesurer sur la tête de l'enfant et ajuster la longueur.", ageNote: "L'adulte ajuste et fixe.", visual: 'assemble' },
      { title: 'Fermer la couronne', description: "Agrafer ou coller les deux extrémités de la bande.", ageNote: 'Vérifier que ça ne serre pas.', visual: 'assemble' },
    ],
    patterns: [{ type: 'crown', color: 'var(--peach)' }],
  },
  {
    id: 'guirlande-fanions',
    title: 'Guirlande de fanions',
    blurb:
      "Des petits fanions en papiers de récup à découper et enfiler sur une ficelle pour décorer la pièce.",
    duration: 35,
    ageMin: 5,
    ageMax: 11,
    messiness: 'none',
    needsScissors: true,
    useLeftovers: true,
    occasions: ['Atelier', 'Anniversaire', 'Noël'],
    materialLabel: 'fanions',
    roleSequence: ['Découpe des fanions', 'Décoration', 'Collage sur la ficelle'],
    have: ['Chutes de papier ou vieux magazines', 'Ciseaux', 'Colle'],
    need: ['Ficelle', 'Pince à linge (optionnel)'],
    steps: [
      { title: 'Découper les fanions', description: "Découper {count} triangles le long du trait plein, dans des papiers de récupération.", ageNote: "Pour {youngest} ans : gabarit tenu par l'adulte.", visual: 'cut' },
      { title: 'Décorer', description: 'Décorer chaque fanion : motifs, lettres, dessins.', ageNote: 'Un fanion par enfant si besoin de répartir.', visual: 'color' },
      { title: 'Plier le sommet', description: 'Plier le haut de chaque fanion le long du pointillé pour former un passant.', ageNote: "Pour {oldest} ans : plier et coller sans aide.", visual: 'fold' },
      { title: 'Enfiler sur la ficelle', description: 'Coller ou clipser chaque fanion sur la ficelle, à intervalles réguliers.', ageNote: 'Travail à plusieurs mains.', visual: 'assemble' },
    ],
    patterns: [
      { type: 'pennant', color: 'var(--lavender)' },
      { type: 'pennant', color: 'var(--yellow)' },
    ],
  },
  {
    id: 'marionnettes-doigts',
    title: 'Marionnettes à doigts',
    blurb:
      "De petites marionnettes en papier à glisser sur les doigts pour inventer une histoire à plusieurs.",
    duration: 40,
    ageMin: 4,
    ageMax: 9,
    messiness: 'low',
    needsScissors: true,
    useLeftovers: false,
    occasions: ['Jour de pluie', 'Mercredi'],
    materialLabel: 'gabarits de marionnettes',
    roleSequence: ['Coloriage des personnages', 'Découpe', 'Assemblage en anneau'],
    have: ['Feutres', 'Ciseaux', 'Adhésif'],
    need: ['Rien de spécial'],
    steps: [
      { title: 'Choisir les personnages', description: 'Chaque enfant choisit un ou deux personnages à imprimer parmi les gabarits.', ageNote: 'Bon moment pour inventer les noms des personnages.', visual: 'view' },
      { title: 'Colorier', description: 'Colorier les personnages avant découpe.', ageNote: "Pour {youngest} ans : gros feutres, sans contrainte.", visual: 'color' },
      { title: 'Découper', description: 'Découper le contour de chaque personnage.', ageNote: "L'adulte aide pour les détails fins.", visual: 'cut' },
      { title: 'Former l’anneau', description: 'Enrouler la bande du bas autour du doigt et fixer avec l\'adhésif.', ageNote: "Pour {oldest} ans : ajuster la taille seul·e.", visual: 'fold' },
      { title: 'Improviser une histoire', description: 'Inventer une petite histoire à plusieurs voix avec les marionnettes.', ageNote: 'Le meilleur moment, sans niveau requis.', visual: 'assemble' },
    ],
    patterns: [{ type: 'puppet', color: 'var(--green)' }],
  },
];

function overlap(aMin, aMax, bMin, bMax) {
  const lo = Math.max(aMin, bMin);
  const hi = Math.min(aMax, bMax);
  return Math.max(0, hi - lo);
}

function scoreTemplate(t, brief) {
  let score = 0;
  const ages = brief.ages.length ? brief.ages : [6];
  const briefMin = Math.min(...ages);
  const briefMax = Math.max(...ages);

  score += overlap(t.ageMin, t.ageMax, briefMin, briefMax) * 2;
  score -= Math.abs(t.duration - brief.duree) / 5;

  if (brief.occasion && t.occasions.includes(brief.occasion)) score += 6;

  if (brief.contraintes.includes("Pas salissant")) {
    score += t.messiness === 'none' ? 4 : t.messiness === 'low' ? 1 : -6;
  }
  if (brief.contraintes.includes('Sans ciseaux')) {
    score += t.needsScissors ? -6 : 4;
  }
  if (brief.contraintes.includes("Récup'")) {
    score += t.useLeftovers ? 4 : 0;
  }

  return score;
}

function buildAgeRoles(t, ages) {
  const sorted = [...ages].sort((a, b) => a - b);
  const uniq = sorted.length ? sorted : [6];
  return uniq.map((age, i) => {
    const role = t.roleSequence[Math.min(i, t.roleSequence.length - 1)];
    return { age, role, color: ageColor(i) };
  });
}

function tokenize(text, ages, count) {
  const sorted = [...ages].sort((a, b) => a - b);
  const youngest = sorted[0] ?? 6;
  const oldest = sorted[sorted.length - 1] ?? 6;
  return text
    .replaceAll('{youngest}', youngest)
    .replaceAll('{oldest}', oldest)
    .replaceAll('{count}', count);
}

export function buildActivity(template, brief) {
  const ages = brief.ages.length ? brief.ages : [6];
  const count = Math.max(ages.length, template.patterns.length);
  return {
    id: template.id,
    title: template.title,
    blurb: template.blurb,
    duration: template.duration,
    ageMin: Math.min(...ages, template.ageMin),
    ageMax: Math.max(...ages, template.ageMin),
    messiness: template.messiness,
    materialLabel: template.materialLabel,
    ageRoles: buildAgeRoles(template, ages),
    have: template.have,
    need: template.need,
    pageCount: template.patterns.length,
    steps: template.steps.map((s) => ({
      title: s.title,
      description: tokenize(s.description, ages, count),
      ageNote: tokenize(s.ageNote, ages, count),
      visual: s.visual,
    })),
    patterns: template.patterns.map((p, i) => ({ ...p, index: i })),
  };
}

export function generateProposals(brief) {
  const scored = TEMPLATES.map((t) => ({ t, score: scoreTemplate(t, brief) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ t }) => buildActivity(t, brief));
  return scored;
}
