import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';

const userService = new UserService();

export class UserController {
  async updateMetrics(req: Request, res: Response, next: NextFunction) {
    try {
      // In a real app, userId comes from JWT token in req.user
      // For this phase, we accept it from body or param if no auth middleware
      const userId = req.body.userId || 'test-user-id';
      const profile = await userService.updateMetrics(userId, req.body);
      res.json(profile);
    } catch (error) {
      next(error);
    }
  }
}
