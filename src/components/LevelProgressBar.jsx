export function LevelProgressBar({ progress, hc }) {
  const trackClass = hc ? "bg-gray-800" : "bg-violet-100";
  const fillClass = hc ? "bg-yellow-400" : "bg-gradient-to-r from-violet-500 to-fuchsia-500";

  return (
    <div className={`h-1.5 ${trackClass}`}>
      <div
        className={`h-full transition-all duration-500 ${fillClass}`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
