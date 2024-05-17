import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Connexion = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ password: "", email: "" });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Récupère les données de l'API lors du montage du composant
  useEffect(() => {
    fetch("http://127.0.0.1:8000/users/getall")
      .then((response) => response.json())
      .then((data) => {
        console.log("Users fetched:", data); // Log fetched users
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setErrorMessage("Erreur lors de la récupération des utilisateurs.");
      });
  }, []);

  // Gère les changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Fonction pour rediriger vers la page d'accueil et recharger la page
  const handleredirect = () => {
    navigate("/", { replace: true });
    window.location.reload();
  };

  // Fonction pour stocker les données dans le localStorage
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

    if (userFind) {
      const role = userFind.role.includes('ROLE_ADMIN') ? 'ROLE_ADMIN' : 'ROLE_USER';
      saveToLocalStorage({
        id: userFind.id,
        role: role,
        nom: userFind.nom,
        prenom: userFind.prenom,
        login: true
      });
    } else {
      setErrorMessage("Email ou mot de passe incorrect.");
    }
  };

  return (
    <div className="container">
      <h1>Formulaire de Connexion d'utilisateur</h1>
      {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
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
