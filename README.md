# Day Zero

**An Autonomous Morning-Ops Agent for Developers**

Day Zero runs the developer's first fifteen minutes overnight. It gathers signals from GitHub, Calendar, Slack and tickets, normalizes them, triages noise, reasons about what matters, performs only safe reversible work, escalates risky or ambiguous work, and produces a ranked three-item morning briefing.

## Architecture

```text
GitHub / Calendar / Slack / Tickets
                |
             Ingest
                |
            Normalize
                |
              Triage
                |
       Gemini reasoning layer
                |
       Structured Decision
                |
          Safety Router
          /            \
 Autonomous            Escalate
     |                    |
 Action Executor     Human approval
          \            /
             Firestore
                |
         Morning briefing
```

The reasoning layer never receives write credentials and never executes external APIs directly. Its output is a structured intent. The action layer is the only layer allowed to perform writes and rejects anything outside its explicit allow-list.

## Agency model

1. **Orchestrated workflow** — fixed nightly pipeline.
2. **Fixed-iteration agency** — maximum 3 reasoning/tool-call iterations per signal.
3. **Human-in-the-loop** — risky, restricted or low-confidence actions are escalated.
4. **Preference learning** — human approvals, overrides and post-action flags tune per-category confidence thresholds without fine-tuning model weights.

## MVP scope

- One repository
- One calendar
- One Slack channel
- One ticket source
- Autonomous flaky-test rerun
- Autonomous low-risk documentation work
- Authentication, production, billing and security actions always escalate
- Three-sentence morning briefing
- Inspectable execution trace
- Firestore persistence

## Core contracts

- `src/core/types.ts` — shared `Signal`, `Decision` and `ActionIntent` contracts.
- `src/safety/policy.ts` — fail-closed safety boundary.
- `config/allowlist.yaml` — explicit autonomous and permanent-escalation policy.

## Planned stack

| Layer | Technology |
| --- | --- |
| Trigger | Cloud Scheduler or GitHub Actions cron |
| Ingestion | GitHub, Google Calendar, Slack APIs |
| Service | Node.js + TypeScript |
| Reasoning | Gemini via Google Gen AI SDK |
| Orchestration | Google ADK or fixed-step controller |
| Action | Isolated executor service |
| State | Firestore |
| Secrets | Google Secret Manager / local `.env` |
| Delivery | Slack DM + web briefing card |
| Observability | OpenTelemetry + structured run logs |

## Safety defaults

- No production changes.
- No billing or money actions.
- No authentication or security changes.
- No destructive operations.
- No permission changes.
- Unknown actions fail closed.
- Invalid structured model output is rejected.
- Unresolved work after three iterations escalates.

## Demo

The intended under-three-minute demo shows a flaky CI failure diagnosed and safely rerun, a low-risk documentation PR handled autonomously, an authentication PR escalated despite high model confidence, a calendar conflict surfaced, and a draft Slack response awaiting one-tap approval.

## Development roadmap

- [ ] Implement source adapters
- [ ] Implement normalization and triage
- [ ] Integrate Gemini + structured output
- [ ] Add Google ADK orchestration
- [ ] Implement isolated action executor
- [ ] Add Firestore persistence
- [ ] Build briefing API
- [ ] Build dashboard
- [ ] Add approval and override flow
- [ ] Add eval harness
- [ ] Add Cloud Run deployment
- [ ] Add scheduled execution
