import express, { Express } from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes';
import { errorMiddleware } from './middleware/error.middleware';

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);

app.use(errorMiddleware);

export default app;
