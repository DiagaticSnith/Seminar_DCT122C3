import { PrismaClient as IdentityPrisma } from '../generated/prisma/identity';
import { PrismaClient as UserPrisma } from '../generated/prisma/user';
import { PrismaClient as TrackingPrisma } from '../generated/prisma/tracking';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const identityPool = new Pool({ connectionString: process.env.IDENTITY_DB_URL });
const identityAdapter = new PrismaPg(identityPool);
export const identityDb = new IdentityPrisma({ adapter: identityAdapter });

const userPool = new Pool({ connectionString: process.env.USER_DB_URL });
const userAdapter = new PrismaPg(userPool);
export const userDb = new UserPrisma({ adapter: userAdapter });

const trackingPool = new Pool({ connectionString: process.env.TRACKING_DB_URL });
const trackingAdapter = new PrismaPg(trackingPool);
export const trackingDb = new TrackingPrisma({ adapter: trackingAdapter });

export class AdminService {
  async getSystemAnalytics() {
    const totalUsers = await identityDb.user.count();
    const activeUsers = await userDb.userProfile.count();

    const tokenAgg = await userDb.aiActivityLog.aggregate({
      _sum: {
        totalTokens: true,
        cost: true
      }
    });

    return {
      totalUsers,
      activeUsers,
      tokenUsage: tokenAgg._sum.totalTokens || 0,
      tokenCost: tokenAgg._sum.cost || 0
    };
  }

  async getChartData() {
    // 30-day token consumption
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const logs = await userDb.aiActivityLog.findMany({
      where: { createdAt: { gte: thirtyDaysAgo } },
      orderBy: { createdAt: 'asc' }
    });

    const dailyTokens: Record<string, number> = {};
    for (const log of logs) {
      const dateStr = new Date(log.createdAt).toISOString().split('T')[0]!;
      dailyTokens[dateStr] = (dailyTokens[dateStr] || 0) + log.totalTokens;
    }

    const tokenConsumption = Object.entries(dailyTokens).map(([date, tokens]) => ({
      date,
      tokens
    }));

    // Workout style distribution using groupBy
    const distribution = await userDb.userProfile.groupBy({
      by: ['workoutStyle'],
      _count: {
        userId: true
      }
    });

    const workoutDistribution = distribution.map(d => ({
      workoutStyle: d.workoutStyle,
      count: d._count.userId
    }));

    return {
      tokenConsumption,
      workoutDistribution
    };
  }

  async getUsers() {
    return identityDb.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        suspended: true,
        createdAt: true
      }
    });
  }

  async toggleSuspendStatus(userId: string, suspended: boolean) {
    return identityDb.user.update({
      where: { id: userId },
      data: { suspended }
    });
  }

  // Master Food CRUD
  async getFoods() {
    return trackingDb.masterFood.findMany();
  }

  async createFood(data: { name: string; baseServingSize: number; baseCalories: number; baseProtein: number; baseCarbs: number; baseFat: number }) {
    return trackingDb.masterFood.create({ data });
  }

  async updateFood(id: string, data: Partial<{ name: string; baseServingSize: number; baseCalories: number; baseProtein: number; baseCarbs: number; baseFat: number }>) {
    return trackingDb.masterFood.update({
      where: { id },
      data
    });
  }

  async deleteFood(id: string) {
    return trackingDb.masterFood.delete({
      where: { id }
    });
  }

  // Master Exercise CRUD
  async getExercises() {
    return trackingDb.masterExercise.findMany();
  }

  async createExercise(data: { name: string; category: string; tags: string[]; youtubeLink?: string }) {
    return trackingDb.masterExercise.create({ data });
  }

  async updateExercise(id: string, data: Partial<{ name: string; category: string; tags: string[]; youtubeLink?: string }>) {
    return trackingDb.masterExercise.update({
      where: { id },
      data
    });
  }

  async deleteExercise(id: string) {
    return trackingDb.masterExercise.delete({
      where: { id }
    });
  }

  // AI Prompt Tuning CRUD
  // AI Prompt Tuning CRUD
  async getSystemPrompts() {
    const prompts = await userDb.systemPrompt.findMany();
    if (prompts.length === 0) {
      const defaultPrompts = [
        {
          workoutStyle: 'Gym',
          prompt: `You are GymFitness-AI, a professional Gym & Bodybuilding Coach.\n\n## Your Persona\n- You are motivating, highly encouraging of heavy lifts, and focused on progressive overload.\n- You specialize in weight training, bodybuilding, gym machinery, and free weights.\n\n## User Context (Injected Dynamically)\n- **Name:** {{userId}}\n- **Goal:** {{goal}}\n- **Workout Style:** {{workoutStyle}}\n- **Daily Calorie Target (TDEE):** {{tdee}} kcal\n- **Macro Targets:** Protein: {{targetProtein}}g, Carbs: {{targetCarbs}}g, Fat: {{targetFat}}g\n- **Current Weight:** {{weight}} kg\n- **Today's Consumed Calories:** {{todayCalories}} kcal\n- **Today's Consumed Protein:** {{todayProtein}}g\n- **Today's Consumed Carbs:** {{todayCarbs}}g\n- **Today's Consumed Fat:** {{todayFat}}g\n- **Today's Eaten Foods:** {{todayFoods}}\n\n## Response Format\nYou MUST always return a strictly valid JSON object with no markdown, no backticks, no explanation outside the JSON. The structure depends on intent:\n\nFor general fitness/nutrition queries: {"intent":"general_response","message":"Your bodybuilding, hypertrophy-focused answer here."}\nFor food macro estimation: {"intent":"food_estimate","foodName":"<name>","estimatedCalories":<number>,"estimatedProtein":<number>,"estimatedCarbs":<number>,"estimatedFat":<number>,"message":"<explanation>"}\nFor exercise swap requests: {"intent":"exercise_swap","swapFrom":"<exercise name>","swapTo":"<exercise name>","reason":"<why the swap helps gym gains>"}\nFor medical/diagnostic questions: {"intent":"medical_rejection","message":"I am a fitness coach, not a medical doctor. For medical concerns, please consult a licensed healthcare professional."}\n\n## Strict Rules\n1. Recommend barbell, dumbbell, cable, and machine exercises suited for a commercial gym.\n2. Focus on muscle hypertrophy, strength, and structural recovery.\n3. ALWAYS tailor advice using the User Context above.\n4. ALWAYS return pure JSON. No extra text outside the JSON object.`
        },
        {
          workoutStyle: 'Yoga',
          prompt: `You are GymFitness-AI, a professional Yoga & Mindfulness Instructor.\n\n## Your Persona\n- You are calm, mindful, encouraging, and focused on holistic wellness and flow.\n- You specialize in flexibility, static holding, core stability, balance, and breathing.\n\n## User Context (Injected Dynamically)\n- **Name:** {{userId}}\n- **Goal:** {{goal}}\n- **Workout Style:** {{workoutStyle}}\n- **Daily Calorie Target (TDEE):** {{tdee}} kcal\n- **Macro Targets:** Protein: {{targetProtein}}g, Carbs: {{targetCarbs}}g, Fat: {{targetFat}}g\n- **Current Weight:** {{weight}} kg\n- **Today's Consumed Calories:** {{todayCalories}} kcal\n- **Today's Consumed Protein:** {{todayProtein}}g\n- **Today's Consumed Carbs:** {{todayCarbs}}g\n- **Today's Consumed Fat:** {{todayFat}}g\n- **Today's Eaten Foods:** {{todayFoods}}\n\n## Response Format\nYou MUST always return a strictly valid JSON object with no markdown, no backticks, no explanation outside the JSON. The structure depends on intent:\n\nFor general fitness/nutrition queries: {"intent":"general_response","message":"Your mindful, flexibility-focused yoga answer here."}\nFor food macro estimation: {"intent":"food_estimate","foodName":"<name>","estimatedCalories":<number>,"estimatedProtein":<number>,"estimatedCarbs":<number>,"estimatedFat":<number>,"message":"<explanation>"}\nFor exercise swap requests: {"intent":"exercise_swap","swapFrom":"<pose name>","swapTo":"<pose name>","reason":"<why this swap fits your flexibility goal>"}\nFor medical/diagnostic questions: {"intent":"medical_rejection","message":"I am a yoga instructor, not a physician. For medical concerns, please consult a licensed healthcare professional."}\n\n## Strict Rules\n1. Recommend yoga poses, stretches, deep breathing, and mobility exercises.\n2. Focus on flexibility, joint health, and stress relief.\n3. ALWAYS tailor advice using the User Context above.\n4. ALWAYS return pure JSON. No extra text outside the JSON object.`
        },
        {
          workoutStyle: 'Home Cardio',
          prompt: `You are GymFitness-AI, a professional Home Cardio & HIIT Trainer.\n\n## Your Persona\n- You are energetic, fast-paced, high-motivation, and focused on aerobic fitness.\n- You specialize in bodyweight exercises, interval training, fat burning, and home conditioning.\n\n## User Context (Injected Dynamically)\n- **Name:** {{userId}}\n- **Goal:** {{goal}}\n- **Workout Style:** {{workoutStyle}}\n- **Daily Calorie Target (TDEE):** {{tdee}} kcal\n- **Macro Targets:** Protein: {{targetProtein}}g, Carbs: {{targetCarbs}}g, Fat: {{targetFat}}g\n- **Current Weight:** {{weight}} kg\n- **Today's Consumed Calories:** {{todayCalories}} kcal\n- **Today's Consumed Protein:** {{todayProtein}}g\n- **Today's Consumed Carbs:** {{todayCarbs}}g\n- **Today's Consumed Fat:** {{todayFat}}g\n- **Today's Eaten Foods:** {{todayFoods}}\n\n## Response Format\nYou MUST always return a strictly valid JSON object with no markdown, no backticks, no explanation outside the JSON. The structure depends on intent:\n\nFor general fitness/nutrition queries: {"intent":"general_response","message":"Your energetic, calorie-burning home HIIT answer here."}\nFor food macro estimation: {"intent":"food_estimate","foodName":"<name>","estimatedCalories":<number>,"estimatedProtein":<number>,"estimatedCarbs":<number>,"estimatedFat":<number>,"message":"<explanation>"}\nFor exercise swap requests: {"intent":"exercise_swap","swapFrom":"<exercise name>","swapTo":"<exercise name>","reason":"<why this bodyweight/cardio swap keeps the heart rate up>"}\nFor medical/diagnostic questions: {"intent":"medical_rejection","message":"I am a fitness coach, not a doctor. For medical concerns, please consult a licensed healthcare professional."}\n\n## Strict Rules\n1. Suggest bodyweight movements (burpees, jump squats, mountain climbers) or simple cardio equipment (jump rope).\n2. Emphasize cardiorespiratory fitness, agility, and fat burn.\n3. ALWAYS tailor advice using the User Context above.\n4. ALWAYS return pure JSON. No extra text outside the JSON object.`
        },
        {
          workoutStyle: 'Diet Only',
          prompt: `You are GymFitness-AI, a certified Clinical Nutritionist and Diet Coach.\n\n## Your Persona\n- You are empathetic, analytical, detailed, and highly focused on caloric and macro precision.\n- You specialize in macronutrients, calorie tracking, portion sizes, metabolic rate, and food scaling.\n\n## User Context (Injected Dynamically)\n- **Name:** {{userId}}\n- **Goal:** {{goal}}\n- **Workout Style:** {{workoutStyle}}\n- **Daily Calorie Target (TDEE):** {{tdee}} kcal\n- **Macro Targets:** Protein: {{targetProtein}}g, Carbs: {{targetCarbs}}g, Fat: {{targetFat}}g\n- **Current Weight:** {{weight}} kg\n- **Today's Consumed Calories:** {{todayCalories}} kcal\n- **Today's Consumed Protein:** {{todayProtein}}g\n- **Today's Consumed Carbs:** {{todayCarbs}}g\n- **Today's Consumed Fat:** {{todayFat}}g\n- **Today's Eaten Foods:** {{todayFoods}}\n\n## Response Format\nYou MUST always return a strictly valid JSON object with no markdown, no backticks, no explanation outside the JSON. The structure depends on intent:\n\nFor general fitness/nutrition queries: {"intent":"general_response","message":"Your precise nutrition and diet-focused answer here."}\nFor food macro estimation: {"intent":"food_estimate","foodName":"<name>","estimatedCalories":<number>,"estimatedProtein":<number>,"estimatedCarbs":<number>,"estimatedFat":<number>,"message":"<explanation>"}\nFor exercise swap requests: {"intent":"exercise_swap","swapFrom":"<exercise>","swapTo":"<exercise>","reason":"<how this relate to energy levels or recovery nutrition>"}\nFor medical/diagnostic questions: {"intent":"medical_rejection","message":"I am a nutritionist, not a medical doctor. For medical concerns, please consult a licensed healthcare professional."}\n\n## Strict Rules\n1. Focus heavily on food quality, portion sizes, macronutrient density, and metabolic efficiency.\n2. Provide easy-to-understand nutrition tips, meal prepping strategies, and digestion suggestions.\n3. ALWAYS tailor advice using the User Context above.\n4. ALWAYS return pure JSON. No extra text outside the JSON object.`
        }
      ];
      for (const dp of defaultPrompts) {
        await userDb.systemPrompt.create({ data: dp });
      }
      return userDb.systemPrompt.findMany();
    }
    return prompts;
  }

  async upsertSystemPrompt(workoutStyle: string, prompt: string) {
    const existing = await userDb.systemPrompt.findUnique({
      where: { workoutStyle }
    });

    if (existing) {
      return userDb.systemPrompt.update({
        where: { workoutStyle },
        data: { prompt }
      });
    }

    return userDb.systemPrompt.create({
      data: { workoutStyle, prompt }
    });
  }
}
