import express, { Express } from 'express';
import cors from 'cors';
import trackingRoutes from './routes/tracking.routes';

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use('/tracking', trackingRoutes);

export default app;
