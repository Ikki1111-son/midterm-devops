#!/bin/bash

echo "Starting server setup..."

echo "Updating system..."
sudo apt update -y

echo "Installing Node.js and npm..."
sudo apt install -y nodejs npm

echo "Checking Node version..."
node -v
npm -v

echo "Moving to application folder..."
cd ../app

echo "Installing project dependencies..."
npm install

echo "Creating required directories..."
mkdir -p logs
mkdir -p uploads

echo "Setup completed successfully!"
echo "Run the app using: npm start"
