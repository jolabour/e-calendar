import React, { useState } from 'react';
import axios from 'axios';

const CreateCompetition = () => {
  const [game, setGame] = useState('');
  const [competitionName, setCompetitionName] = useState('');
  const [competitionLogo, setCompetitionLogo] = useState(null); // Change to null initially
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState(null);
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('game', game);
    formData.append('competitionName', competitionName);
    formData.append('startDate', startDate);
    formData.append('endDate', endDate);
    if (competitionLogo) formData.append('image', competitionLogo); // Append file if it exists

    try {
      const response = await axios.post('http://localhost:5000/api/competitions/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Gérer la réponse ou réinitialiser le formulaire
      if (response.status === 201) {
        alert('Competition created successfully!');
        setGame('');
        setCompetitionName('');
        setCompetitionLogo(null);
        setStartDate('');
        setEndDate('');
      }
    } catch (error) {
      setError('Failed to create competition. Please try again.');
      console.error('Error creating competition:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="game">Game Name:</label>
        <input
          type="text"
          id="game"
          value={game}
          onChange={(e) => setGame(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="competitionName">Competition Name:</label>
        <input
          type="text"
          id="competitionName"
          value={competitionName}
          onChange={(e) => setCompetitionName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="startDate">Competition Start Date:</label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="endDate">Competition End Date:</label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="competitionLogo">Upload Image:</label>
        <input
          type="file"
          id="competitionLogo"
          accept="image/*"
          onChange={(e) => setCompetitionLogo(e.target.files[0])}
        />
      </div>
      <button type="submit">Create Competition</button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default CreateCompetition;
