#!/bin/bash

# Lancer tous les conteneurs définis dans le fichier docker-compose.yml
echo "Starting all containers..."
docker-compose up -d

# Afficher les logs de tous les conteneurs
echo "Showing logs for all containers..."
docker-compose logs -f
