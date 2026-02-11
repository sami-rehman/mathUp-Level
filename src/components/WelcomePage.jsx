const LEVELS = [
  { num: 1, emoji: "🌱", desc: "Addition up to 5" }, //beginner
  { num: 2, emoji: "🌿", desc: "Addition up to 10" },
  { num: 3, emoji: "🌳", desc: "Addition & subtraction up to 10" },
  { num: 4, emoji: "🌟", desc: "Addition & subtraction up to 20" },
  { num: 5, emoji: "👑", desc: "Addition & subtraction up to 50" },
];

const RULES = [
  "Solve math problems in three modes: Pictures, Numbers, or Story.",
  "Answer correctly to earn stars and level up (3 correct in a row).",
  "Two wrong answers in a row may lower your level so you can practice.",
  "Use Read Aloud and captions if you want to hear the question.",
  "Collect trophies for streaks and milestones. Have fun!",
];

const TEAM = ["Zeineb", "Despoina", "Sami"];

export function WelcomePage({ onStart, cardBg, submitBtn }) {
  return (
    <div
      className={`${cardBg} rounded-3xl p-6 sm:p-8 max-w-2xl w-full text-left overflow-y-auto max-h-[90vh]`}
      style={{ fontFamily: "'Fredoka', sans-serif", animation: "slideUp 0.5s ease-out" }}
    >
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-1 bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
        LevelUp Math
      </h1>
      <p className="text-center text-sm text-gray-500 mb-6">Adaptive math practice for everyone</p>

      <section className="mb-4">
        <h2 className="text-lg font-bold mb-2 flex items-center gap-2">📋 How to play</h2>
        <ul className="space-y-2 text-sm">
          {RULES.map((rule, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-violet-500 shrink-0">•</span>
              <span>{rule}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-4">
        <h2 className="text-lg font-bold mb-2 flex items-center gap-2">📊 Levels</h2>
        <ul className="space-y-2 text-sm">
          {LEVELS.map((l) => (
            <li key={l.num} className="flex items-center gap-2">
              <span className="text-xl">{l.emoji}</span>
              <span className="font-medium">Level {l.num}:</span>
              <span>{l.desc}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-4">
        <h2 className="text-lg font-bold mb-2 flex items-center gap-2">👥 Team</h2>
        <p className="text-sm">{TEAM.join(" · ")}</p>
      </section>

      <p className="text-center text-sm text-gray-500 mb-4">
        Developed with ❤️ at Nice, Côte d'Azur 💜
      </p>

      <button
        onClick={onStart}
        className={`${submitBtn} w-full px-6 py-4 cursor-pointer rounded-2xl text-lg font-bold transition-all active:scale-[0.98] flex items-center justify-center gap-2 animate-start-playing`}
      >
        Start Learning 🚀
      </button>
    </div>
  );
}
