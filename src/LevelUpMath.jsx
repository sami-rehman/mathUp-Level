import { useState, useCallback, useEffect, useRef } from "react";
import { CSS, FONT_SIZES, CORRECT_MSG, INCORRECT_MSG } from "./constants";
import { pick, shuffle } from "./utils";
import { generateProblem } from "./utils/generateProblem";
import {
  RewardBurst,
  CaptionBar,
  GameHeader,
  LevelProgressBar,
  ModeSelector,
  ProblemCard,
  FeedbackBanner,
  AnswerInput,
  TrophiesRow,
  GameFooter,
  SessionEndScreen,
  WelcomePage,
} from "./components";

// ═══════════════════════════════════════════════════════════════════
// LEVELUP MATH — Adaptive Learning (refactored components)
// ═══════════════════════════════════════════════════════════════════

function getTheme(hc) {
  const bg = hc
    ? "bg-black text-yellow-300"
    : "bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 text-gray-800";
  const cardBg = hc
    ? "bg-gray-900 border-2 border-yellow-400"
    : "bg-white/80 backdrop-blur-sm border border-white/60 shadow-lg shadow-purple-100/30";
  const headerBg = hc
    ? "bg-gray-900 border-b-2 border-yellow-400"
    : "bg-white/70 backdrop-blur-sm border-b border-purple-100";
  const footerBg = hc
    ? "bg-gray-900 border-t-2 border-yellow-400"
    : "bg-white/70 backdrop-blur-sm border-t border-purple-100";
  const btnOff = hc
    ? "bg-gray-800 text-yellow-300 border-2 border-yellow-500/40 hover:border-yellow-400"
    : "bg-white text-gray-600 border-2 border-gray-200 hover:border-violet-400 hover:text-violet-600 shadow-sm";
  const btnOn = hc
    ? "bg-yellow-400 text-gray-900 border-2 border-yellow-300 font-bold"
    : "bg-violet-100 text-violet-800 border-2 border-violet-400 font-bold shadow-md";
  const submitBtn = hc
    ? "bg-yellow-400 text-gray-900 font-bold hover:bg-yellow-300"
    : "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-bold hover:from-violet-600 hover:to-fuchsia-600 shadow-lg shadow-violet-200/50";
  const inputStyle = hc
    ? "bg-black text-yellow-300 border-2 border-yellow-400 placeholder-yellow-700"
    : "bg-white border-2 border-violet-200 text-gray-800 placeholder-gray-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 shadow-sm";
  const levelBadge = hc
    ? "bg-gray-800 text-yellow-300 border border-yellow-500/40"
    : "bg-violet-100 text-violet-700";
  return { bg, cardBg, headerBg, footerBg, btnOff, btnOn, submitBtn, inputStyle, levelBadge };
}

export default function LevelUpMath() {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [problem, setProblem] = useState(() => generateProblem(1));
  const [mode, setMode] = useState("story");
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [showReward, setShowReward] = useState(false);
  const [trophies, setTrophies] = useState([]);
  const [stars, setStars] = useState(0);
  const [textSize, setTextSize] = useState("medium");
  const [highContrast, setHighContrast] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(false);
  const [ttsFemaleVoice, setTtsFemaleVoice] = useState(true);
  const [captionText, setCaptionText] = useState("");
  const [showCaptions, setShowCaptions] = useState(true);
  const [sessionEnded, setSessionEnded] = useState(false);
  const [shakeInput, setShakeInput] = useState(false);
  const [levelUpAnim, setLevelUpAnim] = useState(false);
  const [consecCorrect, setConsecCorrect] = useState(0);
  const [consecIncorrect, setConsecIncorrect] = useState(0);
  const [wrongAttemptsOnCurrent, setWrongAttemptsOnCurrent] = useState(0);
  const [incorrectHintOptions, setIncorrectHintOptions] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);

  const inputRef = useRef(null);
  const femaleVoiceRef = useRef(null);
  const maleVoiceRef = useRef(null);

  const fontSize = FONT_SIZES[textSize];
  const hc = highContrast;
  const theme = getTheme(hc);

  useEffect(() => {
    inputRef.current?.focus();
  }, [problem]);

  useEffect(() => {
    const loadVoices = () => {
      const list = window.speechSynthesis.getVoices();
      const en = list.filter((v) => v.lang.startsWith("en"));
      const female =
        en.find((v) => /female|samantha|karen|victoria|zira|aria|female/i.test(v.name)) ||
        en.find((v) => v.name.toLowerCase().includes("female")) ||
        en[0];
      const male =
        en.find((v) => /male|david|daniel|mark|male/i.test(v.name)) ||
        en.find((v) => v.name.toLowerCase().includes("male")) ||
        en[en.length - 1] ||
        en[0];
      if (female) femaleVoiceRef.current = female;
      if (male) maleVoiceRef.current = male;
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const speak = useCallback(
    (text) => {
      setCaptionText(text);
      if (!ttsEnabled) return;
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      const voice = ttsFemaleVoice
        ? femaleVoiceRef.current || maleVoiceRef.current
        : maleVoiceRef.current || femaleVoiceRef.current;
      if (voice) u.voice = voice;
      u.rate = 0.85;
      u.pitch = ttsFemaleVoice ? 1.1 : 1;
      window.speechSynthesis.speak(u);
    },
    [ttsEnabled, ttsFemaleVoice]
  );

  useEffect(() => {
    if (sessionEnded) return;
    const t =
      mode === "story"
        ? problem.story
        : mode === "numeric"
          ? problem.numericText
          : problem.visualText;
    if (ttsEnabled) speak(t);
    else setCaptionText("");
  }, [problem, mode, ttsEnabled, sessionEnded]);

  const awardTrophy = (name, icon) => {
    setTrophies((prev) =>
      prev.find((t) => t.name === name) ? prev : [...prev, { name, icon }]
    );
  };

  const handleSubmit = () => {
    if (input.trim() === "") {
      setFeedback({ type: "hint", message: "Please enter your answer" });
      setShakeInput(true);
      setTimeout(() => setShakeInput(false), 500);
      setTimeout(() => setFeedback(null), 2500);
      return;
    }
    const userAnswer = parseInt(input, 10);
    if (isNaN(userAnswer)) {
      setFeedback({ type: "hint", message: "Please enter a number" });
      setShakeInput(true);
      setTimeout(() => setShakeInput(false), 500);
      setTimeout(() => setFeedback(null), 2500);
      return;
    }

    const isCorrect = userAnswer === problem.answer;
    setTotalAnswered((p) => p + 1);
    let newLevel = level;

    if (isCorrect) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > bestStreak) setBestStreak(newStreak);
      setCorrectCount((p) => p + 1);
      setScore((p) => p + level * 10 + newStreak * 2);
      setStars((p) => p + 1);
      const msg = pick(CORRECT_MSG);
      setFeedback({ type: "correct", message: msg });
      speak(msg.replace(/[^\w\s!]/g, ""));

      const ncc = consecCorrect + 1;
      setConsecCorrect(ncc);
      setConsecIncorrect(0);

      if (ncc >= 3) {
        if (level < 5) {
          newLevel = level + 1;
          setLevel(newLevel);
          setLevelUpAnim(true);
          setTimeout(() => setLevelUpAnim(false), 1500);
          setShowReward(true);
          setTimeout(() => setShowReward(false), 1200);
        }
        setConsecCorrect(0);
      }
      if (newStreak >= 5) awardTrophy("Hot Streak", "🔥");
      if (newStreak >= 10) awardTrophy("Unstoppable", "⚡");
      if (stars + 1 >= 10) awardTrophy("Star Collector", "🌟");
      if (stars + 1 >= 25) awardTrophy("Star Master", "💎");
      if (newLevel >= 3) awardTrophy("Math Explorer", "🧭");
      if (newLevel >= 5) awardTrophy("Math Champion", "🏆");
      setIncorrectHintOptions(null);
      setWrongAttemptsOnCurrent(0);
    } else {
      setStreak(0);
      const msg = pick(INCORRECT_MSG).replace("{ans}", String(problem.answer));
      setFeedback({ type: "incorrect", message: msg });
      speak(msg.replace(/[^\w\s!.—]/g, ""));
      setShakeInput(true);
      setTimeout(() => setShakeInput(false), 500);

      const ans = problem.answer;
      const wrongCandidates = [ans + 4, ans - 4, ans + 6, ans - 6].filter(
        (x) => x >= 0 && x !== ans
      );
      const wrongOption = wrongCandidates.length
        ? pick(wrongCandidates)
        : ans === 0
          ? 1
          : ans + (Math.random() < 0.5 ? 1 : -1);
      setIncorrectHintOptions(shuffle([ans, wrongOption]));

      const nic = consecIncorrect + 1;
      setConsecIncorrect(nic);
      setConsecCorrect(0);

      if (nic >= 2) {
        if (level > 1) {
          newLevel = level - 1;
          setLevel(newLevel);
        }
        setConsecIncorrect(0);
      }

      const nextWrongAttempts = wrongAttemptsOnCurrent + 1;
      setWrongAttemptsOnCurrent(nextWrongAttempts);

      if (nextWrongAttempts >= 2) {
        setWrongAttemptsOnCurrent(0);
        setInput("");
        setIncorrectHintOptions(null);
        setTimeout(() => {
          setProblem(generateProblem(newLevel));
          setTimeout(() => setFeedback(null), 1800);
        }, 400);
        return;
      }

      setInput("");
      inputRef.current?.focus();
      return;
    }

    setInput("");
    setTimeout(() => {
      setProblem(generateProblem(newLevel));
      setTimeout(() => setFeedback(null), 1800);
    }, 400);
  };

  const handleRestart = () => {
    setLevel(1);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setCorrectCount(0);
    setTotalAnswered(0);
    setConsecCorrect(0);
    setConsecIncorrect(0);
    setWrongAttemptsOnCurrent(0);
    setStars(0);
    setTrophies([]);
    setFeedback(null);
    setInput("");
    setIncorrectHintOptions(null);
    setProblem(generateProblem(1));
    setSessionEnded(false);
  };

  const welcomeTheme = getTheme(false);

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 text-gray-800 flex items-center justify-center p-4">
        <style>{CSS}</style>
        <link
          href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <WelcomePage
          onStart={() => setGameStarted(true)}
          cardBg={welcomeTheme.cardBg}
          submitBtn={welcomeTheme.submitBtn}
        />
      </div>
    );
  }

  if (sessionEnded) {
    const accuracy = totalAnswered ? Math.round((correctCount / totalAnswered) * 100) : 0;
    return (
      <div className={`min-h-screen ${theme.bg} flex items-center justify-center p-4`}>
        <style>{CSS}</style>
        <link
          href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <SessionEndScreen
          score={score}
          level={level}
          totalAnswered={totalAnswered}
          correctCount={correctCount}
          accuracy={accuracy}
          bestStreak={bestStreak}
          stars={stars}
          trophies={trophies}
          onRestart={handleRestart}
          cardBg={theme.cardBg}
          submitBtn={theme.submitBtn}
          fontSize={fontSize}
          hc={hc}
        />
      </div>
    );
  }

  const levelProgress = (consecCorrect / 3) * 100;

  return (
    <div className={`min-h-screen ${theme.bg} flex flex-col`}>
      <style>{CSS}</style>
      <link
        href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <RewardBurst show={showReward} />
      <CaptionBar text={captionText} visible={showCaptions && ttsEnabled} hc={hc} />

      <GameHeader
        level={level}
        levelUpAnim={levelUpAnim}
        stars={stars}
        score={score}
        streak={streak}
        fontSize={fontSize}
        levelBadge={theme.levelBadge}
        headerBg={theme.headerBg}
      />

      <LevelProgressBar progress={levelProgress} hc={hc} />

      <main
        className="flex-1 flex flex-col items-center justify-center p-4 gap-5"
        style={{ fontFamily: "'Fredoka', sans-serif" }}
      >
        <ModeSelector
          mode={mode}
          onModeChange={setMode}
          fontSize={fontSize}
          btnOn={theme.btnOn}
          btnOff={theme.btnOff}
          hc={hc}
        />

        <ProblemCard
          problem={problem}
          mode={mode}
          fontSize={fontSize}
          cardBg={theme.cardBg}
        />

        <FeedbackBanner
          feedback={feedback}
          incorrectHintOptions={incorrectHintOptions}
          fontSize={fontSize}
          hc={hc}
        />

        <AnswerInput
          inputRef={inputRef}
          value={input}
          onChange={setInput}
          onSubmit={handleSubmit}
          shakeInput={shakeInput}
          fontSize={fontSize}
          inputStyle={theme.inputStyle}
          submitBtn={theme.submitBtn}
        />

        <TrophiesRow trophies={trophies} hc={hc} />
      </main>

      <GameFooter
        ttsEnabled={ttsEnabled}
        setTtsEnabled={setTtsEnabled}
        ttsFemaleVoice={ttsFemaleVoice}
        setTtsFemaleVoice={setTtsFemaleVoice}
        showCaptions={showCaptions}
        setShowCaptions={setShowCaptions}
        textSize={textSize}
        setTextSize={setTextSize}
        highContrast={highContrast}
        setHighContrast={setHighContrast}
        onEndSession={() => setSessionEnded(true)}
        femaleVoiceRef={femaleVoiceRef}
        maleVoiceRef={maleVoiceRef}
        setCaptionText={setCaptionText}
        btnOn={theme.btnOn}
        btnOff={theme.btnOff}
        hc={hc}
        footerBg={theme.footerBg}
      />
    </div>
  );
}
