# Frontend Phase 02: Onboarding & Profile Management

## 1. Objective
Develop the Onboarding flow for new users to collect biological metrics and the Settings screen for profile updates.

## 2. Requirements Mapping
- **US02 & FR02:** Build a multi-step dynamic form collecting: Height, Weight, Age, Gender, Activity Level, Workout Style (Gym/Yoga/Cardio/Diet), and Goal.
- **US03:** Build a UI component (modal or card) on the dashboard to allow weekly weight updates.
- **US04 & FR07:** Build a Profile/Settings screen allowing users to switch their "Workout Style". Show a warning dialog that switching will regenerate their schedule.

## 3. Technical Implementation Details
- Use `Provider` to temporarily hold onboarding form data before submitting the final `PUT /users/me/metrics` API call.
- Implement robust form validation (e.g., weight must be > 20kg, age > 10).
- Handle loading states (spinners) gracefully while waiting for the backend Calculation Engine to return the new Macros.

## 4. Definition of Done (DoD)
- [ ] New users are forced through the Onboarding screens before accessing the dashboard.
- [ ] Form submits successfully and updates the `UserProvider` with calculated Target Macros.
- [ ] Settings screen allows updating weight and workout style seamlessly.