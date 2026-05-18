import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { UserService } from '../services/user.service';
import { PrismaClient } from '../generated/prisma/client/client';

jest.mock('../generated/prisma/client/client', () => {
  const mPrismaClient = {
    userProfile: {
      upsert: jest.fn().mockImplementation(async (args: any) => {
        return args.create;
      }),
    },
  };
  return { PrismaClient: jest.fn(() => mPrismaClient) };
});

describe('User Service - TC-CALC-01', () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
  });

  it('should calculate BMR and Macros accurately for a Male (Fat Loss)', async () => {
    const data = {
      height: 180,
      weight: 80,
      age: 30,
      gender: 'M',
      activityLevel: 'Moderate', // 1.55
      workoutStyle: 'Bodybuilding',
      goal: 'Fat Loss'
    };

    // BMR = 10 * 80 + 6.25 * 180 - 5 * 30 + 5
    // 800 + 1125 - 150 + 5 = 1780
    // TDEE = 1780 * 1.55 = 2759
    // Goal: Fat Loss -> Calories = 2759 - 500 = 2259
    // Protein (40%): 2259 * 0.4 / 4 = 226
    // Carbs (30%): 2259 * 0.3 / 4 = 169
    // Fat (30%): 2259 * 0.3 / 9 = 75

    const profile = await userService.updateMetrics('user-1', data);

    expect(profile.targetCalories).toBe(2259);
    expect(profile.targetProtein).toBe(226);
    expect(profile.targetCarbs).toBe(169);
    expect(profile.targetFat).toBe(75);
  });

  it('should calculate BMR and Macros accurately for a Female (Muscle Gain)', async () => {
    const data = {
      height: 160,
      weight: 60,
      age: 25,
      gender: 'F',
      activityLevel: 'Light', // 1.375
      workoutStyle: 'Cardio',
      goal: 'Muscle Gain'
    };

    // BMR = 10 * 60 + 6.25 * 160 - 5 * 25 - 161
    // 600 + 1000 - 125 - 161 = 1314
    // TDEE = 1314 * 1.375 = 1807
    // Goal: Muscle Gain -> Calories = 1807 + 500 = 2307
    // Protein (30%): 2307 * 0.3 / 4 = 173
    // Carbs (50%): 2307 * 0.5 / 4 = 288
    // Fat (20%): 2307 * 0.2 / 9 = 51

    const profile = await userService.updateMetrics('user-2', data);

    expect(profile.targetCalories).toBe(2307);
    expect(profile.targetProtein).toBe(173);
    expect(profile.targetCarbs).toBe(288);
    expect(profile.targetFat).toBe(51);
  });
});
