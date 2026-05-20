import 'dotenv/config';
import http from 'http';
import { Server as SocketServer } from 'socket.io';
import app from './app';
import { AiCoachService, ChatMessage } from './services/ai-coach.service';

const PORT = process.env.PORT || 3003;
const server = http.createServer(app);

// Initialize Socket.io
const io = new SocketServer(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const aiCoachService = new AiCoachService();

import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwtkey12345';

// In-memory chat history store per userId (fully isolated)
const chatHistories = new Map<string, ChatMessage[]>();

// Middleware to authenticate socket connections via JWT token
io.use((socket, next) => {
  const token = socket.handshake.auth?.token;
  if (!token) {
    console.error('[AI-Coach] Handshake failed: Token missing');
    return next(new Error('Authentication error: Token missing'));
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    socket.data = { userId: decoded.userId };
    next();
  } catch (err: any) {
    console.error('[AI-Coach] Handshake failed: Invalid token', err.message);
    return next(new Error('Authentication error: Invalid token'));
  }
});

io.on('connection', (socket) => {
  const userId = socket.data.userId;
  console.log(`[AI-Coach] Client connected: ${socket.id} (User ID: ${userId})`);

  if (!chatHistories.has(userId)) {
    chatHistories.set(userId, []);
  }

  socket.on('chat_message', async (data: { message: string; context: any }) => {
    const { message, context } = data;
    const history = chatHistories.get(userId) ?? [];

    // GUARDRAIL CHECK - runs before any LLM call
    const guardrailResult = aiCoachService.checkGuardrails(message);
    if (guardrailResult) {
      socket.emit('chat_response_complete', guardrailResult);
      return;
    }

    socket.emit('chat_stream_start', {});

    try {
      const result = await aiCoachService.streamChat(
        message,
        history,
        context,
        (chunk) => socket.emit('chat_stream_chunk', { chunk })
      );

      // Intercept updateSchedule intent and propagate to tracking service
      if (result && (result as any).intent === 'updateSchedule') {
        const routines = (result as any).routines;
        if (Array.isArray(routines)) {
          try {
            const token = socket.handshake.auth?.token;
            const trackingUrl = process.env.TRACKING_SERVICE_URL || 'http://gymfitness-tracking:3002';
            console.log(`[AI-Coach] Propagating schedule update for user ${userId} to tracking service at ${trackingUrl}`);
            
            const response = await fetch(`${trackingUrl}/tracking/workout/update`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : ''
              },
              body: JSON.stringify({
                routines,
                workoutStyle: context?.workoutStyle || 'Gym'
              })
            });

            if (!response.ok) {
              const errText = await response.text();
              console.error(`[AI-Coach] Tracking service responded with error: ${errText}`);
            } else {
              console.log('[AI-Coach] Schedule successfully updated in database.');
            }
          } catch (fetchErr: any) {
            console.error('[AI-Coach] Error calling tracking-service to update schedule:', fetchErr.message);
          }
        }
      }

      // Append to history for context management (FR04)
      history.push({ role: 'user', content: message });
      history.push({ role: 'assistant', content: JSON.stringify(result) });
      // Keep history to last 10 turns to limit tokens
      if (history.length > 20) history.splice(0, 2);
      chatHistories.set(userId, history);

      socket.emit('chat_response_complete', result);
    } catch (err: any) {
      console.error('[AI-Coach] Stream error:', err.message);
      socket.emit('chat_error', { message: 'AI service temporarily unavailable. Please try again.' });
    }
  });

  socket.on('disconnect', () => {
    console.log(`[AI-Coach] Client disconnected: ${socket.id} (User ID: ${userId})`);
  });
});

server.listen(PORT as number, '0.0.0.0', () => {
  console.log(`AI-Coach Service running on port ${PORT} (HTTP + WebSocket)`);
});
