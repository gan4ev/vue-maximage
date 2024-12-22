# Stage 1: Build
FROM node:18 AS build
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Create .env file with build arguments
RUN echo "VITE_SUPABASE_URL=https://amrzaswumuizsnbybjdj.supabase.co" > .env && \
    echo "VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtcnphc3d1bXVpenNuYnliamRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ2NTk5NjIsImV4cCI6MjA1MDIzNTk2Mn0.nDEIP-PNTEZ4nvcjs5inZMb1kW_tj5C57kJ5ySgLJv8" >> .env && \
    echo "VITE_CLERK_PUBLISHABLE_KEY=pk_test_ZW5nYWdpbmctc2xvdGgtNzIuY2xlcmsuYWNjb3VudHMuZGV2JA" >> .env && \
    echo "VITE_CLERK_SECRET_KEY=sk_test_siKKjvgAvvH68x9RejWnNjOwgUgzhiyCGl5OwTiyL1" >> .env && \
    echo "VITE_FAL_AI_KEY=c0991d00-3d5a-4a93-b6df-14cfe6675950:39b9dbe51b3d5a0fc57578e6b31529a0" >> .env

# Build the app
RUN npm run build

# Stage 2: Serve with NGINX
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the NGINX configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port NGINX will use
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
