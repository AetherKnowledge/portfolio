# Use the official Node.js LTS image as base
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and lock file
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the project
COPY . .

# Build the Next.js project
RUN npm run build

# Production image
FROM node:22-alpine AS runner

WORKDIR /app

# Copy only what we need for production
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.ts ./next.config.ts

# Expose the port your Next.js app runs on
EXPOSE 3000

# Run the app
CMD ["npm", "start"]
