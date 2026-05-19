import { Request, Response, NextFunction } from 'express';
import { TrackingService } from '../services/tracking.service';
import { AuthRequest } from '../middleware/auth.middleware';

const trackingService = new TrackingService();

export class TrackingController {
  async getExercises(req: Request, res: Response, next: NextFunction) {
    try {
      const exercises = await trackingService.getExercises();
      res.json(exercises);
    } catch (e) { next(e); }
  }

  async getFood(req: Request, res: Response, next: NextFunction) {
    try {
      const food = await trackingService.getFood();
      res.json(food);
    } catch (e) { next(e); }
  }

  async logFood(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user.userId;
      const { foodId, grams, customFood } = req.body;
      const result = await trackingService.logFood(userId, foodId, grams, customFood);
      res.json(result);
    } catch (e) { next(e); }
  }

  async checkinWorkout(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user.userId;
      const { workoutLogId } = req.body;
      const result = await trackingService.checkinWorkout(userId, workoutLogId);
      res.json(result);
    } catch (e) { next(e); }
  }

  async getAnalytics(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user.userId;
      const token = req.headers.authorization;
      const result = await trackingService.getAnalytics(userId, token);
      res.json(result);
    } catch (e) { next(e); }
  }

  async getSchedule(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user.userId;
      const workoutStyle = req.query.workoutStyle as string || 'Bodybuilding';
      const result = await trackingService.getSchedule(userId, workoutStyle);
      res.json(result);
    } catch (e) { next(e); }
  }

  async swapWorkout(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user.userId;
      const { swapFrom, swapTo } = req.body;
      const result = await trackingService.swapExercise(userId, swapFrom, swapTo);
      res.json(result);
    } catch (e) { next(e); }
  }

  async logCustom(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user.userId;
      const { name, calories, protein, carbs, fat, grams } = req.body;
      const result = await trackingService.logCustom(userId, { name, calories, protein, carbs, fat, grams });
      res.json(result);
    } catch (e) { next(e); }
  }
}
