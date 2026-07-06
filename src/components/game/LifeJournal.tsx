import { useMemo, useState } from "react";
import type { Memory } from "@/engine/types";

interface Props {
  memories: Memory[];
}

const FILTERS = ["all", "career", "family", "relationships", "health", "education", "finance", "business"] as const;

type Filter = (typeof FILTERS)[number];

export function LifeJournal({ memories }: Props) {
  const [filter, setFilter] = useState<Filter>("all");
  const filtered = useMemo(() => {
    if (filter === "all") return memories;
    return memories.filter((memory) => memory.category === filter);
  }, [filter, memories]);

  return (
    <div className="glass-strong rounded-3xl p-6 md:p-8 shadow-elevated">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-[color:var(--color-turquoise)] font-semibold">Life journal</div>
          <h2 className="font-display text-2xl font-semibold">Memories by age and year</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`rounded-full px-3 py-1 text-xs border transition ${filter === item ? "bg-gradient-primary text-primary-foreground border-transparent" : "border-white/10 bg-white/[0.04] text-muted-foreground"}`}
            >
              {item === "all" ? "All" : item}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
        {filtered.map((memory) => (
          <div key={memory.id} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-semibold text-foreground">{memory.title}</div>
                <div className="text-sm text-foreground/80 mt-1">{memory.description}</div>
              </div>
              <div className="text-right text-xs text-muted-foreground">
                <div>Age {memory.age}</div>
                <div>{memory.year}</div>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1">{memory.category}</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1">{memory.tone}</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1">Ripple impact: {memory.title.includes("First") ? "strong" : "moderate"}</span>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div className="text-sm text-muted-foreground">No memories match this filter yet.</div>}
      </div>
    </div>
  );
}
