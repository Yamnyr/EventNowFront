import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Connexion = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ password: "", email: "" });
  const navigate = useNavigate();

  // Récupère les données de l'API lors du montage du composant
  useEffect(() => {
    fetch("http://127.0.0.1:8000/users/getall")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  // Gère les changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Gere la redirection vers la route avec un rechargement de la page complete
  const handleredirect = () => {
    // Redirection vers la page de d'accueil
    navigate("/", { replace: true });

    // Rechargement de la page
    window.location.reload();
  };
  // Fonction pour stocker les données dans le locale storege
  const saveToLocalStorage = (data) => {
    localStorage.setItem("userData", JSON.stringify(data));
    handleredirect();
  };

  // Vérifie si les données du formulaire sont présentes dans le tableau des utilisateurs
  const handleSubmit = (e) => {
    e.preventDefault();
    const userFind = users.find(
      (user) =>
        user.password === formData.password && user.email === formData.email
    );

    if (Boolean(userFind)) {
      const role = userFind.role.includes('ROLE_ADMIN') ? 'ROLE_ADMIN' : 'ROLE_USER';

      saveToLocalStorage({
        id: userFind.id,
        role: role,
        nom: userFind.nom,
        prenom: userFind.prenom,
        login: true
      });
    }
  };

  return (
    <div className="container">
      <h1>Formulaire de Connexion d'utilisateur</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <span className="input-group-text">@example.com</span>
          <input
            className="form-control"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group mb-3">
          <input
            className="form-control"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <span className="input-group-text">Password</span>
        </div>
        <div className="container">
          <button className="btn btn-primary" type="submit">
            Connexion
          </button>
        </div>
      </form>
    </div>
  );
};

export default Connexion;
