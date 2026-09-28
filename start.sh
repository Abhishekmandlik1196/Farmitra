#!/bin/bash
# Farmitra - Quick Start Script (Linux / macOS)
# Run this file: bash start.sh

set -e

echo "=========================================="
echo "   🌾 Farmitra - Smart Farming Companion"
echo "=========================================="

if [ ! -d "node_modules" ]; then
    echo ""
    echo "📦 Installing dependencies..."
    npm install
fi

echo ""
echo "🚀 Starting dev server..."
echo "   Open http://localhost:5173 in your browser"
echo "   Press Ctrl+C to stop"
echo ""

npm run dev
