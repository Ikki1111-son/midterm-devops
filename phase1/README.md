# Phase 1 - Environment Preparation and Automation Script

## 1. Overview
Phase 1 focuses on preparing the deployment environment for the midterm project.  
The main objective of this phase is to automate the initial server setup process on Ubuntu so that later deployment phases can be performed more quickly, consistently, and with fewer manual errors.

This phase does not deploy the full application yet. Instead, it prepares the runtime environment and supporting tools required for subsequent deployment.

## 2. Objectives
The objectives of Phase 1 are:
- Prepare an Ubuntu server for application deployment
- Automate repeated setup steps using shell scripts
- Install the required runtime and supporting packages
- Reduce manual configuration effort for later phases
- Ensure the environment is ready for application deployment in Phase 2

## 3. Scope of Work
In this phase, the environment setup script was created and tested to automate the installation of the core dependencies needed by the project.

The setup process includes:
- Updating the Ubuntu package index
- Installing Git
- Installing Node.js and npm
- Installing Nginx
- Installing PM2
- Preparing the basic deployment environment

Depending on the project structure, additional tools or utilities may also be installed to support deployment tasks.

## 4. Script Location
The setup and automation scripts for this phase are stored in the repository under the `scripts/` directory.

Example:
- `scripts/setup.sh`

These scripts are intended to be reused in later phases, especially during traditional host deployment in Phase 2.

## 5. Purpose of Automation
Manual environment setup can be time-consuming and error-prone.  
By using automation scripts, the same environment can be prepared in a more reliable and repeatable manner.

The benefits of this approach include:
- Faster server preparation
- Consistent installation steps
- Easier troubleshooting
- Better support for repeated deployments
- Improved maintainability of the deployment process

## 6. Output of Phase 1
The main deliverables of Phase 1 are:
- Ubuntu setup script(s)
- Initial environment preparation logic
- Documentation explaining the setup process
- A reusable foundation for later deployment phases

## 7. Relationship to Later Phases
Phase 1 serves as the foundation for the next phases:
- In **Phase 2**, the prepared environment is used for traditional deployment on Ubuntu with PM2, Nginx, DNS, and HTTPS.
- In **Phase 3**, the project moves toward containerized deployment using Docker and Docker Compose.

Therefore, the automation work completed in Phase 1 helps simplify and accelerate later deployment activities.

## 8. Conclusion
Phase 1 was completed by creating and organizing the environment preparation scripts required for the project.  
This phase established a clean and reusable setup process that supports the deployment workflow in the following phases.