# Use the official Node.js image as the base image
FROM node:21.6.1

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to container
COPY package*.json ./

# Install dependencies
RUN npm install && npm install -g nodemon

# Copy the rest of the application code
COPY . .

# ENV PORT=3000

# Expose port 3000
EXPOSE 3000

# Command to run your application
CMD npm run dev