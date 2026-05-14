# Quality Assurance & Testing Strategy

## 1. Testing Philosophy
- **Test-Driven Execution:** The Agent must write and pass tests for every Phase before requesting human review.
- **Isolation:** Tests must NEVER hit the production database. Always use mocks or in-memory databases.

## 2. Backend Testing Rules (Node.js/Express)
- **Framework:** Use `Jest` and `Supertest`.
- **Database Mocking:** You MUST use `jest-mock-extended` to mock the Prisma Client (`prismaMock`). Never run tests against the real PostgreSQL instance.
- **Coverage:** Aim for 80% coverage on core business logic (Services and Utils).

## 3. Frontend Testing Rules (Flutter)
- **Framework:** Use Flutter's built-in `flutter_test`.
- **Approach:** Focus on Widget Testing for the Adaptive UI (e.g., ensuring Gym UI renders differently from Yoga UI) and Unit Testing for the `Provider` state management.
- **API Mocking:** Use `mockito` to mock HTTP responses.

## 4. AI Guardrail Testing (Critical)
- AI prompts and guardrails must be rigorously tested using mock user inputs to ensure explicit refusal of medical advice.