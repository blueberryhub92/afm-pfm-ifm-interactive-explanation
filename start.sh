#!/bin/bash

# AFM Interactive Learning Platform - Docker Deployment Script
# This script helps you deploy the complete application stack

set -e

echo "🚀 Starting AFM Interactive Learning Platform deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Check if .env file exists, if not create from example
if [ ! -f .env ]; then
    print_warning ".env file not found. Creating from env.example..."
    if [ -f env.example ]; then
        cp env.example .env
        print_success "Created .env file from env.example"
        print_warning "Please review and update the .env file with your configurations before continuing."
        echo -e "\n${YELLOW}Important configurations to review:${NC}"
        echo "  - DB_PASSWORD: Set a secure database password"
        echo "  - FRONTEND_PORT: Change if port 8080 is already in use"
        echo -e "\nPress Enter when ready to continue, or Ctrl+C to exit and edit .env..."
        read -r
    else
        print_error "env.example file not found. Cannot create .env file."
        exit 1
    fi
fi

# Load environment variables
source .env

print_status "Loading configuration..."
echo "  Database: ${DB_NAME:-afm_analytics}"
echo "  Frontend Port: ${FRONTEND_PORT:-8080}"
echo "  Backend Port: ${BACKEND_PORT:-3001}"

# Stop and remove existing containers
print_status "Stopping existing containers..."
docker-compose down --remove-orphans 2>/dev/null || true

# Pull latest images and build
print_status "Building Docker images..."
docker-compose build --no-cache

# Start the services
print_status "Starting services..."
docker-compose up -d

# Wait for services to be healthy
print_status "Waiting for services to start..."
sleep 10

# Check service health
print_status "Checking service health..."

# Check database
if docker-compose exec -T postgres pg_isready -U ${DB_USER:-postgres} -d ${DB_NAME:-afm_analytics} &>/dev/null; then
    print_success "Database is healthy"
else
    print_error "Database health check failed"
    exit 1
fi

# Check backend
if curl -f http://localhost:${BACKEND_PORT:-3001}/health &>/dev/null; then
    print_success "Backend API is healthy"
else
    print_error "Backend health check failed"
    exit 1
fi

# Check frontend
if curl -f http://localhost:${FRONTEND_PORT:-8080}/health &>/dev/null; then
    print_success "Frontend is healthy"
else
    print_error "Frontend health check failed"
    exit 1
fi

print_success "🎉 Deployment completed successfully!"
echo ""
echo "🌐 Application URLs:"
echo "  Frontend: http://localhost:${FRONTEND_PORT:-8080}"
echo "  Backend API: http://localhost:${BACKEND_PORT:-3001}"
echo "  Database: localhost:${DB_PORT:-5432}"
echo ""
echo "📊 Useful commands:"
echo "  View logs: docker-compose logs -f"
echo "  Stop services: docker-compose down"
echo "  Restart services: docker-compose restart"
echo "  View database: docker-compose exec postgres psql -U ${DB_USER:-postgres} -d ${DB_NAME:-afm_analytics}"
echo ""
echo "✅ The AFM Interactive Learning Platform is now running!" 