# Day Zero

Autonomous morning-ops for developers.

Day Zero is a hackathon MVP that runs a bounded agent workflow over developer signals, performs safe reversible actions autonomously, escalates risky or ambiguous actions, stores execution state in Firestore, and produces a concise morning briefing.

## Hackathon Stack

- Gemini 3.5+ via Gemini API or Vertex AI
- Google Agent Development Kit (ADK)
- Google Gen AI SDK
- Google Cloud Run
- Firestore
- FastAPI + Python backend
- Next.js + TypeScript frontend

## MVP Workflow

```text
Signals
  -> Normalize
  -> Triage
  -> Gemini + ADK reasoning
  -> Safety policy
  -> Autonomous / Escalate
  -> Action executor
  -> Firestore
  -> Morning briefing
```

The agent has a hard maximum of three reasoning iterations per signal.

## Demo Scenario

The deterministic demo workspace contains:

1. A flaky CI failure that is investigated and safely rerun.
2. A low-risk documentation PR that can be handled autonomously.
3. An authentication PR that is blocked by policy and escalated regardless of confidence.
4. A calendar conflict that requires human attention.
5. A Slack status message for which the agent prepares a draft reply.

External GitHub, Calendar, Slack and ticket systems are represented through provider interfaces and demo adapters in the MVP. The AI reasoning path itself uses the real configured Gemini model.

## Safety Boundary

The model never executes actions directly. Gemini produces a structured decision. A separate policy router validates the action against an explicit allow-list and permanent escalation rules.

Authentication, production, billing, security and destructive actions always escalate.

Invalid or unknown model output fails closed and is escalated.

## Repository Status

Initial production plan and hackathon MVP architecture.

## Documentation

See the project documentation and architecture materials in Notion and the attached Day Zero specification used as the source of truth for the MVP.
