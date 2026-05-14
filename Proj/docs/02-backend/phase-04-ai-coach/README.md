# Backend Phase 04: AI Engine & Realtime Chatbot

## 1. Objective
Integrate the LLM (Gemini) within the `ai-coach-service` to generate adaptive plans and handle conversational AI.

## 2. Requirements Mapping
- **AI Core:** FR03 (Polymorphic JSON enforcing), US17 (Admin Prompts), US19 (Fallback routines).
- **Chat Features:** US09 (PT lookup), US10 & FR06 (Intent-based schedule updates), US13 (Estimate unknown food macros), FR04 (Context history).
- **Security:** US22 & FR08 (Guardrails restricting medical advice).

## 3. Technical Implementation Details
- Force the LLM output to JSON using the API's `response_mime_type: "application/json"`.
- Implement a Guardrail Middleware that intercepts medical keywords before reaching the LLM.
- Manage WebSockets for real-time chat streaming.

## 4. Definition of Done (DoD)
- [ ] LLM consistently returns strictly parsed JSON matching the Prisma schema.
- [ ] Chat endpoint successfully updates the database when a user asks to swap an exercise.
- [ ] Guardrail tests pass: Mock a medical question and assert the AI returns a refusal intent.