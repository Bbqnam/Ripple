import { ACTIVITIES } from "@/engine/activities";
import type { GameState } from "@/engine/types";

interface Props {
  state: GameState;
  onSelectActivity: (id: string) => void;
  onEndQuarter: () => void;
}

export function LifeHub({ state, onSelectActivity, onEndQuarter }: Props) {
  return (
    <div className="glass-strong rounded-3xl p-6 md:p-8 shadow-elevated relative overflow-hidden panel-illustration">
      <div className="relative">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-[color:var(--color-turquoise)] font-semibold">Life hub</div>
            <h2 className="font-display text-2xl md:text-3xl font-semibold">Quarter {Math.floor(state.turn / 4) + 1}</h2>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-muted-foreground">
            {state.actionPoints} action points left
          </div>
        </div>

        <p className="text-sm text-foreground/80 mb-5">Each quarter, you can spend points on activities that change your trajectory. Every action should leave a visible mark.</p>

        <div className="grid md:grid-cols-2 gap-3 mb-6">
          {ACTIVITIES.map((activity) => (
            <button
              key={activity.id}
              onClick={() => onSelectActivity(activity.id)}
              disabled={state.actionPoints < activity.cost}
              className={`text-left rounded-2xl border p-4 transition ${state.actionPoints >= activity.cost ? "glass hover:border-[color:var(--color-turquoise)]/40" : "opacity-40 cursor-not-allowed border-white/5 bg-white/[0.02]"}`}
            >
              <div className="flex items-center justify-between gap-3 mb-2">
                <div className="text-2xl">{activity.icon}</div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Cost {activity.cost}</span>
              </div>
              <div className="font-semibold text-foreground">{activity.label}</div>
              <div className="text-xs text-muted-foreground mt-1">{activity.description}</div>
              <div className="mt-3 text-[11px] text-[color:var(--color-turquoise)]">{activity.hint}</div>
            </button>
          ))}
        </div>

        <button onClick={onEndQuarter} className="w-full rounded-2xl px-5 py-3 bg-gradient-primary text-primary-foreground font-semibold shadow-glow hover:brightness-110 transition">
          End Quarter and reveal the next story event
        </button>
      </div>
    </div>
  );
}
