import { useCallback, useEffect, useState } from "react";
import type { GameEvent, GameState } from "@/engine/types";
import { createNewGame } from "@/engine/newGame";
import { EVENTS, EVENTS_BY_ID } from "@/engine/events";
import { advanceTurn, applyEffect, pickEvent } from "@/engine/engine";
import { hasSave, loadGame, saveGame, deleteSave } from "@/engine/save";

export function useGame() {
  const [state, setState] = useState<GameState | null>(null);
  const [event, setEvent] = useState<GameEvent | null>(null);
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
    setEvent(pickEvent(g, EVENTS));
  }, []);

  const resume = useCallback(() => {
    const g = loadGame();
    if (g) {
      setState(g);
      setEvent(pickEvent(g, EVENTS));
    }
  }, []);

  const reset = useCallback(() => {
    deleteSave();
    setState(null);
    setEvent(null);
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
      if (!afterTurn.alive) {
        setEvent(null);
        return;
      }
      // pick next event
      setEvent(pickEvent(afterTurn, EVENTS));
    },
    [state, event]
  );

  return { state, event, choose, startNew, resume, reset, hasSave: hasSave(), lastEffectPing, EVENTS_BY_ID };
}
