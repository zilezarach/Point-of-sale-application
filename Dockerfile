

# Stage 1: Build the application
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

COPY . .

# Install dependencies
RUN npm install

# Build the application
RUN npm run build

# Install only production dependencies
EXPOSE 3000
# Command to run the Next.js application
CMD ["npm", "start"]
