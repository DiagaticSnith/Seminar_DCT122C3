# Frontend Engineering Skills & Constraints

## 1. Core Technology Stack
- **Framework:** Flutter
- **Language:** Dart
- **State Management:** `Provider` (Strictly enforced)

## 2. Architectural Constraints
- **State Management Ban:** Do NOT use GetX, BLoC, or Riverpod. Stick exclusively to `Provider` to maintain simplicity and readability.
- **Folder Structure:** Separate the code into logical directories:
  - `screens/`: Full-page UI views.
  - `widgets/`: Reusable UI components (e.g., buttons, cards).
  - `providers/`: State management logic.
  - `services/`: API HTTP calls (using the `http` package).
  - `models/`: Dart data classes with JSON serialization.

## 3. UI/UX Standards
- Use standard Material Design 3 components.
- Ensure the UI is Adaptive (e.g., rendering different icons or layouts based on the `Workout Style` data).
- Always show visual feedback (Loading Spinners, Snackbars) during asynchronous API calls.