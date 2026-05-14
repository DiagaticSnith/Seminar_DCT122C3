# Backend Phase 01: Foundation & Authentication

## 1. Objective
Establish the Express/TypeScript backend foundation and fully implement the `identity-service`.

## 2. Requirements Mapping
- **US01:** Implement user registration and login via Email/Password or Google Auth.
- **FR01 (Account Management):** Provide secure session management.

## 3. Technical Implementation Details
- Ensure strict adherence to `docs/05-skills/backend.md`.
- Passwords must be hashed using `bcrypt` prior to database insertion.
- Generate standard JWTs containing the `userId` and expiration timestamp.
- Implement a global authentication middleware to protect subsequent routes.

## 4. Definition of Done (DoD)
- [ ] `POST /auth/register` creates a user and securely hashes the password.
- [ ] `POST /auth/login` verifies credentials and returns a valid JWT.
- [ ] 100% Jest Unit Test coverage for Auth flows.