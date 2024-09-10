const mongoose = require('mongoose');

// Définir le schéma principal pour les competitions
const competitionSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  game: { type: String, required: true },
  competitionName: { type: String, required: true },
  competitionLogo: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true }
});

// Créer le modèle à partir du schéma
const Match = mongoose.model('Competitions', competitionSchema);

module.exports = Match;