import { Request, Response, NextFunction } from 'express';
import { TrackingService } from '../services/tracking.service';

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

  async logFood(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.body.userId || 'test-user-id';
      const result = await trackingService.logFood(userId, req.body.foodId, req.body.grams);
      res.json(result);
    } catch (e) { next(e); }
  }

  async checkinWorkout(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await trackingService.checkinWorkout(req.body.workoutLogId);
      res.json(result);
    } catch (e) { next(e); }
  }

  async getAnalytics(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.query.userId as string || 'test-user-id';
      const result = await trackingService.getAnalytics(userId);
      res.json(result);
    } catch (e) { next(e); }
  }

  async getSchedule(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.query.userId as string || 'test-user-id';
      const workoutStyle = req.query.workoutStyle as string || 'Bodybuilding';
      const result = await trackingService.getSchedule(userId, workoutStyle);
      res.json(result);
    } catch (e) { next(e); }
  }
}
