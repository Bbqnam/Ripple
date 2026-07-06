import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { RippleBackground } from "@/components/game/RippleBackground";
import { hasSave, deleteSave } from "@/engine/save";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  const [savePresent, setSavePresent] = useState(false);
  const nav = useNavigate();
  useEffect(() => setSavePresent(hasSave()), []);

  const newLife = () => {
    if (hasSave()) deleteSave();
    nav({ to: "/play" });
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-6 py-16 overflow-hidden">
      <RippleBackground />

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl">
        <div className="relative mb-8">
          <div className="w-28 h-28 rounded-full bg-gradient-primary shadow-glow flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-16 h-16 text-white">
              <circle cx="50" cy="50" r="8" fill="currentColor" />
              <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.7" />
              <circle cx="50" cy="50" r="34" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
              <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.2" />
            </svg>
          </div>
        </div>

        <h1 className="font-display text-6xl md:text-8xl font-bold mb-3 tracking-tight">
          <span className="text-gradient">Ripple</span>
        </h1>
        <p className="text-lg md:text-xl text-foreground/80 mb-2 font-medium">
          Every Choice Matters.
        </p>
        <p className="text-sm text-muted-foreground max-w-md mb-10">
          A quiet life simulation. Small decisions today become the shape of your life tomorrow.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
          {savePresent && (
            <Link
              to="/play"
              className="flex-1 rounded-2xl px-6 py-4 bg-gradient-primary text-primary-foreground font-semibold shadow-glow hover:brightness-110 hover:-translate-y-0.5 transition-all"
            >
              Continue
            </Link>
          )}
          <button
            onClick={newLife}
            className={`flex-1 rounded-2xl px-6 py-4 font-semibold transition-all hover:-translate-y-0.5 ${
              savePresent
                ? "glass-strong hover:border-[color:var(--color-turquoise)]/40 hover:shadow-accent-glow"
                : "bg-gradient-accent text-accent-foreground shadow-accent-glow hover:brightness-110"
            }`}
          >
            New Life
          </button>
        </div>

        <div className="mt-6 flex gap-4 text-xs text-muted-foreground">
          <button
            onClick={() => {
              if (confirm("Delete your saved life?")) {
                deleteSave();
                setSavePresent(false);
              }
            }}
            className="hover:text-foreground transition"
            disabled={!savePresent}
          >
            {savePresent ? "Reset save" : "No save yet"}
          </button>
          <span>•</span>
          <span>v0.1.0</span>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-4 max-w-md w-full text-center">
          {[
            { k: "40+", v: "Handcrafted events" },
            { k: "10", v: "Hidden traits" },
            { k: "∞", v: "Ripples" },
          ].map((s) => (
            <div key={s.v} className="glass rounded-2xl p-4">
              <div className="font-display text-2xl font-bold text-gradient">{s.k}</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">
                {s.v}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
