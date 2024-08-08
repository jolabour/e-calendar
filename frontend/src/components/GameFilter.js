import React from 'react';
import '../assets/styles/GameFilter.css';

const Filter = ({ games, selectedGames, onSelectGame }) => {
  const handleGameClick = (game) => {
    if (selectedGames.includes(game)) {
      onSelectGame(selectedGames.filter(g => g !== game));
    } else {
      onSelectGame([...selectedGames, game]);
    }
  };

  return (
    <div className="filter-container">
      {games.map(game => (
        <div
        key={game}
        className={`filter-item ${game.toLowerCase().replace(/ /g, '-')}${selectedGames.includes(game) ? ' active' : ''}`}
        onClick={() => handleGameClick(game)}
      >
        </div>
      ))}
    </div>
  );
};

export default Filter;

