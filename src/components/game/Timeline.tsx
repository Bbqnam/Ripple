import type { Memory } from "@/engine/types";

export function Timeline({ memories, age }: { memories: Memory[]; age: number }) {
  const ages = Array.from({ length: age - 15 }, (_, i) => 16 + i);
  const byAge = new Map<number, Memory[]>();
  memories.forEach((m) => {
    const arr = byAge.get(m.age) ?? [];
    arr.push(m);
    byAge.set(m.age, arr);
  });

  return (
    <div className="glass rounded-3xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-sm font-semibold text-foreground/90 uppercase tracking-wider">
          Your Timeline
        </h3>
        <span className="text-xs text-muted-foreground">Age 16 → {age}</span>
      </div>
      <div className="relative overflow-x-auto pb-2">
        <div className="flex gap-3 min-w-max px-1">
          {ages.map((a) => {
            const ms = byAge.get(a) ?? [];
            const isNow = a === age;
            return (
              <div key={a} className="flex flex-col items-center min-w-[68px]">
                <div
                  className={`rounded-2xl px-3 py-2 text-xs font-semibold border transition ${
                    isNow
                      ? "bg-gradient-primary text-primary-foreground border-transparent shadow-accent-glow"
                      : ms.length
                        ? "glass-strong border-white/10 text-foreground"
                        : "border-white/5 text-muted-foreground"
                  }`}
                >
                  {a}
                </div>
                <div className="mt-2 flex flex-col items-center gap-1 max-w-[64px]">
                  {ms.slice(-3).map((m) => (
                    <div
                      key={m.id}
                      title={`${m.title} — ${m.description}`}
                      className={`text-base leading-none rounded-full w-7 h-7 flex items-center justify-center border ${
                        m.tone === "positive"
                          ? "bg-[color:var(--color-success)]/20 border-[color:var(--color-success)]/40"
                          : m.tone === "negative"
                            ? "bg-[color:var(--color-danger)]/20 border-[color:var(--color-danger)]/40"
                            : "bg-white/5 border-white/10"
                      }`}
                    >
                      {m.icon}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
