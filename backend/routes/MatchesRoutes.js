const express = require('express');
const router = express.Router();
const MatchesController = require('../controllers/MatchesController');

// Route pour obtenir toutes les compétitions
router.get('/', MatchesController.getMatches);

// Route pour obtenir une compétition par ID
router.get('/:id', MatchesController.getMatchById);

// Route pour créer une nouvelle compétition
router.post('/', MatchesController.addMatch);

// Route pour mettre à jour une compétition
router.put('/:id', MatchesController.updateMatch);

// Route pour supprimer une compétition
router.delete('/:id', MatchesController.deleteMatch);


module.exports = router;
