import { Router } from 'express';
import { AdminController } from '../controllers/admin.controller';
import { authMiddleware, isAdmin } from '../middleware/auth.middleware';

const router = Router();
const controller = new AdminController();

// Apply authMiddleware and isAdmin to all admin routes
router.use(authMiddleware as any);
router.use(isAdmin as any);

router.get('/analytics/users', controller.getSystemAnalytics.bind(controller) as any);
router.get('/analytics/charts', controller.getChartData.bind(controller) as any);
router.post('/users/:id/suspend', controller.toggleSuspendStatus.bind(controller) as any);
router.get('/users', controller.getUsers.bind(controller) as any);

// Master Food CRUD
router.get('/master/food', controller.getFoods.bind(controller) as any);
router.post('/master/food', controller.createFood.bind(controller) as any);
router.put('/master/food/:id', controller.updateFood.bind(controller) as any);
router.delete('/master/food/:id', controller.deleteFood.bind(controller) as any);

// Master Exercise CRUD
router.get('/master/exercises', controller.getExercises.bind(controller) as any);
router.post('/master/exercises', controller.createExercise.bind(controller) as any);
router.put('/master/exercises/:id', controller.updateExercise.bind(controller) as any);
router.delete('/master/exercises/:id', controller.deleteExercise.bind(controller) as any);

// AI Prompt Tuning
router.get('/prompts', controller.getSystemPrompts.bind(controller) as any);
router.post('/prompts', controller.upsertSystemPrompt.bind(controller) as any);

export default router;
