# Use the official Node.js image as the base image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy the backend source code to the container
COPY backend/ ./backend/

# Set the working directory to the backend folder
WORKDIR /app/backend

# Expose port 3000 for the backend
EXPOSE 3000

# Start the backend server
CMD ["npm", "start"]

# Open a new terminal stage for the frontend

# Create a new stage
FROM node:14-alpine as frontend

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY frontend/package*.json ./frontend/

# Install frontend dependencies
RUN cd frontend && npm install

# Copy the frontend source code to the container
COPY frontend/ ./frontend/

# Set the working directory to the frontend folder
WORKDIR /app/frontend

# Expose port 4200 for the frontend
EXPOSE 4200

# Build the Angular app
RUN npm run build

# Start the Angular development server
CMD ["npm", "start"]