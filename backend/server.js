const express = require('express');
const connectDB = require('./config/Db'); // Importez le fichier de configuration
const matchesRoutes = require('./routes/MatchesRoutes');
const competitionsRoutes = require('./routes/CompetitionsRoutes');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());

// Connexion à MongoDB
connectDB();

// Middleware
app.use(express.json());

// Utilisation des routes
app.use('/api/matches', matchesRoutes);
app.use('/api/competitions', competitionsRoutes);

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


