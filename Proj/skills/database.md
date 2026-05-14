# Database Management Skills & Constraints

## 1. Core Technology Stack
- **Database:** PostgreSQL
- **ORM:** Prisma Client

## 2. Strict Rules
- **No Raw SQL:** You are explicitly forbidden from using raw SQL strings unless it is physically impossible to do with Prisma Client.
- **Data Integrity:** When executing multiple related database writes (e.g., adding a food item AND updating the daily total calories), you MUST use Prisma Transactions (`prisma.$transaction`).
- **Error Handling:** Wrap all database operations in `try/catch` blocks.
- **Primary Keys:** Assume all tables use UUIDs generated at the database level (`@default(uuid())`). Do not generate UUIDs in the Node.js application layer.