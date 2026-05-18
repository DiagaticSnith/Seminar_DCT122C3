import 'dotenv/config';
import { PrismaClient } from '../generated/prisma/client/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export class TrackingService {
  async seedIfEmpty() {
    const foodCount = await prisma.masterFood.count();
    if (foodCount === 0) {
      await prisma.masterFood.createMany({
        data: [
          { name: 'Grilled Chicken Breast', baseServingSize: 100, baseCalories: 165, baseProtein: 31, baseCarbs: 0, baseFat: 3.6 },
          { name: 'Brown Rice (Cooked)', baseServingSize: 100, baseCalories: 112, baseProtein: 2.6, baseCarbs: 23.5, baseFat: 0.9 },
          { name: 'Avocado', baseServingSize: 100, baseCalories: 160, baseProtein: 2, baseCarbs: 8.5, baseFat: 14.7 },
          { name: 'Whey Protein Isolate', baseServingSize: 30, baseCalories: 120, baseProtein: 25, baseCarbs: 1, baseFat: 0.5 },
          { name: 'Oatmeal', baseServingSize: 100, baseCalories: 68, baseProtein: 2.4, baseCarbs: 12, baseFat: 1.4 },
        ]
      });
    }

    const exCount = await prisma.masterExercise.count();
    if (exCount === 0) {
      await prisma.masterExercise.createMany({
        data: [
          // Bodybuilding / Gym
          { name: 'Barbell Bench Press', category: 'Chest', tags: ['Gym', 'Bodybuilding'], youtubeLink: 'https://www.youtube.com/watch?v=vcBig73ojpE' },
          { name: 'Barbell Squat', category: 'Legs', tags: ['Gym', 'Bodybuilding'], youtubeLink: 'https://www.youtube.com/watch?v=bEv6CCg2BC8' },
          { name: 'Dumbbell Shoulder Press', category: 'Shoulders', tags: ['Gym', 'Bodybuilding'], youtubeLink: 'https://www.youtube.com/watch?v=qEwKCR5JCog' },
          { name: 'Lat Pulldown', category: 'Back', tags: ['Gym', 'Bodybuilding'], youtubeLink: 'https://www.youtube.com/watch?v=EUIri47Epcg' },
          // Yoga
          { name: 'Sun Salutation (Surya Namaskar)', category: 'Full Body', tags: ['Yoga', 'Home'], youtubeLink: 'https://www.youtube.com/watch?v=1WbjJ8YJjbg' },
          { name: 'Downward Dog Pose', category: 'Flexibility', tags: ['Yoga', 'Home'], youtubeLink: 'https://www.youtube.com/watch?v=EC7RGJ975iM' },
          { name: 'Warrior II Pose', category: 'Legs', tags: ['Yoga', 'Home'], youtubeLink: 'https://www.youtube.com/watch?v=4EjG7mNGz08' },
          // Cardio
          { name: 'HIIT Sprint Intervals', category: 'Cardio', tags: ['Cardio', 'Home'], youtubeLink: 'https://www.youtube.com/watch?v=ml6cT4AZdqI' },
          { name: 'Jump Rope', category: 'Cardio', tags: ['Cardio', 'Home'], youtubeLink: 'https://www.youtube.com/watch?v=u3zgHI8QnqE' },
        ]
      });
    }
  }

  async getExercises() {
    await this.seedIfEmpty();
    return prisma.masterExercise.findMany();
  }

  async getFood() {
    await this.seedIfEmpty();
    return prisma.masterFood.findMany();
  }

  async logFood(userId: string, foodId: string, grams: number) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const food = await prisma.masterFood.findUnique({ where: { id: foodId } });
    if (!food) throw new Error("Food not found");

    const ratio = grams / food.baseServingSize;
    const calories = food.baseCalories * ratio;
    const protein = food.baseProtein * ratio;
    const carbs = food.baseCarbs * ratio;
    const fat = food.baseFat * ratio;

    // Use transaction to prevent race conditions
    return prisma.$transaction(async (tx) => {
      let dailyLog = await tx.dailyLog.findUnique({
        where: { userId_date: { userId, date: today } }
      });

      if (!dailyLog) {
        dailyLog = await tx.dailyLog.create({
          data: { userId, date: today }
        });
      }

      await tx.foodLog.create({
        data: {
          dailyLogId: dailyLog.id,
          foodId,
          grams,
          calories,
          protein,
          carbs,
          fat
        }
      });

      return tx.dailyLog.update({
        where: { id: dailyLog.id },
        data: {
          caloriesConsumed: { increment: calories },
          proteinConsumed: { increment: protein },
          carbsConsumed: { increment: carbs },
          fatConsumed: { increment: fat }
        }
      });
    });
  }

  async checkinWorkout(workoutLogId: string) {
    return prisma.workoutLog.update({
      where: { id: workoutLogId },
      data: { completed: true }
    });
  }

  async getSchedule(userId: string, workoutStyle: string) {
    await this.seedIfEmpty();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let dailyLog = await prisma.dailyLog.findUnique({
      where: { userId_date: { userId, date: today } },
      include: {
        workoutLogs: { include: { exercise: true } },
        foodLogs: { include: { food: true } }
      }
    });

    if (!dailyLog) {
      dailyLog = await prisma.dailyLog.create({
        data: { userId, date: today },
        include: {
          workoutLogs: { include: { exercise: true } },
          foodLogs: { include: { food: true } }
        }
      });
    }

    if (dailyLog.workoutLogs.length === 0) {
      // Find exercises matching workoutStyle (or default to Bodybuilding)
      const styleTag = workoutStyle === 'Yoga' ? 'Yoga' : workoutStyle === 'Cardio' ? 'Cardio' : 'Bodybuilding';
      const exercises = await prisma.masterExercise.findMany({
        where: { tags: { has: styleTag } }
      });

      for (const ex of exercises) {
        await prisma.workoutLog.create({
          data: {
            dailyLogId: dailyLog.id,
            exerciseId: ex.id,
            sets: styleTag === 'Yoga' ? 1 : 4,
            reps: styleTag === 'Yoga' ? 1 : 12,
          }
        });
      }

      // Reload dailyLog
      dailyLog = await prisma.dailyLog.findUnique({
        where: { id: dailyLog.id },
        include: {
          workoutLogs: { include: { exercise: true } },
          foodLogs: { include: { food: true } }
        }
      }) as any;
    }

    // Map to Polymorphic JSON
    const schedule = dailyLog!.workoutLogs.map(log => ({
      id: log.id,
      exerciseId: log.exerciseId,
      sets: log.sets,
      reps: log.reps,
      completed: log.completed,
      type: workoutStyle === 'Yoga' ? 'Yoga' : 'Gym',
      duration_seconds: workoutStyle === 'Yoga' ? 300 : undefined,
      exercise: log.exercise
    }));

    return {
      dailyLog: {
        id: dailyLog!.id,
        caloriesConsumed: dailyLog!.caloriesConsumed,
        proteinConsumed: dailyLog!.proteinConsumed,
        carbsConsumed: dailyLog!.carbsConsumed,
        fatConsumed: dailyLog!.fatConsumed,
        foodLogs: dailyLog!.foodLogs,
      },
      schedule
    };
  }

  async getAnalytics(userId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);

    return prisma.dailyLog.findMany({
      where: {
        userId,
        date: { gte: thirtyDaysAgo, lte: today }
      },
      include: {
        foodLogs: { include: { food: true } },
        workoutLogs: { include: { exercise: true } }
      },
      orderBy: { date: 'asc' }
    });
  }
}
