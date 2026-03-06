\# Midterm DevOps Project



\## Overview

This repository contains a Node.js (Express) product CRUD application with a simple UI. The project is structured into phases (phase1/phase2/phase3) to demonstrate DevOps practices: repo hygiene, Git workflow, automation scripts, and CI.



\## Architecture

\- \*\*Web App\*\*: Node.js + Express (MVC-style structure)

\- \*\*Database\*\*: MongoDB (uses connection string from environment variables)

\- \*\*Static/UI\*\*: Server-rendered pages + static assets under `app/public`

\- \*\*Uploads/Generated files\*\*: stored under common upload folders (see `.gitignore`)



\## Folder Structure

\- `app/` - Application source code

\- `phase1/` - Phase 1 notes

\- `phase2/` - Phase 2 deliverables

\- `phase3/` - Phase 3 deliverables

\- `scripts/` - Automation scripts (Ubuntu setup)

\- `docs/` - Screenshots/evidence required by the checklist



\## Environment Variables

Create `app/.env` from `app/.env.example`:

\- `PORT=3000`

\- `MONGO\_URI=...`



\## Run Locally

```bash

cd app

npm install

npm start

\# open http://localhost:3000
CI trigger test
