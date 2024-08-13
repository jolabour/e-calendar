import React, { useState } from 'react';
import '../assets/styles/SearchBar.css';

const SearchBar = ({ onSearchChange, clearSelections }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    // Désélectionne tous les jeux quand on tape quelque chose
    if (newValue !== '') {
      clearSelections();
    }
    onSearchChange(newValue);
  };
  return (
    <input
      type="text"
      value={inputValue}
      onChange={handleInputChange}
      placeholder="Rechercher un jeu..."
      className="search-bar"
    />
  );
};

export default SearchBar;
