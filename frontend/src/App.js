// src/App.js
import React, { useState, useEffect } from 'react';
import MatchesList from './components/MatchesList';
import Filter from './components/GameFilter';
import Header from './components/Header';
import Loader from './components/Loader';
import CreateMatch from './components/CreateMatch';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';

const App = () => {
  const games = ['trackmania', 'League of Legends', 'Valorant', 'Overwatch'];
  const [matches, setMatches] = useState([]);
  const [selectedGames, setSelectedGames] = useState(games);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    fetchMatches();
  }, [selectedGames]);

  const fetchMatches = async () => {
    try {
      const gameQuery = selectedGames.length > 0 ? `?games=${selectedGames.join(',')}` : '';
      const response = await fetch(`http://localhost:5000/api/matches${gameQuery}`);
      const data = await response.json();
      setMatches(data);
    } catch (error) {
      console.error('Error fetching matches:', error);
    } finally {
      setLoading(false);
    }
  };

  const shouldShowSidebar = !['/create-match'].includes(location.pathname);

  return (
    <div className="app">
      <Header />
      <div className="main-container">
        {shouldShowSidebar && (
          <aside className="sidebar">
            <Filter games={games} selectedGames={selectedGames} onSelectGame={setSelectedGames} />
          </aside>
        )}
        <main className="content">
          <Routes>
            <Route path="/" element={loading ? <Loader /> : <MatchesList matches={matches} />} />
            <Route path="/calendrier" element={<MatchesList matches={matches} />} />
            <Route path="/create-match" element={<CreateMatch />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;


