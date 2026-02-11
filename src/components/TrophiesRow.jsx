import { Twemoji } from "./Twemoji";

export function TrophiesRow({ trophies, hc }) {
  if (trophies.length === 0) return null;

  const badgeClass = hc
    ? "bg-gray-800 text-yellow-300"
    : "bg-white/70 text-gray-700";

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {trophies.map((t, i) => (
        <span
          key={i}
          className={`px-3 py-1 rounded-full text-xs shadow-sm flex items-center gap-1.5 w-fit ${badgeClass}`}
          style={{ animation: "popIn 0.4s ease-out" }}
        >
          <Twemoji emoji={t.icon} size={16} /> {t.name}
        </span>
      ))}
    </div>
  );
}
