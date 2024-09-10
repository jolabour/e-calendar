const Competition = require('../models/Competitions'); // Assurez-vous que le chemin est correct

// Fonction pour ajouter un nouveau match
const addCompetition = async (req, res) => {
  try {
    console.log(req.body);
    const { game, competitionName, startDate, endDate } = req.body;
    const competitionLogo = req.file ? req.file.location : null; // URL de l'image uploadée sur S3

    const competition = new Competition({
      game,
      competitionName,
      competitionLogo,
      startDate,
      endDate,
    });
    await competition.save();
    res.status(201).json(Competition);
  } catch (error) {
    console.error('Error creating Competition:', error);
    res.status(400).json({ error: error.message });
  }
};

// Fonction pour obtenir tous les matchs
const getAllCompetitions = async (req, res) => {
  try {
    const matches = await Competition.find();
    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fonction pour obtenir un match par son ID
const getCompetitionById = async (req, res) => {
  const { id } = req.params;
  try {
    const match = await Competition.findById(id);
    if (!match) {
      return res.status(404).json({ message: 'Competition not found' });
    }
    res.status(200).json(match);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fonction pour mettre à jour un match par son ID
const updateCompetition = async (req, res) => {
  const { id } = req.params;
  try {
    const match = await Competition.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!match) {
      return res.status(404).json({ message: 'Competition not found' });
    }
    res.status(200).json(match);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Fonction pour supprimer un match par son ID
const deleteCompetition = async (req, res) => {
  const { id } = req.params;
  try {
    const match = await Competition.findByIdAndDelete(id);
    if (!match) {
      return res.status(404).json({ message: 'Competition not found' });
    }
    res.status(200).json({ message: 'Competition deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addCompetition,
  getAllCompetitions,
  getCompetitionById,
  updateCompetition,
  deleteCompetition
};