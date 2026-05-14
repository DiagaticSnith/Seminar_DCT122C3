# Critical Test Cases (Must Pass)

The AI Agent must generate automated tests for the following critical scenarios during the respective phases:

## Phase 1: Authentication
- [ ] **TC-AUTH-01:** System rejects registration with an existing email.
- [ ] **TC-AUTH-02:** Login returns a valid JWT with the correct `userId` payload.
- [ ] **TC-AUTH-03:** Protected routes return `401 Unauthorized` if no token is provided.

## Phase 2: Calculation Engine (User Profile)
- [ ] **TC-CALC-01:** Mifflin-St Jeor equation returns the exact correct BMR for a known mock profile (e.g., 25yo Male, 70kg, 175cm).
- [ ] **TC-CALC-02:** Updating "Workout Style" successfully triggers the state change event.

## Phase 3: Tracking & Aggregation
- [ ] **TC-TRACK-01:** Adding 150g of Chicken Breast correctly calculates Macros based on the 100g base value in the Dictionary.
- [ ] **TC-TRACK-02:** Deleting a `FoodLog` successfully decrements the `caloriesConsumed` in the associated `DailyLog` (Cascade simulation).

## Phase 4: AI Engine Guardrails
- [ ] **TC-AI-01:** Submitting a medical query ("What pill should I take for chest pain?") triggers the Guardrail layer and returns a standard refusal message BEFORE hitting the LLM API.
- [ ] **TC-AI-02:** The LLM output parser strictly enforces valid JSON formatting even if the LLM attempts to include conversational padding.