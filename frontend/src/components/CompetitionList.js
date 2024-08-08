import React, { useState } from 'react';
import '../assets/styles/CompetitionList.css'; // Assurez-vous que le fichier CSS est correctement référencé
import defaultLogo from '../assets/images/default-logo.png'; // Logo par défaut

const CompetitionList = ({ competitions }) => {
  const [hoveredId, setHoveredId] = useState(null);

  const handleMouseEnter = (id) => {
    setHoveredId(id);
  };

  const handleMouseLeave = () => {
    setHoveredId(null);
  };

  return (
    <section className="current-competitions">
      <ul>
        {competitions.map((comp) => (
          <div
          key={comp.id}
          className={`competition-item ${hoveredId === comp.id ? 'highlight' : ''}`}
          onMouseEnter={() => handleMouseEnter(comp.id)}
          onMouseLeave={handleMouseLeave}
          >
            <div className="game-logo">
                <img 
                  src={comp.game.logoUrl}
                  alt={comp.game.name}
                  loading="lazy"
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
                  loading="lazy"
                  className="team-logo" 
                />
              </div>
              <div className="vs">VS</div>
              <div className="team2">
                <img 
                  src={comp.teamB.logoUrl || defaultLogo} 
                  alt={comp.teamB.name}
                  loading="lazy" 
                  className="team-logo" 
                />
              </div>
              <div className="team-name">{comp.teamB.name}</div>
            </div>
          </div>
        ))}
      </ul>
    </section>
  );
};

export default CompetitionList;

