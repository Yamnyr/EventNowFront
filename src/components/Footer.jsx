import React from "react";
import '../index.css';
import { FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    return (
        <div className="footer">
            <div className="container">
                <div className="row">
                    <div className="col text-start">
                        <div className="container-gauche">Event Now</div>
                    </div>
                    <div className="col text-center">
                        <div className="container-milieu">
                        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                            <FaInstagram size={30} aria-label="instagram" />
                        </a>
                        <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                            <FaLinkedin size={30} aria-label="linkedin" />
                        </a>
                        <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                            <FaYoutube size={30} aria-label="youtube" />
                        </a>
                    </div>
                    </div>
                    <div className="col text-end ml-auto">
                        <div className="container-droit">Copyright © 2024 Event Now. Tous droits réservés</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;