#!/bin/bash

echo "🏗️  Building Full Stack Application..."

# Build Frontend
echo "📦 Building Frontend..."
cd frontend
npm install
npm run build
cd ..

# Build Backend
echo "🔧 Building Backend..."
cd backend
npm install
npx prisma generate
npm run build
cd ..

echo "✅ Build Complete!"
