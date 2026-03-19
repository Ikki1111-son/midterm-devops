# Phase 1

## Objective
Phase 1 focuses on repository organization, Git workflow, branch protection, automation setup, and CI preparation before deployment.

## Completed Work

### 1. Repository Hygiene
The repository was organized into clear top-level directories for application code, phase deliverables, scripts, and documentation. Supporting files such as `README.md` and `.gitignore` were also prepared.

**Evidence**
- `docs/phase1/evidence-repo-structure.png`
- `docs/phase1/evidence-readme-1.png`
- `docs/phase1/evidence-readme-2.png`
- `docs/phase1/evidence-gitignore.png`

### 2. Automation Script
An Ubuntu setup script was created in `scripts/setup.sh` to prepare the runtime environment. The script updates package indexes, installs required packages, installs Node.js and PM2, creates required directories, and installs application dependencies.

**Evidence**
- `docs/phase1/evidence-setup-script.png`

### 3. Git Workflow
The team followed a feature-branch workflow. Changes were developed in feature branches and merged into `main` through pull requests.

**Evidence**
- `docs/phase1/evidence-branches.png`
- `docs/phase1/evidence-pr-list.png`
- `docs/phase1/evidence-pr-detail-phase1.png`

### 4. Branch Protection
Branch protection rules were enabled on `main` to require pull requests, approvals, and passing status checks before merging.

**Evidence**
- `docs/phase1/evidence-branch-protection.png`

### 5. Commit History and CI
The repository includes commit history and GitHub Actions workflow runs showing CI checks executed as part of the development workflow.

**Evidence**
- `docs/phase1/evidence-commits-1.png`
- `docs/phase1/evidence-commits-2.png`
- `docs/phase1/evidence-actions-1.png`
- `docs/phase1/evidence-actions-2.png`

## Result
Phase 1 was completed with a clean repository structure, protected main branch, pull-request-based collaboration process, automation script for Ubuntu environment preparation, and CI workflow integration. These steps established the foundation for deployment work in the next phases.