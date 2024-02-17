# Use a smaller base image such as Alpine Linux
FROM node:alpine AS build

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Use a lightweight web server such as Nginx
FROM nginx:alpine

# Copy the built app from the build stage to the nginx web root directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx to serve the built app
CMD ["nginx", "-g", "daemon off;"]