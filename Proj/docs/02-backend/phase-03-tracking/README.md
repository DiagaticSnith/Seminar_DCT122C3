# Backend Phase 03: Master Data & Daily Tracking

## 1. Objective
Develop the `workout-service` to manage Admin-defined dictionaries and handle the user's daily check-ins and logs.

## 2. Requirements Mapping
- **Admin Management:** US15 (Food CRUD) and US16 (Exercise CRUD with Tags/Videos).
- **User Dictionaries:** US11 (Search Nutrition Dictionary), US12 (Log food with custom weight).
- **User Tracking:** US05 (View Meal Plan), US06 & FR05 (View Adaptive Exercise List), US07 (Check-in workouts/log food), US08 & US14 (Aggregate charts for progress).

## 3. Technical Implementation Details
- Enforce strict Prisma Transactions (`prisma.$transaction`) when adding a `FoodLog` to increment `caloriesConsumed` in the `DailyLog` synchronously.
- Implement data aggregation endpoints for US08 and US14 to supply chart data to the frontend.

## 4. Definition of Done (DoD)
- [ ] APIs for Admin Master Data CRUD are fully functional.
- [ ] Food logging API automatically calculates ratios based on 100g base values and updates daily totals.
- [ ] Jest Unit Tests confirming calorie aggregation logic.