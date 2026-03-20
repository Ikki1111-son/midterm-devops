# Phase 2 - Traditional Host Deployment on Ubuntu Server

## 1. Overview
This phase demonstrates the traditional deployment of our web application on a cloud-based Ubuntu server without containerization. The application is deployed using a host-level runtime environment, managed by PM2, and exposed to the public through Nginx with HTTPS enabled via Let's Encrypt.

The deployed system includes:
- Ubuntu cloud server
- Node.js application running with PM2
- MongoDB installed locally on the same Ubuntu server
- Nginx reverse proxy
- Custom domain with DNS configuration
- HTTPS certificate issued by Let's Encrypt

## 2. Deployment Architecture
User Browser  
-> HTTP/HTTPS request  
-> Nginx Reverse Proxy  
-> Node.js Application (PM2)  
-> MongoDB Local Database (`mongod` on Ubuntu server)

## 3. Cloud Server Provisioning
The application was deployed on an Ubuntu cloud server. Required inbound rules were configured to allow:
- SSH (22)
- HTTP (80)
- HTTPS (443)

Evidence:
- `evidence-ec2-instance-running.png`
- `evidence-security-group-inbound.png`

## 4. Runtime Preparation
The runtime environment was prepared using the setup scripts from Phase 1. These scripts installed the required packages and application runtime dependencies.

Evidence:
- `evidence-runtime-setup-script-1.png`
- `evidence-runtime-setup-script-2.png`

## 5. Application Source Deployment
The application source code was pulled from the Git repository to the server and prepared for execution.

Evidence:
- `evidence-git-pull-on-server.png`

## 6. Environment Configuration
The `.env` file was configured with valid application and database settings. The application was set to run on port 3000 and connect to the local MongoDB instance.

Evidence:
- `evidence-env-db-config-masked.png`

## 7. Database Setup
MongoDB was installed locally on the Ubuntu server and used as the database solution for Phase 2. The database service was verified to be active and running. Database inspection using `mongosh` confirmed that the `products_db` database and its product records were available.

Evidence:
- `evidence-mongodb-service-running.png`
- `evidence-mongodb-show-dbs.png`
- `evidence-mongodb-products-data.png`

## 8. Application Deployment with PM2
The Node.js application was started and managed using PM2 to ensure it keeps running in the background and can recover automatically when needed.

Evidence:
- `evidence-pm2-status.png`

## 9. Automatic Restart After Reboot
PM2 was configured to restore and restart the application after a server reboot. After rebooting the server, the application became accessible again through the public domain.

Evidence:
- `evidence-pm2-startup-or-reboot.png`
- `evidence-server-reboot-command.png`
- `evidence-domain-working-after-reboot.png`

## 10. Reverse Proxy Configuration
Nginx was installed and configured as a reverse proxy to forward incoming traffic to the Node.js application running internally on port 3000. The Nginx configuration was tested successfully before activation.

Evidence:
- `evidence-nginx-config.png`
- `evidence-nginx-test.png`

## 11. Domain and DNS Configuration
A custom domain was connected to the cloud server by configuring DNS records. The root domain points to the public IP address of the Ubuntu server.

Evidence:
- `evidence-dns-records-config.png`

## 12. HTTPS Setup and Redirect
HTTPS was enabled using Let's Encrypt / Certbot. The application is accessible securely via `https://devops20.online`. HTTP requests are redirected properly to HTTPS.

Evidence:
- `evidence-certbot-or-certificate.png`
- `evidence-domain-https-response.png`
- `evidence-domain-https-working-browser.png`
- `evidence-http-to-https-curl.png`

## 13. Full System Functionality Verification
The deployed application was tested through the public domain over HTTPS. Product data was successfully displayed from MongoDB, and new product records could be added through the web interface.

Evidence:
- `evidence-domain-https-working-browser.png`
- `evidence-add-product-success.png`
- `evidence-mongodb-products-data.png`

## 14. Key Results
Phase 2 was completed successfully with the following results:
- The application runs correctly on the Ubuntu cloud server
- MongoDB operates locally on the same host
- The application connects to MongoDB through valid `.env` configuration
- PM2 manages the application process successfully
- The application restarts after reboot
- Nginx proxies traffic correctly to the application
- DNS records point the domain to the server
- HTTPS is working correctly
- HTTP requests are redirected to HTTPS
- Product data is stored and retrieved successfully from MongoDB

## 15. Evidence List
- `evidence-ec2-instance-running.png`
- `evidence-security-group-inbound.png`
- `evidence-runtime-setup-script-1.png`
- `evidence-runtime-setup-script-2.png`
- `evidence-git-pull-on-server.png`
- `evidence-env-db-config-masked.png`
- `evidence-pm2-status.png`
- `evidence-pm2-startup-or-reboot.png`
- `evidence-nginx-config.png`
- `evidence-nginx-test.png`
- `evidence-dns-records-config.png`
- `evidence-certbot-or-certificate.png`
- `evidence-domain-https-response.png`
- `evidence-domain-https-working-browser.png`
- `evidence-http-to-https-curl.png`
- `evidence-mongodb-service-running.png`
- `evidence-mongodb-show-dbs.png`
- `evidence-mongodb-products-data.png`
- `evidence-server-reboot-command.png`
- `evidence-domain-working-after-reboot.png`
- `evidence-add-product-success.png`