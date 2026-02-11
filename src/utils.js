import { TWEMOJI_BASE } from "./constants";

export function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function plural(w, n) {
  return n === 1 ? w : w + (w.endsWith("s") ? "es" : "s");
}

export function twemojiUrl(emoji) {
  if (!emoji) return "";
  const cp = emoji.codePointAt(0);
  return cp ? `${TWEMOJI_BASE}/${cp.toString(16)}.png` : "";
}
