import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { generateProposals } from '../data/activities';

const AppContext = createContext(null);

const HISTORY_KEY = 'bricolkids.history.v1';
const SESSION_KEY = 'bricolkids.session.v1';

const DEFAULT_BRIEF = {
  ages: [4, 7, 9],
  occasion: 'Anniversaire',
  duree: 45,
  contraintes: ['Pas salissant'],
  precision: '',
};

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

// Persiste le brief/l'activité en cours pour survivre à un rechargement de page
// (utile en test mobile : un refresh accidentel ne doit pas couper le parcours).
const savedSession = loadJSON(SESSION_KEY, {});

export function AppProvider({ children }) {
  const [brief, setBrief] = useState(savedSession.brief ?? DEFAULT_BRIEF);
  const [proposals, setProposals] = useState(savedSession.proposals ?? []);
  const [activity, setActivity] = useState(savedSession.activity ?? null);
  const [history, setHistory] = useState(() => loadJSON(HISTORY_KEY, []));

  useEffect(() => {
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch {
      // stockage indisponible (navigation privée…) : on continue sans persister
    }
  }, [history]);

  useEffect(() => {
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify({ brief, proposals, activity }));
    } catch {
      // stockage indisponible : le parcours ne survivra pas à un rechargement
    }
  }, [brief, proposals, activity]);

  const runGeneration = useCallback((nextBrief) => {
    setBrief(nextBrief);
    const results = generateProposals(nextBrief);
    setProposals(results);
    return results;
  }, []);

  const selectActivity = useCallback((chosen) => {
    setActivity(chosen);
    setHistory((prev) => {
      const entry = {
        key: `${chosen.id}-${Date.now()}`,
        date: new Date().toISOString(),
        activity: chosen,
        brief,
        favorite: false,
        done: false,
      };
      return [entry, ...prev].slice(0, 20);
    });
  }, [brief]);

  const toggleFavorite = useCallback((key) => {
    setHistory((prev) => prev.map((h) => (h.key === key ? { ...h, favorite: !h.favorite } : h)));
  }, []);

  const markDone = useCallback((key) => {
    setHistory((prev) => prev.map((h) => (h.key === key ? { ...h, done: true } : h)));
  }, []);

  const reopenFromHistory = useCallback((entry) => {
    setBrief(entry.brief);
    setActivity(entry.activity);
    setProposals([entry.activity]);
  }, []);

  const value = {
    brief,
    setBrief,
    proposals,
    runGeneration,
    activity,
    selectActivity,
    history,
    toggleFavorite,
    markDone,
    reopenFromHistory,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
