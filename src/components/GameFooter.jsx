import { Twemoji } from "./Twemoji";

export function GameFooter({
  ttsEnabled,
  setTtsEnabled,
  ttsFemaleVoice,
  setTtsFemaleVoice,
  showCaptions,
  setShowCaptions,
  textSize,
  setTextSize,
  highContrast,
  setHighContrast,
  onEndSession,
  femaleVoiceRef,
  maleVoiceRef,
  setCaptionText,
  btnOn,
  btnOff,
  hc,
  footerBg,
}) {
  const handleTtsToggle = () => {
    const next = !ttsEnabled;
    setTtsEnabled(next);
    if (next) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance("Text to speech is on");
      const voice = ttsFemaleVoice
        ? femaleVoiceRef.current || maleVoiceRef.current
        : maleVoiceRef.current || femaleVoiceRef.current;
      if (voice) u.voice = voice;
      u.rate = 0.85;
      u.pitch = ttsFemaleVoice ? 1.1 : 1;
      window.speechSynthesis.speak(u);
      setCaptionText("Text to speech is on");
    } else {
      window.speechSynthesis.cancel();
      setCaptionText("");
    }
  };

  const endSessionBtnClass = hc
    ? "bg-red-900 text-red-300 hover:bg-red-800"
    : "bg-red-50 text-red-600 hover:bg-red-100";

  return (
    <footer className={`${footerBg} px-4 py-3 flex items-center justify-between gap-2 flex-wrap`}>
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={handleTtsToggle}
          className={`px-3 py-1.5 rounded-xl text-xs transition-all flex items-center gap-1.5 cursor-pointer ${ttsEnabled ? btnOn : btnOff}`}
        >
          <Twemoji emoji="🔊" size={16} /> {ttsEnabled ? "Voice On" : "Read Aloud"}
        </button>

        {ttsEnabled && (
          <button
            onClick={() => setTtsFemaleVoice(!ttsFemaleVoice)}
            className={`px-3 py-1.5 rounded-xl text-xs transition-all flex items-center gap-1.5 cursor-pointer ${ttsFemaleVoice ? btnOn : btnOff}`}
            title={
              ttsFemaleVoice
                ? "Female voice (click for male)"
                : "Male voice (click for female)"
            }
          >
            <Twemoji emoji={ttsFemaleVoice ? "👩" : "👨"} size={16} />{" "}
            {ttsFemaleVoice ? "Female" : "Male"}
          </button>
        )}

        {ttsEnabled && (
          <button
            onClick={() => setShowCaptions(!showCaptions)}
            className={`px-3 py-1.5 rounded-xl text-xs transition-all flex items-center gap-1.5 cursor-pointer ${showCaptions ? btnOn : btnOff}`}
          >
            <Twemoji emoji="📝" size={16} /> Captions {showCaptions ? "On" : "Off"}
          </button>
        )}

        {["small", "medium", "large"].map((size) => (
          <button
            key={size}
            onClick={() => setTextSize(size)}
            className={`px-3 py-1.5 rounded-xl text-xs transition-all cursor-pointer ${textSize === size ? btnOn : btnOff}`}
          >
            {size === "small" ? "A" : size === "medium" ? "A+" : "A++"}
          </button>
        ))}

        <button
          onClick={() => setHighContrast(!hc)}
          className={`px-1.5 py-1.5 rounded-xl text-xs transition-all flex items-center gap-1.5 cursor-pointer ${hc ? btnOn : btnOff}`}
        >
          {hc ? (
            <>
              <Twemoji emoji="☀️" size={16} /> Normal
            </>
          ) : (
            <>
              <Twemoji emoji="🌙" size={16} /> High Contrast
            </>
          )}
        </button>
      </div>

      <button
        onClick={onEndSession}
        className={`px-4 py-1.5 rounded-xl text-xs transition-all cursor-pointer ${endSessionBtnClass}`}
      >
        End Session
      </button>
    </footer>
  );
}
