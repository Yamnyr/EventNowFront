import React from "react";
import { useNavigate } from "react-router-dom";

const Deconnexion = () => {
    const navigate = useNavigate();
    const logOut = ()=>{
        localStorage.removeItem('userdata');
        navigate('/');
    }


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