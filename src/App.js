import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Accueil from './pages/acceuil/accueil';
import Inscription from './pages/inscription/inscription';
import Profil from './pages/profil/profil';
import Evenement from './pages/evenement/evenement'
import NewEvenement from './pages/admin/newEvenement'
import DetailEvenement from './pages/evenement/DetailEvenement';
import Planing from './pages/planing/planing';
import Connexion from "./pages/connexion/Connexion";
import Deconnexion from "./pages/connexion/Deconnexion";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/evenement" element={<Evenement />} />
          <Route path="/planing" element={<Planing />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/newevenement" element={<NewEvenement />} />
          <Route path="/detailEvent/:id" element={<DetailEvenement />} />
          <Route path="/login" element={<Connexion />} />
          <Route path="/logout" element={<Deconnexion />} />
          <Route path="/Inscription" element={<Inscription />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
