import React from "react";
import "../index.css";
import { Link } from "react-router-dom";
import LogButton from "./LogButton";

const Header = () => {
  const isLoggedIn = localStorage.getItem("userData") ? true : false;

  return (
    <nav className="navbar navbar-expand-lg custom-header">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          EventNOW
        </Link>

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
            {!isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/inscription">
                    INSCRIPTION
                  </Link>
                </li>
              </>
            )}
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
        </div>
      </div>
    </nav>
  );
};

export default Header;
