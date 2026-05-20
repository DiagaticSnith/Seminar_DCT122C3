# Backend Phase 05: System Administration & Analytics

## 1. Objective
Develop the administrative tools and analytics APIs to monitor system health and user distribution.

## 2. Requirements Mapping
- **US18:** Retrieve AI activity logs and API Token consumption data.
- **US20:** Build an analytics dashboard aggregating total users, active users, and Workout Style distribution.
- **US21:** Implement endpoints for admins to suspend violating user accounts.

## 3. Technical Implementation Details
- Ensure strict adherence to `skills/backend.md`.
- All APIs in this phase must be protected by an `AdminRole` middleware.
- Aggregation queries should be optimized using Prisma's `groupBy` functions.

## 4. Definition of Done (DoD)
- [ ] `GET /admin/analytics/users` returns accurate demographic statistics.
- [ ] `POST /admin/users/:id/suspend` successfully locks a user account.
- [ ] 100% Jest Unit Test coverage for Admin role verification and aggregation logic.