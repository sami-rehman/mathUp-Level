import { Twemoji } from "./Twemoji";

export function SessionEndScreen({
  score,
  level,
  totalAnswered,
  correctCount,
  accuracy,
  bestStreak,
  stars,
  trophies,
  onRestart,
  cardBg,
  submitBtn,
  fontSize,
  hc,
}) {
  const trophyBadgeClass = hc ? "bg-gray-800" : "bg-violet-50";

  const stats = [
    ["Score", score],
    ["Level Reached", level],
    ["Problems Solved", totalAnswered],
    ["Correct", correctCount],
    ["Accuracy", `${accuracy}%`],
    [
      "Best Streak",
      (
        <span key="bs" className="inline-flex items-center gap-1">
          {bestStreak} <Twemoji emoji="🔥" size={18} />
        </span>
      ),
    ],
    [
      "Stars",
      (
        <span key="st" className="inline-flex items-center gap-1">
          {stars} <Twemoji emoji="⭐" size={18} />
        </span>
      ),
    ],
  ];

  return (
    <div
      className={`${cardBg} rounded-3xl p-8 max-w-md w-full text-center`}
      style={{ fontFamily: "'Fredoka', sans-serif", animation: "slideUp 0.6s ease-out" }}
    >
      <div className="mb-4">
        <Twemoji emoji="🏆" size={64} />
      </div>
      <h1 className="text-3xl font-bold mb-2">Great Session!</h1>
      <div className="space-y-3 my-6 text-left" style={{ fontSize: `${fontSize}rem` }}>
        {stats.map(([label, value]) => (
          <div key={label} className="flex justify-between">
            <span>{label}</span>
            <span className="font-bold">{value}</span>
          </div>
        ))}
      </div>
      {trophies.length > 0 && (
        <div className="mb-6">
          <p className="font-bold mb-2">Trophies Earned:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {trophies.map((t, i) => (
              <span
                key={i}
                className={`px-3 py-1 rounded-full text-sm ${trophyBadgeClass}`}
              >
                {t.icon} {t.name}
              </span>
            ))}
          </div>
        </div>
      )}
      <button
        onClick={onRestart}
        className={`${submitBtn} px-8 py-3 rounded-2xl text-lg w-full transition-all active:scale-[0.97] flex items-center justify-center gap-2 cursor-pointer animate-start-playing`}
      >
        Play Again <Twemoji emoji="🚀" size={24} />
      </button>
    </div>
  );
}
