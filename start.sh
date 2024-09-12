#!/bin/bash

if [ -z "$1" ]; then
  echo "Please provide the service name to start."
  echo "Usage: ./start_individual.sh <service_name>"
  exit 1
fi

# Lancer le service spécifié dans docker-compose
echo "Starting service: $1"
docker-compose up -- build -d $1

# Afficher les logs pour le service
echo "Showing logs for service: $1"
docker-compose logs -f $1
