# Phase 3 – Docker Installation and Deployment with Docker Compose

## 1. Objective
This phase focuses on migrating the application from the traditional host-based deployment model to a fully containerized deployment using Docker and Docker Compose. The objective is to demonstrate the ability to package the application into a reusable image, deploy both the web application and database as containers, and preserve the same public-facing behavior through the existing domain and HTTPS configuration.

## 2. Deployment Environment
The application was deployed on the same Ubuntu-based AWS EC2 instance used in Phase 2. In this phase, the server continued to host the reverse proxy and domain configuration, while the application runtime and database services were moved into Docker containers.

The following ports remained relevant in the AWS Security Group:
- Port 22 (SSH) – for remote server administration
- Port 80 (HTTP) – for web traffic
- Port 443 (HTTPS) – for secure web traffic

## 3. Docker and Docker Compose Installation
Docker Engine and Docker Compose were installed on the Ubuntu server to support the containerized deployment workflow.

The installation was verified using the following commands:

```bash
docker --version
docker compose version
```

Docker was also configured to start automatically on system boot so that the containerized services could recover after server restart.

## 4. Application Containerization
The web application was containerized using a dedicated Dockerfile stored in the `phase3/` directory. The image was built from the application source code and configured to run the Node.js server using `main.js`.

The Dockerfile:
- sets the working directory,
- copies package metadata,
- installs dependencies,
- copies the application source code,
- creates the upload directory,
- exposes port 3000,
- and starts the application process.

This ensures that the application can run consistently in an isolated environment independent of the host system configuration.

## 5. Image Build and Registry Publishing
After containerizing the application, the image was built locally and published to Docker Hub so that the server could pull the image directly during deployment.

Example image name:

`legiang2090/devops-midterm-web:latest`

This approach follows a real DevOps workflow in which the build stage and deployment stage are separated. Instead of building the application directly on the server, the server retrieves the published image from the registry.

## 6. Docker Compose Architecture
The application stack was orchestrated using Docker Compose. The compose configuration defines two main services:
- `web` – the containerized Node.js application
- `mongodb` – the MongoDB database container

The compose file also defines:
- persistent volumes for database storage and uploaded files,
- restart policies for service reliability,
- internal service communication through service names,
- and environment variable configuration through a `.env` file.

This architecture allows the application and database to run together in a reproducible and portable way.

## 7. Environment Variables
The containerized application uses environment variables to connect to the database service inside Docker.

File: `phase3/.env.example`

```env
PORT=3000
MONGO_URI=mongodb://mongodb:27017/products_db
```

In Phase 3, the database host is no longer `localhost`. Instead, the web container connects to MongoDB through the Docker Compose service name `mongodb`.

## 8. Database Containerization
MongoDB was no longer hosted directly on the Ubuntu server as in Phase 2. Instead, it was deployed as a container using the official MongoDB image.

The database used in the system remains:

`products_db`

The database service was configured through Docker Compose and connected internally to the web container. This confirms that both the application and its database are fully containerized in this phase.

## 9. Persistent Storage
To preserve important data across container restarts and server reboots, persistent Docker volumes were configured for:
- MongoDB database files
- uploaded files stored in `public/uploads`

This ensured that:
- product data remained available after restarting the MongoDB container,
- uploaded files remained accessible after restarting the web container,
- and the application behaved consistently even after the entire compose stack was restarted.

## 10. Transition from Phase 2 to Phase 3
Before starting the containerized deployment, the services from Phase 2 were stopped:
- the Node.js application previously managed by PM2,
- and the MongoDB service previously installed on the host.

This avoided runtime conflicts and ensured that the application and database in Phase 3 were running exclusively through Docker containers.

## 11. Reverse Proxy Integration
The Nginx reverse proxy configured in Phase 2 was retained in Phase 3. Instead of forwarding traffic to a host-based Node.js process, Nginx continued routing requests to port 3000, which was now mapped to the containerized web application.

The reverse proxy itself remained managed through the host-level Nginx configuration, while Docker Compose handled the application services.

This preserved the public-facing access path through:

`https://devops20.online`

## 12. HTTPS and Domain Continuity
The previously configured domain and HTTPS certificate remained active in Phase 3. Because the reverse proxy stayed on the host system, users continued accessing the application through the same secure URL:

`https://devops20.online`

From the user’s perspective, the migration from host-based deployment to containerized deployment did not change the external behavior of the system.

## 13. Functional Verification
The containerized deployment was tested and verified through the following checks:
- the Docker containers start successfully
- the application is reachable through the public domain
- HTTPS remains active and valid
- the application connects successfully to the MongoDB container
- product data is displayed correctly on the user interface
- file upload functionality continues to work
- data persists after container restart
- the system recovers correctly after server reboot

These checks confirm that the application behaves correctly in its containerized form.

## 14. Service Reliability and Restart Behavior
The Docker Compose services were configured with restart policies to ensure operational continuity. Docker was also enabled to start automatically on boot.

As a result:
- the web and database containers restart automatically if they stop unexpectedly
- the complete application stack recovers after server reboot
- the deployed application remains accessible without manual reconfiguration

This behavior demonstrates an important operational improvement over a manual deployment process.

## 15. Repository Structure

```text
phase3/
├── README.md
├── Dockerfile
├── docker-compose.yml
└── .env.example
```

## 16. Conclusion
The application was successfully migrated from a traditional host-based deployment model to a fully containerized architecture using Docker and Docker Compose. Both the web application and the MongoDB database now run in isolated containers, while Nginx continues to provide reverse proxy and HTTPS support at the host level.

This phase demonstrates improved portability, reproducibility, and maintainability compared with the Phase 2 deployment, and reflects a more modern DevOps-oriented deployment workflow.
