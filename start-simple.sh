#!/bin/bash

# AFM Interactive Learning Platform - Simple Deployment Script
# JSON-based data storage (no PostgreSQL required)

set -e

echo "🚀 Starting AFM Interactive Learning Platform (Simple Version)..."

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
    else
        print_warning "No env.example found, creating basic .env..."
        cat > .env << EOF
# AFM Analytics Configuration
FRONTEND_PORT=8080
BACKEND_PORT=3001
NODE_ENV=production
EOF
        print_success "Created basic .env file"
    fi
fi

# Load environment variables
source .env

print_status "Loading configuration..."
echo "  Frontend Port: ${FRONTEND_PORT:-8080}"
echo "  Backend Port: ${BACKEND_PORT:-3001}"
echo "  Data Storage: JSON Files (no database)"

# Create necessary directories
print_status "Creating data directories..."
mkdir -p backend/data
mkdir -p backend/backups
mkdir -p backend/logs

# Stop and remove existing containers
print_status "Stopping existing containers..."
docker-compose -f docker-compose.simple.yml down --remove-orphans 2>/dev/null || true

# Build and start services
print_status "Building and starting services..."
docker-compose -f docker-compose.simple.yml build --no-cache
docker-compose -f docker-compose.simple.yml up -d

# Wait for services to start
print_status "Waiting for services to start..."
sleep 15

# Check service health
print_status "Checking service health..."

# Check backend
if curl -f http://localhost:${BACKEND_PORT:-3001}/health &>/dev/null; then
    print_success "Backend API is healthy"
else
    print_error "Backend health check failed"
    echo "Checking backend logs..."
    docker-compose -f docker-compose.simple.yml logs backend
    exit 1
fi

# Check frontend
if curl -f http://localhost:${FRONTEND_PORT:-8080}/health &>/dev/null; then
    print_success "Frontend is healthy"
else
    print_error "Frontend health check failed"
    echo "Checking frontend logs..."
    docker-compose -f docker-compose.simple.yml logs frontend
    exit 1
fi

print_success "🎉 Deployment completed successfully!"
echo ""
echo "🌐 Application URLs:"
echo "  📱 Frontend: http://localhost:${FRONTEND_PORT:-8080}"
echo "  🔧 Backend API: http://localhost:${BACKEND_PORT:-3001}/health"
echo "  📊 Analytics Dashboard: http://localhost:${BACKEND_PORT:-3001}/api/analytics/stats"
echo ""
echo "📁 Data Export URLs:"
echo "  📥 JSON Export: http://localhost:${BACKEND_PORT:-3001}/api/export/json"
echo "  📊 CSV Export: http://localhost:${BACKEND_PORT:-3001}/api/export/csv"
echo ""
echo "🛠️ Useful commands:"
echo "  View logs: docker-compose -f docker-compose.simple.yml logs -f"
echo "  Stop services: docker-compose -f docker-compose.simple.yml down"
echo "  Restart services: docker-compose -f docker-compose.simple.yml restart"
echo "  Create backup: curl -X POST http://localhost:${BACKEND_PORT:-3001}/api/backup"
echo ""
echo "📂 Local data directories:"
echo "  Data: ./backend/data/ (JSON files)"
echo "  Backups: ./backend/backups/ (automatic backups)"
echo "  Logs: ./backend/logs/ (application logs)"
echo ""
print_success "✅ Ready for your research! No database setup required! 🎓" 