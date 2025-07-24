# Deployment Guide

## Quick Start (Production)

1. **Prepare the Server**
```bash
# Install required packages
sudo apt update
sudo apt install -y docker.io docker-compose nginx certbot python3-certbot-nginx

# Start and enable Docker
sudo systemctl start docker
sudo systemctl enable docker
```

2. **Setup Application**
```bash
# Create application directory
mkdir -p /opt/modelingo
cd /opt/modelingo

# Download configuration files
curl -O https://raw.githubusercontent.com/blueberryhub92/afm-pfm-ifm-interactive-explanation/main/docker-compose.yml
curl -O https://raw.githubusercontent.com/blueberryhub92/afm-pfm-ifm-interactive-explanation/main/nginx.prod.conf
```

3. **Configure Nginx**
```bash
# Copy nginx configuration
sudo cp nginx.prod.conf /etc/nginx/sites-available/modelingo
sudo ln -s /etc/nginx/sites-available/modelingo /etc/nginx/sites-enabled/

# Remove default configuration if exists
sudo rm -f /etc/nginx/sites-enabled/default

# Test nginx configuration
sudo nginx -t

# If test is successful, restart nginx
sudo systemctl restart nginx
```

4. **SSL Certificate**
```bash
# Get SSL certificate (replace with your domain)
sudo certbot --nginx -d demo.colaps.team
```

5. **Start Application**
```bash
# Pull and start containers
docker compose pull
docker compose up -d

# Check status
docker compose ps
```

6. **Verify Installation**
- Frontend: https://demo.colaps.team/modelingo
- Backend API: https://demo.colaps.team/modelingo/api
- Health Check: https://demo.colaps.team/modelingo/health

## Testing with Tunnel Services

### Option 1: ngrok
1. **Install ngrok**
```bash
# Download and install ngrok
curl -s https://ngrok-agent.s3.amazonaws.com/ngrok.asc | \
  sudo tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null && \
  echo "deb https://ngrok-agent.s3.amazonaws.com buster main" | \
  sudo tee /etc/apt/sources.list.d/ngrok.list && \
  sudo apt update && sudo apt install ngrok
```

2. **Start Application Locally**
```bash
docker compose up -d
```

3. **Create ngrok Tunnel**
```bash
# Start ngrok (free plan)
ngrok http 8080

# Or with custom subdomain (paid plan)
ngrok http --subdomain=modelingo 8080
```

4. **Update CORS Configuration**
- Add your ngrok URL (e.g., `https://xxxx-xx-xx-xxx-xx.ngrok.io`) to the allowed domains in `backend/server.js`
- Rebuild and restart the containers

### Option 2: localhost.run
1. **Start Application Locally**
```bash
docker compose up -d
```

2. **Create SSH Tunnel**
```bash
# Create tunnel
ssh -R 80:localhost:8080 nokey@localhost.run

# The service will output a URL like: https://xxxx-xx-xx-xxx-xx.localhost.run
```

## Maintenance

### Backup
```bash
# Backup data directory
sudo tar -czf modelingo-data-$(date +%Y%m%d).tar.gz /opt/modelingo/data

# Backup database (if using)
docker compose exec -T backend tar -czf - /app/data > backup-$(date +%Y%m%d).tar.gz
```

### Updates
```bash
# Pull latest images
docker compose pull

# Restart containers
docker compose down
docker compose up -d
```

### Logs
```bash
# View all logs
docker compose logs

# View specific service logs
docker compose logs backend
docker compose logs frontend

# Follow logs
docker compose logs -f
```

### Troubleshooting

1. **Check Container Status**
```bash
docker compose ps
```

2. **Check Container Logs**
```bash
docker compose logs --tail=100
```

3. **Check Nginx Logs**
```bash
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

4. **Test Nginx Configuration**
```bash
sudo nginx -t
```

5. **Check SSL Certificate**
```bash
sudo certbot certificates
```

6. **Common Issues**

- **404 Not Found**: Check nginx configuration and container status
- **502 Bad Gateway**: Check if backend container is running
- **CORS Errors**: Check allowed origins in backend configuration
- **SSL Issues**: Check certificate status and renewal

## Security Considerations

1. **Firewall**
```bash
# Allow only necessary ports
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

2. **Regular Updates**
```bash
# Update system
sudo apt update
sudo apt upgrade

# Update Docker images
docker compose pull
```

3. **SSL/TLS**
- Ensure automatic certificate renewal is working
- Check SSL configuration regularly
```bash
# Test certificate auto-renewal
sudo certbot renew --dry-run
```

4. **Monitoring**
- Set up basic monitoring for container health
- Monitor disk space and system resources
```bash
# Check disk space
df -h

# Check container resources
docker stats
``` 