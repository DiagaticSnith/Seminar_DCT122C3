import { Router } from 'express';
import { TrackingController } from '../controllers/tracking.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();
const controller = new TrackingController();

router.get('/master/exercises', controller.getExercises);
router.get('/master/food', controller.getFood);

router.post('/log/food', authMiddleware, controller.logFood);
router.post('/log/custom', authMiddleware, controller.logCustom);
router.post('/log/workout/checkin', authMiddleware, controller.checkinWorkout);
router.post('/workout/swap', authMiddleware, controller.swapWorkout);

router.get('/analytics', authMiddleware, controller.getAnalytics);
router.get('/schedule', authMiddleware, controller.getSchedule);

export default router;
