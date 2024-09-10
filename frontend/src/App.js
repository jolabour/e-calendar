// src/App.js
import React, { useState, useEffect } from 'react';
import MatchesList from './components/MatchesList';
import Filter from './components/GameFilter';
import Header from './components/Header';
import Loader from './components/Loader';
import CreateMatch from './components/CreateMatch';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import CreateCompetition from './components/CreateCompetition';

const App = () => {
  const games = ['trackmania', 'league-of-legends', 'valorant', 'overwatch'];
  const [selectedGames, setSelectedGames] = useState(games);
  const location = useLocation();

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
            <Route path="/" element={<MatchesList selectedGames={selectedGames} />} />
            <Route path="/calendrier" element={<MatchesList selectedGames={selectedGames} />} />
            <Route path="/create-match" element={<CreateMatch />} />
            <Route path="/create-competition" element={<CreateCompetition />} />
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


