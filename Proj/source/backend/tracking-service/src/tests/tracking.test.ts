import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { TrackingService } from '../services/tracking.service';

jest.mock('../generated/prisma/client/client', () => {
  const mTx = jest.fn<any>(async (cb: any) => {
    return cb({
      dailyLog: {
        findUnique: jest.fn<any>().mockResolvedValue(null),
        create: jest.fn<any>().mockResolvedValue({ id: 'log-1' }),
        update: jest.fn<any>().mockImplementation((args: any) => args.data),
      },
      foodLog: {
        create: jest.fn<any>().mockResolvedValue(true),
      }
    });
  });

  return {
    PrismaClient: jest.fn<any>().mockImplementation(() => ({
      $transaction: mTx,
      masterFood: {
        findUnique: jest.fn<any>().mockResolvedValue({
          id: 'food-1',
          baseServingSize: 100,
          baseCalories: 250,
          baseProtein: 20,
          baseCarbs: 30,
          baseFat: 5,
        }),
        findFirst: jest.fn<any>().mockResolvedValue(null),
        create: jest.fn<any>().mockResolvedValue({
          id: 'custom-food-1',
          name: 'Custom Chicken',
          baseServingSize: 100,
          baseCalories: 150,
          baseProtein: 25,
          baseCarbs: 0,
          baseFat: 3,
        })
      }
    }))
  };
});

describe('Tracking Service - TC-TRACK-01', () => {
  let trackingService: TrackingService;

  beforeEach(() => {
    trackingService = new TrackingService();
  });

  it('should correctly calculate proportional macros for 150g of food and update daily log', async () => {
    const result: any = await trackingService.logFood('user-1', 'food-1', 150);

    // 150g is 1.5x of 100g base serving size
    expect(result.caloriesConsumed.increment).toBe(375); // 250 * 1.5
    expect(result.proteinConsumed.increment).toBe(30);   // 20 * 1.5
    expect(result.carbsConsumed.increment).toBe(45);     // 30 * 1.5
    expect(result.fatConsumed.increment).toBe(7.5);      // 5 * 1.5
  });

  it('should safely log custom food directly and increment daily calories/macros in a transaction', async () => {
    const result: any = await trackingService.logCustom('user-1', {
      name: 'Custom Chicken',
      calories: 150,
      protein: 25,
      carbs: 0,
      fat: 3
    });

    expect(result.caloriesConsumed.increment).toBe(150);
    expect(result.proteinConsumed.increment).toBe(25);
    expect(result.carbsConsumed.increment).toBe(0);
    expect(result.fatConsumed.increment).toBe(3);
  });
});
