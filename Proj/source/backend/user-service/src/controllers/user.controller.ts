import { Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';
import { AuthRequest } from '../middleware/auth.middleware';

const userService = new UserService();

export class UserController {
  async updateMetrics(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user.userId;
      const profile = await userService.updateMetrics(userId, req.body);
      res.json(profile);
    } catch (error) {
      next(error);
    }
  }

  async getMetrics(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user.userId;
      const profile = await userService.getMetrics(userId);
      res.json(profile);
    } catch (error) {
      next(error);
    }
  }
}
