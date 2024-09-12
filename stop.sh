#!/bin/bash

if [ -z "$1" ]; then
  echo "Please provide the service name to stop."
  echo "Usage: ./stop_individual.sh <service_name>"
  exit 1
fi

# Arrêter le service spécifié dans docker-compose
echo "Stopping service: $1"
docker-compose stop $1
