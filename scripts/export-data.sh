#!/bin/bash

# Data Export Script for AFM Analytics
# Exports analytics data in JSON and CSV formats

set -e

# Configuration
BACKEND_PORT=${BACKEND_PORT:-3001}
EXPORT_DIR="./exports"
DATE=$(date +%Y%m%d_%H%M%S)

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
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

# Create export directory
mkdir -p "$EXPORT_DIR"

print_status "🚀 Starting data export..."
print_status "📁 Export directory: $EXPORT_DIR"
print_status "⏰ Timestamp: $DATE"

# Check if backend is running
if ! curl -f http://localhost:$BACKEND_PORT/health &>/dev/null; then
    print_warning "Backend not running. Starting it first..."
    if [ -f "docker-compose.yml" ]; then
        print_status "Starting backend service..."
        docker compose up -d backend
        print_status "Waiting for backend to start..."
        sleep 15
        
        # Retry health check
        if ! curl -f http://localhost:$BACKEND_PORT/health &>/dev/null; then
            echo "❌ Backend failed to start. Please check:"
            echo "   docker compose logs backend"
            echo "   docker compose ps"
            exit 1
        fi
        print_success "✅ Backend is now running"
    else
        echo "❌ Cannot start backend. docker-compose.yml not found."
        echo "   Please run: docker compose up -d"
        exit 1
    fi
fi

# Export all data as JSON
print_status "📥 Exporting all data as JSON..."
curl -s "http://localhost:$BACKEND_PORT/api/export/json" \
    -o "$EXPORT_DIR/afm_analytics_all_${DATE}.json"
print_success "✅ JSON export saved: $EXPORT_DIR/afm_analytics_all_${DATE}.json"

# Export all data as CSV
print_status "📊 Exporting all data as CSV..."
curl -s "http://localhost:$BACKEND_PORT/api/export/csv" \
    -o "$EXPORT_DIR/afm_analytics_all_${DATE}.csv"
print_success "✅ CSV export saved: $EXPORT_DIR/afm_analytics_all_${DATE}.csv"

# Get list of users and export individual user data
print_status "👥 Fetching user list..."
USERS_JSON=$(curl -s "http://localhost:$BACKEND_PORT/api/analytics/users")

if command -v jq &> /dev/null; then
    # If jq is available, extract user IDs properly
    USER_IDS=$(echo "$USERS_JSON" | jq -r '.users[]?.userId // empty' 2>/dev/null || echo "")
    
    if [ -n "$USER_IDS" ]; then
        print_status "📂 Creating individual user exports..."
        mkdir -p "$EXPORT_DIR/users"
        
        while IFS= read -r user_id; do
            if [ -n "$user_id" ] && [ "$user_id" != "null" ]; then
                print_status "   Exporting user: $user_id"
                
                # Export user JSON
                curl -s "http://localhost:$BACKEND_PORT/api/export/user/$user_id/json" \
                    -o "$EXPORT_DIR/users/user_${user_id}_${DATE}.json" 2>/dev/null || true
                
                # Export user CSV
                curl -s "http://localhost:$BACKEND_PORT/api/export/user/$user_id/csv" \
                    -o "$EXPORT_DIR/users/user_${user_id}_${DATE}.csv" 2>/dev/null || true
            fi
        done <<< "$USER_IDS"
        
        print_success "✅ Individual user exports completed"
    else
        print_warning "⚠️  No users found to export"
    fi
else
    print_warning "⚠️  jq not installed. Skipping individual user exports."
    print_status "   Install jq for individual user exports: sudo apt install jq"
fi

# Copy raw JSON files as backup
print_status "💾 Creating backup of raw data files..."
if [ -d "./data" ]; then
    cp -r ./data "$EXPORT_DIR/raw_data_backup_$DATE"
    print_success "✅ Raw data backup created: $EXPORT_DIR/raw_data_backup_$DATE"
elif [ -d "./backend/data" ]; then
    # Fallback for older directory structure
    cp -r ./backend/data "$EXPORT_DIR/raw_data_backup_$DATE"
    print_success "✅ Raw data backup created: $EXPORT_DIR/raw_data_backup_$DATE"
else
    print_warning "⚠️  No data directory found. Skipping raw data backup."
    print_status "   Expected: ./data or ./backend/data"
fi

# Generate export summary
print_status "📋 Generating export summary..."
cat > "$EXPORT_DIR/export_summary_$DATE.txt" << EOF
AFM Analytics Data Export Summary
=================================
Export Date: $(date)
Export Directory: $EXPORT_DIR

Files Created:
- afm_analytics_all_${DATE}.json    (All events in JSON format)
- afm_analytics_all_${DATE}.csv     (All events in CSV format)
- users/                            (Individual user exports)
- raw_data_backup_$DATE/            (Raw JSON files backup)

Usage Instructions:
1. JSON files can be imported into Python/R for analysis
2. CSV files work with Excel, Google Sheets, or statistical software
3. Raw backup contains the original JSON files for manual inspection

For analysis in R:
  library(jsonlite)
  data <- fromJSON("afm_analytics_all_${DATE}.json")

For analysis in Python:
  import pandas as pd
  data = pd.read_csv("afm_analytics_all_${DATE}.csv")
EOF

print_success "📄 Export summary saved: $EXPORT_DIR/export_summary_$DATE.txt"

echo ""
print_success "🎉 Export completed successfully!"
echo ""
echo "📁 Export location: $EXPORT_DIR"
echo "📊 Files ready for analysis:"
echo "   • JSON: afm_analytics_all_${DATE}.json"
echo "   • CSV: afm_analytics_all_${DATE}.csv"
echo "   • Summary: export_summary_$DATE.txt"
echo ""
echo "💡 Next steps:"
echo "   • Open CSV in Excel/Google Sheets"
echo "   • Import JSON into R/Python for advanced analysis"
echo "   • Use raw backup for custom processing"
echo "" 