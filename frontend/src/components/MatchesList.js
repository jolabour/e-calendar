import React, { useState, useEffect } from 'react';
import '../assets/styles/MatchesList.css'; // Assurez-vous que le fichier CSS est correctement référencé
import defaultLogo from '../assets/images/default-logo.png'; // Logo par défaut
import Loader from './Loader';

const MatchList = ({selectedGames}) => {
  const [hoveredId, setHoveredId] = useState(null);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Logique pour charger les matchs depuis une API ou autre source
    const fetchMatches = async () => {
      try {
        console.log('Fetching matches for selected games:', matches[0]);
        const query = selectedGames && selectedGames.length > 0
        ? selectedGames.map(game => `${encodeURIComponent(game)}`).join(',')
        : '';
        console.log('query', `http://localhost:5000/api/matches?game=${query}`);
        const response = await fetch(`http://localhost:5000/api/matches?game=${query}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Matches fetched:', data);
        setMatches(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching matches:', error);
        setMatches([]);
        setLoading(false); // En cas d'erreur, vous pouvez initialiser à un tableau vide ou gérer autrement
      }
    };

    fetchMatches();
  }, [selectedGames]);

  const handleMouseEnter = (id) => {
    setHoveredId(id);
  };

  const handleMouseLeave = () => {
    setHoveredId(null);
  };

  const gameLogo = (game) => {
    switch (game) {
      case 'trackmania':
        return require('../assets/images/trackmania.png');
      case 'valorant':
        return require('../assets/images/valorant.png'); // Ensure you have these images in your assets folder
      case 'league-of-legends':
        return require('../assets/images/leagueoflegends.png'); // Ensure you have these images in your assets folder
      default:
        return defaultLogo;
    }
  };

  if (loading) {
    return <div><Loader />..</div>; // You can replace this with a loader component
  }

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
                  src={gameLogo(match.game)}
                  alt={match.game}
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
