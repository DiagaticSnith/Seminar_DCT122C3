import 'dotenv/config';
import OpenAI from 'openai';
import { PrismaClient } from '../generated/prisma/client/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter } as any);

export interface MacroTargets {
  targetCalories: number;
  targetProtein: number;
  targetCarbs: number;
  targetFat: number;
  goal?: string;
}

export interface MealPlanFood {
  name: string;
  weight_grams: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface Meal {
  meal_name: string;
  foods: MealPlanFood[];
}

export interface MealPlanResult {
  thought_process: string;
  meals: Meal[];
  totals: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

const MEAL_PLAN_SYSTEM_PROMPT = `You are a Certified Sports Nutritionist and Dietitian AI.
Your task is to generate a precise daily meal plan tailored to the user's exact macro targets.

## User Macro Targets
- Daily Calorie Target: {{targetCalories}} kcal
- Protein Target: {{targetProtein}}g
- Carbohydrates Target: {{targetCarbs}}g
- Fat Target: {{targetFat}}g
- Goal: {{goal}}

## Chain-of-Thought Instructions
Before generating meals, you MUST think through the math step by step.

## STRICT JSON RESPONSE FORMAT
Return ONLY a valid JSON object with NO markdown, NO backticks, NO extra text.

{
  "thought_process": "<Step-by-step math: how you divided macros across Breakfast (~25%), Lunch (~35%), Dinner (~40%), show specific gram allocations per meal>",
  "meals": [
    {
      "meal_name": "Breakfast",
      "foods": [
        {
          "name": "<food name>",
          "weight_grams": <number>,
          "calories": <number>,
          "protein": <number>,
          "carbs": <number>,
          "fat": <number>
        }
      ]
    },
    {
      "meal_name": "Lunch",
      "foods": [...]
    },
    {
      "meal_name": "Dinner",
      "foods": [...]
    }
  ],
  "totals": {
    "calories": <sum of all foods>,
    "protein": <sum of all foods>,
    "carbs": <sum of all foods>,
    "fat": <sum of all foods>
  }
}

## Rules
1. The sum of all meals' calories MUST be within ±100 kcal of the target.
2. Protein MUST be within ±10g of target. Carbs and Fat within ±15g.
3. Use realistic, wholesome foods with accurate nutritional data.
4. Each meal should have 2-4 food items.
5. NEVER include alcohol, supplements, or processed junk food.
6. Return ONLY the JSON object. No extra text outside the JSON.`;

export class MealPlanService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  buildSystemPrompt(targets: MacroTargets): string {
    return MEAL_PLAN_SYSTEM_PROMPT
      .replace('{{targetCalories}}', String(targets.targetCalories))
      .replace('{{targetProtein}}', String(targets.targetProtein))
      .replace('{{targetCarbs}}', String(targets.targetCarbs))
      .replace('{{targetFat}}', String(targets.targetFat))
      .replace('{{goal}}', targets.goal ?? 'General Fitness');
  }

  async fetchUserTargets(userId: string): Promise<MacroTargets | null> {
    const profile = await prisma.userProfile.findUnique({ where: { userId } });
    if (!profile) return null;
    return {
      targetCalories: profile.targetCalories ?? 2000,
      targetProtein: profile.targetProtein ?? 130,
      targetCarbs: profile.targetCarbs ?? 220,
      targetFat: profile.targetFat ?? 65,
      goal: profile.goal ?? 'General Fitness',
    };
  }

  async generateMealPlan(userId: string): Promise<MealPlanResult> {
    const targets = await this.fetchUserTargets(userId);
    if (!targets) {
      throw new Error('User profile not found. Please complete your profile setup first.');
    }

    const systemPrompt = this.buildSystemPrompt(targets);

    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        {
          role: 'user',
          content: `Generate my full daily meal plan for today. My targets: ${targets.targetCalories} kcal, ${targets.targetProtein}g protein, ${targets.targetCarbs}g carbs, ${targets.targetFat}g fat. Goal: ${targets.goal}.`,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.4,
    });

    const raw = completion.choices[0]?.message?.content ?? '{}';

    let parsed: MealPlanResult;
    try {
      parsed = JSON.parse(raw) as MealPlanResult;
    } catch {
      throw new Error('AI returned invalid JSON. Please try again.');
    }

    if (!parsed.meals || !Array.isArray(parsed.meals)) {
      throw new Error('AI response missing meals array.');
    }

    // Save suggested plan to user's daily record in the database (US05)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    await prisma.dailyMealPlan.upsert({
      where: {
        userId_date: {
          userId,
          date: today,
        },
      },
      update: {
        plan: parsed as any,
      },
      create: {
        userId,
        date: today,
        plan: parsed as any,
      },
    });

    return parsed;
  }
}
