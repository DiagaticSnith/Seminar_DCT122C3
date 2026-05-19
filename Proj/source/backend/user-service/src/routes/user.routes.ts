import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();
const userController = new UserController();

router.put('/me/metrics', authMiddleware, userController.updateMetrics);
router.get('/me/metrics', authMiddleware, userController.getMetrics);

export default router;
