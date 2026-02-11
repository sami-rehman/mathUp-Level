// LevelUp Math — constants and theme CSS

export const ITEMS = [
  { emoji: "🍎", word: "apple" }, { emoji: "🍊", word: "orange" },
  { emoji: "🌟", word: "star" }, { emoji: "🎈", word: "balloon" },
  { emoji: "🍕", word: "pizza slice" }, { emoji: "🐶", word: "puppy" },
  { emoji: "🦋", word: "butterfly" }, { emoji: "🌸", word: "flower" },
  { emoji: "🎁", word: "gift" }, { emoji: "🐱", word: "cat" },
  { emoji: "🎨", word: "painting" }, { emoji: "🎤", word: "microphone" },
  { emoji: "🎹", word: "piano" }, { emoji: "🎻", word: "violin" },
  { emoji: "🎸", word: "guitar" }, { emoji: "🎺", word: "trumpet" },
  { emoji: "🌸", word: "flower" }, { emoji: "🌹", word: "rose" },
];

export const NAMES = ["Zeineb", "Sami", "Despoina", "Mia", "Leo", "Zoe", "Kai", "Luna", "Finn", "Noor", "Chloe", "Zainab"];

export const CORRECT_MSG = [
  "Amazing! 🎉", "Awesome! 🚀", "Great job! ⭐", "You got it! 🌟", "Correct! 💪", "Brilliant! ✨",
  "Excellent! 🌟", "Super! 🚀", "Perfect! 💯", "Well done! 🎉",
];

export const INCORRECT_MSG = [
  "Good try! Take your time and try again — you've got this! 💪",
  "Almost there! Every try makes you stronger. Give it another go! 🌟",
  "Nice effort! Mistakes help us learn — try again! 🌱",
  "You're learning. Keep going, you're doing great! ✨",
  "That's okay. Believe in yourself — try one more time! 🎯",
  "Close. You're getting better with every try! 🚀",
  "Try again! You're almost there! 🌈",
  "Keep going! You're doing great! ✨",
];

export const FONT_SIZES = { small: 0.85, medium: 1.05, large: 1.2 };

export const TWEMOJI_BASE = "https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/72x72";

export const CSS = `
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes popIn {
    0% { opacity: 0; transform: scale(0.6); }
    70% { transform: scale(1.1); }
    100% { opacity: 1; transform: scale(1); }
  }
  @keyframes bounceIn {
    0% { opacity: 0; transform: scale(0) translateY(10px); }
    60% { transform: scale(1.15) translateY(-3px); }
    100% { opacity: 1; transform: scale(1) translateY(0); }
  }
  @keyframes burstOut {
    0% { opacity: 1; transform: translate(0, 0) scale(0.5); }
    100% { opacity: 0; transform: translate(var(--tx), var(--ty)) scale(1.3); }
  }
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-8px); }
    40% { transform: translateX(8px); }
    60% { transform: translateX(-6px); }
    80% { transform: translateX(6px); }
  }
  .animate-shake { animation: shake 0.4s ease-in-out; }
  @keyframes startPlayingMove {
    0%, 100% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-6px) scale(1.02); }
  }
  .animate-start-playing { animation: startPlayingMove 2s ease-in-out infinite; }
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
  input[type="number"] { -moz-appearance: textfield; }
`;
