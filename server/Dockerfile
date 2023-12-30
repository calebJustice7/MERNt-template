# FROM node:18-alpine

# WORKDIR /app

# COPY package.json .

# RUN npm install

# COPY . .

# CMD ["npm", "run", "dev"]

# EXPOSE 8000

# syntax=docker/dockerfile:1.4

# Create image based on the official Node image from dockerhub
FROM node:18-alpine AS development

# Create app directory
WORKDIR /usr/src/app

# Copy dependency definitions
COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app

# Install dependecies
#RUN npm set progress=false \
#    && npm config set depth 0 \
#    && npm i install
RUN npm ci

# Get all the code needed to run the app
COPY . /usr/src/app

# Expose the port the app runs in
EXPOSE 4200

# Serve the app
CMD ["npm", "run", "start"]

# FROM development as dev-envs
# CMD [ "npm", "run", "dev" ]