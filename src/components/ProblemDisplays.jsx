import { Twemoji } from "./Twemoji";

export function VisualProblem({ problem, fontSize }) {
  const { a, b, op, emoji } = problem;
  const iconSize = Math.max(40, Math.round(fontSize * 44));
  const opSize = Math.round(fontSize * 48);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-wrap justify-center gap-2 max-w-lg">
        {Array(Math.min(a, 25))
          .fill(null)
          .map((_, i) => (
            <span
              key={`a-${i}`}
              className="inline-block"
              style={{ animation: `bounceIn 0.4s ease-out ${i * 0.04}s both` }}
            >
              <Twemoji emoji={emoji} size={iconSize} />
            </span>
          ))}
      </div>
      <div className="font-black opacity-60">
        <Twemoji emoji={op === "+" ? "➕" : "➖"} size={opSize} />
      </div>
      <div className="flex flex-wrap justify-center gap-2 max-w-lg">
        {Array(Math.min(b, 25))
          .fill(null)
          .map((_, i) => (
            <span
              key={`b-${i}`}
              className="inline-block"
              style={{ animation: `bounceIn 0.4s ease-out ${(a + i) * 0.04}s both` }}
            >
              <Twemoji emoji={emoji} size={iconSize} />
            </span>
          ))}
      </div>
      <div className="font-black opacity-50 flex items-center justify-center gap-2 items-baseline">
        <span style={{ fontSize: `${opSize}px`, lineHeight: 1 }}>=</span>
        <Twemoji emoji="❓" size={opSize} />
      </div>
    </div>
  );
}

export function NumericProblem({ problem, fontSize }) {
  return (
    <div
      className="flex items-center justify-center gap-4 sm:gap-6 py-4"
      role="math"
      aria-label={problem.numericText}
    >
      <span className="font-black" style={{ fontSize: `${fontSize * 3.5}rem`, lineHeight: 1 }}>
        {problem.a}
      </span>
      <span
        className="font-black opacity-40"
        style={{ fontSize: `${fontSize * 2.5}rem`, lineHeight: 1 }}
      >
        {problem.op === "+" ? "+" : "−"}
      </span>
      <span className="font-black" style={{ fontSize: `${fontSize * 3.5}rem`, lineHeight: 1 }}>
        {problem.b}
      </span>
      <span
        className="font-black opacity-40"
        style={{ fontSize: `${fontSize * 2.5}rem`, lineHeight: 1 }}
      >
        =
      </span>
      <span
        className="font-black opacity-20"
        style={{ fontSize: `${fontSize * 3.5}rem`, lineHeight: 1 }}
      >
        ?
      </span>
    </div>
  );
}

export function StoryProblem({ problem, fontSize }) {
  return (
    <div
      className="max-w-lg mx-auto text-center py-4 px-2"
      style={{ fontSize: `${fontSize * 1.2}rem` }}
    >
      <span className="block mb-4">
        <Twemoji emoji={problem.emoji} size={72} />
      </span>
      <p className="font-medium leading-relaxed">{problem.story}</p>
    </div>
  );
}
