export type SignalSource = "github" | "calendar" | "slack" | "tickets";

export type SignalKind =
  | "ci_failure"
  | "pr_open"
  | "meeting"
  | "ticket_assigned"
  | "message";

export type Signal = {
  id: string;
  source: SignalSource;
  kind: SignalKind;
  summary: string;
  payload: Record<string, unknown>;
  urgency_hint: number;
  timestamp: string;
};

export type Decision = {
  signal_id: string;
  action: string;
  confidence: number;
  route: "autonomous" | "escalate";
  rationale: string;
};

export type ActionIntent = {
  action: string;
  target: string;
  parameters: Record<string, unknown>;
};
