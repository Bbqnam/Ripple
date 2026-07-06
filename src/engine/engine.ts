import type { Choice, Effect, GameEvent, GameState, GoalId, GoalProgress, Requirement, StatKey } from "./types";
import { clamp } from "./newGame";

const GOAL_DEFAULTS: Record<GoalId, { title: string; description: string; target: number }> = {
  graduate_high_school: { title: "Graduate high school", description: "Stay on track academically", target: 100 },
  get_into_university: { title: "Get into university", description: "Build the case for higher education", target: 100 },
  build_fitness: { title: "Build fitness", description: "Keep your body strong", target: 100 },
  get_promoted: { title: "Get promoted", description: "Earn trust and results at work", target: 100 },
  save_emergency_fund: { title: "Save emergency fund", description: "Build a cushion for hard times", target: 100 },
  learn_programming: { title: "Learn programming", description: "Grow your technical skill", target: 100 },
  build_social_circle: { title: "Build social circle", description: "Create stronger community", target: 100 },
};

function defaultGoals(existing: GoalProgress[] = []): GoalProgress[] {
  return (Object.keys(GOAL_DEFAULTS) as GoalId[]).map((id) => {
    const existingGoal = existing.find((goal) => goal.id === id);
    return {
      id,
      title: GOAL_DEFAULTS[id].title,
      description: GOAL_DEFAULTS[id].description,
      target: GOAL_DEFAULTS[id].target,
      progress: existingGoal?.progress ?? 0,
      contributions: existingGoal?.contributions ?? [],
    };
  });
}

export function currentYear(g: GameState) {
  return g.startYear + Math.floor(g.turn / 4);
}

function meets(g: GameState, req?: Requirement): boolean {
  if (!req) return true;
  if (req.minAge !== undefined && g.age < req.minAge) return false;
  if (req.maxAge !== undefined && g.age > req.maxAge) return false;
  if (req.flags && !req.flags.every((f) => g.flags.includes(f))) return false;
  if (req.notFlags && req.notFlags.some((f) => g.flags.includes(f))) return false;
  if (req.minStats) {
    for (const [k, v] of Object.entries(req.minStats)) {
      if (g.stats[k as StatKey] < (v as number)) return false;
    }
  }
  if (req.minTraits) {
    for (const [k, v] of Object.entries(req.minTraits)) {
      if ((g.traits as any)[k] < (v as number)) return false;
    }
  }
  return true;
}

export function choiceAvailable(g: GameState, c: Choice) {
  return meets(g, c.requires);
}

export function pickEvent(g: GameState, events: GameEvent[]): GameEvent | null {
  const due = [...g.queue]
    .filter((q) => q.triggerTurn <= g.turn)
    .sort((a, b) => a.triggerTurn - b.triggerTurn)[0];
  if (due) {
    const ev = events.find((e) => e.id === due.eventId);
    if (ev) return ev;
  }

  const pool = events.filter((e) => {
    if (!meets(g, e.requires)) return false;
    const lastIdx = [...g.seenEvents].reverse().indexOf(e.id);
    if (lastIdx !== -1 && lastIdx < 8) return false;
    return true;
  });

  const milestonePool = pool.filter((e) => e.kind === "milestone");
  const activePool = milestonePool.length > 0 ? milestonePool : pool;

  if (activePool.length === 0) {
    const any = events.filter((e) => meets(g, e.requires));
    if (any.length === 0) return null;
    return any[Math.floor(Math.random() * any.length)];
  }

  const total = activePool.reduce((s, e) => s + (e.weight ?? 10), 0);
  let r = Math.random() * total;
  for (const e of activePool) {
    r -= e.weight ?? 10;
    if (r <= 0) return e;
  }
  return activePool[0];
}

function updateGoals(next: GameState, eff: Effect, eventTitle: string): void {
  const goalMap = new Map(next.goals.map((goal) => [goal.id, goal]));
  const addContribution = (goalId: GoalId, contribution: string) => {
    const goal = goalMap.get(goalId);
    if (!goal) return;
    if (!goal.contributions.includes(contribution)) goal.contributions.push(contribution);
    goal.progress = clamp(goal.progress + 6);
  };

  if (eff.stats) {
    if ((eff.stats.education ?? 0) > 0) addContribution("graduate_high_school", "Education");
    if ((eff.stats.education ?? 0) > 0) addContribution("get_into_university", "Education");
    if ((eff.stats.health ?? 0) > 0) addContribution("build_fitness", "Health");
    if ((eff.stats.cash ?? 0) > 0 || (eff.stats.money ?? 0) > 0) addContribution("save_emergency_fund", "Savings");
    if ((eff.stats.reputation ?? 0) > 0) addContribution("get_promoted", "Reputation");
    if ((eff.stats.skill ?? 0) > 0) addContribution("learn_programming", "Programming");
    if ((eff.stats.relationships ?? 0) > 0) addContribution("build_social_circle", "Social bonds");
  }

  if (eff.traits) {
    if ((eff.traits.discipline ?? 0) > 0) addContribution("graduate_high_school", "Discipline");
    if ((eff.traits.ambition ?? 0) > 0) addContribution("get_into_university", "Ambition");
    if ((eff.traits.responsibility ?? 0) > 0) addContribution("build_fitness", "Routine");
    if ((eff.traits.confidence ?? 0) > 0) addContribution("get_promoted", "Confidence");
  }

  if (eventTitle.includes("college") || eventTitle.includes("university") || eventTitle.includes("school")) {
    addContribution("graduate_high_school", "School events");
  }
  if (eventTitle.includes("work") || eventTitle.includes("career") || eventTitle.includes("job")) {
    addContribution("get_promoted", "Career events");
  }

  next.goals = Array.from(goalMap.values());
}

export function applyEffect(g: GameState, eff: Effect, eventTitle: string): GameState {
  const next: GameState = {
    ...g,
    stats: { ...g.stats },
    traits: { ...g.traits },
    flags: [...g.flags],
    relationships: g.relationships.map((r) => ({ ...r })),
    memories: [...g.memories],
    history: [...g.history],
    queue: [...g.queue],
    goals: g.goals?.length ? g.goals.map((goal) => ({ ...goal, contributions: [...goal.contributions] })) : defaultGoals(),
  };

  if (eff.stats) {
    for (const [k, v] of Object.entries(eff.stats)) {
      const key = k as StatKey;
      next.stats[key] = clamp(next.stats[key] + (v as number));
    }
  }
  if (eff.traits) {
    for (const [k, v] of Object.entries(eff.traits)) {
      (next.traits as any)[k] = clamp((next.traits as any)[k] + (v as number));
    }
  }
  if (eff.flags) {
    for (const f of eff.flags) if (!next.flags.includes(f)) next.flags.push(f);
  }
  if (eff.removeFlags) {
    next.flags = next.flags.filter((f) => !eff.removeFlags!.includes(f));
  }
  if (eff.relationships) {
    for (const rel of eff.relationships) {
      const r = next.relationships.find((x) => x.id === rel.id);
      if (r) {
        if (rel.trust) r.trust = clamp(r.trust + rel.trust);
        if (rel.respect) r.respect = clamp(r.respect + rel.respect);
        if (rel.love) r.love = clamp(r.love + rel.love);
        if (rel.closeness) r.closeness = clamp(r.closeness + rel.closeness);
      }
    }
  }
  if (eff.memory) {
    next.memories.push({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      age: g.age,
      year: currentYear(g),
      title: eff.memory.title,
      description: eff.memory.description,
      category: eff.memory.category ?? "life",
      tone: eff.memory.tone,
      icon: eff.memory.icon,
    });
  } else {
    next.memories.push({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      age: g.age,
      year: currentYear(g),
      title: eventTitle,
      description: "",
      category: "life",
      tone: "neutral",
      icon: "•",
    });
  }
  if (eff.queueEvents) {
    for (const q of eff.queueEvents) {
      next.queue.push({ eventId: q.eventId, triggerTurn: g.turn + q.inTurns });
    }
  }

  updateGoals(next, eff, eventTitle);
  return next;
}

export function advanceTurn(g: GameState, consumedEventId?: string): GameState {
  const next: GameState = { ...g, turn: g.turn + 1, phase: "hub" };
  next.age = 16 + Math.floor(next.turn / 4);

  next.stats = { ...g.stats };
  next.stats.stress = clamp(next.stats.stress + 1);
  next.stats.money = clamp(next.stats.money + 1);
  next.stats.cash = clamp(next.stats.cash + 1);
  next.stats.happiness = clamp(next.stats.happiness - (next.stats.stress > 70 ? 3 : 0));
  next.stats.savings = clamp(next.stats.savings + Math.max(0, next.stats.cash - next.stats.expenses));
  next.stats.expenses = clamp(next.stats.expenses + Math.max(0, next.stats.rent));
  next.stats.income = clamp(next.stats.income + 1);
  next.actionPoints = 2;

  // stress -> health
  if (next.stats.stress > 80) next.stats.health = clamp(next.stats.health - 2);

  // record history snapshot every turn for key stats
  next.history = [
    ...g.history,
    ...(["health", "happiness", "money", "reputation", "education", "skill"] as StatKey[]).map(
      (k) => ({ turn: next.turn, stat: k, value: next.stats[k] })
    ),
  ];

  if (consumedEventId) {
    next.seenEvents = [...g.seenEvents, consumedEventId];
    next.queue = g.queue.filter(
      (q) => !(q.eventId === consumedEventId && q.triggerTurn <= g.turn)
    );
  }

  if (next.stats.health <= 0) next.alive = false;
  return next;
}
