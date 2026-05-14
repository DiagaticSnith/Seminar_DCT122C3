# Backend Phase 02: Profile & Calculation Engine

## 1. Objective
Build the `user-service` to collect biological metrics and dynamically calculate nutritional targets (BMR, TDEE, Macros).

## 2. Requirements Mapping
- **US02 & FR02 (Onboarding):** Collect inputs: height, weight, age, gender, activity level, "Workout Style", and "Goal".
- **US03:** Allow weekly weight updates to automatically recalculate calories/routines.
- **US04 & FR07:** Allow users to change their "Workout Style" via settings. This must trigger the AI Engine to regenerate schedules.

## 3. Technical Implementation Details
- Strictly utilize the **Mifflin-St Jeor** equation to calculate BMR.
- Automatically compute and store `targetCalories`, `targetProtein`, `targetCarbs`, and `targetFat` based on the specified Goal.
- Create an event trigger to notify the `ai-coach-service` when Workout Style changes.

## 4. Definition of Done (DoD)
- [ ] `PUT /users/me/metrics` correctly receives data and calculates exact Macros.
- [ ] Jest Unit Tests verifying the exact mathematical accuracy of the Mifflin-St Jeor implementation.