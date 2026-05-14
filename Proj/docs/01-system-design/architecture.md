# System Architecture: GymFitness-AI

## 1. System Overview
GymFitness-AI follows a Microservices Architecture pattern. The backend is split into independent services communicating via REST APIs and WebSockets, ensuring high cohesion and loose coupling. 

## 2. Microservices Components
1. **API Gateway:** The single entry point for the frontend. Handles rate limiting, request routing, and WebSocket connections for chat.
2. **Identity Service:** Manages user authentication (Email/Google Auth) and JWT session lifecycle.
3. **User Service:** Manages onboarding metrics (Height, Weight, Workout Style) and acts as the Calculation Engine (BMR/TDEE math).
4. **Workout & Tracking Service:** Manages the Master Data (Dictionaries) and Daily Logs (food/water intake, workout check-ins).
5. **AI-Coach Service:** The LLM integration layer. Manages prompts, chat context history, and JSON enforcement.

## 3. Non-Functional Requirements (NFRs) Enforcement
- **Performance (NFR01):** AI Chat responses must not exceed 3-5 seconds. Static data APIs must respond in under 500ms.
- **Availability (NFR03):** The chat architecture must support concurrent connections without bottlenecking, utilizing WebSockets or asynchronous architecture.
- **Security (NFR04):** Health data and chat history must be encrypted during transmission. Personal Identifiable Information (PII) must be separated from any training data.
- **Prompt Scalability (NFR05):** System Prompts must be template-based and modular. Gym prompts must be completely isolated from Yoga prompts to allow future expansion.