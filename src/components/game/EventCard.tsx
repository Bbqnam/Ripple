import { useEffect, useState } from "react";
import type { GameEvent, GameState } from "@/engine/types";
import { choiceAvailable } from "@/engine/engine";

interface Props {
  state: GameState;
  event: GameEvent;
  onChoose: (choiceId: string) => void;
}

export function EventCard({ state, event, onChoose }: Props) {
  const [key, setKey] = useState(0);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    setKey((k) => k + 1);
    setLocked(false);
  }, [event.id]);

  const handle = (id: string) => {
    if (locked) return;
    setLocked(true);
    setTimeout(() => onChoose(id), 220);
  };

  return (
    <div key={key} className="animate-fade-up glass-strong rounded-3xl p-6 md:p-8 shadow-elevated relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full opacity-30 blur-3xl" style={{ background: "var(--gradient-primary)" }} />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full opacity-20 blur-3xl" style={{ background: "var(--gradient-accent)" }} />

      <div className="relative">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-3xl border border-white/10 bg-white/[0.06] flex items-center justify-center text-3xl shadow-accent-glow">
            {event.emoji}
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-turquoise)] font-semibold">
              {event.category}
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
              {event.title}
            </h2>
          </div>
        </div>

        <p className="text-foreground/80 leading-relaxed text-[15px] md:text-base mb-6 max-w-2xl">
          {event.description}
        </p>

        <div className="grid gap-3">
          {event.choices.map((c, i) => {
            const available = choiceAvailable(state, c);
            return (
              <button
                key={c.id}
                onClick={() => available && handle(c.id)}
                disabled={!available || locked}
                style={{ animationDelay: `${i * 80}ms` }}
                className={`animate-fade-up group relative text-left rounded-2xl p-4 transition-all duration-200 border ${
                  available
                    ? "glass hover:border-[color:var(--color-turquoise)]/40 hover:shadow-accent-glow hover:-translate-y-0.5 cursor-pointer"
                    : "opacity-40 cursor-not-allowed border-white/5 bg-white/[0.02]"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-semibold text-foreground group-hover:text-[color:var(--color-turquoise)] transition">
                      {c.label}
                    </div>
                    {c.description && (
                      <div className="text-xs text-muted-foreground mt-1">{c.description}</div>
                    )}
                    {!available && (
                      <div className="text-[10px] uppercase tracking-widest text-[color:var(--color-warning)] mt-2">
                        Requirements not met
                      </div>
                    )}
                  </div>
                  <span className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition">→</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
