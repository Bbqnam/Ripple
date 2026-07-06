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

  const sceneVariant = event.sceneType ?? "meeting";
  const scenePanels: Record<string, React.ReactNode> = {
    phone: (
      <div className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),rgba(255,255,255,0.03))] p-4 h-44 flex items-center justify-center">
        <div className="w-full h-full rounded-[1.2rem] border border-white/10 bg-[rgba(8,18,36,0.65)] p-4 relative">
          <div className="absolute left-4 top-4 h-10 w-10 rounded-full bg-[color:var(--color-turquoise)]/30" />
          <div className="absolute right-4 top-6 h-16 w-24 rounded-2xl border border-white/10 bg-white/10" />
          <div className="absolute bottom-4 left-4 right-4 h-16 rounded-2xl border border-white/10 bg-white/8" />
        </div>
      </div>
    ),
    letter: (
      <div className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.15),rgba(255,255,255,0.04))] p-4 h-44 flex items-center justify-center">
        <div className="w-full h-full rounded-[1.2rem] border border-white/10 bg-[rgba(255,255,255,0.08)] p-4 relative">
          <div className="absolute inset-4 border border-white/10 rounded-[1rem]" />
          <div className="absolute left-8 top-8 h-3 w-20 rounded-full bg-white/20" />
          <div className="absolute left-8 top-16 h-2 w-28 rounded-full bg-white/10" />
          <div className="absolute left-8 top-24 h-2 w-24 rounded-full bg-white/10" />
          <div className="absolute right-8 bottom-8 h-16 w-16 rounded-full bg-[color:var(--color-turquoise)]/20" />
        </div>
      </div>
    ),
    report: (
      <div className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),rgba(255,255,255,0.04))] p-4 h-44 flex items-center justify-center">
        <div className="w-full h-full rounded-[1.2rem] border border-white/10 bg-[rgba(12,21,37,0.7)] p-4 flex items-end gap-3">
          <div className="flex-1 h-24 rounded-2xl border border-white/10 bg-white/10" />
          <div className="w-20 h-16 rounded-2xl border border-white/10 bg-[color:var(--color-warning)]/30" />
        </div>
      </div>
    ),
    hospital: (
      <div className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.14),rgba(255,255,255,0.04))] p-4 h-44 flex items-center justify-center">
        <div className="w-full h-full rounded-[1.2rem] border border-white/10 bg-[rgba(13,24,37,0.72)] p-4 relative">
          <div className="absolute inset-x-6 top-6 h-14 rounded-full border border-white/10 bg-[color:var(--color-turquoise)]/20" />
          <div className="absolute left-8 bottom-6 h-16 w-16 rounded-full border border-white/10 bg-white/10" />
          <div className="absolute right-8 bottom-6 h-12 w-20 rounded-2xl border border-white/10 bg-white/10" />
        </div>
      </div>
    ),
    celebration: (
      <div className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.16),rgba(255,255,255,0.04))] p-4 h-44 flex items-center justify-center">
        <div className="w-full h-full rounded-[1.2rem] border border-white/10 bg-[rgba(9,20,35,0.7)] p-4 relative">
          <div className="absolute left-6 top-6 h-16 w-16 rounded-full border border-white/10 bg-[color:var(--color-warning)]/30" />
          <div className="absolute right-8 bottom-6 h-20 w-20 rounded-full border border-white/10 bg-[color:var(--color-success)]/30" />
          <div className="absolute left-12 bottom-8 h-10 w-24 rounded-2xl border border-white/10 bg-white/10" />
        </div>
      </div>
    ),
    home: (
      <div className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),rgba(255,255,255,0.04))] p-4 h-44 flex items-center justify-center">
        <div className="w-full h-full rounded-[1.2rem] border border-white/10 bg-[rgba(10,16,24,0.72)] p-4 relative">
          <div className="absolute left-6 top-6 h-12 w-16 rounded-2xl border border-white/10 bg-white/10" />
          <div className="absolute right-8 top-8 h-16 w-20 rounded-2xl border border-white/10 bg-white/10" />
          <div className="absolute left-10 bottom-6 h-10 w-24 rounded-2xl border border-white/10 bg-white/10" />
        </div>
      </div>
    ),
    street: (
      <div className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),rgba(255,255,255,0.04))] p-4 h-44 flex items-center justify-center">
        <div className="w-full h-full rounded-[1.2rem] border border-white/10 bg-[rgba(8,18,32,0.72)] p-4 relative">
          <div className="absolute left-6 bottom-6 h-12 w-12 rounded-full border border-white/10 bg-white/10" />
          <div className="absolute right-8 top-6 h-16 w-20 rounded-2xl border border-white/10 bg-white/10" />
          <div className="absolute inset-x-6 bottom-8 h-2 rounded-full bg-white/10" />
        </div>
      </div>
    ),
    meeting: (
      <div className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),rgba(255,255,255,0.04))] p-4 h-44 flex items-center justify-center">
        <div className="w-full h-full rounded-[1.2rem] border border-white/10 bg-[rgba(10,18,32,0.72)] p-4 relative">
          <div className="absolute left-6 top-6 h-10 w-10 rounded-full bg-[color:var(--color-turquoise)]/30" />
          <div className="absolute left-20 top-8 h-6 w-24 rounded-full border border-white/10 bg-white/10" />
          <div className="absolute right-6 top-10 h-16 w-24 rounded-2xl border border-white/10 bg-white/10" />
          <div className="absolute left-10 bottom-6 h-12 w-24 rounded-2xl border border-white/10 bg-white/10" />
        </div>
      </div>
    ),
  };

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
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 rounded-3xl border border-white/10 bg-white/[0.06] flex items-center justify-center text-3xl shadow-accent-glow">
            {event.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-turquoise)] font-semibold">
              {event.category}
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
              {event.title}
            </h2>
            <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
              {event.location && <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1">{event.location}</span>}
              {event.environment && <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1">{event.environment}</span>}
              {event.focus && <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1">Focus: {event.focus}</span>}
            </div>
          </div>
        </div>

        {event.momentTitle && (
          <div className="mb-5 rounded-2xl border border-[color:var(--color-warning)]/20 bg-[color:var(--color-warning)]/[0.08] px-4 py-3 text-sm">
            <div className="text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-warning)]">Life moment</div>
            <div className="font-semibold text-foreground">{event.momentTitle}</div>
          </div>
        )}

        <div className="mb-6 grid lg:grid-cols-[1.15fr_0.85fr] gap-4">
          <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-3">
            {scenePanels[sceneVariant]}
          </div>
          <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-4 flex flex-col justify-between">
            <p className="text-foreground/80 leading-relaxed text-[15px] md:text-base">
              {event.description}
            </p>
            <div className="mt-4 text-sm text-muted-foreground">
              {event.tone === "positive" ? "This moment carries momentum." : event.tone === "negative" ? "This moment carries weight." : "This moment asks for a choice."}
            </div>
          </div>
        </div>

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
