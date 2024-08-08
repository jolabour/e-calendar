const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const path = require('path');

app.use(cors());

// Exemple de données pour les compétitions
const competitions = [
  {
    id: 1,
    name: 'Compétition A',
    game: {name: 'trackmania', logoUrl: 'http://localhost:5000/images/trackmania.png'},
    date: '08 Janvier',
    time: '18:00',
    teamA: { name: 'OPF', logoUrl: 'http://localhost:5000/images/opf.png' },
    teamB: { name: 'Zephyr', logoUrl: 'http://localhost:5000/images/zephyr.png'}, // Logo manquant
  },
  {
    id: 2,
    name: 'Compétition A',
    game: {name: 'valorant', logoUrl: 'http://localhost:5000/images/valorant.png'},
    date: '09 Janvier',
    time: '20:00',
    teamA: { name: 'MDR', logoUrl: 'http://localhost:5000/images/mandatory.svg' },
    teamB: { name: 'KC', logoUrl: 'http://localhost:5000/images/kc.png' }, // Logo manquant
  },
  // Ajoutez d'autres compétitions ici
];

app.get('/api/competitions', (req, res) => {
  try {
    console.log(req.query.games)
    const games = req.query.games ? req.query.games.split(',') : [];
    let query = 'SELECT * FROM competitions';
    const params = [];

    if (games.length > 0) {
      const placeholders = games.map(() => '?').join(',');
      query += ` WHERE game IN (${placeholders})`;
      params.push(...games);
    }

    //const [rows] = await db.execute(query, params);
    console.log(competitions)
    res.json(competitions);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

