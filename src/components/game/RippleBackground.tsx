export function RippleBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="animate-ripple absolute left-1/2 top-1/2 rounded-full border"
          style={{
            width: 200,
            height: 200,
            marginLeft: -100,
            marginTop: -100,
            borderColor: "oklch(0.78 0.15 190 / 0.35)",
            borderWidth: 1.5,
            animationDelay: `${i * 0.8}s`,
          }}
        />
      ))}
      {/* floating particles */}
      {Array.from({ length: 14 }).map((_, i) => (
        <div
          key={`p-${i}`}
          className="animate-float absolute rounded-full"
          style={{
            top: `${(i * 37) % 100}%`,
            left: `${(i * 53) % 100}%`,
            width: 3 + (i % 4),
            height: 3 + (i % 4),
            background: "oklch(0.78 0.15 190 / 0.35)",
            animationDelay: `${(i % 6) * 0.9}s`,
            animationDuration: `${8 + (i % 5)}s`,
            filter: "blur(1px)",
          }}
        />
      ))}
    </div>
  );
}
