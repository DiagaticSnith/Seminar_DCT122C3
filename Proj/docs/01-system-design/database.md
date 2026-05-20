# Database Design & Schema Specification

## 1. Core Technologies
- **Database Engine:** PostgreSQL (Version 15+ recommended).
- **ORM:** Prisma Client (TypeScript).
- **Deployment:** Dockerized container using `docker-compose.yml`.

## 2. Data Models & Entities

### 2.1. Identity & Profile (`User` Model)
- Stores authentication data (Email, Password Hash).
- Manages biological metrics: `currentWeight`, `height`, `gender`, and `dateOfBirth`.
- Tracks computed caloric targets: `targetCalories`, `targetProtein`, `targetCarbs`, and `targetFat`.

### 2.2. Tracking System (`DailyLog` & `FoodLog`)
- **DailyLog:** Acts as the central hub for a user's daily progress.
- **Polymorphic Fields:** `aiGeneratedRoutine` and `aiGeneratedMealPlan` use JSONB format to store dynamic AI outputs (e.g., Sets/Reps for Gym vs. Duration for Yoga).
- **Aggregation:** Automatically sums up `caloriesConsumed` and macros from associated `FoodLog` entries.

### 2.3. Master Data (`FoodDictionary` & `ExerciseDictionary`)
- **FoodDictionary:** Admin-verified reference for macros per 100g.
- **ExerciseDictionary:** Stores exercise names, muscle group tags, and YouTube tutorial links.

### 2.4. AI Management (`SystemPrompt` & `AiActivityLog`)
- **SystemPrompt:** Allows admins to tune LLM behavior per Workout Style (Gym vs. Yoga) without changing code.
- **AiActivityLog:** Critical for "Denial of Wallet" prevention; tracks token usage and costs per user.

## 3. Relational Constraints & Integrity
- **OnDelete Cascade:** If a User is deleted, all their `DailyLog` entries are purged.
- **Unique Constraints:** Ensures a user can only have one `DailyLog` per date (`@@unique([userId, date])`).
- **Indexing:** High-performance indexes are placed on `email`, `googleId`, and log `date`.

## 4. Key Developer Constraints (Skills)
- Never bypass the Prisma Client for raw SQL unless explicitly authorized.
- Always use `BigInt` or `Float` where precision is required for calorie math.
- All UUIDs must be generated at the database level using `@default(uuid())`.