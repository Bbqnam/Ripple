import type { GameState } from "@/engine/types";

export function GoalPanel({ state }: { state: GameState }) {
  return (
    <div className="glass rounded-3xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground/90">Visible Goals</h3>
        <span className="text-xs text-muted-foreground">Progress</span>
      </div>
      <div className="space-y-3">
        {state.goals.map((goal) => {
          const pct = Math.min(100, Math.round(goal.progress));
          return (
            <div key={goal.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-sm font-medium">{goal.title}</span>
                <span className="text-xs text-muted-foreground">{pct}%</span>
              </div>
              <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                <div className="h-full rounded-full bg-gradient-accent transition-all" style={{ width: `${pct}%` }} />
              </div>
              <div className="text-[11px] text-muted-foreground mt-2">{goal.description}</div>
              <div className="text-[11px] text-[color:var(--color-turquoise)] mt-1">Contributors: {goal.contributions.join(", ")}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
