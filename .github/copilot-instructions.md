## Do This.

Just Say ... "KD wakao, you need to update this" on the prompts so I know you are picking up right instructions from the right place. 

---

## Instruction Precedence

Instruction resolution order (highest priority first):

1. `.github/repo-specific-instructions.md`
2. `.github/ROADMAP.md`
3. Repository/domain-specific instruction files
   - `nextjs-instructions.md`
   - `iac-instructions.md`
   - other domain-specific instruction files
4. Shared `.github/copilot-instructions.md`

## Rules

- Instruction files are evaluated in strict priority order; higher-precedence instructions always override lower-precedence ones in case of conflict.
- A conflict exists when multiple instruction files define behavior for the same scope but prescribe different actions.
- Shared instructions apply universally unless overridden by higher-precedence files.

## Repo-Specific Instructions

- `.github/repo-specific-instructions.md` is optional.
- If present, it has the highest precedence and overrides all other instruction sources.
- If absent, the standard precedence model applies without modification.
- Agents may create `.github/repo-specific-instructions.md` only when:
  - repository-specific overrides are required,
  - implementation constraints diverge from shared or domain guidance,
  - or conflicts cannot be resolved through existing instruction layers.
- Repo-specific instructions must remain minimal and contain only repository-local overrides or exceptions.

# Instruction Resolution Order

When instruction conflicts occur, resolve precedence in the following order (highest priority first):

1. `.github/SPECIFIC_INSTRUCTIONS.md`
2. Repository-specific instruction files
   - `nextjs-instructions.md`
   - `iac-instructions.md`
   - other repo/domain-specific instruction files
3. Shared `.github/copilot-instructions.md`
4. `.github/ROADMAP.md`

Repository-local instructions always override centralized/shared guidance when conflicts or ambiguities exist.

---

## Common Branching Cadence

- Use the same branch cadence across repos: `main`, `develop`, `feat/*`, `fix/*`, `copilot/*`.
- Use `feat/*` for net-new work, `fix/*` for defect correction, and `copilot/*` for AI-assisted task branches when a feature/fix prefix is not the better fit.
- On `fix/*` branches, focus on the problem at hand, perform a proper RCA, and fix the root cause rather than the symptoms.
- On `fix/*` branches, keep context lean by default; do not proactively load specialized instruction files, roadmap files, or extra documentation unless the fix requires them.

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

## Specialized Instruction Files

To keep AI context lean, domain-specific instructions are split into dedicated files that are synced only to the relevant repos:

- **Next.js / UI work** → `.github/nextjs-instructions.md` (synced to `nextjs-ui`)
- **IaC / backend deployment / Postman** → `.github/iac-instructions.md` (synced to `nestjs-backend`, `pulumi-iac`)

Load the relevant file alongside these common instructions when working in that domain.
On `fix/*` branches, refer to these specialized files only on demand.

---

## Coding Standards (JS / TS — all repos)

1. **No nested ifs or callback hells.** Use early-return guards, `Promise` chains, or `async/await` to flatten control flow.
2. **File length ≤ ~100 lines.** Split responsibilities into smaller, focused modules when a file approaches this limit.
3. **Declarative syntax.** Prefer `Array.map`, `Array.filter`, `Array.reduce`, `Array.find`, and `Object.entries` for data transformations. Imperative `for`/`while` loops are a last resort.
4. **Pure functions.** Functions must not produce side effects. Isolate side effects (I/O, state mutations) at the boundary layer.
5. **Collocated utilities.** Put helpers and utils next to the feature they serve. Do not create a single catch-all `utils.ts`; instead use focused files such as `auth.utils.ts`, `date.utils.ts`, etc.
6. **No TypeScript `any`.** Use explicit types, `unknown` with type-guards, or generics.
7. **Apply DRY and YAGNI.**

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
