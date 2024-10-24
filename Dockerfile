# Use the official Node.js image as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the application code to the working directory
COPY . /usr/src/app

# Install dependencies
RUN npm install

# Expose the port that Nginx will listen on
EXPOSE 4000

# Command to start both Node.js
CMD npm run dev
