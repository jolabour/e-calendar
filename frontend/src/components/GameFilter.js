import React, { useState} from 'react';
import '../assets/styles/GameFilter.css';
import SearchBar from './SearchBar';

const Filter = ({ games, selectedGames, onSelectGame }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const handleGameClick = (game) => {
    if (selectedGames.includes(game)) {
      onSelectGame(selectedGames.filter(g => g !== game));
    } else {
      onSelectGame([...selectedGames, game]);
    }
  };
  const filteredGames = games.filter(game =>
    game.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const clearSelections = () => {
    onSelectGame([]); // Désélectionne tous les jeux
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    if (query === '') {
      onSelectGame(games)
    }
  };

  return (
    <div className="filter-container">
        <div className="search-bar-container">
        <SearchBar onSearchChange={handleSearchChange} clearSelections={clearSelections} />
      </div>
      {filteredGames.map(game => (
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

