import { HashRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Accueil from './screens/Accueil';
import Generation from './screens/Generation';
import Propositions from './screens/Propositions';
import Fiche from './screens/Fiche';
import Etapes from './screens/Etapes';
import Patrons from './screens/Patrons';
import Materiel from './screens/Materiel';
import Historique from './screens/Historique';

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/generation" element={<Generation />} />
          <Route path="/propositions" element={<Propositions />} />
          <Route path="/activite" element={<Fiche />} />
          <Route path="/activite/etapes" element={<Etapes />} />
          <Route path="/activite/patrons" element={<Patrons />} />
          <Route path="/activite/materiel" element={<Materiel />} />
          <Route path="/historique" element={<Historique />} />
        </Routes>
      </HashRouter>
    </AppProvider>
  );
}
