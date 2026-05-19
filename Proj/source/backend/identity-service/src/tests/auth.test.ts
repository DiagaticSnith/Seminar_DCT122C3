import request from 'supertest';
import app from '../app';
import { PrismaClient } from '../generated/prisma/client/index';
import bcrypt from 'bcrypt';

jest.mock('../generated/prisma/client/index', () => {
  const mPrismaClient = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mPrismaClient) };
});

const prisma = new PrismaClient({ adapter: {} as any }) as jest.Mocked<PrismaClient> & {
  user: { findUnique: jest.Mock; create: jest.Mock };
};

describe('Auth Endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should register a new user successfully', async () => {
    prisma.user.findUnique.mockResolvedValue(null);
    prisma.user.create.mockResolvedValue({ id: '123', email: 'test@example.com' });

    const res = await request(app)
      .post('/auth/register')
      .send({ email: 'test@example.com', password: 'password123' });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.email).toBe('test@example.com');
  });

  it('should fail registration if user exists', async () => {
    prisma.user.findUnique.mockResolvedValue({ id: '123', email: 'test@example.com' });

    const res = await request(app)
      .post('/auth/register')
      .send({ email: 'test@example.com', password: 'password123' });

    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
  });

  it('should login successfully with correct credentials', async () => {
    const hashedPassword = await bcrypt.hash('password123', 10);
    prisma.user.findUnique.mockResolvedValue({
      id: '123',
      email: 'test@example.com',
      passwordHash: hashedPassword,
    });

    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'test@example.com', password: 'password123' });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.token).toBeDefined();
  });

  it('should fail login with incorrect password', async () => {
    const hashedPassword = await bcrypt.hash('password123', 10);
    prisma.user.findUnique.mockResolvedValue({
      id: '123',
      email: 'test@example.com',
      passwordHash: hashedPassword,
    });

    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'test@example.com', password: 'wrongpassword' });

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });
});
