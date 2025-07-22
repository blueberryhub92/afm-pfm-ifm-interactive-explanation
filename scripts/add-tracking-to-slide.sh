#!/bin/bash

# Script to add tracking to existing slide components
# Usage: ./scripts/add-tracking-to-slide.sh <slide-file.jsx> <slide-number> <slide-name>

set -e

SLIDE_FILE="$1"
SLIDE_NUMBER="$2"
SLIDE_NAME="$3"

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

# Check parameters
if [ $# -ne 3 ]; then
    print_error "Usage: $0 <slide-file.jsx> <slide-number> <slide-name>"
    echo ""
    echo "Example: $0 src/components/Slide8Example.jsx 8 'Example Slide'"
    echo ""
    echo "Available slides:"
    find src/components -name "Slide*.jsx" -type f | sort
    exit 1
fi

# Check if file exists
if [ ! -f "$SLIDE_FILE" ]; then
    print_error "File not found: $SLIDE_FILE"
    exit 1
fi

print_status "🔧 Adding tracking to $SLIDE_FILE..."
print_status "   Slide Number: $SLIDE_NUMBER"
print_status "   Slide Name: $SLIDE_NAME"

# Create backup
BACKUP_FILE="${SLIDE_FILE}.backup.$(date +%Y%m%d_%H%M%S)"
cp "$SLIDE_FILE" "$BACKUP_FILE"
print_success "✅ Created backup: $BACKUP_FILE"

# Check if tracking is already added
if grep -q "SlideTracker" "$SLIDE_FILE"; then
    print_warning "⚠️  Tracking already exists in this file!"
    echo "Do you want to update it? (y/N)"
    read -r response
    if [ "$response" != "y" ] && [ "$response" != "Y" ]; then
        print_status "Skipping..."
        exit 0
    fi
fi

# Create temporary file for modifications
TEMP_FILE=$(mktemp)

print_status "📝 Adding tracking imports..."

# Add imports at the top (after existing imports)
awk '
/^import.*from.*react/ && !imports_added {
    print $0
    if (!seen_analytics) {
        print "import { trackSlideEntry, trackSlideExit, trackTimeSpent, trackButtonClick } from \"../utils/analytics\";"
        print "import { SlideTracker, TrackedButton } from \"./shared/SlideTracker\";"
        seen_analytics = 1
    }
    imports_added = 1
    next
}
/^import/ {
    print $0
    next
}
!imports_added && !/^import/ && !/^$/ && !/^\/\/.*/ && !/^\/\*.*/ {
    if (!seen_analytics) {
        print "import { trackSlideEntry, trackSlideExit, trackTimeSpent, trackButtonClick } from \"../utils/analytics\";"
        print "import { SlideTracker, TrackedButton } from \"./shared/SlideTracker\";"
        seen_analytics = 1
    }
    imports_added = 1
    print $0
    next
}
{
    print $0
}
' "$SLIDE_FILE" > "$TEMP_FILE"

print_status "🎯 Wrapping component with SlideTracker..."

# Wrap the return statement with SlideTracker
awk -v slide_number="$SLIDE_NUMBER" -v slide_name="$SLIDE_NAME" '
/return \(/ {
    in_return = 1
    print $0
    print "    <SlideTracker"
    print "      slideNumber={" slide_number "}"
    print "      slideName=\"" slide_name "\""
    print "      trackMouse={true}"
    print "      trackScrolling={true}"
    print "      trackEngagement={true}"
    print "    >"
    next
}
in_return && /^  \);$/ {
    print "    </SlideTracker>"
    print $0
    in_return = 0
    next
}
{
    print $0
}
' "$TEMP_FILE" > "$SLIDE_FILE"

print_status "🔄 Updating button components..."

# Replace regular buttons with TrackedButton (simple approach)
sed -i 's/<button\([^>]*\)onClick={\([^}]*\)}\([^>]*\)>/<TrackedButton\1onClick={\2}\3trackingName="slide_button" trackingContext={{ slideNumber: '"$SLIDE_NUMBER"' }}>/g' "$SLIDE_FILE"
sed -i 's/<\/button>/<\/TrackedButton>/g' "$SLIDE_FILE"

print_status "✨ Adding useState for timing..."

# Add useState for start time (if not already present)
if ! grep -q "useState.*Date.now" "$SLIDE_FILE"; then
    # Add useState import if not present
    if ! grep -q "useState" "$SLIDE_FILE"; then
        sed -i 's/import React/import React, { useState }/' "$SLIDE_FILE"
    fi
    
    # Add startTime state after component declaration
    sed -i '/export.*=.*{/a\
  const [startTime] = useState(Date.now());' "$SLIDE_FILE"
fi

print_status "📊 Adding tracking hooks..."

# Add useEffect for slide tracking (simple approach)
if ! grep -q "useEffect.*trackSlideEntry" "$SLIDE_FILE"; then
    # Add useEffect import if not present
    if ! grep -q "useEffect" "$SLIDE_FILE"; then
        sed -i 's/useState/useState, useEffect/' "$SLIDE_FILE"
    fi
    
    # Add useEffect after startTime
    sed -i '/const \[startTime\]/a\
\
  useEffect(() => {\
    trackSlideEntry('"$SLIDE_NUMBER"', "'"$SLIDE_NAME"'");\
    \
    return () => {\
      const timeSpent = Date.now() - startTime;\
      trackSlideExit('"$SLIDE_NUMBER"', "'"$SLIDE_NAME"'", timeSpent);\
      trackTimeSpent("slide_'"$SLIDE_NUMBER"'", timeSpent, "interactive");\
    };\
  }, [startTime]);' "$SLIDE_FILE"
fi

# Clean up temporary file
rm -f "$TEMP_FILE"

print_success "🎉 Tracking successfully added to $SLIDE_FILE!"

echo ""
echo "📋 What was added:"
echo "   ✅ SlideTracker wrapper component"
echo "   ✅ Tracking imports"
echo "   ✅ Slide entry/exit tracking"
echo "   ✅ Time spent tracking"
echo "   ✅ Enhanced button tracking"
echo "   ✅ State management for timing"
echo ""

print_status "🔍 Validating the changes..."

# Basic validation
if grep -q "SlideTracker" "$SLIDE_FILE" && grep -q "trackSlideEntry" "$SLIDE_FILE"; then
    print_success "✅ Validation passed - tracking components found"
else
    print_error "❌ Validation failed - tracking components not found"
    echo "Restoring backup..."
    cp "$BACKUP_FILE" "$SLIDE_FILE"
    exit 1
fi

echo ""
print_status "💡 Manual steps (optional):"
echo "   1. Review the generated code in $SLIDE_FILE"
echo "   2. Add specific trackButtonClick() calls to important buttons"
echo "   3. Add trackInputChange() to form inputs"
echo "   4. Add trackQuizAnswer() to quiz components"
echo "   5. Test the slide to ensure it works correctly"
echo ""

print_status "🗂️  Backup created: $BACKUP_FILE"
print_success "✨ Ready to track user interactions on slide $SLIDE_NUMBER!"

echo ""
echo "🚀 Quick test command:"
echo "   # Start the app and check browser console for tracking events"
echo "   npm run dev"
echo "" 