#!/bin/bash

# Backup Script for AFM Analytics Data
# Creates timestamped backups of all data

set -e

# Configuration
BACKUP_DIR="./backups"
DATE=$(date +%Y%m%d_%H%M%S)
BACKEND_PORT=${BACKEND_PORT:-3001}

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

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

# Create backup directory
mkdir -p "$BACKUP_DIR"

print_status "🚀 Starting backup process..."
print_status "📁 Backup directory: $BACKUP_DIR"
print_status "⏰ Timestamp: $DATE"

# Method 1: API Backup (if backend is running)
if curl -f http://localhost:$BACKEND_PORT/health &>/dev/null; then
    print_status "📡 Backend is running, creating API backup..."
    
    # Create API backup
    RESPONSE=$(curl -s -X POST "http://localhost:$BACKEND_PORT/api/backup")
    if echo "$RESPONSE" | grep -q '"success":true'; then
        print_success "✅ API backup created successfully"
    else
        print_warning "⚠️  API backup failed: $RESPONSE"
    fi
else
    print_warning "⚠️  Backend not running, skipping API backup"
fi

# Method 2: Manual File Backup
print_status "📂 Creating manual file backup..."
MANUAL_BACKUP_DIR="$BACKUP_DIR/manual_backup_$DATE"
mkdir -p "$MANUAL_BACKUP_DIR"

# Backup data files
if [ -d "./backend/data" ]; then
    cp -r ./backend/data "$MANUAL_BACKUP_DIR/"
    print_success "✅ Data files backed up"
else
    print_warning "⚠️  No data directory found (./backend/data)"
fi

# Backup existing backups (if any)
if [ -d "./backend/backups" ]; then
    cp -r ./backend/backups "$MANUAL_BACKUP_DIR/"
    print_success "✅ Existing backups archived"
fi

# Backup logs
if [ -d "./backend/logs" ]; then
    cp -r ./backend/logs "$MANUAL_BACKUP_DIR/"
    print_success "✅ Log files backed up"
fi

# Create backup manifest
print_status "📋 Creating backup manifest..."
cat > "$MANUAL_BACKUP_DIR/backup_manifest.txt" << EOF
AFM Analytics Backup Manifest
============================
Backup Date: $(date)
Backup Type: Manual File Backup
Backup Directory: $MANUAL_BACKUP_DIR

Contents:
$(find "$MANUAL_BACKUP_DIR" -type f -name "*.json" | sort)

File Counts:
- Data files: $(find "$MANUAL_BACKUP_DIR/data" -name "*.json" 2>/dev/null | wc -l)
- Log files: $(find "$MANUAL_BACKUP_DIR/logs" -name "*.log" 2>/dev/null | wc -l)
- Total files: $(find "$MANUAL_BACKUP_DIR" -type f | wc -l)

Backup Size: $(du -sh "$MANUAL_BACKUP_DIR" | cut -f1)

Restore Instructions:
1. Stop the application: docker-compose -f docker-compose.simple.yml down
2. Restore data: cp -r $MANUAL_BACKUP_DIR/data/* ./backend/data/
3. Restart application: docker-compose -f docker-compose.simple.yml up -d

EOF

print_success "📄 Backup manifest created"

# Create compressed archive
print_status "🗜️  Creating compressed archive..."
cd "$BACKUP_DIR"
tar -czf "afm_backup_$DATE.tar.gz" "manual_backup_$DATE"
ARCHIVE_SIZE=$(du -sh "afm_backup_$DATE.tar.gz" | cut -f1)
print_success "✅ Compressed archive created: afm_backup_$DATE.tar.gz ($ARCHIVE_SIZE)"
cd - > /dev/null

# Cleanup old backups (keep last 7 days)
print_status "🧹 Cleaning up old backups..."
find "$BACKUP_DIR" -name "afm_backup_*.tar.gz" -mtime +7 -delete 2>/dev/null || true
find "$BACKUP_DIR" -name "manual_backup_*" -type d -mtime +7 -exec rm -rf {} + 2>/dev/null || true

OLD_COUNT=$(find "$BACKUP_DIR" -name "afm_backup_*.tar.gz" | wc -l)
print_success "✅ Cleanup completed. $OLD_COUNT backups retained"

# Backup verification
print_status "🔍 Verifying backup integrity..."
if [ -f "$BACKUP_DIR/afm_backup_$DATE.tar.gz" ]; then
    if tar -tzf "$BACKUP_DIR/afm_backup_$DATE.tar.gz" &>/dev/null; then
        print_success "✅ Backup archive is valid"
    else
        print_error "❌ Backup archive is corrupted!"
        exit 1
    fi
else
    print_error "❌ Backup archive not found!"
    exit 1
fi

echo ""
print_success "🎉 Backup completed successfully!"
echo ""
echo "📁 Backup location: $BACKUP_DIR/afm_backup_$DATE.tar.gz"
echo "📊 Backup details:"
echo "   • Size: $ARCHIVE_SIZE"
echo "   • Files: $(tar -tzf "$BACKUP_DIR/afm_backup_$DATE.tar.gz" | wc -l)"
echo "   • Created: $(date)"
echo ""
echo "📝 Restore command:"
echo "   tar -xzf $BACKUP_DIR/afm_backup_$DATE.tar.gz -C $BACKUP_DIR"
echo "   cp -r $BACKUP_DIR/manual_backup_$DATE/data/* ./backend/data/"
echo ""
echo "💡 Tip: Run this script regularly or set up a cron job for automatic backups"
echo "" 