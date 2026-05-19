# GymFitness-AI Docker Deployment

This guide explains how to deploy, manage, and run migrations on the GymFitness-AI platform using Docker.

---

## Prerequisites
- Docker Installed
- Docker Compose Installed

---

## 1. Quick Start (Spin up everything)

Run the following command in the root directory (where `docker-compose.yml` is located) to build and start the entire stack:

```bash
docker-compose up -d --build
```

This starts:
1. **postgres-db**: Postgres 15 database container.
2. **identity-service**: Identity Management running on port `3000`.
3. **user-service**: User Profile & Calculation Engine running on port `3001`.
4. **tracking-service**: Activity & Nutrition Tracking running on port `3002`.
5. **ai-coach-service**: Real-time AI Trainer running on port `3003`.
6. **admin-service**: Administration API running on port `3005`.
7. **admin-web**: Nginx-hosted Admin Panel accessible on port `8080`.

---

## 2. Running database migrations inside containers

Since we are deploying the services inside Docker containers, we need to push the Prisma schemas to the Postgres databases inside the container network.

Run these command sequences to push the initial DB schema and apply seeding:

### A. Deploy Schema & Run Seeding for Identity Service
```bash
docker-compose exec identity-service npx prisma db push --schema=prisma/schema.prisma
```

### B. Deploy Schema & Run Seeding for User Service
```bash
docker-compose exec user-service npx prisma db push --schema=prisma/schema.prisma
```

### C. Deploy Schema & Run Seeding for Tracking Service
```bash
docker-compose exec tracking-service npx prisma db push --schema=prisma/schema.prisma
```

### D. Deploy Schema & Run Seeding for AI Coach Service
```bash
docker-compose exec ai-coach-service npx prisma db push --schema=prisma/schema.prisma
```

---

## 3. Logs & Verification

### Check logs of all containers:
```bash
docker-compose logs -f
```

### Check logs of a specific service (e.g., ai-coach-service):
```bash
docker-compose logs -f ai-coach-service
```

### Stop all containers:
```bash
docker-compose down
```

### Stop all containers and clean database volume:
```bash
docker-compose down -v
```
