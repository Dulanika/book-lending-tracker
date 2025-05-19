# Dockerfile for Backend
FROM node:18

# Set working directory
WORKDIR /app

# Copy only dependency-related files first (better caching)
COPY package*.json ./

# Install dependencies (including bcrypt)
RUN npm install

# Copy the rest of the source code
COPY . .

# Expose the backend API port
EXPOSE 5000

# Start the development server
CMD ["npm", "run", "dev"]
