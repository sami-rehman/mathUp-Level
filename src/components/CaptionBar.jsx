export function CaptionBar({ text, visible, hc }) {
  if (!visible || !text) return null;

  const className = hc
    ? "bg-black text-yellow-300 border border-yellow-500/40"
    : "bg-gray-900/90 text-gray-100";

  return (
    <div
      className={`fixed bottom-40 sm:bottom-20 left-1/2 -translate-x-1/2 z-40 px-5 py-2.5 rounded-2xl text-sm font-medium max-w-lg text-center shadow-lg ${className}`}
      role="status"
      aria-live="polite"
      style={{ animation: "slideUp 0.3s ease-out" }}
    >
      📝 {text}
    </div>
  );
}
