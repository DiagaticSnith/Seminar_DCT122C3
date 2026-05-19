import { describe, it, expect, jest } from '@jest/globals';
import { hasMedicalKeyword, MEDICAL_REJECTION_RESPONSE } from '../guardrails/guardrails';

// Mock modules before any imports that use them
jest.mock('openai', () => {
  const mockCreate = jest.fn<any>().mockResolvedValue((async function* () {})());
  const MockOpenAI = function (this: any) {
    this.chat = { completions: { create: mockCreate } };
  };
  return {
    __esModule: true,
    default: MockOpenAI,
  };
});

jest.mock('fs', () => ({
  __esModule: true,
  readFileSync: jest.fn<any>().mockReturnValue(
    'System: {{userId}} {{goal}} {{workoutStyle}} {{tdee}} {{targetProtein}} {{targetCarbs}} {{targetFat}} {{weight}}'
  ),
}));

// Must import AFTER mocks
import { AiCoachService } from '../services/ai-coach.service';

describe('TC-AI-01: Medical Guardrail', () => {
  const service = new AiCoachService();

  it('should detect medical keywords in query', () => {
    expect(hasMedicalKeyword('I have a diagnosis and need medication')).toBe(true);
    expect(hasMedicalKeyword('Can you prescribe me antibiotics?')).toBe(true);
    expect(hasMedicalKeyword('I have symptoms of cancer, what drug should I take?')).toBe(true);
  });

  it('should NOT flag normal fitness queries', () => {
    expect(hasMedicalKeyword('What is the best workout for chest?')).toBe(false);
    expect(hasMedicalKeyword('How much protein should I eat?')).toBe(false);
    expect(hasMedicalKeyword('Can you estimate calories in pho?')).toBe(false);
  });

  it('TC-AI-01: checkGuardrails() should return medical_rejection for medical queries', () => {
    const medicalQuery = 'I have a disease, can you prescribe me some pills?';
    const result = service.checkGuardrails(medicalQuery);

    expect(result).not.toBeNull();
    expect(result!.intent).toBe('medical_rejection');
    expect(result!.message).toContain('not a medical doctor');
  });

  it('TC-AI-01: checkGuardrails() should return null for safe fitness queries', () => {
    const safeQuery = 'What exercises should I do to build bigger biceps?';
    const result = service.checkGuardrails(safeQuery);

    expect(result).toBeNull();
  });

  it('TC-AI-01: Guardrail response matches MEDICAL_REJECTION_RESPONSE exactly', () => {
    const result = service.checkGuardrails('What is the dosage for this painkiller?');
    expect(result).toEqual(MEDICAL_REJECTION_RESPONSE);
  });
});
