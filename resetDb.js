// resetDatabases.js
const { MongoClient } = require('mongodb');

// Configuration MongoDB
const mongoURI = 'mongodb://localhost:27017'; // Remplace par l'URI de ton MongoDB si nécessaire
const dbName = 'e-calendar'; // Remplace par le nom de ta base de données

const resetDatabases = async () => {
  const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    // Connexion à MongoDB
    await client.connect();
    const db = client.db(dbName);

    // Vérification de la connexion
    console.log(`Connected to database: ${dbName}`);

    // Liste des collections
    const collections = await db.listCollections().toArray();
    console.log('Collections found:', collections.map(col => col.name));

    // Suppression des documents dans chaque collection
    for (const collection of collections) {
      const result = await db.collection(collection.name).deleteMany({});
      console.log(`Deleted ${result.deletedCount} documents from collection ${collection.name}`);
    }

    console.log('Databases reset successfully!');
  } catch (error) {
    console.error('Error resetting databases:', error);
  } finally {
    // Fermeture de la connexion
    await client.close();
  }
};

resetDatabases();
