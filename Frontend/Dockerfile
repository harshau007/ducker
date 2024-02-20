# Use a smaller base image such as Alpine Linux
FROM node:alpine AS build

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

EXPOSE 5173

# Build the application
CMD ["npm", "run", "dev"]