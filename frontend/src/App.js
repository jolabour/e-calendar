import React, { useState, useEffect } from 'react';
import CompetitionList from './components/CompetitionList';
import Filter from './components/GameFilter';
import './App.css';
import Header from './components/Header';
import Loader from './components/Loader';

const App = () => {
  const [competitions, setCompetitions] = useState([]);
  const [selectedGames, setSelectedGames] = useState([]);
  const [loading, setLoading] = useState(true);

  const games = ['trackmania', 'League of Legends',  'Valorant', 'Overwatch'];
  useEffect(() => {
    fetchCompetitions();
  }, [selectedGames]);

  const fetchCompetitions = async () => {
    try {
      const gameQuery = selectedGames.length > 0 ? `?games=${selectedGames.join(',')}` : '';
      const response = await fetch(`http://localhost:5000/api/competitions${gameQuery}`);
      const data = await response.json();
      setCompetitions(data);
    } catch (error) {
      console.error('Error fetching competitions:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header>
        <Header />
      </header>
      <div className="main-container">
        <aside className="sidebar">
          <Filter games={games} selectedGames={selectedGames} onSelectGame={setSelectedGames} />
        </aside>
        <main className="competitions">
          {loading ? (
            <Loader />
          ) : (
            <CompetitionList competitions={competitions} />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
