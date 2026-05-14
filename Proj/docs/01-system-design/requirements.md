# System Requirements Specification: Business Domains Mapping

## Domain 1: Authentication & User Management
**Objective:** Handle secure system access, session lifecycles, and foundational account security.
- **US01:** As a user, I want to register/login using Email/Password or Google Auth so my personal data is synchronized and securely stored.
- **FR01 (Account Management):** The system must provide secure registration, login, and robust session management.

## Domain 2: User Profile & Calculation Engine
**Objective:** Collect biological metrics, define user goals, and dynamically trigger the calculation of nutritional targets (BMR/TDEE).
- **US02:** As a new user, I want to input my body metrics and specifically select a "Workout Style" (Gym, Yoga, Home Cardio, Diet Only) and a "Goal" (Fat Loss, Muscle Gain, Flexibility) so the AI can establish an accurate routine.
- **US03:** As a user, I want to update my weight weekly so the system and AI can automatically adjust calories/routines for the following week.
- **US04:** As a user, I want to change my "Workout Style" anytime in settings so the AI automatically deletes the old schedule and generates a new one.
- **FR02 (Onboarding):** Provide dynamic mobile forms to collect demographic and physical data.
- **FR07 (Routine Transition):** Changing the "Workout Style" must trigger the AI Engine to completely regenerate the upcoming workout and diet routine.

## Domain 3: Master Data & Daily Tracking
**Objective:** Manage core dictionaries (food/exercises) and provide tools for users to log daily progress, check-in workouts, and view analytics.
- **US05 (User):** I want to view detailed suggested daily meal plans (Calories, Macros) to know what to prepare.
- **US06 (User):** I want to view the daily exercise list with an adaptive UI (Sets/Reps vs. Hold Duration) and watch tutorial videos.
- **US07 (User):** I want to check-in completed exercises and log consumed food/water.
- **US08 (User):** I want to view line/bar charts showing weight changes and calorie intake over the past 30 days.
- **US11 (User):** I want to search for ingredients in the "Nutrition Dictionary" to view Macros per 100g.
- **US12 (User):** I want to select an ingredient, input a custom weight, and auto-calculate/log it.
- **US14 (User):** I want to view a progress bar/pie chart displaying consumed Macros versus system targets.
- **US15 (Admin):** I want to Add/Edit/Delete Food data (name, calories/100g, macros) for the dictionary.
- **US16 (Admin):** I want to Add/Edit/Delete Exercises, categorize by Tags, and attach video links.
- **FR05 (Schedule UI):** Provide an Adaptive UI based on exercise type, hiding the Training tab for "Diet Only".

## Domain 4: AI Engine & Real-time Chatbot
**Objective:** Integrate the LLM to generate polymorphic workout plans, estimate dietary values, and act as a Virtual PT.
- **US09 (User):** I want to message the Virtual PT to quickly look up calories or ask about exercise postures.
- **US10 (User):** I want to request direct schedule changes via chat (e.g., "Legs hurt, swap to arms") so the app updates automatically.
- **US13 (User):** I want to ask the AI to estimate Calories/Macros for local food not in the dictionary and auto-log it.
- **US17 (Admin):** I want to manage "System Prompts" for each Workout Style via the web dashboard.
- **US19 (Admin):** I want to create static "Fallback routines" in case the AI API experiences downtime.
- **US22 (Admin):** I want to set up "Safety Guardrails" so the AI explicitly refuses medical diagnosis requests.
- **FR03 (AI Integration):** Enforce structured, Polymorphic JSON returns from the AI.
- **FR04 (Chat Session):** Maintain Context history for chat sessions.
- **FR06 (Intent Update):** System must recognize chat intents to update database records in real-time.
- **FR08 (Guardrails):** Implement Prompt Injection & Topic Restriction layers.

## Domain 5: System Administration & Analytics
**Objective:** Provide web-based monitoring tools for system health, API costs, and user behavior analytics.
- **US18 (Admin):** I want to view AI activity logs and consumed API Tokens to control costs.
- **US20 (Admin):** I want an overview dashboard showing total users, active users, and Workout Style distribution.
- **US21 (Admin):** I want the authority to suspend accounts showing signs of chat API spamming or community violations.