# Dockerfile for Frontend
FROM node:18

# Set working directory
WORKDIR /app

# Copy only dependency files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Expose Vite's default dev port
EXPOSE 5173

# Start Vite dev server
CMD ["npm", "run", "dev"]
