# Phase 3 - Containerized Deployment with Docker and Docker Compose

## 1. Overview
Phase 3 focuses on containerizing the application and deploying it with Docker and Docker Compose.  
In this phase, both the web application and the database are run as containers, with persistent volumes configured to preserve uploaded files and database data across restarts and reboots.

The deployed system includes:
- Docker Engine
- Docker Compose
- A containerized Node.js web application
- A containerized MongoDB database
- Persistent Docker volumes
- Nginx reverse proxy on the host machine
- Custom domain with HTTPS enabled

## 2. Objectives
The objectives of Phase 3 are:
- Containerize the web application using a Dockerfile
- Push the application image to Docker Hub
- Deploy the application stack with Docker Compose
- Run MongoDB as a separate container
- Persist database files and uploads using Docker volumes
- Ensure containers recover after restart and reboot
- Keep the system accessible through the domain over HTTPS

## 3. Architecture
User Browser  
-> HTTP/HTTPS request  
-> Nginx on Ubuntu host  
-> Web container (`devops_web`)  
-> MongoDB container (`devops_mongodb`)  
-> Docker volumes (`mongo_data`, `uploads_data`)

## 4. Docker Installation and Verification
Docker Engine and Docker Compose were installed and verified successfully on the Ubuntu server. The Docker service was confirmed to be active and running.

Evidence:
- `evidence-docker-service-running.png`
- `evidence-docker-and-compose-version.png`

## 5. Web Application Containerization
The Node.js application was containerized using a custom Dockerfile.  
The Dockerfile defines:
- Node.js base image
- Working directory
- Package installation
- Application source copy
- Upload directory creation
- Exposed port 3000
- Start command for the application

Evidence:
- `evidence-dockerfile-web.png`

## 6. Image Build and Registry Push
The web application image was built locally and pushed to Docker Hub for deployment reuse.

Docker image:
- `legiang2090/devops-midterm-web:latest`

Evidence:
- `evidence-docker-build-web.png`
- `evidence-docker-push-web.png`
- `evidence-docker-pull-web.png`
- `evidence-dockerhub-image.png`
- `evidence-docker-local-image.png`
- `evidence-docker-images-list.png`

## 7. Environment Configuration
The application environment variables were configured to support containerized communication.  
In Phase 3, the MongoDB connection string was updated to use the Docker Compose service name instead of `localhost`.

Example:
- `MONGO_URI=mongodb://mongodb:27017/products_db`

Evidence:
- `evidence-phase3-env-db-config.png`

## 8. Docker Compose Deployment
The application stack was defined in `docker-compose.yml` with two services:
- `web`
- `mongodb`

The Compose configuration includes:
- image reference for the web application
- MongoDB official image
- restart policy
- dependency declaration
- port mapping
- named volumes for data persistence

Evidence:
- `evidence-docker-compose-services.png`
- `evidence-docker-compose-up.png`
- `evidence-docker-compose-ps.png`
- `evidence-docker-ps.png`

## 9. Persistent Volumes
Persistent Docker volumes were configured to preserve:
- MongoDB data
- Uploaded files from the web application

The named volumes used are:
- `mongo_data`
- `uploads_data`

Evidence:
- `evidence-docker-volume-list.png`

## 10. MongoDB Container Verification
MongoDB was verified to be running inside its own container.  
Database inspection confirmed that:
- the `products_db` database exists
- the `products` collection exists
- application records are stored correctly inside the containerized database

Evidence:
- `evidence-containerized-mongodb-shell.png`
- `evidence-containerized-mongodb-show-dbs.png`
- `evidence-phase3-mongodb-products-data.png`

## 11. Domain, Reverse Proxy, and HTTPS
The application remained accessible through the custom domain using Nginx as a reverse proxy on the host server. HTTPS was preserved, and HTTP traffic was redirected properly to HTTPS.

Evidence:
- `evidence-phase3-domain-https-working-browser.png`
- `evidence-http-to-https-curl.png`

## 12. Functional Verification
The deployed web application was tested through the public domain.  
A new product was added successfully through the UI, and the inserted record was verified directly inside MongoDB.

This confirms:
- the web container communicates correctly with the MongoDB container
- the application can write data successfully
- the stored data is visible both in the UI and in the database

Evidence:
- `evidence-phase3-add-product-success.png`
- `evidence-phase3-added-product-in-mongodb.png`

## 13. Restart and Recovery Verification
The Docker Compose stack was restarted successfully, and both containers returned to the running state. This demonstrates service recovery during container restarts.

Evidence:
- `evidence-phase3-compose-restart.png`

## 14. Reboot Verification
The Ubuntu server was rebooted to verify whether the containers would automatically recover.  
After reboot:
- both `devops_web` and `devops_mongodb` were running again
- the application remained accessible through the public domain

Evidence:
- `evidence-server-reboot-command-phase3.png`
- `evidence-docker-ps-after-reboot.png`
- `evidence-phase3-domain-working-after-reboot.png`

## 15. Key Results
Phase 3 was completed successfully with the following outcomes:
- the web application was containerized
- the image was built and pushed to Docker Hub
- Docker Compose deployed both application and database containers
- MongoDB ran successfully as a container
- persistent volumes were configured
- the application communicated correctly with MongoDB using service-based networking
- HTTPS access continued to work through the public domain
- HTTP requests were redirected to HTTPS
- containers recovered after Compose restart
- containers restarted successfully after server reboot

## 16. Conclusion
Phase 3 successfully transformed the traditional deployment from Phase 2 into a containerized deployment model using Docker and Docker Compose.  
This phase improved portability, deployment consistency, and service recovery while maintaining persistent data and public HTTPS accessibility.

## 17. Evidence List
- `evidence-docker-service-running.png`
- `evidence-docker-and-compose-version.png`
- `evidence-dockerfile-web.png`
- `evidence-docker-build-web.png`
- `evidence-docker-push-web.png`
- `evidence-dockerhub-image.png`
- `evidence-docker-local-image.png`
- `evidence-docker-images-list.png`
- `evidence-phase3-env-db-config.png`
- `evidence-docker-compose-services.png`
- `evidence-docker-compose-up.png`
- `evidence-docker-compose-ps.png`
- `evidence-docker-ps.png`
- `evidence-docker-volume-list.png`
- `evidence-containerized-mongodb-shell.png`
- `evidence-containerized-mongodb-show-dbs.png`
- `evidence-phase3-mongodb-products-data.png`
- `evidence-phase3-domain-https-working-browser.png`
- `evidence-http-to-https-curl.png`
- `evidence-phase3-add-product-success.png`
- `evidence-phase3-added-product-in-mongodb.png`
- `evidence-phase3-compose-restart.png`
- `evidence-server-reboot-command-phase3.png`
- `evidence-docker-ps-after-reboot.png`
- `evidence-phase3-domain-working-after-reboot.png`
- `evidence-docker-pull-web.png`