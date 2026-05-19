import express from 'express';
import cors from 'cors';
import mealPlanRoutes from './routes/meal-plan.routes';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (_, res) => res.json({ status: 'ok', service: 'ai-coach-service' }));

// AI REST Endpoints
app.use('/api/ai', mealPlanRoutes);

export default app;

