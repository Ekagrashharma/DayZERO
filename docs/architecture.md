# Day Zero Architecture

## Four-layer boundary

### 1. Ingestion

Fetch GitHub, Calendar, Slack and ticket events in parallel through provider adapters.

### 2. Reasoning

Normalize events into `Signal`, triage obvious noise, then ask Gemini to rank signals and emit a structured `Decision` plus `ActionIntent`.

The reasoning layer has a fixed maximum of three iterations per signal.

### 3. Action

A separate executor owns write credentials. It accepts only schema-valid intents that pass the safety router.

### 4. Memory and delivery

Persist runs, signals, decisions, actions, escalations and feedback in Firestore. Compose a three-sentence morning briefing and expose the trace through the UI.

## Safety rule

The model is never the final authority to execute an action. Category policy wins over confidence. Authentication, production, billing, security, destructive operations and permission changes always escalate.

## Agency patterns

The nightly run is a deterministic workflow. Reasoning uses bounded fixed iterations. Human approval is used for risky or ambiguous actions. User approvals and overrides form a preference-learning loop that adjusts category thresholds over time without changing model weights.

## Source-derived constraints

The MVP should stay scoped to one repo, one calendar and one Slack channel. The demo should show autonomous repair rather than reporting only, keep human interaction under sixty seconds, and make the confidence/safety boundary visible.
