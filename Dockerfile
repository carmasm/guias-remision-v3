# Use an official Node runtime as a base image
FROM --platform=linux/arm64/v8 node:21-alpine3.18

# Install the Ionic CLI globally
RUN npm install -g @ionic/cli

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the app files to the working directory
COPY . .

# Build the Ionic app for production
RUN ionic build --prod

# Expose the port the app runs on
EXPOSE 8100

# Define the command to run your Ionic app
CMD ["ionic", "serve", "--host", "0.0.0.0"]
