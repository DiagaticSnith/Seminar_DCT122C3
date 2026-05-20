import { Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';
import { AuthRequest } from '../middleware/auth.middleware';

const userService = new UserService();

export class UserController {
  async updateMetrics(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user.userId;
      const token = req.headers.authorization;
      const profile = await userService.updateMetrics(userId, req.body, token);

      if (profile && (profile as any).warning === 'overtraining_prevented') {
        const warning = (profile as any).warning;
        const profileData = { ...profile };
        delete (profileData as any).warning;

        res.json({
          success: true,
          data: profileData,
          message: "Profile updated",
          warning
        });
      } else {
        res.json(profile);
      }
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
