export type StatKey =
  | "health"
  | "happiness"
  | "money"
  | "reputation"
  | "education"
  | "skill"
  | "relationships"
  | "stress";

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
  tone: "positive" | "negative" | "neutral";
  icon: string;
}

export interface Effect {
  stats?: Partial<Stats>;
  traits?: Partial<Traits>;
  flags?: string[];        // add flags
  removeFlags?: string[];
  relationships?: { id: string; trust?: number; respect?: number; love?: number; closeness?: number }[];
  memory?: { title: string; description: string; tone: "positive" | "negative" | "neutral"; icon: string };
  queueEvents?: { eventId: string; inTurns: number }[]; // delayed ripple
}

export interface Choice {
  id: string;
  label: string;
  description?: string;
  icon?: string;
  requires?: Requirement;
  effects: Effect;
}

export interface Requirement {
  minStats?: Partial<Stats>;
  minTraits?: Partial<Traits>;
  flags?: string[];       // must have all
  notFlags?: string[];    // must not have any
  minAge?: number;
  maxAge?: number;
}

export interface GameEvent {
  id: string;
  title: string;
  description: string;
  category: string;
  emoji: string;
  weight?: number;
  requires?: Requirement;
  choices: Choice[];
}

export interface QueuedEvent {
  eventId: string;
  triggerTurn: number;
}

export interface GameState {
  version: number;
  createdAt: number;
  name: string;
  avatarSeed: number;
  age: number;
  turn: number; // 0-based, each turn = 3 months
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
  currentEventId?: string;
}
