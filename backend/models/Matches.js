const mongoose = require('mongoose');

// Définir le schéma pour les informations des équipes
const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String}
});

// Définir le schéma principal pour les matchs
const matchSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  game: { type: String, required: true },
  time: { type: String, required: true }, // Format: HH:MM
  date: { type: Date, required: true },
  competition: { type: String, required: true },
  broadcastUrl: { type: String} ,
  teamA: { type: teamSchema, required: true },
  teamB: { type: teamSchema, required: true }
});

matchSchema.statics.findByGame = async function(gameName) {
  try {
    return await this.find({
      'game': { $in: gameName }
    });
  } catch (error) {
    throw new Error(`Error finding matches by game: ${error.message}`);
  }
};

// Créer le modèle à partir du schéma
const Match = mongoose.model('Match', matchSchema);

module.exports = Match;
