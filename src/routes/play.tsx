import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useGame } from "@/hooks/useGame";
import { Avatar } from "@/components/game/Avatar";
import { StatsPanel } from "@/components/game/StatsPanel";
import { EventCard } from "@/components/game/EventCard";
import { Timeline } from "@/components/game/Timeline";
import { currentYear } from "@/engine/engine";
import { useEffect } from "react";

export const Route = createFileRoute("/play")({
  component: PlayPage,
});

function PlayPage() {
  const nav = useNavigate();
  const { state, event, choose, startNew, reset, lastEffectPing } = useGame();

  // Auto-start if no save
  useEffect(() => {
    if (state === null) {
      // small delay so hydrate effect runs first
      const t = setTimeout(() => {
        // if still null after hydrate, create new
      }, 50);
      return () => clearTimeout(t);
    }
  }, [state]);

  if (!state) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="glass-strong rounded-3xl p-10 max-w-md text-center">
          <div className="text-5xl mb-4">🌊</div>
          <h1 className="font-display text-2xl font-semibold mb-3">Begin your life</h1>
          <p className="text-sm text-muted-foreground mb-6">
            You'll wake up at age 16. Every choice from here will shape decades to come.
          </p>
          <button
            onClick={() => startNew()}
            className="w-full rounded-2xl px-6 py-4 bg-gradient-primary text-primary-foreground font-semibold shadow-glow hover:brightness-110 transition"
          >
            Start Life
          </button>
          <Link to="/" className="block mt-4 text-xs text-muted-foreground hover:text-foreground">
            ← Back to landing
          </Link>
        </div>
      </main>
    );
  }

  if (!state.alive) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="glass-strong rounded-3xl p-10 max-w-lg text-center">
          <div className="text-5xl mb-4">🕯️</div>
          <h1 className="font-display text-3xl font-semibold mb-2">The ripples settle</h1>
          <p className="text-muted-foreground mb-1">
            {state.name}, age {state.age}
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            {state.memories.length} memories made. {state.flags.length} paths taken.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => {
                reset();
                nav({ to: "/" });
              }}
              className="flex-1 rounded-2xl px-6 py-3 glass hover:border-white/20"
            >
              Home
            </button>
            <button
              onClick={() => startNew()}
              className="flex-1 rounded-2xl px-6 py-3 bg-gradient-primary text-primary-foreground font-semibold shadow-glow"
            >
              New Life
            </button>
          </div>
        </div>
      </main>
    );
  }

  const season = ["Spring", "Summer", "Autumn", "Winter"][state.turn % 4];

  return (
    <main className="min-h-screen px-4 md:px-8 py-6 max-w-6xl mx-auto">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition">
          <span className="w-2 h-2 rounded-full bg-[color:var(--color-turquoise)] shadow-accent-glow" />
          Ripple
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (confirm("Abandon this life and start over?")) {
                reset();
                nav({ to: "/" });
              }
            }}
            className="text-xs text-muted-foreground hover:text-[color:var(--color-danger)] transition"
          >
            End life
          </button>
        </div>
      </div>

      {/* Header */}
      <div className="glass-strong rounded-3xl p-5 mb-6 flex items-center gap-5">
        <Avatar state={state} size={88} />
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-3 flex-wrap">
            <h1 className="font-display text-2xl md:text-3xl font-semibold">{state.name}</h1>
            <span className="text-sm text-muted-foreground">
              Age {state.age} · {season} {currentYear(state)}
            </span>
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {state.flags.slice(-6).map((f) => (
              <span
                key={f}
                className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-muted-foreground"
              >
                {f.replace(/_/g, " ")}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="grid lg:grid-cols-[1fr_360px] gap-6">
        <div className="space-y-6">
          {event ? (
            <EventCard state={state} event={event} onChoose={choose} />
          ) : (
            <div className="glass-strong rounded-3xl p-8 text-center">
              <p className="text-muted-foreground">Life is quiet for a moment…</p>
            </div>
          )}

          <Timeline memories={state.memories} age={state.age} />
        </div>

        <aside className="space-y-6">
          <StatsPanel stats={state.stats} pulse={lastEffectPing} />

          <div className="glass rounded-3xl p-5">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground/90 mb-3">
              Relationships
            </h3>
            <div className="space-y-3">
              {state.relationships.map((r) => (
                <div key={r.id} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-primary flex items-center justify-center text-sm font-semibold text-primary-foreground">
                    {r.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium">{r.name}</span>
                      <span className="text-muted-foreground">{r.role}</span>
                    </div>
                    <div className="mt-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full bg-gradient-accent transition-all duration-500"
                        style={{ width: `${(r.love + r.trust + r.closeness) / 3}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-3xl p-5">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground/90 mb-3">
              Recent Memories
            </h3>
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {[...state.memories].reverse().slice(0, 12).map((m) => (
                <div key={m.id} className="flex items-start gap-2 text-xs">
                  <span className="text-base leading-none mt-0.5">{m.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-foreground/90 truncate">{m.title}</div>
                    <div className="text-[10px] text-muted-foreground">Age {m.age}</div>
                  </div>
                </div>
              ))}
              {state.memories.length === 0 && (
                <div className="text-xs text-muted-foreground italic">No memories yet.</div>
              )}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
