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
                            <FaInstagram size={30} />
                            <FaLinkedin size={30} />
                            <FaYoutube size={30} />
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