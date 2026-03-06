#!/usr/bin/env bash
set -e

log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"; }

log "=== Phase 1 automation: setup Ubuntu runtime & app deps ==="

log "1) Update apt"
sudo apt-get update -y

log "2) Install OS packages"
sudo apt-get install -y git curl ca-certificates gnupg build-essential

log "3) Install Node.js 18 (NodeSource)"
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

log "4) Install PM2 (used in deployment phase)"
sudo npm i -g pm2

log "5) Create necessary directories (logs/uploads)"
mkdir -p app/logs
mkdir -p app/uploads
mkdir -p app/public/uploads

log "6) Install app dependencies"
cd app
npm install

log "DONE. On server: copy app/.env.example -> app/.env then start the app."