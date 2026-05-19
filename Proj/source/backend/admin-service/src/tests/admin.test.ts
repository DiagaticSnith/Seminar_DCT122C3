process.env.JWT_SECRET = 'supersecretjwtkey12345';
import request from 'supertest';
import app from '../app';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

// Mock the AdminService
jest.mock('../services/admin.service', () => {
  return {
    AdminService: jest.fn().mockImplementation(() => {
      return {
        getSystemAnalytics: jest.fn().mockResolvedValue({
          totalUsers: 10,
          activeUsers: 5,
          tokenUsage: 1000,
          tokenCost: 0.05
        }),
        getChartData: jest.fn().mockResolvedValue({
          tokenConsumption: [{ date: '2026-05-19', tokens: 1000 }],
          workoutDistribution: [{ workoutStyle: 'Gym', count: 3 }]
        }),
        getUsers: jest.fn().mockResolvedValue([
          { id: 'user-123', email: 'john@example.com', role: 'USER', suspended: false }
        ]),
        toggleSuspendStatus: jest.fn().mockImplementation((userId: string, suspended: boolean) => {
          return { id: userId, suspended };
        }),
        getFoods: jest.fn().mockResolvedValue([{ id: 'food-1', name: 'Apple' }]),
        createFood: jest.fn().mockImplementation((data) => ({ id: 'new-food', ...data })),
        updateFood: jest.fn().mockImplementation((id, data) => ({ id, ...data })),
        deleteFood: jest.fn().mockResolvedValue({ id: 'food-1' }),
        getExercises: jest.fn().mockResolvedValue([{ id: 'ex-1', name: 'Squat' }]),
        createExercise: jest.fn().mockImplementation((data) => ({ id: 'new-ex', ...data })),
        updateExercise: jest.fn().mockImplementation((id, data) => ({ id, ...data })),
        deleteExercise: jest.fn().mockResolvedValue({ id: 'ex-1' }),
        getSystemPrompts: jest.fn().mockResolvedValue([{ workoutStyle: 'Gym', prompt: 'Gym prompt' }]),
        upsertSystemPrompt: jest.fn().mockImplementation((workoutStyle, prompt) => ({ workoutStyle, prompt }))
      };
    })
  };
});

describe('Admin Service Authorization & Controller Tests', () => {
  let userToken: string;
  let adminToken: string;

  beforeAll(() => {
    // Generate mock tokens
    userToken = jwt.sign({ userId: 'user-123', role: 'USER' }, JWT_SECRET);
    adminToken = jwt.sign({ userId: 'admin-123', role: 'ADMIN' }, JWT_SECRET);
  });

  describe('isAdmin Middleware Guard', () => {
    it('should block requests without a token (401)', async () => {
      const res = await request(app).get('/api/admin/analytics/users');
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it('should block normal users with role USER (403)', async () => {
      const res = await request(app)
        .get('/api/admin/analytics/users')
        .set('Authorization', `Bearer ${userToken}`);
      
      expect(res.status).toBe(403);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain('Admin access required');
    });

    it('should allow admin users with role ADMIN to pass (200)', async () => {
      const res = await request(app)
        .get('/api/admin/analytics/users')
        .set('Authorization', `Bearer ${adminToken}`);
      
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.totalUsers).toBe(10);
    });
  });

  describe('User Management / Suspend Endpoints', () => {
    it('should list all registered users', async () => {
      const res = await request(app)
        .get('/api/admin/users')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].email).toBe('john@example.com');
    });

    it('should allow admin to toggle suspension status', async () => {
      const res = await request(app)
        .post('/api/admin/users/user-123/suspend')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ suspended: true });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.suspended).toBe(true);
    });

    it('should return 400 bad request if suspended parameter is missing or not boolean', async () => {
      const res = await request(app)
        .post('/api/admin/users/user-123/suspend')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ suspended: 'yes' });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe('Master Data CRUD Endpoints', () => {
    it('should list food items', async () => {
      const res = await request(app)
        .get('/api/admin/master/food')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveLength(1);
    });

    it('should create food item', async () => {
      const res = await request(app)
        .post('/api/admin/master/food')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Banana',
          baseServingSize: 100,
          baseCalories: 89,
          baseProtein: 1.1,
          baseCarbs: 22.8,
          baseFat: 0.3
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe('Banana');
    });

    it('should list exercise items', async () => {
      const res = await request(app)
        .get('/api/admin/master/exercises')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveLength(1);
    });

    it('should update exercise item', async () => {
      const res = await request(app)
        .put('/api/admin/master/exercises/ex-1')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'Push Up' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe('Push Up');
    });
  });

  describe('System Prompt Tuning Endpoints', () => {
    it('should list and upsert system prompts', async () => {
      const res = await request(app)
        .post('/api/admin/prompts')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ workoutStyle: 'Gym', prompt: 'New gym system prompt' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.prompt).toBe('New gym system prompt');
    });
  });
});
