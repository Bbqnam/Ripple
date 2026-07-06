export type CoreStatKey =
  | "health"
  | "happiness"
  | "reputation"
  | "education"
  | "skill"
  | "relationships"
  | "stress";

export type FinanceStatKey = "money" | "cash" | "income" | "expenses" | "debt" | "savings" | "rent";

export type StatKey = CoreStatKey | FinanceStatKey;

export type HiddenTrait =
  | "discipline"
  | "empathy"
  | "confidence"
  | "risk"
  | "creativity"
  | "honesty"
  | "responsibility"
  | "curiosity"
  | "optimism"
  | "ambition";

export type EventKind = "normal" | "queued" | "milestone";
export type GamePhase = "hub" | "event" | "consequence";
export type GoalId =
  | "graduate_high_school"
  | "get_into_university"
  | "build_fitness"
  | "get_promoted"
  | "save_emergency_fund"
  | "learn_programming"
  | "build_social_circle";

export type Stats = Record<StatKey, number>;
export type Traits = Record<HiddenTrait, number>;

export interface Relationship {
  id: string;
  name: string;
  role: string;
  trust: number;
  respect: number;
  love: number;
  closeness: number;
  alive: boolean;
}

export interface Memory {
  id: string;
  age: number;
  year: number;
  title: string;
  description: string;
  category: string;
  tone: "positive" | "negative" | "neutral";
  icon: string;
}

export interface GoalProgress {
  id: GoalId;
  title: string;
  description: string;
  target: number;
  progress: number;
  contributions: string[];
}

export interface Effect {
  stats?: Partial<Stats>;
  traits?: Partial<Traits>;
  flags?: string[];
  removeFlags?: string[];
  relationships?: { id: string; trust?: number; respect?: number; love?: number; closeness?: number }[];
  memory?: { title: string; description: string; category?: string; tone: "positive" | "negative" | "neutral"; icon: string };
  queueEvents?: { eventId: string; inTurns: number }[];
}

export interface Choice {
  id: string;
  label: string;
  description?: string;
  icon?: string;
  requires?: Requirement;
  effects: Effect;
  outcomeNarrative?: string;
  outcomeReason?: string;
  outcomeHints?: string[];
}

export interface Requirement {
  minStats?: Partial<Stats>;
  minTraits?: Partial<Traits>;
  flags?: string[];
  notFlags?: string[];
  minAge?: number;
  maxAge?: number;
}

export interface GameEvent {
  id: string;
  title: string;
  description: string;
  category: string;
  emoji: string;
  kind?: EventKind;
  sceneType?: "phone" | "letter" | "meeting" | "report" | "interview" | "hospital" | "court" | "news" | "home" | "celebration" | "street";
  location?: string;
  environment?: string;
  focus?: string;
  momentTitle?: string;
  tone?: "positive" | "negative" | "neutral";
  weight?: number;
  requires?: Requirement;
  choices: Choice[];
}

export interface QueuedEvent {
  eventId: string;
  triggerTurn: number;
}

export interface ActivityDefinition {
  id: string;
  label: string;
  description: string;
  icon: string;
  cost: number;
  effects: Effect;
  goalIds: GoalId[];
  hint: string;
}

export interface OutcomeSummary {
  title: string;
  narrative: string;
  statChanges: { key: StatKey; delta: number }[];
  relationshipChanges: { id: string; name: string; fields: string[] }[];
  moneyChanges: { label: string; delta: number }[];
  newFlags: string[];
  newMemory?: Memory;
  reasons: string[];
  futureChance: string[];
  futureRisk: string[];
}

export interface GameState {
  version: number;
  createdAt: number;
  name: string;
  avatarSeed: number;
  age: number;
  turn: number;
  startYear: number;
  stats: Stats;
  traits: Traits;
  flags: string[];
  relationships: Relationship[];
  memories: Memory[];
  history: { turn: number; stat: StatKey; value: number }[];
  seenEvents: string[];
  queue: QueuedEvent[];
  alive: boolean;
  phase: GamePhase;
  actionPoints: number;
  goals: GoalProgress[];
  jobTitle: string;
  educationStatus: string;
  currentEventId?: string;
}
