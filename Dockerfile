# ==========================================
# Stage 1: Build the React Application
# ==========================================
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package lock definitions
COPY package*.json ./

# Install dependencies cleanly
RUN npm ci

# Copy full application codebase (obeying .dockerignore)
COPY . .

# Register build-time variables required by Vite
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY

# Set them as environment variables so the build process can access and bake them in
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY

# Run the Vite production build
RUN npm run build

# ==========================================
# Stage 2: Serve using Nginx
# ==========================================
FROM nginx:stable-alpine

# Copy build artifacts to public folder served by Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Modify default Nginx config to listen on port 3050 instead of 80
RUN sed -i 's/listen[[:space:]]\+80;/listen 3050;/g' /etc/nginx/conf.d/default.conf

# Expose port 3050
EXPOSE 3050

# Start Nginx in foreground mode
CMD ["nginx", "-g", "daemon off;"]

