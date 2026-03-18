# Midterm DevOps Project

## Overview
This repository contains a Node.js (Express) product CRUD application with a simple UI. The project is structured into phases (phase1/phase2/phase3) to demonstrate DevOps practices including repository hygiene, Git workflow, automation scripts, and CI.

## Architecture
- **Web App**: Node.js + Express (MVC-style structure)
- **Database**: MongoDB (uses connection string from environment variables)
- **Static/UI**: Server-rendered pages with static assets under `app/public`
- **Uploads/Generated files**: Stored under upload directories excluded by `.gitignore`

## Folder Structure
- `app/` - Application source code
- `phase1/` - Phase 1 notes
- `phase2/` - Phase 2 deliverables
- `phase3/` - Phase 3 deliverables
- `scripts/` - Automation scripts for Ubuntu setup
- `docs/` - Screenshots and evidence required by the checklist

## Requirements
- Node.js 18+
- npm
- MongoDB Atlas or local MongoDB

## Environment Variables
Create `app/.env` from `app/.env.example`:
- `PORT=3000`
- `MONGO_URI=...`

## Automation Script
The Ubuntu setup script is stored in `scripts/setup.sh`.

Its responsibilities include:
- updating package indexes
- installing required OS packages
- installing Node.js runtime
- installing PM2
- creating required runtime directories
- installing application dependencies

## Git Workflow
This repository follows a feature-branch workflow:
- all changes are developed in feature branches
- changes are merged into `main` through pull requests
- branch protection rules are enabled for `main`
- pull request approvals and CI checks are required before merging

## Deployment Notes
- **Phase 2** deploys the application to an Ubuntu cloud server
- the deployed application is exposed through a domain name with HTTPS
- a reverse proxy is used to forward requests to the Node.js application
- **Phase 3** containerizes the application using Docker and Docker Compose

## Evidence
Screenshots and supporting evidence for each phase are stored under the `docs/` directory:
- `docs/phase1/`
- `docs/phase2/`
- `docs/phase3/`

## Run Locally
```bash
cd app
npm install
npm start
# open http://localhost:3000

