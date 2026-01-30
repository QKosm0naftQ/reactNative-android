#!/bin/bash

# ==== API ====
cd JustDoItApi || {
  echo "Папка не знайдена"
  exit 1
}

echo "Building docker image..."
docker build -t bolto-api .

echo "Tagging..."
docker tag bolto-api:latest novakvova/bolto-api:latest

echo "Pushing to Docker Hub..."
docker push novakvova/bolto-api:latest

echo "DONE"

read -p "Press any key to continue..."
