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
const getAllMatches = async (req, res) => {
  try {
    const matches = await Match.find();
    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({ error: error.message });
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

module.exports = {
  addMatch,
  getAllMatches,
  getMatchById,
  updateMatch,
  deleteMatch
};
