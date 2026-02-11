import { Twemoji } from "./Twemoji";

const LEVEL_EMOJIS = ["🌱", "🌿", "🌳", "🌟", "👑"];

export function GameHeader({ level, levelUpAnim, stars, score, streak, fontSize, levelBadge, headerBg }) {
  return (
    <header
      className={`${headerBg} px-4 py-3 flex items-center justify-between gap-3 flex-wrap`}
      style={{ fontFamily: "'Fredoka', sans-serif" }}
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl ${levelBadge}`}
        >
          <span className="font-bold" style={{ fontSize: `${fontSize * 0.9}rem` }}>
            Level {level}
          </span>
          <span>
            <Twemoji emoji={LEVEL_EMOJIS[level - 1]} size={24} />
          </span>
        </div>
        {levelUpAnim && (
          <span
            className="font-bold text-fuchsia-500 flex items-center gap-1"
            style={{ animation: "popIn 0.5s ease-out", fontSize: `${fontSize * 0.9}rem` }}
          >
            LEVEL UP! <Twemoji emoji="🎉" size={22} />
          </span>
        )}
      </div>
      <div className="flex items-center gap-4" style={{ fontSize: `${fontSize * 0.9}rem` }}>
        <span className="font-bold flex items-center gap-1">
          <Twemoji emoji="⭐" size={20} /> {stars}
        </span>
        <span className="font-bold flex items-center gap-1">
          <Twemoji emoji="🏅" size={20} /> {score}
        </span>
        {streak >= 2 && (
          <span className="font-bold text-orange-500 flex items-center gap-0.5">
            {streak}
            <Twemoji emoji="🔥" size={20} />
          </span>
        )}
      </div>
    </header>
  );
}
