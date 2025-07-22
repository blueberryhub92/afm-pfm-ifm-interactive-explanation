# Build stage
FROM node:18-alpine as build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Add a non-root user
RUN addgroup -g 1001 -S nginx-user
RUN adduser -S frontend -u 1001 -G nginx-user

# Change ownership of nginx directories
RUN chown -R frontend:nginx-user /var/cache/nginx
RUN chown -R frontend:nginx-user /var/log/nginx
RUN chown -R frontend:nginx-user /etc/nginx/conf.d
RUN chown -R frontend:nginx-user /usr/share/nginx/html

# Make nginx run as non-root
RUN sed -i 's/user  nginx;/user  frontend nginx-user;/' /etc/nginx/nginx.conf

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"] 