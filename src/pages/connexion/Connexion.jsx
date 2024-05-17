import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Connexion = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({id: null, password: "", email: "" });
  const [isUserValid, setIsUserValid] = useState(null);
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
    const userExists = users.some(
      (user) =>
        user.password === formData.password && user.email === formData.email,
          console.log(users.id)
    );

    setIsUserValid(userExists);
  };
  if (isUserValid) {
    saveToLocalStorage({nom:formData.email,login: true});
    navigate('/')
  }

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

          <button class="btn btn-primary" type="submit">
            Connexion
          </button>
        </div>
      </form>

      {isUserValid !== null && (
        <div>
          {isUserValid ? (
            <p>L'utilisateur existe dans le tableau.</p>
          ) : (
            <p>L'utilisateur n'existe pas dans le tableau.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Connexion;
