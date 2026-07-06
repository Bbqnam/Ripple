import { useCallback, useEffect, useState } from "react";
import type { ActivityDefinition, GameEvent, GameState, OutcomeSummary } from "@/engine/types";
import { createNewGame } from "@/engine/newGame";
import { EVENTS, EVENTS_BY_ID } from "@/engine/events";
import { ACTIVITIES } from "@/engine/activities";
import { advanceTurn, applyEffect, pickEvent } from "@/engine/engine";
import { hasSave, loadGame, saveGame, deleteSave } from "@/engine/save";

export function useGame() {
  const [state, setState] = useState<GameState | null>(null);
  const [event, setEvent] = useState<GameEvent | null>(null);
  const [consequence, setConsequence] = useState<OutcomeSummary | null>(null);
  const [lastEffectPing, setLastEffectPing] = useState(0);

  // hydrate
  useEffect(() => {
    const g = loadGame();
    if (g) {
      setState(g);
      const ev = pickEvent(g, EVENTS);
      setEvent(ev);
    }
  }, []);

  const startNew = useCallback((name?: string) => {
    const g = createNewGame(name);
    saveGame(g);
    setState(g);
    setEvent(null);
    setConsequence(null);
    setLastEffectPing((p) => p + 1);
  }, []);

  const resume = useCallback(() => {
    const g = loadGame();
    if (g) {
      setState(g);
      setEvent(g.phase === "event" ? pickEvent(g, EVENTS) : null);
      setConsequence(null);
    }
  }, []);

  const reset = useCallback(() => {
    deleteSave();
    setState(null);
    setEvent(null);
    setConsequence(null);
  }, []);

  const buildSummary = useCallback((base: GameState, choice: { label: string; description?: string; outcomeNarrative?: string; outcomeReason?: string; outcomeHints?: string[] }, effectState: GameState, eventTitle: string): OutcomeSummary => {
    const before = base.stats;
    const after = effectState.stats;
    const statChanges = (Object.keys(after) as Array<keyof typeof after>).map((key) => ({ key, delta: after[key] - before[key] }));
    const relationshipChanges = effectState.relationships
      .filter((relationship) => {
        const previous = base.relationships.find((entry) => entry.id === relationship.id);
        return previous && (relationship.trust !== previous.trust || relationship.respect !== previous.respect || relationship.love !== previous.love || relationship.closeness !== previous.closeness);
      })
      .map((relationship) => {
        const previous = base.relationships.find((entry) => entry.id === relationship.id)!;
        const fields: string[] = [];
        if (relationship.trust !== previous.trust) fields.push(`trust ${relationship.trust - previous.trust > 0 ? "+" : ""}${relationship.trust - previous.trust}`);
        if (relationship.respect !== previous.respect) fields.push(`respect ${relationship.respect - previous.respect > 0 ? "+" : ""}${relationship.respect - previous.respect}`);
        if (relationship.love !== previous.love) fields.push(`love ${relationship.love - previous.love > 0 ? "+" : ""}${relationship.love - previous.love}`);
        if (relationship.closeness !== previous.closeness) fields.push(`closeness ${relationship.closeness - previous.closeness > 0 ? "+" : ""}${relationship.closeness - previous.closeness}`);
        return { id: relationship.id, name: relationship.name, fields };
      });

    return {
      title: choice.label,
      narrative: choice.outcomeNarrative ?? `${choice.label} changed the shape of your week. ${eventTitle} now feels different than it did before.`,
      statChanges: statChanges.filter((entry) => entry.delta !== 0),
      relationshipChanges,
      moneyChanges: [
        { label: "cash", delta: after.cash - before.cash },
        { label: "savings", delta: after.savings - before.savings },
        { label: "debt", delta: after.debt - before.debt },
      ],
      newFlags: effectState.flags.filter((flag) => !base.flags.includes(flag)),
      newMemory: effectState.memories.at(-1),
      reasons: [choice.outcomeReason ?? "You chose with your values and resources in mind.", "Your current stats nudged the outcome."],
      futureChance: choice.outcomeHints ?? ["More opportunities are likely to appear if you keep the same pattern."],
      futureRisk: ["Stress can rise if you keep pushing without rest."],
    };
  }, []);

  const choose = useCallback(
    (choiceId: string) => {
      if (!state || !event) return;
      const choice = event.choices.find((c) => c.id === choiceId);
      if (!choice) return;
      const afterEffect = applyEffect(state, choice.effects, event.title);
      const afterTurn = advanceTurn(afterEffect, event.id);
      saveGame(afterTurn);
      setState(afterTurn);
      setLastEffectPing((p) => p + 1);
      setConsequence(buildSummary(state, choice, afterTurn, event.title));
      if (!afterTurn.alive) {
        setEvent(null);
        return;
      }
      setEvent(null);
      setState(afterTurn);
    },
    [state, event, buildSummary]
  );

  const continueAfterConsequence = useCallback(() => {
    if (!state) return;
    const nextState = { ...state, phase: "hub" as const };
    saveGame(nextState);
    setState(nextState);
    setEvent(null);
    setConsequence(null);
  }, [state]);

  const spendActivity = useCallback((activityId: string) => {
    if (!state) return;
    const activity = ACTIVITIES.find((entry) => entry.id === activityId);
    if (!activity || state.actionPoints < activity.cost) return;
    const afterEffect = applyEffect(state, activity.effects, activity.label);
    const afterTurn = { ...afterEffect, actionPoints: state.actionPoints - activity.cost, phase: "hub" as const };
    saveGame(afterTurn);
    setState(afterTurn);
    setLastEffectPing((p) => p + 1);
    setConsequence({
      title: activity.label,
      narrative: `${activity.description} The change is immediate and visible in your stats and goals.`,
      statChanges: Object.entries(activity.effects.stats ?? {}).map(([key, delta]) => ({ key: key as keyof typeof afterTurn.stats, delta })),
      relationshipChanges: [],
      moneyChanges: [],
      newFlags: [],
      newMemory: afterTurn.memories.at(-1),
      reasons: [activity.hint],
      futureChance: [`${activity.label} improves your odds in the next quarter.`],
      futureRisk: ["Overuse can also raise stress if you ignore recovery."],
    });
  }, [state]);

  const endQuarter = useCallback(() => {
    if (!state) return;
    const afterTurn = { ...state, phase: "event" as const };
    saveGame(afterTurn);
    setState(afterTurn);
    setConsequence(null);
    setEvent(pickEvent(afterTurn, EVENTS));
  }, [state]);

  return { state, event, consequence, choose, startNew, resume, reset, hasSave: hasSave(), lastEffectPing, EVENTS_BY_ID, spendActivity, endQuarter, continueAfterConsequence };
}
