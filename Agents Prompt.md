We are starting the `GymFitness-AI` project from scratch. Before writing any code, you MUST establish your context:
1. Read `GEMINI.md` deeply. You must strictly follow the 4 core Karpathy's coding principles (Think Before Coding, Simplicity First, Surgical Changes, Goal-Driven Execution).
2. Read `docs/01-system-design/architecture.md` and `requirements.md` to understand the domain and Microservices Architecture.
3. Read all files inside `skills/`. Note: The internal codebase of each Node.js microservice must strictly follow the 3-Layer Architecture (Routes, Controllers, Services).
4. CRITICAL SECURITY BOUNDARY: You are explicitly forbidden from hardcoding any API keys or database strings. Everything must be securely loaded via `.env` and excluded via `.gitignore` to prevent billing leaks.
Reply with 'CONTEXT ASSIMILATED' and briefly summarize the 4 Karpathy goals. Do not generate code yet.

---------

Execute Backend Phase 01: Auth (Identity Microservice).
1. Setup an isolated Express.js server on Port 3001, initialize the Prisma schema for the `User` model, and implement the Auth endpoints (Register and Login).
2. CRITICAL ARCHITECTURE: Strictly follow the 3-Layer Architecture (Routes, Controllers, Services) as defined in `docs/skills/backend.md`. Do NOT write business logic in the router files.
3. SECURITY: Use `bcrypt` for password hashing and `jsonwebtoken` for JWT generation. Create an `authMiddleware` to verify tokens for protected routes.
4. Write Jest unit tests to verify endpoints (e.g., successful login returns a JWT). Fix errors until tests pass (Green), update `docs/PROGRESS.md` and stop.

------

Execute Frontend Phase 01: Auth & Global App Shell.
1. CRITICAL FIRST STEP: Open and deeply analyze the UI mockup image `docs/ui-mockups`. Understand the premium Dark Mode layout and Neon Green accents.
2. Implement Auth screens (Login & Registration) in Flutter. Create an `AuthProvider` using the `provider` package and connect to the Identity API running at `http://localhost:3001/api/auth/`.
3. GLOBAL APP SHELL: Upon successful login, navigate to a `MainLayoutScreen`. Implement a `BottomNavigationBar` containing 4 tabs: [Home], [Diet Log], [AI Chat], [Profile].
4. Create 4 placeholder screens for these tabs containing centered text saying "Phase Pending - Coming Soon". Update docs.

-------

Execute Backend Phase 02: Profile & Calculation Engine (User Microservice).
1. Read the plan at `docs/02-backend/phase-02-profile/README.md` and check `US02`, `US03`, `US04` in requirements.
2. Setup an Express.js server on Port 3002. Build endpoints to collect and update user physical metrics (weight, height, age, gender, activity level, workout style, goal).
3. CRITICAL MATH LOGIC: Implement the Mifflin-St Jeor equation directly inside the `services/` layer to calculate BMR and TDEE dynamically when user metrics are saved.
4. Write Jest unit tests (`TC-CALC-01`) to validate the mathematical accuracy against a mock user dataset. Update `docs/PROGRESS.md`.

-------

Execute Frontend Phase 02: Onboarding Flow.
1. Analyze the relevant UI mockup image for the setup screen inside `docs/ui-mockups/`. Note the multi-step form and Neon Green inputs.
2. Implement the Onboarding screens in Flutter. Create a `ProfileProvider` to manage the multi-step form state and input validations.
3. Wire the 'Save' button to make an HTTP POST request to our User Microservice (`http://localhost:3002/api/profile/`). Ensure the state clears caching upon user logout.
4. Show loading spinners during execution and handle API errors via Snackbars. Update progress logs.

-------

Execute Backend Phase 03: Master Data & Daily Tracking (Workout & Tracking Microservice).
1. Read the plan at `docs/02-backend/phase-03-tracking/README.md` and map `US05`, `US06`, `US07`, `US11`, `US12`.
2. Setup an Express.js server on Port 3003. Implement REST APIs for fetching Master Data (Exercises with YouTube links, Nutrition dictionary) and Daily Logging records.
3. CRITICAL DATABASE RULE: When logging food by grams, calculate proportional macros. You MUST use `prisma.$transaction` to safely update the `DailyLog` totals. Raw SQL is strictly banned.
4. Write Jest unit tests (`TC-TRACK-01`) to verify that logging food items correctly multiplies base macros and safely handles database transactions without data races. Update progress.

-------

Execute Frontend Phase 03: Dashboard, Charts, and Adaptive UI.
1. Deeply analyze the Dashboard mockups inside `docs/ui-mockups/`. Open the existing placeholder screens `home_screen.dart` and `diet_screen.dart` created in Phase 1 and replace them.
2. Render Macro Progress Bars displaying real-time consumed values against target goals.
3. ADAPTIVE UI: Ensure the workout list widget is adaptive. Show `Sets/Reps` for Gym users, or a `duration_seconds` countdown timer for Yoga users.
4. ANALYTICS SEPARATION: Create a new independent `AnalyticsScreen` using the `fl_chart` package. Implement two charts: a Line Chart displaying the 30-day weight fluctuation trend, and a Bar Chart displaying daily calorie consumption. Connect to `http://localhost:3003/api/tracking/`. Update progress.

-------

Execute Backend Phase 04: AI Engine & Real-time Chatbot (AI-Coach Microservice).
1. Setup an Express.js server on Port 3004 and initialize `socket.io` for real-time streaming connections.
2. AI INTEGRATION: Integrate the OpenAI SDK. Use `process.env.OPENAI_API_KEY` exclusively. Enable `stream: true` and emit incoming text chunks back to the WebSocket client instantly.
3. DYNAMIC CONTEXT INJECTION: Before invoking OpenAI, fetch the user's latest metrics (TDEE, weight, goal) from the database and securely inject them into the System Prompt template.
4. MEDICAL GUARDRAILS: Implement an interceptor middleware. If a user queries medical diagnoses or drug descriptions, force the system to bypass OpenAI and return a strict `medical_rejection` JSON structure.
5. Write Jest tests (`TC-AI-01`) to guarantee the system blocks medical prompt injections. Update `docs/PROGRESS.md`.

--------

Execute Frontend Phase 04: Streaming Chat Interface & Actionable Macros.
1. Analyze the chat UI mockup image inside `docs/ui-mockups/`. Replace `chat_screen.dart` placeholders with an interactive conversation view using `socket_io_client`.
2. STREAMING RENDER: Listen to incoming WebSocket text chunks. Append chunks to the message bubble and trigger `notifyListeners()` instantly to render streaming animation. Add automated scroll-to-bottom physics.
3. ACTIONABLE MACROS: Refactor the food estimation bubble widget. When the AI returns local food estimations (US13), render an **'Add to Diary'** Neon Green button.
4. Clicking 'Add to Diary' must extract the estimated macros from the JSON chunk and send an HTTP POST to `http://localhost:3003/api/tracking/log/custom` to update the user's profile progress dynamically. Update progress.

---------

Execute Backend Phase 05: System Administration (Admin Microservice).
1. Setup an Express.js server running independently on Port 3005. Configure the `cors` package globally so our desktop frontend can bypass browser blocking.
2. IMPLEMENTATION: Build REST APIs for fetching macro system analytics (Total users, token consumption charts, token costs calculated from API usage) and endpoints for updating System Prompts and suspending accounts.
3. ROLE-BASED ACCESS CONTROL (RBAC): Create an `isAdmin` security middleware. Extract the incoming JWT token, decode it, and reject requests with a 403 Forbidden status if the user role is not 'ADMIN'.
4. Write Jest unit tests to verify that `isAdmin` successfully blocks standard user accounts. Update progress.

---------

Execute Frontend Phase 05: Admin Web Dashboard.
1. CRITICAL FIRST STEP: Analyze the desktop web admin dashboard mockup image located at `docs/ui-mockups/05-admin.png`.
2. WORKSPACE SETUP: Create a new, standalone React project with Vite and Tailwind CSS inside the directory `source/admin-web/`. DO NOT mix this with the Flutter mobile code.
3. UI RECONSTRUCTION: Implement the sidebar navigation (Overview, Master Data, AI Tuning, User Management). Use the `recharts` library to render the '30-Day API Token Consumption' Area Chart and the 'Workout Distribution' Donut Chart.
4. LIVE DATA CONNECTION: Configure `axios` to make live HTTP requests directly to our Admin Microservice base URL: `http://localhost:3005/api/admin/`. Ensure every API call injects the Admin JWT token inside the Authorization Bearer header. Update `docs/PROGRESS.md` marking the software suite as COMPLETE.

---------

Execute Dockerization Phase (Skipping central API Gateway).
1. DOCKERFILES: In each of the 5 microservice directories (Identity, Profile, Tracking, AI-Coach, Admin), generate a multi-stage production-ready `Dockerfile` for Node.js. Ensure `npx prisma generate` is executed during the build stage.
2. DOCKER-COMPOSE: Create a master `docker-compose.yml` file inside the root directory.
3. CONFIGURATION: Configure the following containers:
   - `postgres-db`: Image postgres:15, exposing physical port 5432.
   - `identity-service`: Maps directory to port 3001. Connects to `postgres-db`.
   - `profile-service`: Maps directory to port 3002. Connects to `postgres-db`.
   - `tracking-service`: Maps directory to port 3003. Connects to `postgres-db`.
   - `aicoach-service`: Maps directory to port 3004. Injects `OPENAI_API_KEY`.
   - `admin-service`: Maps directory to port 3005. Connects to `postgres-db`.
4. NETWORKING: Put all containers inside a isolated bridge network named `gymfitness-network`. Generate a `README.docker.md` file containing detailed instructions for execution (`docker-compose up -d --build`). Update progress.