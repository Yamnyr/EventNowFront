import React from "react";
import "../index.css";
import { Link} from "react-router-dom";
import LogButton from "./LogButton";

const Header = () => {

  return (
    <nav className="navbar navbar-expand-lg custom-header">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          EventNOW
        </Link>

        {/* <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button> */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/planing">
                PLANING
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/evenement">
                EVENEMENTS
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/newevenement">
                NOUVEAU
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" to="/connexion">
                CONNEXION
              </Link>
            </li> */}
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <img
                  src="https://flagsapi.com/FR/flat/64.png"
                  alt="French Flag"
                  className="flag-icon"
                />
              </Link>
            </li>
          </ul>
          <div className="btn-group">
            <LogButton />
          </div>

          {/* <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" className="btn btn-success">
              <Link className="nav-link" to="/login">
                LogIN
              </Link>
            </button>
            <button type="button" className="btn btn-primary">
              <Link className="nav-link" to="/logout">
                LogOUT
              </Link>
            </button>
          </div> */}
        </div>
      </div>
    </nav>
  );
};

export default Header;
