import type { GameState } from "@/engine/types";

interface Props {
  state: GameState;
  size?: number;
}

// Stylized vector avatar that evolves with age & flags.
export function Avatar({ state, size = 96 }: Props) {
  const age = state.age;
  const seed = state.avatarSeed;
  const hairHue = 20 + (seed % 60); // warm brown → auburn
  const skinHue = 25 + ((seed >> 3) % 15);
  const skinL = 65 + ((seed >> 5) % 20);
  const shirtHue = (seed * 37) % 360;

  // life stage → outfit accent
  let stage: "teen" | "student" | "worker" | "founder" | "parent" | "retired" = "teen";
  if (state.flags.includes("founder")) stage = "founder";
  else if (state.flags.includes("in_college")) stage = "student";
  else if (age >= 22) stage = "worker";
  if (age >= 60) stage = "retired";

  const shirtColor = `oklch(0.55 0.16 ${shirtHue})`;
  const accentColor =
    stage === "founder"
      ? "oklch(0.78 0.15 190)"
      : stage === "student"
        ? "oklch(0.6 0.22 285)"
        : stage === "worker"
          ? "oklch(0.55 0.22 264)"
          : "oklch(0.7 0.14 200)";

  const smile = state.stats.happiness > 60 ? 6 : state.stats.happiness < 30 ? -3 : 2;
  const eyeY = state.stats.stress > 70 ? 46 : 44;

  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className="drop-shadow-xl">
      <defs>
        <radialGradient id="bg" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="oklch(0.4 0.2 285 / 0.6)" />
          <stop offset="100%" stopColor="oklch(0.2 0.05 265 / 0)" />
        </radialGradient>
        <linearGradient id="shirt" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={shirtColor} />
          <stop offset="100%" stopColor={accentColor} />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#bg)" />
      {/* neck */}
      <rect x="43" y="60" width="14" height="10" fill={`oklch(${skinL / 100} 0.05 ${skinHue})`} />
      {/* shirt */}
      <path d="M20 100 C 25 78, 40 68, 50 68 C 60 68, 75 78, 80 100 Z" fill="url(#shirt)" />
      {/* face */}
      <ellipse cx="50" cy="46" rx="18" ry="20" fill={`oklch(${skinL / 100} 0.05 ${skinHue})`} />
      {/* hair */}
      <path
        d={
          stage === "retired"
            ? "M32 40 Q50 20 68 40 Q66 32 50 30 Q34 32 32 40 Z"
            : "M30 44 Q30 22 50 22 Q70 22 70 44 Q64 34 50 32 Q36 34 30 44 Z"
        }
        fill={stage === "retired" ? "oklch(0.85 0.02 260)" : `oklch(0.28 0.08 ${hairHue})`}
      />
      {/* eyes */}
      <circle cx="43" cy={eyeY} r="1.6" fill="#0b0b18" />
      <circle cx="57" cy={eyeY} r="1.6" fill="#0b0b18" />
      {/* smile */}
      <path
        d={`M43 ${54} Q50 ${54 + smile} 57 ${54}`}
        stroke="#0b0b18"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
      {/* accessory: glasses for founder / student */}
      {(stage === "founder" || stage === "student") && (
        <g stroke={accentColor} strokeWidth="1.2" fill="none">
          <circle cx="43" cy={eyeY} r="4" />
          <circle cx="57" cy={eyeY} r="4" />
          <path d={`M47 ${eyeY} L53 ${eyeY}`} />
        </g>
      )}
      {/* headphones / band flag */}
      {state.flags.includes("in_a_band") && (
        <g fill={accentColor}>
          <rect x="27" y="38" width="3" height="10" rx="1.5" />
          <rect x="70" y="38" width="3" height="10" rx="1.5" />
          <path d="M28 38 Q50 20 72 38" stroke={accentColor} strokeWidth="2" fill="none" />
        </g>
      )}
    </svg>
  );
}
