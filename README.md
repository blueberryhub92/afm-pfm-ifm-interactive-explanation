# Modelingo

## Quick Start

1. Create a new directory and navigate into it:
```bash
mkdir modelingo && cd modelingo
```

2. Download the docker-compose.yml:
```bash
curl -O https://raw.githubusercontent.com/blueberryhub92/afm-pfm-ifm-interactive-explanation/main/docker-compose.yml
```

3. Start the application:
```bash
docker compose up -d
```

4. Access the application:
- Frontend: http://localhost:8080
- Backend API: http://localhost:3001

## Data Storage
The application stores data in two local directories:
- `./data`: Application data
- `./backups`: Automatic backups



# For users deploying the system on their server:

a) You need the Nginx configuration:
```bash
# Copy Nginx configuration
sudo cp nginx.prod.conf /etc/nginx/sites-available/modelingo
sudo ln -s /etc/nginx/sites-available/modelingo /etc/nginx/sites-enabled/

# Set up SSL certificates (with Let's Encrypt)
sudo certbot --nginx -d demo.colaps.team

# Restart Nginx
sudo systemctl restart nginx
```

b) Start the Docker containers:
```bash
docker compose up -d
```

The application will then be accessible at https://demo.colaps.team/modelingo, with:
- Frontend: https://demo.colaps.team/modelingo
- Backend API: https://demo.colaps.team/modelingo/api
- Health Check: https://demo.colaps.team/modelingo/health
