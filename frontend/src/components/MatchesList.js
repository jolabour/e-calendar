import React, { useState, useEffect } from 'react';
import '../assets/styles/MatchesList.css'; // Assurez-vous que le fichier CSS est correctement référencé
import defaultLogo from '../assets/images/default-logo.png'; // Logo par défaut

const MatchList = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    // Logique pour charger les matchs depuis une API ou autre source
    const fetchMatches = async () => {
      try {
        const response = await fetch('/api/matches');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMatches(data);
      } catch (error) {
        console.error('Error fetching matches:', error);
        setMatches([]); // En cas d'erreur, vous pouvez initialiser à un tableau vide ou gérer autrement
      }
    };

    fetchMatches();
  }, []);

  const handleMouseEnter = (id) => {
    setHoveredId(id);
  };

  const handleMouseLeave = () => {
    setHoveredId(null);
  };

  return (
    <section className="current-matches">
      <ul>
        {Array.isArray(matches) && matches.length > 0 ? (
          matches.map(match => (
            <li
              key={match.id}
              className={`match-item ${hoveredId === match.id ? 'highlight' : ''}`}
              onMouseEnter={() => handleMouseEnter(match.id)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="game-logo">
                <img 
                  src={match.game.logoUrl}
                  alt={match.game.name}
                  loading="lazy"
                  className="game-logo" 
                />
              </div>
              <div className="match-time">
                <p className="match-date">{match.date}</p>
                <p className="match-time">{match.time}</p>
              </div>
              <div className="match-details">
                <div className="team-name">{match.teamA.name}</div>
                <div className="team1">
                  <img 
                    src={match.teamA.logoUrl || defaultLogo}  
                    alt={match.teamA.name}
                    loading="lazy"
                    className="team-logo" 
                  />
                </div>
                <div className="vs">VS</div>
                <div className="team2">
                  <img 
                    src={match.teamB.logoUrl || defaultLogo} 
                    alt={match.teamB.name}
                    loading="lazy" 
                    className="team-logo" 
                  />
                </div>
                <div className="team-name">{match.teamB.name}</div>
              </div>
            </li>
          ))
        ) : (
          <li>
            <div className='no-match'> No matches available</div> 
          </li>
        )}
      </ul>
    </section>
  );
};

export default MatchList;
