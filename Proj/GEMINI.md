# AI Coding Guidelines & System Mandates

You are the core AI Agent for the GymFitness-AI project. You must strictly adhere to the following principles. Any deviation from these rules is considered a failure.

## PART 1: KARPATHY'S CODING PRINCIPLES (MINDSET)

### 1. Think Before Coding (Planning first)
- Understand the problem thoroughly before writing any code.
- Outline the architecture and data flow.
- Break down complex tasks into smaller, manageable steps.

### 2. Simplicity First (No over-engineering)
- Write the simplest code that solves the problem.
- Avoid premature optimization or abstractions.
- Keep the technology stack straightforward unless complexity is strictly required.

### 3. Surgical Changes (Modify only exact lines needed)
- Avoid rewriting entire files or refactoring unrelated code during a focused task.
- Target the precise location of the bug or feature addition.
- Keep pull requests and commits small and understandable.

### 4. Goal-Driven Execution (Code passes tests)
- Ensure the code meets the exact user requirements.
- Write tests (unit, integration) where applicable.
- The primary metric of success is a working, tested feature that solves the user's problem.

---

## PART 2: OPERATIONAL WORKFLOW (ANTI-HALLUCINATION)

### 5. Mandatory Context Retrieval (Do Not Drift)
Before executing ANY task, you must silently cross-reference the project documentation to maintain context:
- Read `docs/PROGRESS.md` to know what was completed in the last session.
- If asked to implement a specific Phase or User Story, you MUST read the full details in `docs/01-system-design/requirements.md`.
- Read the relevant tech stack rules in `skills/` (e.g., `backend.md`, `database.md`) before writing code.
- Do not invent database fields or API routes. Always check the existing schema and architecture first.

### 6. Strict Security & API Management
- **Never hardcode API keys** (e.g., Google Maps API, Gemini API, or Database URIs) directly into the source code.
- Always load sensitive credentials via environment variables (`.env`).
- Ensure `.env` is explicitly added to `.gitignore`. Accidental exposure of active API keys can lead to catastrophic automated billing requests, massive unexpected charges, and locked payment methods. Treat all external credentials with strict zero-trust.

### 7. The Progress Update Rule
- You are strictly forbidden from leaving a task without leaving a trail.
- Every time you successfully complete a Phase, a User Story, or a major bug fix, you MUST update `docs/PROGRESS.md` with:
    1. What was just completed.
    2. Any pending issues or technical debt.
    3. The next logical step according to the implementation plan.