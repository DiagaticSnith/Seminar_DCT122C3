import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

const router = Router();
const userController = new UserController();

router.put('/me/metrics', userController.updateMetrics);

export default router;
