import type { GameState, GoalProgress, Relationship, Stats, Traits } from "./types";

const START_YEAR = 2008;

const baseStats: Stats = {
  health: 85,
  happiness: 70,
  money: 20,
  cash: 20,
  income: 0,
  expenses: 0,
  debt: 0,
  savings: 0,
  rent: 0,
  reputation: 50,
  education: 40,
  skill: 20,
  relationships: 60,
  stress: 20,
};

const baseTraits: Traits = {
  discipline: 40,
  empathy: 50,
  confidence: 45,
  risk: 40,
  creativity: 45,
  honesty: 55,
  responsibility: 40,
  curiosity: 55,
  optimism: 55,
  ambition: 45,
};

const baseGoals: GoalProgress[] = [
  { id: "graduate_high_school", title: "Graduate high school", description: "Stay on track academically", target: 100, progress: 15, contributions: ["School attendance", "Study habits"] },
  { id: "get_into_university", title: "Get into university", description: "Build the case for higher education", target: 100, progress: 10, contributions: ["Education", "Discipline"] },
  { id: "build_fitness", title: "Build fitness", description: "Keep your body strong", target: 100, progress: 20, contributions: ["Exercise", "Health"] },
  { id: "get_promoted", title: "Get promoted", description: "Earn trust and results at work", target: 100, progress: 10, contributions: ["Work activity", "Reputation"] },
  { id: "save_emergency_fund", title: "Save emergency fund", description: "Build a cushion for hard times", target: 100, progress: 5, contributions: ["Savings", "Budgeting"] },
  { id: "learn_programming", title: "Learn programming", description: "Grow your technical skill", target: 100, progress: 5, contributions: ["Programming", "Curiosity"] },
  { id: "build_social_circle", title: "Build social circle", description: "Create stronger community", target: 100, progress: 20, contributions: ["Friendship", "Family calls"] },
];

const NAMES = ["Alex", "Sam", "Jordan", "Riley", "Casey", "Morgan", "Quinn", "Avery", "Rowan", "Sage"];

export function createNewGame(name?: string): GameState {
  const rel: Relationship[] = [
    { id: "mother", name: "Mom", role: "Mother", trust: 80, respect: 75, love: 90, closeness: 80, alive: true },
    { id: "father", name: "Dad", role: "Father", trust: 70, respect: 70, love: 80, closeness: 65, alive: true },
    { id: "sibling", name: "Kai", role: "Sibling", trust: 60, respect: 55, love: 70, closeness: 60, alive: true },
    { id: "best_friend", name: "Jamie", role: "Best Friend", trust: 75, respect: 70, love: 60, closeness: 80, alive: true },
  ];

  return {
    version: 1,
    createdAt: Date.now(),
    name: name || NAMES[Math.floor(Math.random() * NAMES.length)],
    avatarSeed: Math.floor(Math.random() * 100000),
    age: 16,
    turn: 0,
    startYear: START_YEAR,
    stats: { ...baseStats },
    traits: { ...baseTraits },
    flags: [],
    relationships: rel,
    memories: [],
    history: [],
    seenEvents: [],
    queue: [],
    alive: true,
    phase: "hub",
    actionPoints: 2,
    goals: baseGoals.map((goal) => ({ ...goal })),
    jobTitle: "Student",
    educationStatus: "High school junior",
  };
}

export function clamp(v: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, v));
}
