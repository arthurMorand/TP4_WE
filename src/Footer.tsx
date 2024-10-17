import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    const location = useLocation();

    return (
        <footer className="footer"> {/* Apply the footer class */}
            {location.pathname === '/' ? (
                <Link to="/about">À propos</Link>
            ) : (
                <Link to="/">Retour à la liste des bières</Link>
            )}
        </footer>
    );
};

export default Footer;
