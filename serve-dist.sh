#!/bin/bash
# Farmitra - Serve production build (no npm install required if dist/ exists)
# Run: bash serve-dist.sh

set -e

echo "=========================================="
echo "   🌾 Farmitra - Production Server"
echo "=========================================="

if [ ! -d "dist" ]; then
    echo "📦 Building production bundle..."
    npm install
    npm run build
fi

echo ""
echo "🚀 Serving on http://localhost:8080"
echo "   Press Ctrl+C to stop"
echo ""

node serve-dist.cjs
