# Utiliser l'image officielle de Node.js
FROM node:14

# Créer et définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code de l'application
COPY . .

# Exposer le port utilisé par l'application
EXPOSE 3001

# Démarrer l'application
CMD ["npm", "start"]
