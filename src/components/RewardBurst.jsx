import { Twemoji } from "./Twemoji";

const BURST_EMOJIS = ["⭐", "🎉", "✨", "💫", "🌈", "🏆", "🎊", "💥", "🌟", "🔥", "💎", "🚀"];

export function RewardBurst({ show }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      {BURST_EMOJIS.map((e, i) => {
        const angle = (i / 12) * 2 * Math.PI;
        const x = Math.cos(angle) * 140;
        const y = Math.sin(angle) * 140;
        return (
          <span
            key={i}
            className="absolute"
            style={{
              animation: `burstOut 0.8s ease-out ${i * 0.04}s forwards`,
              opacity: 0,
              ["--tx"]: `${x}px`,
              ["--ty"]: `${y}px`,
            }}
          >
            <Twemoji emoji={e} size={40} />
          </span>
        );
      })}
    </div>
  );
}
