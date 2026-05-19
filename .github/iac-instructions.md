## API / IaC Deployment Instructions

- Authenticate only once at API Gateway; introduce a dedicated auth service only if necessary.
- JavaScript services must be implemented as NestJS apps packaged for Lambda.
- During deployment, package all `node_modules` into Lambda layers.
- Deploy application/service code to Lambda handlers as usual (separate from dependency layers).
- Keep infrastructure in a dedicated `infra/` directory and parameterize by environment (`dev`, `staging`, `prod`).
- Do not hard-code secrets, ARNs, or account IDs; use SSM Parameter Store or Secrets Manager.
- Retain existing services you currently have. Change their implementation in context of this product and purpose. 
- All services should have proper CRUD endpoints. With the project context you should be able to pre-empt dynamic routes


## Lambda Services as Prototypes

- Lambda services should use:
  - `index.js` as Lambda entrypoint.
  - `src/` folder for all application logic.
  - `layers/` for dependency packaging where applicable.
  - `scripts/` folder for deployment/build scripts.
  - Dedicated root-level `build.sh` or `deploy.sh` scripts for packaging and deployment orchestration.

- JavaScript Lambda services should:
  - Prefer modern ES syntax and async/await patterns.
  - Avoid callback-style programming.
  - Avoid deeply nested conditionals and imperative branching.
  - Prefer switch statements, guard clauses, early returns, and functional composition.
  - Use array operations (`map`, `filter`, `reduce`, `flatMap`) wherever they improve readability.
  - Keep handlers thin and move business logic into services/utilities.
  - Keep infrastructure concerns outside business logic.
  - Prefer configuration-driven behavior over hardcoded branching logic.

- TypeScript infrastructure (Pulumi) code should:
  - Use strict typing and avoid `any` wherever possible.
  - Prefer interfaces/types for all infrastructure contracts.
  - Keep stack configuration centralized and environment aware.
  - Encapsulate reusable infrastructure patterns into components/modules.
  - Avoid duplicated resource definitions across stacks/environments.
  - Use strongly typed config accessors and environment abstractions.

- Shared JavaScript/TypeScript best practices:
  - Follow DRY, SOLID, YAGNI, and separation-of-concerns principles.
  - Prefer declarative programming patterns over imperative implementations.
  - Write modular, composable, testable code.
  - Favor pure functions wherever practical.
  - Centralize reusable utilities, constants, adapters, validators, and helpers.
  - Avoid large monolithic files; split responsibilities aggressively.
  - Target ~100 lines maximum per file where practical.
  - Prefer small focused modules over multi-responsibility services.
  - Avoid hidden side effects and implicit mutations.
  - Ensure naming is domain-oriented and self-documenting.
  - Use consistent folder structures across services.
  - Validate all inputs at boundaries (API handlers, events, config, environment variables).
  - Standardize API response contracts and error structures.
  - Use centralized error handling utilities and structured logging.
  - Avoid excessive try/catch nesting; catch errors at orchestration boundaries.
  - Prefer async concurrency patterns (`Promise.all`, batching) where safe and appropriate.
  - All code should optimize for readability, maintainability, observability, and long-term scalability over premature optimization.

---

## Postman + Newman Requirements

- Treat all Postman ownership as part of **Infrastructure as Code (IaC) responsibilities only**; Postman artifacts must be created and maintained from IaC workflows.
- Keep a single dedicated `/postman` folder at repository root.
- Maintain two collections with clear separation:
  1. **API master set**: all endpoints grouped by service.
  2. **Journey endpoints**: only endpoints used in user journeys.
- IaC must define journey mapping in journey collection artifacts under `/postman`:
  - List all journeys (happy and unhappy paths).
  - Identify the required endpoints for each journey.
  - Place endpoints in execution order for each journey.
- The IaC E2E journey collection must start with a seeding endpoint that prepares the entire database with all required values and state variants used by happy/unhappy journeys.
- Seeding API contracts must include user arrays only when user-specific E2E scenarios require them.
- Seeded user collections are for E2E testing assumptions only and must contain only the minimum required attributes, such as `id` and `name`; exclude phone numbers, roles, and other non-essential fields unless explicitly required by the journey being tested.
- If a bearer token is required for testing, it must be provided as a parameterized IaC build input rather than embedded in the collection contract.
- Use a dedicated GitHub secret for the seeding database URL named `E2E_SEED_DATABASE_URL` (separate from other database secrets) to isolate E2E test data and avoid accidental pollution of non-E2E environments.
- The IaC E2E journey collection must end with a cleanup endpoint that deletes all data created by seeding.
- The cleanup endpoint must be idempotent.
- The cleanup endpoint must report partial-failure details in a JSON response body, including failed entity type and identifiers.
- Cleanup partial-failure responses must include `retryable` and `recommendedRetryDelayMs`; when `retryable` is `false`, set `recommendedRetryDelayMs` to `null`.
- Both collections must share common environment files.
- Ensure collections are pre-populated with scripts and variables.
- Execute Postman runs via Newman CLI on every run.
- Run Postman tests in **Pulumi infrastructure deployments** as **non-blocking** checks (must not fail the deployment pipeline).

