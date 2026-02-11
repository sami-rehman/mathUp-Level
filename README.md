# LevelUp Math

**Adaptive math practice for kids.** Solve problems in Story, Numbers, or Pictures mode—level up with correct answers and collect trophies.

---

## Features

- **Three practice modes:** Story (word problems), Numbers, and Pictures—switch anytime to see the same question in different ways
- **Adaptive levels:** 5 levels from addition up to 5 through addition & subtraction up to 50
- **Level up / down:** 3 correct in a row → level up; 2 wrong in a row → level down for more practice
- **Read Aloud & captions:** Optional text-to-speech with female/male voice and on-screen captions
- **Accessibility:** Text size (A / A+ / A++) and high-contrast mode
- **Trophies & stars:** Earn badges for streaks and milestones
- **Reality-based stories:** Word problems match the object (e.g. microphones on stage, apples in the garden)

---

## Tech stack

- **React 18** + **Vite 6**
- **Tailwind CSS 4**
- No backend—runs fully in the browser

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)

---

## Getting started

**Install dependencies:**

```bash
npm install
```

**Run the app (development):**

```bash
npm run dev
```

Open the URL shown in the terminal (e.g. `http://localhost:5173`).

**Build for production:**

```bash
npm run build
```

**Preview production build:**

```bash
npm run preview
```

---

## Project structure

```
src/
  components/     # UI components (WelcomePage, GameHeader, ProblemCard, etc.)
  constants.js    # Items, messages, CSS, font sizes
  utils.js       # Helpers (rand, pick, shuffle, plural, twemojiUrl)
  utils/
    generateProblem.js   # Problem generation and story templates
  LevelUpMath.jsx # Main app and game state
  App.jsx
  main.jsx
```

---

## Team

**Zeineb · Despoina · Sami**

Developed with ❤️ at Nice, Côte d'Azur 💜
