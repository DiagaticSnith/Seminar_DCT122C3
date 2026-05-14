# Frontend Phase 01: Authentication & Routing Setup

## 1. Objective
Initialize the Flutter project structure, configure state management, and build the Authentication UI (Login/Register).

## 2. Requirements Mapping
- **US01:** Build Login and Registration screens supporting Email/Password and Google Auth UI flows.
- **FR01:** Implement local session management (e.g., storing JWT securely using `shared_preferences` or `flutter_secure_storage`) and auto-redirect users based on authentication state.

## 3. Technical Implementation Details
- Strictly follow `docs/05-skills/frontend.md` (Use `Provider` for State Management, NO GetX).
- Create a `UserProvider` to manage the global authentication state.
- Build an `ApiClient` utility to automatically attach the Bearer JWT token to all outgoing HTTP requests.
- Ensure the UI follows Material Design guidelines with smooth transitions.

## 4. Definition of Done (DoD)
- [ ] Flutter app runs successfully on an emulator/device.
- [ ] User can register and log in, triggering a state change that navigates to the Home screen.
- [ ] JWT token is stored locally and persists across app restarts.