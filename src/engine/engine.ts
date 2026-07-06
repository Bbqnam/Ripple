import type { Choice, Effect, GameEvent, GameState, Requirement, StatKey } from "./types";
import { clamp } from "./newGame";

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
  // 1. queued events fire first
  const due = g.queue.find((q) => q.triggerTurn <= g.turn);
  if (due) {
    const ev = events.find((e) => e.id === due.eventId);
    if (ev) return ev;
  }

  const pool = events.filter((e) => {
    if (!meets(g, e.requires)) return false;
    // avoid immediate repeats: don't repeat within 8 turns
    const lastIdx = [...g.seenEvents].reverse().indexOf(e.id);
    if (lastIdx !== -1 && lastIdx < 8) return false;
    return true;
  });

  if (pool.length === 0) {
    // fallback: allow any that meet reqs
    const any = events.filter((e) => meets(g, e.requires));
    if (any.length === 0) return null;
    return any[Math.floor(Math.random() * any.length)];
  }

  const total = pool.reduce((s, e) => s + (e.weight ?? 10), 0);
  let r = Math.random() * total;
  for (const e of pool) {
    r -= e.weight ?? 10;
    if (r <= 0) return e;
  }
  return pool[0];
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
      tone: eff.memory.tone,
      icon: eff.memory.icon,
    });
  } else {
    // auto-memory for choice
    next.memories.push({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      age: g.age,
      year: currentYear(g),
      title: eventTitle,
      description: "",
      tone: "neutral",
      icon: "•",
    });
  }
  if (eff.queueEvents) {
    for (const q of eff.queueEvents) {
      next.queue.push({ eventId: q.eventId, triggerTurn: g.turn + q.inTurns });
    }
  }
  return next;
}

export function advanceTurn(g: GameState, consumedEventId?: string): GameState {
  const next: GameState = { ...g, turn: g.turn + 1 };
  next.age = 16 + Math.floor(next.turn / 4);

  // slow drift each turn — passive life
  next.stats = { ...g.stats };
  next.stats.stress = clamp(next.stats.stress + 1);
  next.stats.money = clamp(next.stats.money + 1); // small allowance
  next.stats.happiness = clamp(next.stats.happiness - (next.stats.stress > 70 ? 3 : 0));

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
