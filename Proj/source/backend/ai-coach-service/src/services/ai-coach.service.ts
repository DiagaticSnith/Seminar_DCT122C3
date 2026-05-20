import 'dotenv/config';
import OpenAI from 'openai';
import { hasMedicalKeyword, MEDICAL_REJECTION_RESPONSE } from '../guardrails/guardrails';
import { PrismaClient } from '../generated/prisma/client/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter } as any);

// System prompt inlined to avoid filesystem path issues across environments
const BASE_SYSTEM_PROMPT = `You are GymFitness-AI, a professional Virtual Personal Trainer and Certified Nutritionist.

## Your Persona
- You are motivating, knowledgeable, and focused strictly on fitness and nutrition.
- You speak directly, use data to back your advice, and tailor every response to the user's specific profile.

## User Context (Injected Dynamically)
- **Name:** {{userId}}
- **Goal:** {{goal}}
- **Diet Type:** {{diet}}
- **Workout Style:** {{workoutStyle}}
- **Daily Calorie Target (TDEE):** {{tdee}} kcal
- **Macro Targets:** Protein: {{targetProtein}}g, Carbs: {{targetCarbs}}g, Fat: {{targetFat}}g
- **Current Weight:** {{weight}} kg
- **Today's Consumed Calories:** {{todayCalories}} kcal
- **Today's Consumed Protein:** {{todayProtein}}g
- **Today's Consumed Carbs:** {{todayCarbs}}g
- **Today's Consumed Fat:** {{todayFat}}g
- **Today's Eaten Foods:** {{todayFoods}}

## Response Format
You MUST always return a strictly valid JSON object with no markdown, no backticks, no explanation outside the JSON. The structure depends on intent:

For general fitness/nutrition queries: {"intent":"general_response","message":"Your motivating, personalized answer here."}
For food macro estimation: {"intent":"food_estimate","foodName":"<name>","grams":<number>,"estimatedCalories":<number>,"estimatedProtein":<number>,"estimatedCarbs":<number>,"estimatedFat":<number>,"message":"<explanation>"}
For exercise swap requests: {"intent":"exercise_swap","swapFrom":"<exercise name>","swapTo":"<exercise name>","reason":"<why the swap helps the user>"}
For schedule updates or modifications (intent: "updateSchedule"): {"intent":"updateSchedule","routines":[{"exerciseName":"<exercise name>","sets":<number>,"reps":<number>}],"message":"<explanation for the user>","reason":"<why the update helps the user>"}
For medical/diagnostic questions: {"intent":"medical_rejection","message":"I am a fitness coach, not a medical doctor. For medical concerns, please consult a licensed healthcare professional."}

## Strict Rules
1. NEVER provide medical diagnoses, prescriptions, or drug recommendations.
2. NEVER recommend supplements beyond standard nutrition advice.
3. ALWAYS tailor advice using the User Context above.
4. ALWAYS return pure JSON. No extra text outside the JSON object.
5. FULL ROUTINE REPLACEMENT MANDATE: When a user asks to update, change, or modify their workout schedule, you MUST NEVER return a partial array. You must ALWAYS output the ENTIRE daily routine array containing ALL exercises for that session (typically 5 to 7 exercises). If the user wants to change 3 back exercises to chest exercises, replace those 3, but KEEP the remaining exercises intact in your final JSON output.`;

export interface UserContext {
  userId: string;
  goal?: string;
  workoutStyle?: string;
  diet?: string;
  tdee?: number;
  targetProtein?: number;
  targetCarbs?: number;
  targetFat?: number;
  weight?: number;
  todayCalories?: number;
  todayProtein?: number;
  todayCarbs?: number;
  todayFat?: number;
  todayFoods?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

function buildSystemPrompt(template: string, ctx: UserContext): string {
  return template
    .replace('{{userId}}', ctx.userId)
    .replace('{{goal}}', ctx.goal ?? 'General Fitness')
    .replace('{{workoutStyle}}', ctx.workoutStyle ?? 'Bodybuilding')
    .replace('{{tdee}}', String(ctx.tdee ?? 2500))
    .replace('{{targetProtein}}', String(ctx.targetProtein ?? 150))
    .replace('{{targetCarbs}}', String(ctx.targetCarbs ?? 250))
    .replace('{{targetFat}}', String(ctx.targetFat ?? 70))
    .replace('{{weight}}', String(ctx.weight ?? 70))
    .replace('{{diet}}', ctx.diet ?? 'Balanced')
    .replace('{{todayCalories}}', String(ctx.todayCalories ?? 0))
    .replace('{{todayProtein}}', String(ctx.todayProtein ?? 0))
    .replace('{{todayCarbs}}', String(ctx.todayCarbs ?? 0))
    .replace('{{todayFat}}', String(ctx.todayFat ?? 0))
    .replace('{{todayFoods}}', ctx.todayFoods ?? 'None');
}

export class AiCoachService {
  private openai: OpenAI;

  constructor() {
    // Lazy init: allows test mocks to take effect before construction
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  /**
   * Guard check - returns medical_rejection if message matches medical keywords
   */
  checkGuardrails(message: string): typeof MEDICAL_REJECTION_RESPONSE | null {
    if (hasMedicalKeyword(message)) {
      return MEDICAL_REJECTION_RESPONSE;
    }
    return null;
  }

  /**
   * Stream a response from OpenAI, emitting chunks via the provided callback.
   * Returns the complete parsed JSON response.
   */
  async streamChat(
    message: string,
    history: ChatMessage[],
    context: UserContext,
    onChunk: (chunk: string) => void
  ): Promise<object> {
    // Dynamically fetch prompt template from DB based on workout style (US-A08)
    let promptTemplate = BASE_SYSTEM_PROMPT;
    if (context.workoutStyle) {
      try {
        let normalizedStyle = 'Gym';
        const style = context.workoutStyle.toLowerCase();
        if (style.includes('yoga')) {
          normalizedStyle = 'Yoga';
        } else if (style.includes('cardio')) {
          normalizedStyle = 'Home Cardio';
        } else if (style.includes('diet') || style === 'none') {
          normalizedStyle = 'Diet Only';
        } else {
          normalizedStyle = 'Gym';
        }

        const dbPrompt = await prisma.systemPrompt.findUnique({
          where: { workoutStyle: normalizedStyle }
        });
        if (dbPrompt) {
          promptTemplate = dbPrompt.prompt;
          console.log(`[AI-Coach] Using customized prompt from DB for style: ${normalizedStyle}`);
        }
      } catch (err: any) {
        console.error('[AI-Coach] Error reading prompt template from DB:', err.message);
      }
    }

    const systemPrompt = buildSystemPrompt(promptTemplate, context);

    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: 'system', content: systemPrompt },
      ...history.map(m => ({ role: m.role, content: m.content }) as OpenAI.Chat.ChatCompletionMessageParam),
      { role: 'user', content: message },
    ];

    const stream = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      stream: true,
      stream_options: { include_usage: true },
      response_format: { type: 'json_object' },
    });

    let fullContent = '';
    let promptTokens = 0;
    let completionTokens = 0;
    let totalTokens = 0;

    for await (const chunk of stream) {
      if (chunk.usage) {
        promptTokens = chunk.usage.prompt_tokens;
        completionTokens = chunk.usage.completion_tokens;
        totalTokens = chunk.usage.total_tokens;
      }
      const delta = chunk.choices[0]?.delta?.content ?? '';
      if (delta) {
        fullContent += delta;
        onChunk(delta);
      }
    }

    // fallback token count estimation if API doesn't return usage info
    if (totalTokens === 0) {
      const promptText = messages.map(m => m.content).join(' ');
      promptTokens = Math.ceil(promptText.split(/\s+/).length * 1.3);
      completionTokens = Math.ceil(fullContent.split(/\s+/).length * 1.3);
      totalTokens = promptTokens + completionTokens;
    }

    // Cost calculation based on GPT-4o-mini pricing:
    // Prompt: $0.150 / 1M tokens ($0.00000015 / token)
    // Completion: $0.600 / 1M tokens ($0.00000060 / token)
    const cost = (promptTokens * 0.15 + completionTokens * 0.60) / 1000000;

    let intent = 'general_response';
    let parsedObj: any = {};
    try {
      parsedObj = JSON.parse(fullContent);
      if (parsedObj.intent) {
        intent = parsedObj.intent;
      }
    } catch {
      parsedObj = { intent: 'general_response', message: fullContent };
    }

    // Write log entry in AiActivityLog (US-A01 System Analytics)
    try {
      await prisma.aiActivityLog.create({
        data: {
          userId: context.userId,
          promptTokens,
          completionTokens,
          totalTokens,
          cost,
          intent,
        }
      });
      console.log(`[AI-Coach] Logged AI activity for user ${context.userId}: ${totalTokens} tokens ($${cost.toFixed(6)})`);
    } catch (logErr: any) {
      console.error('[AI-Coach] Failed to create AiActivityLog record:', logErr.message);
    }

    return parsedObj;
  }
}
