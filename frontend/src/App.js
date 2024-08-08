import React from 'react';
import Header from './components/Header';
import Calendar from './components/Calendar';
import CompetitionForm from './components/CompetitionForm';
import CurrentCompetitions from './components/CurrentCompetitions';

function App() {
  return (
    <div className="App">
      <Header />
      <CurrentCompetitions />
    </div>
  );
}

export default App;
