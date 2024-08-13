const express = require('express');
const router = express.Router();
const CompetitionsController = require('../controllers/CompetitionsController');

// Route pour obtenir toutes les compétitions
router.get('/', CompetitionsController.getAllCompetitions);

// Route pour obtenir une compétition par ID
router.get('/:id', CompetitionsController.getCompetitionById);

// Route pour créer une nouvelle compétition
router.post('/', CompetitionsController.addCompetition);

// Route pour mettre à jour une compétition
router.put('/:id', CompetitionsController.updateCompetition);

// Route pour supprimer une compétition
router.delete('/:id', CompetitionsController.deleteCompetition);

module.exports = router;
