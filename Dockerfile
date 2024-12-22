# Build stage
FROM node:20 AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Build the project
RUN npm run build

# Production stage
FROM nginx:alpine

# Create required directories
RUN mkdir -p /var/cache/nginx /var/run /var/log/nginx /tmp

# Set working directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files from dist directory
COPY --from=builder /app/dist/ .

# Set proper permissions
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d && \
    chown -R nginx:nginx /var/run && \
    chown -R nginx:nginx /tmp

# Switch to non-root user
USER nginx

# Expose port 3000
EXPOSE 3000

# Start nginx with custom pid path
CMD ["nginx", "-g", "daemon off; pid /tmp/nginx.pid;"]
