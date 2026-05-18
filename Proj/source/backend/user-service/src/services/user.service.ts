import 'dotenv/config';
import { PrismaClient } from '../generated/prisma/client/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export class UserService {
  async updateMetrics(userId: string, data: any) {
    const { height, weight, age, gender, activityLevel, workoutStyle, goal } = data;

    // Calculate BMR (Mifflin-St Jeor)
    let bmr = 10 * weight + 6.25 * height - 5 * age;
    if (gender === 'M') {
      bmr += 5;
    } else {
      bmr -= 161;
    }

    // Calculate TDEE
    const activityMultipliers: { [key: string]: number } = {
      'Sedentary': 1.2,
      'Light': 1.375,
      'Moderate': 1.55,
      'Very': 1.725,
      'Extra': 1.9
    };
    const tdee = Math.round(bmr * (activityMultipliers[activityLevel] || 1.2));

    // Calculate Targets based on Goal
    let targetCalories = tdee;
    let pPct = 0.3, cPct = 0.4, fPct = 0.3;

    if (goal === 'Fat Loss') {
      targetCalories -= 500;
      pPct = 0.4; cPct = 0.3; fPct = 0.3;
    } else if (goal === 'Muscle Gain') {
      targetCalories += 500;
      pPct = 0.3; cPct = 0.5; fPct = 0.2;
    }

    const targetProtein = Math.round((targetCalories * pPct) / 4);
    const targetCarbs = Math.round((targetCalories * cPct) / 4);
    const targetFat = Math.round((targetCalories * fPct) / 9);

    // Notify AI Coach if workout style changes (Mock for now)
    console.log(`[Event Trigger] Workout Style updated for user ${userId}. Notifying ai-coach-service...`);

    const profile = await prisma.userProfile.upsert({
      where: { userId },
      update: {
        height, weight, age, gender, activityLevel, workoutStyle, goal,
        targetCalories, targetProtein, targetCarbs, targetFat
      },
      create: {
        userId, height, weight, age, gender, activityLevel, workoutStyle, goal,
        targetCalories, targetProtein, targetCarbs, targetFat
      }
    });

    return profile;
  }
}
