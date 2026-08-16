import type { ActionIntent, Decision } from "../core/types";

const ALWAYS_ESCALATE = ["auth", "authentication", "production", "billing", "security", "delete", "deploy"];

const ALLOWED_AUTONOMOUS_ACTIONS = new Set([
  "rerun_test",
  "merge_docs_pr",
  "draft_slack_reply",
  "snooze_ticket",
]);

export function routeDecision(decision: Decision, intent: ActionIntent): Decision {
  const haystack = `${intent.action} ${intent.target}`.toLowerCase();
  const permanentlyRestricted = ALWAYS_ESCALATE.some((term) => haystack.includes(term));

  if (permanentlyRestricted) {
    return { ...decision, route: "escalate", rationale: `${decision.rationale} Safety policy requires human approval.` };
  }

  if (!ALLOWED_AUTONOMOUS_ACTIONS.has(intent.action)) {
    return { ...decision, route: "escalate", rationale: `${decision.rationale} Action is not on the autonomous allow-list.` };
  }

  if (decision.confidence < 0.8) {
    return { ...decision, route: "escalate", rationale: `${decision.rationale} Confidence is below the autonomous threshold.` };
  }

  return { ...decision, route: "autonomous" };
}
