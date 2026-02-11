import { Twemoji } from "./Twemoji";

export function FeedbackBanner({ feedback, incorrectHintOptions, fontSize, hc }) {
  if (!feedback) return null;

  const bannerClass =
    feedback.type === "correct"
      ? hc
        ? "bg-green-900 text-green-300"
        : "bg-emerald-100 text-emerald-700"
      : feedback.type === "hint"
        ? hc
          ? "bg-gray-800 text-yellow-300 border border-yellow-500/40"
          : "bg-amber-100 text-amber-800 border border-amber-300"
        : hc
          ? "bg-red-900 text-red-300"
          : "bg-red-100 text-red-700";

  const hintClass = hc
    ? "bg-gray-800 text-yellow-300 border border-yellow-500/40"
    : "bg-amber-50 text-amber-800 border border-amber-200";

  return (
    <div className="min-h-10 flex flex-col items-center gap-2" aria-live="polite">
      <div
        className={`px-6 py-2 rounded-2xl font-bold ${bannerClass}`}
        style={{ animation: "popIn 0.3s ease-out", fontSize: `${fontSize}rem` }}
      >
        {feedback.message}
      </div>
      {feedback.type === "incorrect" &&
        incorrectHintOptions?.length === 2 && (
          <div
            className={`px-4 py-2 rounded-xl font-medium flex items-center gap-2 ${hintClass}`}
            style={{ fontSize: `${fontSize * 0.95}rem` }}
          >
            <Twemoji emoji="💡" size={20} /> Hint: One of these is right — is it{" "}
            <strong>{incorrectHintOptions[0]}</strong> or{" "}
            <strong>{incorrectHintOptions[1]}</strong>? You've got this!
          </div>
        )}
    </div>
  );
}
