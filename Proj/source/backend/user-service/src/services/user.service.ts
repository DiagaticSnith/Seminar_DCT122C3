import 'dotenv/config';
import { PrismaClient } from '../generated/prisma/client/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export class UserService {
  async updateMetrics(userId: string, data: any) {
    const { height, weight, age, gender, activityLevel, workoutStyle, goal, diet } = data;

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
    if (goal === 'Fat Loss') {
      targetCalories -= 500;
    } else if (goal === 'Muscle Gain') {
      targetCalories += 500;
    }

    // Ensure calories don't drop below a safe daily minimum (1200 kcal)
    if (targetCalories < 1200) {
      targetCalories = 1200;
    }

    let targetProtein = 0;
    let targetCarbs = 0;
    let targetFat = 0;

    const dietLower = (diet ?? 'Balanced').toLowerCase();

    if (dietLower === 'keto') {
      // Keto standard split: 20% Protein, 5% Carbs, 75% Fat
      targetProtein = Math.round((targetCalories * 0.20) / 4);
      targetCarbs = Math.round((targetCalories * 0.05) / 4);
      targetFat = Math.round((targetCalories * 0.75) / 9);
    } else if (dietLower === 'low carb') {
      // Low Carb standard split: 30% Protein, 20% Carbs, 50% Fat
      targetProtein = Math.round((targetCalories * 0.30) / 4);
      targetCarbs = Math.round((targetCalories * 0.20) / 4);
      targetFat = Math.round((targetCalories * 0.50) / 9);
    } else {
      // Balanced, Vegan, Vegetarian, etc.
      // Protein is calculated based on body weight for scientific accuracy and safety:
      // - Muscle Gain: 2.0g per kg of bodyweight
      // - Fat Loss: 2.2g per kg of bodyweight (to protect muscle mass in deficit)
      // - Maintenance / Default: 1.6g per kg of bodyweight
      let proteinMultiplier = 1.6;
      if (goal === 'Muscle Gain') {
        proteinMultiplier = 2.0;
      } else if (goal === 'Fat Loss') {
        proteinMultiplier = 2.2;
      }

      targetProtein = Math.round(weight * proteinMultiplier);
      
      // Safeguard protein limits (e.g. min 50g, max 200g) to keep targets realistic
      if (targetProtein < 50) targetProtein = 50;
      if (targetProtein > 200) targetProtein = 200;

      // Fat is set to a healthy 25% of calories
      targetFat = Math.round((targetCalories * 0.25) / 9);
      if (targetFat < 30) targetFat = 30; // Healthy fat floor

      // Carbs get the remaining calories
      const remainingCalories = targetCalories - (targetProtein * 4) - (targetFat * 9);
      targetCarbs = Math.round(remainingCalories / 4);
      if (targetCarbs < 20) targetCarbs = 20; // Healthy carbs floor
    }

    // Notify AI Coach if workout style changes (Mock for now)
    console.log(`[Event Trigger] Workout Style updated for user ${userId}. Notifying ai-coach-service...`);

    const profile = await prisma.userProfile.upsert({
      where: { userId },
      update: {
        height, weight, age, gender, activityLevel, workoutStyle, goal, diet,
        targetCalories, targetProtein, targetCarbs, targetFat
      },
      create: {
        userId, height, weight, age, gender, activityLevel, workoutStyle, goal, diet,
        targetCalories, targetProtein, targetCarbs, targetFat
      }
    });

    return profile;
  }

  async getMetrics(userId: string) {
    return prisma.userProfile.findUnique({ where: { userId } });
  }
}
