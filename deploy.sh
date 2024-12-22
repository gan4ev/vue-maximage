#!/bin/bash

# Replace these variables with your server details
SERVER_USER="your-username"
SERVER_IP="your-server-ip"
SERVER_PATH="/var/www/html"  # Replace with your web root directory

# Compress the dist directory
echo "Compressing dist directory..."
tar -czf dist.tar.gz dist/

# Upload to server
echo "Uploading to server..."
scp dist.tar.gz $SERVER_USER@$SERVER_IP:~/ || { echo "Upload failed"; exit 1; }
scp nginx.conf $SERVER_USER@$SERVER_IP:~/ || { echo "Nginx config upload failed"; exit 1; }

# Execute commands on server
ssh $SERVER_USER@$SERVER_IP << 'EOF'
    # Backup existing files
    sudo mv /var/www/html /var/www/html_backup || true
    
    # Create new directory
    sudo mkdir -p /var/www/html
    
    # Extract files
    sudo tar -xzf dist.tar.gz -C /var/www/html --strip-components=1
    
    # Set permissions
    sudo chown -R www-data:www-data /var/www/html
    
    # Move nginx config
    sudo mv nginx.conf /etc/nginx/sites-available/maximage
    sudo ln -sf /etc/nginx/sites-available/maximage /etc/nginx/sites-enabled/
    
    # Test and reload nginx
    sudo nginx -t && sudo systemctl reload nginx
    
    # Cleanup
    rm dist.tar.gz
EOF

echo "Deployment complete!"
