# Stage 1: Build
FROM node:18 AS build
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source files and build the app
COPY . .

# Set build-time environment variables
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY
ARG VITE_CLERK_PUBLISHABLE_KEY
ARG VITE_CLERK_SECRET_KEY
ARG VITE_FAL_AI_KEY

ENV VITE_SUPABASE_URL=${VITE_SUPABASE_URL}
ENV VITE_SUPABASE_ANON_KEY=${VITE_SUPABASE_ANON_KEY}
ENV VITE_CLERK_PUBLISHABLE_KEY=${VITE_CLERK_PUBLISHABLE_KEY}
ENV VITE_CLERK_SECRET_KEY=${VITE_CLERK_SECRET_KEY}
ENV VITE_FAL_AI_KEY=${VITE_FAL_AI_KEY}

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
