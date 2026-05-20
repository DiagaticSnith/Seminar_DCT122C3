import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { AdminService } from '../services/admin.service';

const adminService = new AdminService();

export class AdminController {
  async getSystemAnalytics(req: AuthRequest, res: Response) {
    try {
      const stats = await adminService.getSystemAnalytics();
      res.json({ success: true, message: 'System analytics retrieved', data: stats });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getChartData(req: AuthRequest, res: Response) {
    try {
      const chartData = await adminService.getChartData();
      res.json({ success: true, message: 'Chart data retrieved', data: chartData });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getUsers(req: AuthRequest, res: Response) {
    try {
      const users = await adminService.getUsers();
      res.json({ success: true, message: 'Users list retrieved', data: users });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async toggleSuspendStatus(req: AuthRequest, res: Response) {
    try {
      const id = req.params.id as string;
      const { suspended } = req.body;
      if (typeof suspended !== 'boolean') {
        res.status(400).json({ success: false, message: 'suspended field must be a boolean' });
        return;
      }
      const user = await adminService.toggleSuspendStatus(id, suspended);
      res.json({ success: true, message: `User suspension status updated to ${suspended}`, data: user });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Pending Food Queue
  async getPendingFoods(req: AuthRequest, res: Response) {
    try {
      const foods = await adminService.getPendingFoods();
      res.json({ success: true, data: foods });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async approvePendingFood(req: AuthRequest, res: Response) {
    try {
      const id = req.params.id as string;
      const food = await adminService.approvePendingFood(id, req.body);
      res.json({ success: true, message: 'Food approved successfully', data: food });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Master Food CRUD
  async getFoods(req: AuthRequest, res: Response) {
    try {
      const foods = await adminService.getFoods();
      res.json({ success: true, data: foods });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async createFood(req: AuthRequest, res: Response) {
    try {
      const food = await adminService.createFood(req.body);
      res.json({ success: true, message: 'Food created successfully', data: food });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async updateFood(req: AuthRequest, res: Response) {
    try {
      const id = req.params.id as string;
      const food = await adminService.updateFood(id, req.body);
      res.json({ success: true, message: 'Food updated successfully', data: food });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async deleteFood(req: AuthRequest, res: Response) {
    try {
      const id = req.params.id as string;
      await adminService.deleteFood(id);
      res.json({ success: true, message: 'Food deleted successfully' });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Master Exercise CRUD
  async getExercises(req: AuthRequest, res: Response) {
    try {
      const exercises = await adminService.getExercises();
      res.json({ success: true, data: exercises });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async createExercise(req: AuthRequest, res: Response) {
    try {
      const exercise = await adminService.createExercise(req.body);
      res.json({ success: true, message: 'Exercise created successfully', data: exercise });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async updateExercise(req: AuthRequest, res: Response) {
    try {
      const id = req.params.id as string;
      const exercise = await adminService.updateExercise(id, req.body);
      res.json({ success: true, message: 'Exercise updated successfully', data: exercise });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async deleteExercise(req: AuthRequest, res: Response) {
    try {
      const id = req.params.id as string;
      await adminService.deleteExercise(id);
      res.json({ success: true, message: 'Exercise deleted successfully' });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // AI Prompt Tuning CRUD
  async getSystemPrompts(req: AuthRequest, res: Response) {
    try {
      const prompts = await adminService.getSystemPrompts();
      res.json({ success: true, data: prompts });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async upsertSystemPrompt(req: AuthRequest, res: Response) {
    try {
      const { workoutStyle, prompt } = req.body;
      if (!workoutStyle || !prompt) {
        res.status(400).json({ success: false, message: 'workoutStyle and prompt are required' });
        return;
      }
      const systemPrompt = await adminService.upsertSystemPrompt(workoutStyle, prompt);
      res.json({ success: true, message: 'System prompt upserted successfully', data: systemPrompt });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}
