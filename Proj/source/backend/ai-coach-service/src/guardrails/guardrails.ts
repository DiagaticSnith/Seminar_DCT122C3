// Medical keyword guardrail - intercepts before reaching the LLM
const MEDICAL_KEYWORDS = [
  'diagnose', 'diagnosis', 'prescription', 'prescribe', 'medicine', 'medication',
  'drug', 'antibiotic', 'painkiller', 'symptom', 'disease', 'disorder', 'cancer',
  'diabetes', 'surgery', 'doctor', 'physician', 'clinical', 'treatment', 'cure',
  'therapy', 'mental health', 'depression', 'anxiety disorder', 'inject', 'syringe',
  'overdose', 'side effects of', 'pill', 'capsule', 'tablet', 'dosage'
];

export const MEDICAL_REJECTION_RESPONSE = {
  intent: 'medical_rejection',
  message: 'I am a fitness coach, not a medical doctor. For medical concerns, please consult a licensed healthcare professional.'
};

export function hasMedicalKeyword(message: string): boolean {
  const lower = message.toLowerCase();
  return MEDICAL_KEYWORDS.some(keyword => lower.includes(keyword));
}
