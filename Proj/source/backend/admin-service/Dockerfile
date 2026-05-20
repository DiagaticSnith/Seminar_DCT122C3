FROM node:22-alpine

# Install system dependencies (openssl is needed for Prisma Client to run on alpine)
RUN apk add --no-cache openssl

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Generate Prisma Clients for all configured connections
RUN npx prisma generate --config user.config.ts && \
    npx prisma generate --config identity.config.ts && \
    npx prisma generate --config tracking.config.ts

# Build TypeScript code
RUN mkdir -p dist && cp -r src/generated dist/generated && npx tsc

EXPOSE 3005

CMD ["node", "dist/server.js"]
