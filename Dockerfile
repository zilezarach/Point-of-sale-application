
# Stage 1: Build the Next.js application
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the application source code
COPY . .

# Build the application
RUN npm run build

# Install only production dependencies
RUN npm ci --omit=dev

# Stage 2: Serve the Next.js application using a minimal image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy the production build and dependencies from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

# Expose the port Next.js runs on
EXPOSE 3000

# Set the command to run the Next.js application
CMD ["npm", "start"]
