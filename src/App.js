import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css"
import Header from './components/Header';
import Footer from './components/Footer';
import Accueil from './pages/acceuil/accueil';
import Inscription from './pages/inscription/inscription';
import Profil from './pages/profil/profil';
import Evenement from './pages/evenement/evenement'
import NewEvenement from './pages/admin/newEvenement'
import DetailEvenement from './pages/evenement/DetailEvenement';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/evenement" element={<Evenement />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/newevenement" element={<NewEvenement />} />
          <Route path="/detailEvent" element={<DetailEvenement />} />

        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
