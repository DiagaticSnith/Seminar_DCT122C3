We are starting the GymFitness-AI project from scratch. Before writing any code, you MUST establish your context:

Read GEMINI.md deeply. You must strictly follow the 4 core Karpathy's coding principles (Think Before Coding, Simplicity First, Surgical Changes, Goal-Driven Execution) and the strict operational workflows.

Read docs/01-system-design/architecture.md to understand that our global system runs on a Microservices Architecture.

Read docs/01-system-design/requirements.md to understand the domain and User Stories.

Read all files inside docs/skills/. Note: While the global system is Microservices, the internal codebase of each Node.js microservice must strictly follow the 3-Layer Architecture specified in backend.md.

CRITICAL SECURITY BOUNDARY: We are operating on a strictly limited budget for OpenAI API. You are explicitly forbidden from hardcoding any API keys or database strings. Everything must be securely loaded via .env and excluded via .gitignore to prevent any billing leaks.

Read docs/PROGRESS.md and docs/ui-mockups/ to see our current starting state.

Reply with 'CONTEXT ASSIMILATED - READY TO CODE' and briefly summarize the 4 Karpathy goals and the architecture you are allowed to use. Do not generate any source code yet.


------------------------------------------------------
Let's execute Backend Phase 01: Auth (Identity Microservice).

Open and read the plan at docs/02-backend/phase-01-auth/README.md.

Cross-reference US01 and FR01 in the requirements.

Create the backend workspace folder structure. Setup the isolated Express.js server for this microservice, create the Prisma schema for the User model, and implement the Auth endpoints (Register/Login).

Ensure you strictly separate the routing, controller logic, and business services (3-Layer Architecture).

Use bcrypt for password hashing and jsonwebtoken for session tokens.

Once the code is written, immediately write Unit Tests using Jest to verify the Auth endpoints.

Fix any errors until tests pass, then update docs/PROGRESS.md and stop.

-------------------
