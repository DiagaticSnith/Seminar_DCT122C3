import { Router } from 'express';
import { TrackingController } from '../controllers/tracking.controller';

const router = Router();
const controller = new TrackingController();

router.get('/master/exercises', controller.getExercises);
router.get('/master/food', controller.getFood);

router.post('/log/food', controller.logFood);
router.post('/log/workout/checkin', controller.checkinWorkout);

router.get('/analytics', controller.getAnalytics);
router.get('/schedule', controller.getSchedule);

export default router;
