import { useMemo } from "react";
import type { GameState, OutcomeSummary } from "@/engine/types";

interface Props {
  state: GameState;
  summary: OutcomeSummary;
  onContinue: () => void;
}

export function ConsequenceCard({ state, summary, onContinue }: Props) {
  const positiveDelta = useMemo(() => summary.statChanges.filter((entry) => entry.delta > 0).length, [summary]);

  return (
    <div className="glass-strong rounded-3xl p-6 md:p-8 shadow-elevated relative overflow-hidden panel-illustration">
      <div className="relative">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-[color:var(--color-turquoise)] font-semibold">Consequence</div>
            <h2 className="font-display text-2xl md:text-3xl font-semibold">{summary.title}</h2>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-muted-foreground">
            {state.name} · Age {state.age}
          </div>
        </div>

        <p className="text-sm leading-relaxed text-foreground/80 mb-5">{summary.narrative}</p>

        <div className="grid md:grid-cols-2 gap-4 mb-5">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">What changed</div>
            <div className="space-y-2 text-sm">
              {summary.statChanges.map((entry) => (
                <div key={entry.key} className="flex items-center justify-between gap-2">
                  <span className="capitalize">{entry.key}</span>
                  <span className={`font-semibold ${entry.delta >= 0 ? "text-[color:var(--color-success)]" : "text-[color:var(--color-danger)]"}`}>
                    {entry.delta > 0 ? "+" : ""}{entry.delta}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Ripple signals</div>
            <div className="space-y-2 text-sm">
              {summary.futureChance.length > 0 ? summary.futureChance.map((item) => <div key={item}>• {item}</div>) : <div>No new opportunities yet.</div>}
            </div>
            <div className="mt-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">Risk</div>
            <div className="space-y-2 text-sm mt-2">
              {summary.futureRisk.length > 0 ? summary.futureRisk.map((item) => <div key={item}>• {item}</div>) : <div>No clear downside yet.</div>}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 mb-5">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Why it happened</div>
          <div className="flex flex-wrap gap-2">
            {summary.reasons.map((reason) => (
              <span key={reason} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs">{reason}</span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-5">
          {summary.relationshipChanges.map((entry) => (
            <div key={entry.id} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs">
              {entry.name}: {entry.fields.join(", ")}
            </div>
          ))}
          {summary.newFlags.map((flag) => (
            <div key={flag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs">Flag: {flag}</div>
          ))}
          {summary.newMemory && <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs">Memory: {summary.newMemory.title}</div>}
        </div>

        <button onClick={onContinue} className="w-full rounded-2xl px-5 py-3 bg-gradient-primary text-primary-foreground font-semibold shadow-glow hover:brightness-110 transition">
          Continue{positiveDelta > 0 ? " with momentum" : ""}
        </button>
      </div>
    </div>
  );
}
