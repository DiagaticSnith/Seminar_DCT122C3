import { Router } from 'express';
import { MealPlanController } from '../controllers/meal-plan.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();
const mealPlanController = new MealPlanController();

// POST /api/ai/generate-meal-plan — protected, generates AI daily meal plan for authenticated user
router.post('/generate-meal-plan', authMiddleware, (req, res, next) => {
  mealPlanController.generateMealPlan(req as any, res, next);
});

export default router;
