import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/styles/CreateMatch.css'; // Assurez-vous que le fichier CSS est correctement référencé

const CreateMatch = () => {
  const [gameName, setGameName] = useState('');
  const [competitionName, setCompetitionName] = useState('');
  const [matchDate, setMatchDate] = useState('');
  const [matchTime, setMatchTime] = useState('');
  const [teamAName, setTeamAName] = useState('');
  const [teamALogo, setTeamALogo] = useState('');
  const [teamBName, setTeamBName] = useState('');
  const [teamBLogo, setTeamBLogo] = useState('');
  const [broadcastUrl, setBroadcastUrl] = useState('');
  const [competitions, setCompetitions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Charger la liste des compétitions
    const fetchCompetitions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/competitions');
        console.log(response.data) // Changez l'URL si nécessaire
        setCompetitions(response.data);
      } catch (error) {
        setError('Failed to load competitions.');
        console.error('Error loading competitions:', error);
      }
    };

    fetchCompetitions();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/matches', {
        game: gameName,
        competition: competitionName, // Utilise l'ID de la compétition sélectionnée
        date: matchDate,
        time: matchTime,
        teamA: {
          name: teamAName,
          logoUrl: teamALogo,
        },
        teamB: {
          name: teamBName,
          logoUrl: teamBLogo,
        },
        broadcastUrl,
      });

      // Gérer la réponse ou réinitialiser le formulaire
      if (response.status === 200) {
        alert('Match declared successfully!');
        setGameName('');
        setCompetitionName('');
        setMatchDate('');
        setMatchTime('');
        setTeamAName('');
        setTeamALogo('');
        setTeamBName('');
        setTeamBLogo('');
        setBroadcastUrl('');
      }
    } catch (error) {
      setError('Failed to declare the match. Please try again.');
      console.error('Error declaring match:', error);
    }
  };

  return (
    <div className="create-match">
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="gameName">Game Name:</label>
          <input
            type="text"
            id="gameName"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="competitionName">Competition:</label>
          <select
            id="competitionName"
            value={competitionName}
            onChange={(e) => setCompetitionName(e.target.value)}
            required
          >
            <option value="">Select a competition</option>
            {competitions.map((competition) => (
              <option key={competition._id} value={competition._id}>
                {competition.competitionName}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="matchDate">Match Date:</label>
          <input
            type="date"
            id="matchDate"
            value={matchDate}
            onChange={(e) => setMatchDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="matchTime">Match Time:</label>
          <input
            type="time"
            id="matchTime"
            value={matchTime}
            onChange={(e) => setMatchTime(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="teamAName">Team A Name:</label>
          <input
            type="text"
            id="teamAName"
            value={teamAName}
            onChange={(e) => setTeamAName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="teamALogo">Team A Logo URL:</label>
          <input
            type="url"
            id="teamALogo"
            value={teamALogo}
            onChange={(e) => setTeamALogo(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="teamBName">Team B Name:</label>
          <input
            type="text"
            id="teamBName"
            value={teamBName}
            onChange={(e) => setTeamBName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="teamBLogo">Team B Logo URL:</label>
          <input
            type="url"
            id="teamBLogo"
            value={teamBLogo}
            onChange={(e) => setTeamBLogo(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="broadcastUrl">Broadcast URL:</label>
          <input
            type="url"
            id="broadcastUrl"
            value={broadcastUrl}
            onChange={(e) => setBroadcastUrl(e.target.value)}
          />
        </div>
        <button type="submit">Declare Match</button>
      </form>
    </div>
  );
};

export default CreateMatch;

