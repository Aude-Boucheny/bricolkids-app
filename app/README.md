# Bricol'kids — prototype testable

App web (React + Vite) implémentant le parcours DIY-avec-les-enfants dans l'identité **4a — Lavande** (voir `../project/Identite parents 1b.dc.html` et `../chats/chat1.md` pour le contexte design).

La génération d'activité par IA est **simulée** : un petit moteur local (`src/data/activities.js`) filtre/score un catalogue de 6 activités selon les réponses du brief (âges, occasion, durée, contraintes) et en retient 3. Pas de clé API nécessaire.

## Lancer en local

```bash
npm install
npm run dev
```

Ouvrir l'URL affichée (ex. http://localhost:5173) dans le navigateur. Réduire la fenêtre à une largeur mobile (~400px) ou ouvrir les devtools en mode responsive pour tester au format téléphone.

## Parcours implémenté

1. **Accueil / Nouveau brief** — nombre d'enfants, âges (cliquer une pastille change l'âge), occasion, durée, contraintes, champ libre.
2. **Génération** — écran de chargement simulé (~1,8 s).
3. **Trois propositions** — activité recommandée + deux alternatives, calculées depuis le brief.
4. **Fiche à onglets** — Aperçu (résumé, qui-fait-quoi par âge, accès aux patrons), avec onglets vers Matériel / Étapes / Patrons.
5. **Étapes pas-à-pas** — navigation étape par étape avec note par âge.
6. **Patrons à imprimer** — aperçu par page, réglages (repères de découpe, zone à colorier, nom/âge), impression navigateur (`Imprimer`/`PDF` déclenchent `window.print()`).
7. **Matériel** — liste « vous avez sûrement » / « à prévoir » à cocher, partage.
8. **Historique / favoris** — activités précédemment générées (persistées en `localStorage`), favoris, « refaire avec les mêmes réglages ».

Le brief et l'activité en cours sont conservés en `localStorage` pour survivre à un rafraîchissement de page.

## Étendre le catalogue d'activités

Chaque template dans `src/data/activities.js` définit : durée, tranche d'âge, niveau de salissant, occasions, matériel, étapes, et les types de patrons à illustrer (voir `src/components/Pattern.jsx` pour les formes disponibles : `tower`, `animal`, `mask`, `crown`, `pennant`, `puppet`).
