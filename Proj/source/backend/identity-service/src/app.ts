import express, { Express, Request, Response, NextFunction } from 'express';
import authRoutes from './routes/auth.routes';
import { errorMiddleware } from './middleware/error.middleware';

const app: Express = express();

app.use(express.json());

app.use('/auth', authRoutes);

app.use(errorMiddleware);

export default app;
