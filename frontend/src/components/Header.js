import React from 'react';
import '../assets/styles/Header.css';
import logo from '../assets/images/E-calendar.png';

const Header = () => (
  <header className="header">
    <div className="logo-container">
      <img src={logo} alt="Esport Calendar Logo" className="logo" />
    </div>
    <div className="header-content">
      <nav>
        <a href="#Accueil">Accueil</a>
        <a href="#Calendrier">Calendrier</a>
        <a href="#CreateCompetition">Créer une Competition</a>
      </nav>
      <button className="login-button">Connexion</button>
    </div>
  </header>
);

export default Header;
