# Frontend Phase 04: AI Chatbot Interface

## 1. Objective
Develop the conversational UI for the Virtual PT, supporting real-time messaging and intent-based UI updates.

## 2. Requirements Mapping
- **US09 & US13:** Build a Chat screen (similar to iMessage/WhatsApp) where users can ask for calorie estimations or workout advice.
- **US10 & FR06:** Ensure that when the AI agrees to change the schedule via chat, the Flutter app reflects this change immediately.
- **FR04:** Fetch and display the context history of the chat when the user opens the screen.

## 3. Technical Implementation Details
- Implement WebSockets (e.g., using `web_socket_channel`) or SSE to handle real-time streaming of AI responses.
- Implement a `ChatProvider` to manage message lists and loading indicators (e.g., "AI is typing...").
- **State Syncing:** Listen for specific WebSocket events indicating a schedule change. If the AI updates the database, trigger a refresh function in the `TrackingProvider` to update the Dashboard silently in the background.

## 4. Definition of Done (DoD)
- [ ] Chat UI renders user and AI messages clearly with timestamps.
- [ ] WebSocket connection remains stable and reconnects automatically on drop.
- [ ] "Change my leg day to arm day" prompt successfully updates the UI on the Home screen without requiring a manual pull-to-refresh.