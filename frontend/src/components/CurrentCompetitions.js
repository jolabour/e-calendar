import React, { useEffect, useState } from 'react';
import '../assets/styles/CurrentCompetitions.css'; // Assurez-vous que le fichier CSS est correctement référencé
import defaultLogo from '../assets/images/default-logo.png'; // Logo par défaut

const CurrentCompetitions = () => {
  const [competitions, setCompetitions] = useState([]);

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/competitions');
        const data = await response.json();
        setCompetitions(data);
      } catch (error) {
        console.error('Error fetching competitions:', error);
      }
    };

    fetchCompetitions();
  }, []);

  return (
    <section className="current-competitions">
      <h2>Compétitions en Cours</h2>
      <ul>
        {competitions.map((comp) => (
          <li key={comp.id} className="competition-item">
            <div className="game-logo">
                <img 
                  src={comp.game.logoUrl}
                  alt={comp.game.name}
                  className="game-logo" 
                />
            </div>
            <div className="competition-time">
              <p className="competition-date">{comp.date}</p>
              <p className="competition-time">{comp.time}</p>
            </div>
            <div className="competition-details">
              <div className="team-name">{comp.teamA.name}</div>
              <div className="team1">
                <img 
                  src={comp.teamA.logoUrl || defaultLogo}  
                  alt={comp.teamA.name}
                  className="team-logo" 
                />
              </div>
              <div className="vs">VS</div>
              <div className="team2">
                <img 
                  src={comp.teamB.logoUrl || defaultLogo} 
                  alt={comp.teamB.name} 
                  className="team-logo" 
                />
              </div>
              <div className="team-name">{comp.teamB.name}</div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CurrentCompetitions;

