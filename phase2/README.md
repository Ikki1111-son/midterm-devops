# Phase 2 – Traditional Deployment on Ubuntu Cloud Server

## 1. Objective
This phase focuses on deploying the application on a cloud-based Ubuntu server without using containerization technologies. The objective is to demonstrate the ability to configure a production-like environment, deploy a full-stack application, and expose it securely through a domain and HTTPS.

## 2. Deployment Environment
The application was deployed on an Ubuntu-based AWS EC2 instance. The server acts as the hosting environment for this phase.

The following ports were configured in the AWS Security Group:
- Port 22 (SSH) – for remote access
- Port 80 (HTTP) – for web traffic
- Port 443 (HTTPS) – for secure communication

## 3. Runtime Setup
The server environment was prepared using the setup process from Phase 1.

The following software components were installed:
- Node.js and npm
- MongoDB
- Nginx
- PM2 (process manager)

The application source code was cloned from GitHub and installed using:

```bash
npm install
```

## 4. Application Overview
The application is a Node.js-based web system that includes:
- A web interface for displaying product data
- A MongoDB database for storing product information
- A file upload feature handled through backend logic

The application was tested locally before being deployed to the cloud server.

## 5. Environment Variables
The application uses environment variables to manage configuration.

File: `phase2/env/.env.example`

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/products_db
```

## 6. Database Configuration
MongoDB is used as the primary database and is hosted locally on the Ubuntu server.

The application connects to the database:

`products_db`

Data is stored in collections (for example, `products`) and is retrieved dynamically by the backend.

Database functionality was verified using:
- MongoDB service status
- Mongo shell (`mongosh`)
- Application logs

## 7. Running the Application
The application was started using:

```bash
node main.js
```

The server successfully:
- created required directories
- connected to MongoDB
- started listening on port 3000

## 8. Process Management (PM2)
To ensure the application runs continuously and restarts automatically after reboot, PM2 was used.

Commands:

```bash
pm2 start main.js
pm2 save
pm2 startup
```

This ensures:
- background execution
- auto-restart on failure
- persistence after system reboot

## 9. Reverse Proxy (Nginx)
Nginx was configured as a reverse proxy to route traffic from port 80/443 to the Node.js application running on port 3000.

Configuration file:

`phase2/nginx/myapp.conf`

Nginx allows users to access the application via the domain instead of using a port number.

## 10. Domain Configuration
A custom domain was registered:

`devops20.online`

DNS records were configured as follows:
- An A record points the main domain to the AWS server IP
- A CNAME record points `www` to the main domain

This allows public access through a readable domain name.

## 11. HTTPS Setup
HTTPS was enabled using Let's Encrypt and Certbot.

Command used:

```bash
sudo certbot --nginx -d devops20.online -d www.devops20.online
```

The system was configured to:
- automatically generate SSL certificates
- redirect HTTP traffic to HTTPS

Final access URL:

`https://devops20.online`

## 12. Functional Verification
The deployed system was tested and verified through the following checks:
- the application is accessible via the domain
- HTTPS is enabled and secure
- the database connection works correctly
- data is displayed properly on the user interface
- file upload functions correctly
- the application persists after reboot

## 13. Evidence
All supporting screenshots and logs are stored in:

`phase2/docs/`

Evidence includes:
- AWS Security Group configuration
- SSH access to the server
- MongoDB status
- PM2 process list
- Nginx status
- DNS configuration
- HTTPS certificate setup
- application running via domain
- reboot persistence test

## 14. Repository Structure

```text
phase2/
├── README.md
├── nginx/
│   └── myapp.conf
├── env/
│   └── .env.example
└── docs/
```

## 15. Conclusion
The application was successfully deployed on a cloud-based Ubuntu server using a traditional deployment approach. The system includes a fully functional backend, database integration, file upload capability, reverse proxy configuration, domain mapping, and HTTPS security.

This phase demonstrates a complete production-like deployment workflow and provides a strong foundation for containerization in Phase 3.
