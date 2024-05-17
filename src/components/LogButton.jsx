import { useEffect, useState } from "react";
import "../index.css";

import { Link } from "react-router-dom";

export default function LogButton() {
  const [logstatut, setlogStatut] = useState(typeof(localStorage["userData"]));
  const [logRoute, setlogRoute] = useState({ url: '', route: '', class:'' });
  
  useEffect(() => {
    if (logstatut === typeof("")) {
        console.log(" log use");
        login();
    }
    else{
        console.log("non trouver");
        logout();
    }
  },[logstatut]);


  const login = () => {
    setlogRoute({
      url: "/logout",
      route: "DECONNEXION",
      class: "btn btn-danger",
    });
  };
  const logout = () => {
    setlogRoute({
      url: "/login",
      route: "CONNEXION",
      class: "btn btn-primary",
    });
  };

  return (
    <div class="btn-group" role="group" aria-label="Basic example">
      <button type="button" className={logRoute.class}>
        <Link className="nav-link" to={logRoute.url}>
          {logRoute.route}
        </Link>
      </button>
    </div>
  );
}
