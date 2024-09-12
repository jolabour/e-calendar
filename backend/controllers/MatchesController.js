const { query } = require('express');
const Match = require('../models/Matches'); // Assurez-vous que le chemin est correct

// Fonction pour ajouter un nouveau match
const addMatch = async (req, res) => {
  try {
    console.log(req.body)
    const match = new Match(req.body);
    await match.save();
    res.status(201).json(match);
  } catch (error) {
    console.error('Error creating match:', error);
    res.status(400).json({ error: error.message });
  }
};

// Fonction pour obtenir tous les matchs
const getMatches = async (req, res) => {
  const { game, competition } = req.query;

  try {
    let query = {};
    console.log('game', game);
    console.log('competition', competition);
    console.log("mdr")

    // Si le paramètre 'game' est présent, ajoutez-le à la requête
    if (game) {
      const gameNames = game.split(',').map(name => name.trim());
      query['game'] = { $in: gameNames };
    }

    // Si le paramètre 'competition' est présent, ajoutez-le à la requête
    if (competition) {
      query['competition'] = competition;
    }
    console.log('query', query);
    // Recherchez les matchs avec la requête construite
    const matches = await Match.find(query).populate('competition').exec();;
    console.log(matches)
    res.status(200).json(matches);
  } catch (error) {
    console.error('Error fetching matches:', error);
    res.status(500).json({ message: 'Failed to fetch matches' });
  }
};
// Fonction pour obtenir un match par son ID
const getMatchById = async (req, res) => {
  const { id } = req.params;
  try {
    const match = await Match.findById(id);
    if (!match) {
      return res.status(404).json({ message: 'Match not found' });
    }
    res.status(200).json(match);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fonction pour mettre à jour un match par son ID
const updateMatch = async (req, res) => {
  const { id } = req.params;
  try {
    const match = await Match.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!match) {
      return res.status(404).json({ message: 'Match not found' });
    }
    res.status(200).json(match);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Fonction pour supprimer un match par son ID
const deleteMatch = async (req, res) => {
  const { id } = req.params;
  try {
    const match = await Match.findByIdAndDelete(id);
    if (!match) {
      return res.status(404).json({ message: 'Match not found' });
    }
    res.status(200).json({ message: 'Match deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMatchesByGame = async (req, res) => {
  const { games } = req.query;

  try {
    // Assurez-vous que 'games' est un tableau de chaînes de caractères
    const gameNames = Array.isArray(games) ? games : [games];
    const matches = await Match.findByGame(gameNames);

    res.json(matches);
  } catch (error) {
    console.error('Error fetching matches:', error);
    res.status(500).json({ message: 'Failed to fetch matches' });
  }
};

module.exports = {
  addMatch,
  getMatches,
  getMatchById,
  updateMatch,
  deleteMatch,
  getMatchesByGame
};
