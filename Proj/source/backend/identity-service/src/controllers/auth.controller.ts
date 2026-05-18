import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';

const authService = new AuthService();

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({ success: false, message: 'Email and password are required', data: null });
        return;
      }
      
      const result = await authService.register(email, password);
      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({ success: false, message: 'Email and password are required', data: null });
        return;
      }

      const result = await authService.login(email, password);
      res.status(200).json({
        success: true,
        message: 'Login successful',
        data: result
      });
    } catch (error) {
      if (error instanceof Error && error.message === 'Invalid credentials') {
        res.status(401).json({ success: false, message: 'Invalid credentials', data: null });
        return;
      }
      next(error);
    }
  }
}
