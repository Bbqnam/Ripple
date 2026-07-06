import { useEffect, useRef, useState } from "react";
import type { Stats } from "@/engine/types";

const STAT_META: Record<keyof Stats, { label: string; icon: string; color: string }> = {
  health: { label: "Health", icon: "❤️", color: "oklch(0.65 0.22 25)" },
  happiness: { label: "Happiness", icon: "😊", color: "oklch(0.78 0.17 65)" },
  money: { label: "Money", icon: "💰", color: "oklch(0.72 0.18 130)" },
  reputation: { label: "Reputation", icon: "⭐", color: "oklch(0.78 0.15 85)" },
  education: { label: "Education", icon: "📚", color: "oklch(0.6 0.22 264)" },
  skill: { label: "Skill", icon: "🧠", color: "oklch(0.6 0.24 300)" },
  relationships: { label: "Bonds", icon: "🤝", color: "oklch(0.7 0.18 350)" },
  stress: { label: "Stress", icon: "⚡", color: "oklch(0.65 0.24 25)" },
};

function StatBar({ k, value, pulse }: { k: keyof Stats; value: number; pulse: number }) {
  const meta = STAT_META[k];
  const prev = useRef(value);
  const [popKey, setPopKey] = useState(0);
  const [delta, setDelta] = useState<number | null>(null);

  useEffect(() => {
    if (prev.current !== value) {
      const d = value - prev.current;
      setDelta(d);
      setPopKey((k) => k + 1);
      const t = setTimeout(() => setDelta(null), 1400);
      prev.current = value;
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pulse]);

  return (
    <div className="flex items-center gap-3">
      <span className="text-lg leading-none w-6 text-center">{meta.icon}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-muted-foreground font-medium">{meta.label}</span>
          <span className="relative tabular-nums font-semibold text-foreground/90">
            <span key={popKey} className="animate-number-pop inline-block">
              {Math.round(value)}
            </span>
            {delta !== null && (
              <span
                className={`absolute -top-4 right-0 text-[10px] font-bold animate-fade-up ${
                  delta > 0 ? "text-[color:var(--color-success)]" : "text-[color:var(--color-danger)]"
                }`}
              >
                {delta > 0 ? "+" : ""}
                {delta}
              </span>
            )}
          </span>
        </div>
        <div className="h-2 rounded-full bg-white/5 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{
              width: `${Math.max(2, Math.min(100, value))}%`,
              background: `linear-gradient(90deg, ${meta.color}, oklch(0.85 0.12 200))`,
              boxShadow: `0 0 12px ${meta.color}`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export function StatsPanel({ stats, pulse }: { stats: Stats; pulse: number }) {
  const order: (keyof Stats)[] = [
    "health",
    "happiness",
    "money",
    "reputation",
    "education",
    "skill",
    "relationships",
    "stress",
  ];
  return (
    <div className="glass rounded-3xl p-5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
      {order.map((k) => (
        <StatBar key={k} k={k} value={stats[k]} pulse={pulse} />
      ))}
    </div>
  );
}
