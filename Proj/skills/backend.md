# Backend Engineering Skills & Constraints

## 1. Core Technology Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript (Strict Mode enabled)

## 2. Architectural Pattern
- You must strictly follow a **3-Layer Architecture**:
  - `routes/`: Defines API endpoints and maps them to controllers.
  - `controllers/`: Handles HTTP requests/responses and input validation.
  - `services/`: Contains all business logic. Controllers must call Services.
- **NEVER** write business logic or database queries directly inside the route files.

## 3. Coding Standards
- Always return standardized JSON responses: `{ "success": boolean, "data": object, "message": string }`.
- Use `async/await` for all asynchronous operations. Do not use `.then().catch()`.
- Centralize all error handling using a global error middleware.
- Read environment variables exclusively via `process.env`. Never hardcode secrets.