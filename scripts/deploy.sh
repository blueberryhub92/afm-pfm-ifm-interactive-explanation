#!/bin/bash

# Exit on error
set -e

echo "Starting deployment process..."

# 1. Load environment variables
if [ -f .env.production ]; then
    export $(cat .env.production | grep -v '^#' | xargs)
else
    echo "Error: .env.production file not found!"
    exit 1
fi

# 2. Pull latest changes
echo "Pulling latest changes..."
git pull origin main

# 3. Build and start containers
echo "Building and starting containers..."
docker compose -f docker-compose.yml down
docker compose -f docker-compose.yml build --no-cache
docker compose -f docker-compose.yml up -d

# 4. Wait for services to be healthy
echo "Waiting for services to be healthy..."
sleep 30

# 5. Check service health
echo "Checking service health..."
docker compose ps

# 6. Create backup of existing database
echo "Creating database backup..."
./scripts/backup.sh

echo "Deployment completed successfully!" 