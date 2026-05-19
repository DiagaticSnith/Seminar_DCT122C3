import { Response, NextFunction } from 'express';
import { MealPlanService } from '../services/meal-plan.service';
import { AuthRequest } from '../middleware/auth.middleware';

const mealPlanService = new MealPlanService();

export class MealPlanController {
  async generateMealPlan(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({ success: false, message: 'Unauthorized', data: null });
        return;
      }

      const mealPlan = await mealPlanService.generateMealPlan(userId);

      res.json({
        success: true,
        data: mealPlan,
      });
    } catch (error: any) {
      next(error);
    }
  }
}
