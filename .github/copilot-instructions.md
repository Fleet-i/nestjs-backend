## Do This.

Just Say ... "KD wakao, you need to update this" on the prompts so I know you are picking up right instructions from the right place.

---

## Stack (Current)

| Layer | Choice |
|---|---|
| Frontend | Next.js |
| UI | Tailwind + shadcn |
| Backend | FastAPI + Node.js (NestJS) |
| DB | MongoDB |
| ORM | Mongoose |
| Auth | Auth0 |
| AI | OpenAI APIs |
| Background jobs | Celery / BullMQ |
| Long-running tasks | Step Functions |
| Deployment | GitHub Actions for everything; Vercel for Next.js |
| Storage | S3 |
| Maps | Google Maps (future scope) |

---

## API Contract Source of Truth

- Use `.github/swagger.json` as the single source of truth for API contracts across all repos.
- All repos must reference and align to this contract first before introducing endpoint changes.
- The contract may start as an empty JSON object and should be expanded incrementally as endpoints are defined.
- If contract details are missing, make reasonable assumptions and add dummy local contracts to unblock implementation until finalized.
- Treat dummy local contracts as temporary only; backfill `.github/swagger.json` immediately after stabilization to avoid contract drift.

---

## UI Product Instructions

- Build intuitive, simple, and powerful UIs.
- Make necessary assumptions where requirements are unclear.
- Ensure all views are complete, polished, and heavily use Tailwind.
- Build for major breakpoints: `sm (640px)`, `md (768px)`, `lg (1024px)`, `xl (1280px)`, and `2xl (1536px)`.
- Use design system solutions/components wherever possible.
- Build out-of-the-box custom solutions only when a design system option is not viable.
- Frontend baseline is **Next.js 16**.
- Prioritize performance, speed, and perceived performance.
- Keep solutions cost-optimized by default.
- If cost optimization conflicts with performance, **performance wins**.

---

## Coding Standards (JS / TS — all repos)

1. **No nested ifs or callback hells.** Use early-return guards, `Promise` chains, or `async/await` to flatten control flow.
2. **File length ≤ ~100 lines.** Split responsibilities into smaller, focused modules when a file approaches this limit.
3. **Declarative syntax.** Prefer `Array.map`, `Array.filter`, `Array.reduce`, `Array.find`, and `Object.entries` for data transformations. Imperative `for`/`while` loops are a last resort.
4. **Pure functions.** Functions must not produce side effects. Isolate side effects (I/O, state mutations) at the boundary layer.
5. **Collocated utilities.** Put helpers and utils next to the feature they serve. Do not create a single catch-all `utils.ts`; instead use focused files such as `auth.utils.ts`, `date.utils.ts`, etc.
6. **No TypeScript `any`.** Use explicit types, `unknown` with type-guards, or generics.
7. **Apply DRY and YAGNI.**

---

## API / IaC Deployment Instructions

- Authenticate only once at API Gateway; introduce a dedicated auth service only if necessary.
- JavaScript services must be implemented as NestJS apps packaged for Lambda.
- During deployment, package all `node_modules` into Lambda layers.
- Deploy application/service code to Lambda handlers as usual (separate from dependency layers).
- Keep infrastructure in a dedicated `infra/` directory and parameterize by environment (`dev`, `staging`, `prod`).
- Do not hard-code secrets, ARNs, or account IDs; use SSM Parameter Store or Secrets Manager.

---

## Postman + Newman Requirements

- Keep a single dedicated `/postman` folder at repository root.
- Maintain two collections:
  1. **Service-wise** collection (all service connections/endpoints)
  2. **Journey-wise** collection (end-to-end flows)
- Ensure collections are pre-populated with scripts and variables.
- Execute Postman runs via Newman CLI on every run.
- Run Postman tests in **Pulumi infrastructure deployments** as **non-blocking** checks (must not fail the deployment pipeline).

---

## AI Chat Transport Instructions

- All AI-based chat experiences must run via **ag-ui** (the internal shared, standardized agent-chat UI framework) using **SSE** for streaming and transport.

---

## Common Engineering Instructions

- Keep designs simple, maintainable, and extensible (apply SOLID, DRY, KISS, and YAGNI where appropriate).
- Prefer secure-by-default implementations and protect sensitive data in code, logs, and telemetry.
- Target **100% automated coverage** for critical business journeys, with emphasis on **E2E and integration test cases**.
- Add sufficient **structured logging and telemetry** (logs, metrics, traces) for debugging and operational visibility.
- Include correlation/request IDs across service boundaries to simplify troubleshooting.

---

## Roadmap Role Context

- Current roles (managed in Auth0): `customer`, `supervisor`, `driver`, `worker`, `admin`.
- No additional role/auth implementation is required unless explicitly requested.
