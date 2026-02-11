export function AnswerInput({
  inputRef,
  value,
  onChange,
  onSubmit,
  shakeInput,
  fontSize,
  inputStyle,
  submitBtn,
}) {
  return (
    <div className="w-full max-w-xl flex justify-center">
      <div className="flex items-center gap-3 w-full max-w-xl flex-1 justify-center">
        <input
          ref={inputRef}
          type="number"
          inputMode="numeric"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSubmit();
          }}
          placeholder="Your Answer"
          className={`flex-[1.5] min-w-0 px-4 py-3 rounded-2xl text-center outline-none transition-all duration-200 ${inputStyle} ${shakeInput ? "animate-shake" : ""}`}
          style={{
            fontSize: `${fontSize * 1.3}rem`,
            fontFamily: "'Fredoka', sans-serif",
          }}
        />
        <button
          onClick={onSubmit}
          className={`${submitBtn} flex-1 px-6 py-4 rounded-2xl text-lg transition-all duration-200 active:scale-95 whitespace-nowrap shrink-0 cursor-pointer`}
          style={{ fontSize: `${fontSize}rem` }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
