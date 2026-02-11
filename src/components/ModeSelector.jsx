import { Twemoji } from "./Twemoji";

const MODES = [
  { key: "story", label: "Story", icon: "📖" },
  { key: "numeric", label: "Numbers", icon: "🔢" },
  { key: "visual", label: "Pictures", icon: "🖼️" },
];

export function ModeSelector({ mode, onModeChange, fontSize, btnOn, btnOff, hc }) {
  const noteClass = hc ? "text-yellow-200" : "text-gray-600";
  return (
    <div className="flex flex-col items-center gap-2 w-full max-w-xl">
      <p className={`text-xs text-center ${noteClass}`} style={{ fontSize: `${fontSize * 0.80 }rem` }}>
        💡 Switch between Story, Numbers, or Pictures to practice the same question in different ways!
      </p>
      <div className="flex gap-2">
      {MODES.map((m) => (
        <button
          key={m.key}
          onClick={() => onModeChange(m.key)}
          className={`px-4 py-2 rounded-xl transition-all duration-200 flex items-center gap-2 cursor-pointer ${
            mode === m.key ? btnOn : btnOff
          }`}
          style={{ fontSize: `${fontSize * 0.9}rem` }}
        >
          <Twemoji emoji={m.icon} size={22} /> {m.label}
        </button>
      ))}
      </div>
    </div>
  );
}
