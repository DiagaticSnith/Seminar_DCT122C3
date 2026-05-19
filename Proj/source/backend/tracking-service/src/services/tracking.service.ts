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
          { name: 'Grilled Chicken Breast', baseServingSize: 100, baseCalories: 165, baseProtein: 31.0, baseCarbs: 0.0, baseFat: 3.6 },
          { name: 'Grilled Sirloin Steak', baseServingSize: 100, baseCalories: 244, baseProtein: 27.0, baseCarbs: 0.0, baseFat: 15.0 },
          { name: 'Baked Salmon Fillet', baseServingSize: 100, baseCalories: 206, baseProtein: 22.0, baseCarbs: 0.0, baseFat: 13.0 },
          { name: 'Canned Tuna (in Water)', baseServingSize: 100, baseCalories: 116, baseProtein: 26.0, baseCarbs: 0.0, baseFat: 1.0 },
          { name: 'Boiled Whole Egg', baseServingSize: 100, baseCalories: 155, baseProtein: 13.0, baseCarbs: 1.1, baseFat: 11.0 },
          { name: 'Liquid Egg Whites', baseServingSize: 100, baseCalories: 52, baseProtein: 11.0, baseCarbs: 0.7, baseFat: 0.2 },
          { name: 'Whey Protein Isolate', baseServingSize: 30, baseCalories: 120, baseProtein: 25.0, baseCarbs: 1.0, baseFat: 0.5 },
          { name: 'Greek Yogurt (0% Fat)', baseServingSize: 100, baseCalories: 59, baseProtein: 10.0, baseCarbs: 3.6, baseFat: 0.4 },
          { name: 'Cottage Cheese (Low Fat)', baseServingSize: 100, baseCalories: 84, baseProtein: 11.0, baseCarbs: 4.3, baseFat: 2.3 },
          { name: 'Firm Tofu', baseServingSize: 100, baseCalories: 144, baseProtein: 17.0, baseCarbs: 2.8, baseFat: 8.7 },
          { name: 'Cooked Brown Rice', baseServingSize: 100, baseCalories: 112, baseProtein: 2.6, baseCarbs: 23.5, baseFat: 0.9 },
          { name: 'Cooked Jasmine Rice', baseServingSize: 100, baseCalories: 130, baseProtein: 2.7, baseCarbs: 28.0, baseFat: 0.3 },
          { name: 'Baked Sweet Potato', baseServingSize: 100, baseCalories: 86, baseProtein: 1.6, baseCarbs: 20.0, baseFat: 0.1 },
          { name: 'Raw Rolled Oats', baseServingSize: 100, baseCalories: 389, baseProtein: 16.9, baseCarbs: 66.3, baseFat: 6.9 },
          { name: 'Cooked Quinoa', baseServingSize: 100, baseCalories: 120, baseProtein: 4.4, baseCarbs: 21.3, baseFat: 1.9 },
          { name: 'Whole Wheat Bread (1 slice)', baseServingSize: 100, baseCalories: 247, baseProtein: 13.0, baseCarbs: 41.0, baseFat: 3.4 },
          { name: 'White Bread (1 slice)', baseServingSize: 100, baseCalories: 265, baseProtein: 9.0, baseCarbs: 49.0, baseFat: 3.2 },
          { name: 'Fresh Banana', baseServingSize: 100, baseCalories: 89, baseProtein: 1.1, baseCarbs: 22.8, baseFat: 0.3 },
          { name: 'Fresh Red Apple', baseServingSize: 100, baseCalories: 52, baseProtein: 0.3, baseCarbs: 13.8, baseFat: 0.2 },
          { name: 'Fresh Blueberries', baseServingSize: 100, baseCalories: 57, baseProtein: 0.7, baseCarbs: 14.5, baseFat: 0.3 },
          { name: 'Fresh Avocado', baseServingSize: 100, baseCalories: 160, baseProtein: 2.0, baseCarbs: 8.5, baseFat: 14.7 },
          { name: 'Raw Almonds', baseServingSize: 100, baseCalories: 579, baseProtein: 21.2, baseCarbs: 21.6, baseFat: 49.9 },
          { name: 'Natural Peanut Butter', baseServingSize: 100, baseCalories: 588, baseProtein: 25.0, baseCarbs: 20.0, baseFat: 50.0 },
          { name: 'Extra Virgin Olive Oil', baseServingSize: 100, baseCalories: 884, baseProtein: 0.0, baseCarbs: 0.0, baseFat: 100.0 },
          { name: 'Steamed Broccoli', baseServingSize: 100, baseCalories: 35, baseProtein: 2.4, baseCarbs: 7.0, baseFat: 0.4 },
          { name: 'Raw Baby Spinach', baseServingSize: 100, baseCalories: 23, baseProtein: 2.9, baseCarbs: 3.6, baseFat: 0.4 },
          { name: 'Skimmed Milk', baseServingSize: 100, baseCalories: 35, baseProtein: 3.4, baseCarbs: 5.0, baseFat: 0.1 },
          { name: 'Whole Milk', baseServingSize: 100, baseCalories: 61, baseProtein: 3.2, baseCarbs: 4.8, baseFat: 3.3 },
          { name: 'Chicken Breast Stir-Fry', baseServingSize: 100, baseCalories: 140, baseProtein: 18.0, baseCarbs: 6.0, baseFat: 5.0 },
          { name: 'Chocolate Protein Bar', baseServingSize: 60, baseCalories: 220, baseProtein: 20.0, baseCarbs: 24.0, baseFat: 7.0 },
          { name: 'Lean Ground Turkey', baseServingSize: 100, baseCalories: 149, baseProtein: 24.0, baseCarbs: 0.0, baseFat: 6.0 },
          { name: 'Baked Tilapia Fillet', baseServingSize: 100, baseCalories: 128, baseProtein: 26.0, baseCarbs: 0.0, baseFat: 2.7 },
          { name: 'Organic Chia Seeds', baseServingSize: 100, baseCalories: 486, baseProtein: 16.5, baseCarbs: 42.1, baseFat: 30.7 },
          { name: 'Raw Walnuts', baseServingSize: 100, baseCalories: 654, baseProtein: 15.2, baseCarbs: 13.7, baseFat: 65.2 }
        ]
      });
    }

    const exCount = await prisma.masterExercise.count();
    if (exCount === 0) {
      await prisma.masterExercise.createMany({
        data: [
          // Chest
          { name: 'Barbell Bench Press', category: 'Chest', tags: ['Gym', 'Bodybuilding'], youtubeLink: 'https://www.youtube.com/watch?v=vcBig73ojpE' },
          { name: 'Incline Dumbbell Press', category: 'Chest', tags: ['Gym', 'Bodybuilding'], youtubeLink: 'https://www.youtube.com/watch?v=0G2_XV7slIg' },
          { name: 'Flat Dumbbell Fly', category: 'Chest', tags: ['Gym', 'Bodybuilding'], youtubeLink: 'https://www.youtube.com/watch?v=eozdVDA78K0' },
          { name: 'Standard Push-Ups', category: 'Chest', tags: ['Home', 'Calisthenics', 'Beginner'], youtubeLink: 'https://www.youtube.com/watch?v=IODxDxX7oi4' },
          { name: 'Chest Dips', category: 'Chest', tags: ['Gym', 'Calisthenics'], youtubeLink: 'https://www.youtube.com/watch?v=2z8JmcrW-As' },
          // Back
          { name: 'Lat Pulldown', category: 'Back', tags: ['Gym', 'Bodybuilding'], youtubeLink: 'https://www.youtube.com/watch?v=EUIri47Epcg' },
          { name: 'Barbell Bent Over Row', category: 'Back', tags: ['Gym', 'Bodybuilding'], youtubeLink: 'https://www.youtube.com/watch?v=kBWAon7ItDw' },
          { name: 'One-Arm Dumbbell Row', category: 'Back', tags: ['Gym', 'Bodybuilding'], youtubeLink: 'https://www.youtube.com/watch?v=pYcpY20QaE8' },
          { name: 'Pull-ups', category: 'Back', tags: ['Gym', 'Calisthenics'], youtubeLink: 'https://www.youtube.com/watch?v=eGo4IYlbE5g' },
          { name: 'Seated Cable Row', category: 'Back', tags: ['Gym', 'Bodybuilding'], youtubeLink: 'https://www.youtube.com/watch?v=xQNrFHEMhI4' },
          { name: 'Conventional Deadlift', category: 'Back', tags: ['Gym', 'Bodybuilding'], youtubeLink: 'https://www.youtube.com/watch?v=op9kVnSso6Q' },
          // Legs
          { name: 'Barbell Squat', category: 'Legs', tags: ['Gym', 'Bodybuilding'], youtubeLink: 'https://www.youtube.com/watch?v=bEv6CCg2BC8' },
          { name: 'Romanian Deadlift', category: 'Legs', tags: ['Gym', 'Bodybuilding'], youtubeLink: 'https://www.youtube.com/watch?v=XxWcirHIwVo' },
          { name: 'Leg Press', category: 'Legs', tags: ['Gym'], youtubeLink: 'https://www.youtube.com/watch?v=IZxyjW7MPJQ' },
          { name: 'Lying Leg Curl', category: 'Legs', tags: ['Gym'], youtubeLink: 'https://www.youtube.com/watch?v=Orxowest56U' },
          { name: 'Walking Lunges', category: 'Legs', tags: ['Gym', 'Home'], youtubeLink: 'https://www.youtube.com/watch?v=D7KaRcUTQeE' },
          { name: 'Standing Calf Raises', category: 'Legs', tags: ['Gym', 'Home', 'Calisthenics'], youtubeLink: 'https://www.youtube.com/watch?v=YMmgqO8Jo-k' },
          { name: 'Bodyweight Air Squats', category: 'Legs', tags: ['Home', 'Calisthenics', 'Beginner'], youtubeLink: 'https://www.youtube.com/watch?v=aclHkVaku9U' },
          // Shoulders
          { name: 'Overhead Barbell Press', category: 'Shoulders', tags: ['Gym', 'Bodybuilding'], youtubeLink: 'https://www.youtube.com/watch?v=2yjwXTZQDDI' },
          { name: 'Dumbbell Lateral Raise', category: 'Shoulders', tags: ['Gym', 'Home'], youtubeLink: 'https://www.youtube.com/watch?v=kDqklk1ZESo' },
          { name: 'Dumbbell Shoulder Press', category: 'Shoulders', tags: ['Gym', 'Home'], youtubeLink: 'https://www.youtube.com/watch?v=qEwKCR5JCog' },
          { name: 'Face Pulls', category: 'Shoulders', tags: ['Gym'], youtubeLink: 'https://www.youtube.com/watch?v=HSoHeSjvIdY' },
          // Arms
          { name: 'Barbell Bicep Curl', category: 'Arms', tags: ['Gym', 'Bodybuilding'], youtubeLink: 'https://www.youtube.com/watch?v=QZEqB6wUPxQ' },
          { name: 'Incline Dumbbell Bicep Curl', category: 'Arms', tags: ['Gym'], youtubeLink: 'https://www.youtube.com/watch?v=aTYlqC_JacQ' },
          { name: 'Tricep Rope Pushdown', category: 'Arms', tags: ['Gym'], youtubeLink: 'https://www.youtube.com/watch?v=kiuVA0gs3EI' },
          { name: 'Tricep Overhead Extension', category: 'Arms', tags: ['Gym', 'Home'], youtubeLink: 'https://www.youtube.com/watch?v=YbX7Wd8jQ-Q' },
          // Cardio
          { name: 'HIIT Sprint Intervals', category: 'Cardio', tags: ['Cardio', 'Home'], youtubeLink: 'https://www.youtube.com/watch?v=ml6cT4AZdqI' },
          { name: 'Jump Rope', category: 'Cardio', tags: ['Cardio', 'Home'], youtubeLink: 'https://www.youtube.com/watch?v=u3zgHI8QnqE' },
          { name: 'Burpees', category: 'Cardio', tags: ['Cardio', 'Home', 'Calisthenics'], youtubeLink: 'https://www.youtube.com/watch?v=dZgVxmf6jkA' },
          { name: 'Treadmill Run', category: 'Cardio', tags: ['Gym', 'Cardio'], youtubeLink: 'https://www.youtube.com/watch?v=_kGESn8ArrU' },
          { name: 'Stationary Bike', category: 'Cardio', tags: ['Gym', 'Cardio'], youtubeLink: 'https://www.youtube.com/watch?v=fQqndzvURAU' },
          // Yoga
          { name: 'Sun Salutation (Surya Namaskar)', category: 'Yoga', tags: ['Yoga', 'Home', 'Beginner'], youtubeLink: 'https://www.youtube.com/watch?v=73sjOu0g58M' },
          { name: 'Downward Dog Pose', category: 'Yoga', tags: ['Yoga', 'Home', 'Beginner'], youtubeLink: 'https://www.youtube.com/watch?v=Y0GDgQqt-bA' },
          { name: 'Warrior II Pose', category: 'Yoga', tags: ['Yoga', 'Home'], youtubeLink: 'https://www.youtube.com/watch?v=4Ejz7IgODlU' },
          { name: 'Child\'s Pose', category: 'Yoga', tags: ['Yoga', 'Home', 'Beginner'], youtubeLink: 'https://www.youtube.com/watch?v=2MJGg-dUKh0' },
          { name: 'Tree Pose', category: 'Yoga', tags: ['Yoga', 'Home'], youtubeLink: 'https://www.youtube.com/watch?v=wdln9qWYloU' },
          { name: 'Cobra Pose (Bhujangasana)', category: 'Yoga', tags: ['Yoga', 'Home', 'Beginner'], youtubeLink: 'https://www.youtube.com/watch?v=Y8UNFem5qHc' }
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

  async logFood(
    userId: string,
    foodId: string | undefined,
    grams: number,
    customFood?: { name: string; calories: number; protein: number; carbs: number; fat: number }
  ) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let food;
    if (foodId) {
      food = await prisma.masterFood.findUnique({ where: { id: foodId } });
    } else if (customFood) {
      // Find or dynamically create the food item in the master dictionary
      food = await prisma.masterFood.findFirst({
        where: { name: { equals: customFood.name, mode: 'insensitive' } }
      });
      if (!food) {
        // Base serving size defaults to 100g, and we scale the macros so base values represent 100g serving
        food = await prisma.masterFood.create({
          data: {
            name: customFood.name,
            baseServingSize: 100,
            baseCalories: customFood.calories,
            baseProtein: customFood.protein,
            baseCarbs: customFood.carbs,
            baseFat: customFood.fat
          }
        });
      }
    }

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
          foodId: food.id,
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

  async checkinWorkout(userId: string, workoutLogId: string) {
    const log = await prisma.workoutLog.findFirst({
      where: {
        id: workoutLogId,
        dailyLog: { userId }
      }
    });
    if (!log) throw new Error("Workout log not found or unauthorized");

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

    if (dailyLog.workoutLogs.length === 0 && workoutStyle !== 'None' && workoutStyle !== 'Diet Only') {
      // Find exercises matching workoutStyle
      const styleTag = workoutStyle === 'Yoga' ? 'Yoga' : workoutStyle === 'Cardio' ? 'Cardio' : 'Bodybuilding';
      const exercises = await prisma.masterExercise.findMany({
        where: { tags: { has: styleTag } }
      });

      for (const ex of exercises) {
        await prisma.workoutLog.create({
          data: {
            dailyLogId: dailyLog!.id,
            exerciseId: ex.id,
            sets: styleTag === 'Yoga' ? 1 : 4,
            reps: styleTag === 'Yoga' ? 1 : 12,
          }
        });
      }

      // Reload dailyLog
      dailyLog = await prisma.dailyLog.findUnique({
        where: { id: dailyLog!.id },
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

  async swapExercise(userId: string, swapFrom: string, swapTo: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Automatically initialize schedule if not present yet to avoid race conditions
    await this.getSchedule(userId, 'Bodybuilding');

    const dailyLog = await prisma.dailyLog.findUnique({
      where: { userId_date: { userId, date: today } }
    });
    if (!dailyLog) throw new Error("Daily log not found");

    const workoutLogs = await prisma.workoutLog.findMany({
      where: { dailyLogId: dailyLog.id },
      include: { exercise: true }
    });

    // 1. Exact Name Match
    let targetLog = workoutLogs.find(
      log => log.exercise.name.toLowerCase() === swapFrom.toLowerCase()
    );

    // 2. Fuzzy Name Match (contains)
    if (!targetLog) {
      targetLog = workoutLogs.find(
        log => log.exercise.name.toLowerCase().includes(swapFrom.toLowerCase()) ||
               swapFrom.toLowerCase().includes(log.exercise.name.toLowerCase())
      );
    }

    // 3. Category Match (if swapFrom matches or contains the category, e.g. "Shoulder exercises" matches category "Shoulders")
    if (!targetLog) {
      targetLog = workoutLogs.find(
        log => {
          const category = log.exercise.category.toLowerCase();
          const cleanSwapFrom = swapFrom.toLowerCase();
          return category.includes(cleanSwapFrom) || 
                 cleanSwapFrom.includes(category) ||
                 category.replace(/s$/, '').includes(cleanSwapFrom.replace(/s$/, '')) ||
                 cleanSwapFrom.replace(/s$/, '').includes(category.replace(/s$/, ''));
        }
      );
    }

    // 4. Word-by-word Match on name/category (fallback)
    if (!targetLog) {
      const swapFromWords = swapFrom.toLowerCase().split(/\s+/).filter(w => w.length > 3);
      targetLog = workoutLogs.find(
        log => {
          const name = log.exercise.name.toLowerCase();
          const category = log.exercise.category.toLowerCase();
          return swapFromWords.some(word => name.includes(word) || category.includes(word));
        }
      );
    }

    if (!targetLog) throw new Error(`Exercise '${swapFrom}' not found in today's workout`);

    // Fuzzy matching for swapTo
    let newExercise = await prisma.masterExercise.findFirst({
      where: { name: { equals: swapTo, mode: 'insensitive' } }
    });

    if (!newExercise) {
      newExercise = await prisma.masterExercise.findFirst({
        where: { name: { contains: swapTo, mode: 'insensitive' } }
      });
    }

    if (!newExercise) {
      let category = targetLog.exercise.category; // fallback
      const nameLower = swapTo.toLowerCase();
      
      if (nameLower.includes('leg') || nameLower.includes('squat') || nameLower.includes('lung') || nameLower.includes('calf') || nameLower.includes('quad') || nameLower.includes('hamstring')) {
        category = 'Legs';
      } else if (nameLower.includes('chest') || nameLower.includes('bench') || nameLower.includes('pushup') || nameLower.includes('fly') || nameLower.includes('pec')) {
        category = 'Chest';
      } else if (nameLower.includes('shoulder') || nameLower.includes('overhead') || nameLower.includes('press') || nameLower.includes('lateral') || nameLower.includes('deltoid')) {
        category = 'Shoulders';
      } else if (nameLower.includes('back') || nameLower.includes('row') || nameLower.includes('pull') || nameLower.includes('deadlift') || nameLower.includes('lats')) {
        category = 'Back';
      } else if (nameLower.includes('cardio') || nameLower.includes('sprint') || nameLower.includes('run') || nameLower.includes('jump') || nameLower.includes('rope') || nameLower.includes('treadmill')) {
        category = 'Cardio';
      } else if (nameLower.includes('yoga') || nameLower.includes('pose') || nameLower.includes('stretch') || nameLower.includes('flex')) {
        category = 'Flexibility';
      }

      newExercise = await prisma.masterExercise.create({
        data: {
          name: swapTo,
          category,
          tags: category === 'Cardio' ? ['Cardio', 'Home'] : category === 'Flexibility' ? ['Yoga', 'Home'] : ['Gym', 'Bodybuilding'],
          youtubeLink: null
        }
      });
    }

    return prisma.workoutLog.update({
      where: { id: targetLog.id },
      data: { exerciseId: newExercise.id },
      include: { exercise: true }
    });
  }

  async getAnalytics(userId: string, token?: string) {
    let currentWeight = 70.0;
    let targetCalories = 2500;

    if (token) {
      try {
        const response = await fetch('http://localhost:3001/api/user/me/metrics', {
          headers: {
            'Authorization': token
          }
        });
        if (response.ok) {
          const profile: any = await response.json();
          currentWeight = profile.weight || 70.0;
          targetCalories = profile.targetCalories || 2500;
        }
      } catch (err) {
        console.error("Failed to fetch user metrics in getAnalytics:", err);
      }
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);

    const logs = await prisma.dailyLog.findMany({
      where: {
        userId,
        date: { gte: thirtyDaysAgo, lte: today }
      },
      orderBy: { date: 'asc' }
    });

    const logMap = new Map<string, any>();
    for (const log of logs) {
      // Normalize date to YYYY-MM-DD
      const dateKey = new Date(log.date).toISOString().split('T')[0];
      logMap.set(dateKey, log);
    }

    // Find the earliest logged weight in our 30-day logs or fall back to currentWeight
    let lastKnownWeight = currentWeight;
    for (const log of logs) {
      if (log.weight !== null && log.weight !== undefined && log.weight > 0) {
        lastKnownWeight = log.weight;
        break;
      }
    }

    const analyticsData = [];
    // Loop chronologically from 29 days ago to today (chronologically ascending)
    for (let i = 29; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dateKey = d.toISOString().split('T')[0];

      const log = logMap.get(dateKey);
      const daily_calories = log ? log.caloriesConsumed : 0;

      let daily_weight = lastKnownWeight;
      if (log && log.weight !== null && log.weight !== undefined && log.weight > 0) {
        daily_weight = log.weight;
        lastKnownWeight = log.weight;
      } else {
        // Carry forward the lastKnownWeight for intermediate days
        daily_weight = lastKnownWeight;

        // If this is today, ensure it uses currentWeight and saves to today's log if null
        if (dateKey === today.toISOString().split('T')[0]) {
          daily_weight = currentWeight;
          lastKnownWeight = currentWeight;

          if (log && !log.weight) {
            try {
              await prisma.dailyLog.update({
                where: { id: log.id },
                data: { weight: currentWeight }
              });
            } catch (e) {
              console.error("Failed to update weight in dailyLog:", e);
            }
          }
        }
      }

      analyticsData.push({
        date: dateKey,
        daily_calories,
        daily_weight,
        targetCalories
      });
    }

    return analyticsData;
  }

  async logCustom(
    userId: string,
    data: { name: string; calories: number; protein: number; carbs: number; fat: number; grams?: number }
  ) {
    const { name, calories, protein, carbs, fat, grams = 100 } = data;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let food = await prisma.masterFood.findFirst({
      where: { name: { equals: name, mode: 'insensitive' } }
    });

    if (!food) {
      food = await prisma.masterFood.create({
        data: {
          name,
          baseServingSize: 100,
          baseCalories: calories,
          baseProtein: protein,
          baseCarbs: carbs,
          baseFat: fat
        }
      });
    }

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
          foodId: food.id,
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
}

