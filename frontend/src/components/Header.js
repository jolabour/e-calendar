import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/Header.css'; // Assurez-vous que le chemin est correct
import logo from '../assets/images/E-calendar.png'; // Assurez-vous que le chemin est correct

const Header = () => (
  <header className="header">
    <div className="logo-container">
      <img src={logo} alt="Esport Calendar Logo" className="logo" />
    </div>
    <nav className="nav-links">
        <Link to="/">Accueil</Link>
        <Link to="/calendrier">Calendrier</Link>
        <Link to="/create-match">Déclarer un match</Link>
    </nav>
    <button className="login-button">Connexion</button>
  </header>
);

export default Header;
