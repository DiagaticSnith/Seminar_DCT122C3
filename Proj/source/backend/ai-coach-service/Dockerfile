FROM node:22-alpine

# Install system dependencies (openssl is needed for Prisma Client to run on alpine)
RUN apk add --no-cache openssl

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Generate Prisma Client
RUN npx prisma generate --schema=prisma/schema.prisma

# Build TypeScript code
RUN npx tsc && cp -r src/generated dist/generated

EXPOSE 3003

CMD ["node", "dist/server.js"]
