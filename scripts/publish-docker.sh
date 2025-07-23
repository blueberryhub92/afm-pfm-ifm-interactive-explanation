#!/bin/bash

# Exit on error
set -e

# Docker Hub configuration
DOCKER_USERNAME="blueberryhub92"
REPO_NAME="modelingo"
VERSION=${1:-latest}

echo "Building and pushing Docker images version: $VERSION"

# Build and push backend
echo "Building backend image..."
docker build -t $DOCKER_USERNAME/$REPO_NAME:backend-$VERSION ./backend
docker push $DOCKER_USERNAME/$REPO_NAME:backend-$VERSION

# Build and push frontend
echo "Building frontend image..."
docker build -t $DOCKER_USERNAME/$REPO_NAME:frontend-$VERSION .
docker push $DOCKER_USERNAME/$REPO_NAME:frontend-$VERSION

echo "Successfully published version $VERSION to Docker Hub" 