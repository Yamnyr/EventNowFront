import React from "react";
import { useNavigate } from "react-router-dom";

const Deconnexion = () => {
  const navigate = useNavigate();

  // Gere la redirection vers la route avec un rechargement de la page complete
  const handleredirect = () => {
    // Redirection vers la page de d'accueil
    navigate("/", { replace: true });

    // Rechargement de la page
    window.location.reload();
  };

  const logOut = async () => {
    if (localStorage.getItem("userData")) {
      localStorage.removeItem("userData");
      handleredirect();
    } else {
      console.log("pas de log");  
    }
  };

  return (
    <div class=" container my-5 card text-center">
      <div class="card-header">LOGIN OUT</div>
      <div class="card-body">
        <h5 class="card-title"> Voulez vous vous deconnecté?</h5>
        <p class="card-text">
          si vous souhaitez vous deconnecté, apres reflexion click sur
          déconnexion
        </p>
        <button onClick={logOut} class="btn btn-primary">
          Deconnxion
        </button>
      </div>
    </div>
  );
};

export default Deconnexion;