import { describe, it, expect, jest, beforeEach } from '@jest/globals';

// ─── Mock pg Pool ──────────────────────────────────────────────────────────────
jest.mock('pg', () => {
  const mPool = { connect: jest.fn(), query: jest.fn(), end: jest.fn() };
  return { Pool: jest.fn(() => mPool) };
});

// ─── Mock @prisma/adapter-pg ───────────────────────────────────────────────────
jest.mock('@prisma/adapter-pg', () => ({
  PrismaPg: jest.fn().mockImplementation(() => ({})),
}));

// ─── Mock the generated Prisma Client ─────────────────────────────────────────
const mockFindUnique = jest.fn<any>();
const mockUpsert = jest.fn<any>();
jest.mock('../generated/prisma/client/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      userProfile: {
        findUnique: mockFindUnique,
      },
      dailyMealPlan: {
        upsert: mockUpsert,
      },
    })),
  };
});

// ─── Mock OpenAI ──────────────────────────────────────────────────────────────
const mockCreate = jest.fn<any>();
jest.mock('openai', () => {
  const MockOpenAI = jest.fn().mockImplementation(() => ({
    chat: {
      completions: {
        create: mockCreate,
      },
    },
  }));
  return { __esModule: true, default: MockOpenAI };
});

// ─── Import After Mocks ────────────────────────────────────────────────────────
import { MealPlanService } from '../services/meal-plan.service';

// ─── Shared Mock Data ──────────────────────────────────────────────────────────
const MOCK_PROFILE = {
  userId: 'user-123',
  targetCalories: 2500,
  targetProtein: 180,
  targetCarbs: 250,
  targetFat: 70,
  goal: 'Muscle Gain',
};

const MOCK_MEAL_PLAN_JSON = {
  thought_process: 'Breakfast 25% = 625 kcal / 45g protein / 62g carbs / 17.5g fat. Lunch 35% = 875 kcal / 63g protein / 87g carbs / 24.5g fat. Dinner 40% = 1000 kcal / 72g protein / 101g carbs / 28g fat.',
  meals: [
    {
      meal_name: 'Breakfast',
      foods: [
        { name: 'Oatmeal', weight_grams: 80, calories: 300, protein: 10, carbs: 54, fat: 5 },
        { name: 'Eggs (Boiled)', weight_grams: 120, calories: 186, protein: 15, carbs: 1, fat: 13 },
        { name: 'Banana', weight_grams: 100, calories: 89, protein: 1, carbs: 23, fat: 0 },
      ],
    },
    {
      meal_name: 'Lunch',
      foods: [
        { name: 'Grilled Chicken Breast', weight_grams: 200, calories: 330, protein: 62, carbs: 0, fat: 7 },
        { name: 'Brown Rice (Cooked)', weight_grams: 200, calories: 220, protein: 5, carbs: 46, fat: 2 },
        { name: 'Broccoli', weight_grams: 150, calories: 51, protein: 4, carbs: 10, fat: 1 },
      ],
    },
    {
      meal_name: 'Dinner',
      foods: [
        { name: 'Salmon Fillet', weight_grams: 200, calories: 412, protein: 40, carbs: 0, fat: 27 },
        { name: 'Sweet Potato', weight_grams: 200, calories: 172, protein: 3, carbs: 40, fat: 0 },
        { name: 'Olive Oil', weight_grams: 10, calories: 88, protein: 0, carbs: 0, fat: 10 },
      ],
    },
  ],
  totals: { calories: 1848, protein: 140, carbs: 174, fat: 65 },
};

// ─── Tests ─────────────────────────────────────────────────────────────────────
describe('TC-US05: AI-Generated Daily Meal Plan', () => {
  let service: MealPlanService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new MealPlanService();
  });

  // TC-US05-01: System prompt should be correctly built from user targets
  it('TC-US05-01: buildSystemPrompt should inject all macro targets into prompt', () => {
    const prompt = service.buildSystemPrompt(MOCK_PROFILE);

    expect(prompt).toContain('2500');
    expect(prompt).toContain('180');
    expect(prompt).toContain('250');
    expect(prompt).toContain('70');
    expect(prompt).toContain('Muscle Gain');
    expect(prompt).toContain('thought_process');
    expect(prompt).toContain('meals');
  });

  // TC-US05-02: fetchUserTargets should throw for user with no profile
  it('TC-US05-02: fetchUserTargets should return null when user has no profile', async () => {
    mockFindUnique.mockResolvedValue(null);

    const result = await service.fetchUserTargets('no-profile-user');
    expect(result).toBeNull();
  });

  // TC-US05-03: fetchUserTargets should return correct MacroTargets for existing user
  it('TC-US05-03: fetchUserTargets should return correct MacroTargets for existing user', async () => {
    mockFindUnique.mockResolvedValue(MOCK_PROFILE);

    const result = await service.fetchUserTargets('user-123');

    expect(result).not.toBeNull();
    expect(result!.targetCalories).toBe(2500);
    expect(result!.targetProtein).toBe(180);
    expect(result!.targetCarbs).toBe(250);
    expect(result!.targetFat).toBe(70);
    expect(result!.goal).toBe('Muscle Gain');
  });

  // TC-US05-04: generateMealPlan should throw for user with no profile
  it('TC-US05-04: generateMealPlan should throw for user with no profile setup', async () => {
    mockFindUnique.mockResolvedValue(null);

    await expect(service.generateMealPlan('new-user-no-profile'))
      .rejects
      .toThrow('User profile not found. Please complete your profile setup first.');
  });

  // TC-US05-05: generateMealPlan should call OpenAI with json_object format
  it('TC-US05-05: generateMealPlan should call OpenAI with json_object response format', async () => {
    mockFindUnique.mockResolvedValue(MOCK_PROFILE);
    mockCreate.mockResolvedValue({
      choices: [{ message: { content: JSON.stringify(MOCK_MEAL_PLAN_JSON) } }],
    });

    await service.generateMealPlan('user-123');

    expect(mockCreate).toHaveBeenCalledTimes(1);
    const callArgs = mockCreate.mock.calls[0][0] as any;
    expect(callArgs.response_format).toEqual({ type: 'json_object' });
    expect(callArgs.model).toBe('gpt-4o-mini');
  });

  // TC-US05-06: generateMealPlan should return structured meal plan with all required keys
  it('TC-US05-06: generateMealPlan should return result with thought_process and meals array', async () => {
    mockFindUnique.mockResolvedValue(MOCK_PROFILE);
    mockCreate.mockResolvedValue({
      choices: [{ message: { content: JSON.stringify(MOCK_MEAL_PLAN_JSON) } }],
    });

    const result = await service.generateMealPlan('user-123');

    expect(result).toHaveProperty('thought_process');
    expect(typeof result.thought_process).toBe('string');
    expect(result.thought_process.length).toBeGreaterThan(10);

    expect(result).toHaveProperty('meals');
    expect(Array.isArray(result.meals)).toBe(true);
    expect(result.meals.length).toBe(3);
  });

  // TC-US05-07: meals should contain Breakfast, Lunch, and Dinner
  it('TC-US05-07: meals array should contain Breakfast, Lunch, and Dinner', async () => {
    mockFindUnique.mockResolvedValue(MOCK_PROFILE);
    mockCreate.mockResolvedValue({
      choices: [{ message: { content: JSON.stringify(MOCK_MEAL_PLAN_JSON) } }],
    });

    const result = await service.generateMealPlan('user-123');
    const mealNames = result.meals.map((m: any) => m.meal_name);

    expect(mealNames).toContain('Breakfast');
    expect(mealNames).toContain('Lunch');
    expect(mealNames).toContain('Dinner');
  });

  // TC-US05-08: each food item should have required nutrition fields
  it('TC-US05-08: each food item should have name, weight_grams, calories, protein, carbs, fat', async () => {
    mockFindUnique.mockResolvedValue(MOCK_PROFILE);
    mockCreate.mockResolvedValue({
      choices: [{ message: { content: JSON.stringify(MOCK_MEAL_PLAN_JSON) } }],
    });

    const result = await service.generateMealPlan('user-123');

    for (const meal of result.meals) {
      expect(meal).toHaveProperty('meal_name');
      expect(Array.isArray(meal.foods)).toBe(true);
      expect(meal.foods.length).toBeGreaterThan(0);

      for (const food of meal.foods) {
        expect(food).toHaveProperty('name');
        expect(food).toHaveProperty('weight_grams');
        expect(food).toHaveProperty('calories');
        expect(food).toHaveProperty('protein');
        expect(food).toHaveProperty('carbs');
        expect(food).toHaveProperty('fat');
        expect(typeof food.calories).toBe('number');
        expect(typeof food.protein).toBe('number');
      }
    }
  });

  // TC-US05-09: generateMealPlan should throw if AI returns invalid JSON
  it('TC-US05-09: generateMealPlan should throw on invalid AI JSON response', async () => {
    mockFindUnique.mockResolvedValue(MOCK_PROFILE);
    mockCreate.mockResolvedValue({
      choices: [{ message: { content: 'This is not JSON at all!' } }],
    });

    await expect(service.generateMealPlan('user-123'))
      .rejects
      .toThrow('AI returned invalid JSON. Please try again.');
  });

  // TC-US05-10: generateMealPlan should throw if AI JSON is missing meals
  it('TC-US05-10: generateMealPlan should throw if AI JSON is missing meals array', async () => {
    mockFindUnique.mockResolvedValue(MOCK_PROFILE);
    mockCreate.mockResolvedValue({
      choices: [{ message: { content: JSON.stringify({ thought_process: 'thinking...' }) } }],
    });

    await expect(service.generateMealPlan('user-123'))
      .rejects
      .toThrow('AI response missing meals array.');
  });
});

// ─── Controller Route Tests ───────────────────────────────────────────────────
import { MealPlanController } from '../controllers/meal-plan.controller';
import { Response } from 'express';

describe('TC-US05: MealPlanController', () => {
  let controller: MealPlanController;
  let mockReq: any;
  let mockRes: any;
  let mockNext: any;

  beforeEach(() => {
    jest.clearAllMocks();
    controller = new MealPlanController();
    mockReq = {
      user: { userId: 'user-123' },
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    mockNext = jest.fn();
  });

  it('TC-US05-11: should return 401 if req.user is missing', async () => {
    mockReq.user = undefined;

    await controller.generateMealPlan(mockReq, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        message: 'Unauthorized',
      })
    );
  });

  it('TC-US05-12: should return 200 and generated meal plan on success', async () => {
    mockFindUnique.mockResolvedValue(MOCK_PROFILE);
    mockCreate.mockResolvedValue({
      choices: [{ message: { content: JSON.stringify(MOCK_MEAL_PLAN_JSON) } }],
    });

    await controller.generateMealPlan(mockReq, mockRes as Response, mockNext);

    expect(mockRes.json).toHaveBeenCalledWith({
      success: true,
      data: MOCK_MEAL_PLAN_JSON,
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('TC-US05-13: should delegate service errors to next function', async () => {
    mockFindUnique.mockRejectedValue(new Error('Database offline'));

    await controller.generateMealPlan(mockReq, mockRes as Response, mockNext);

    expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
    expect(mockNext.mock.calls[0][0].message).toBe('Database offline');
  });
});

