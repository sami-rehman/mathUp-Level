import { VisualProblem, NumericProblem, StoryProblem } from "./ProblemDisplays";

export function ProblemCard({ problem, mode, fontSize, cardBg }) {
  return (
    <div
      className={`${cardBg} rounded-3xl px-8 py-4 w-full max-w-xl min-h-[220px] flex items-center justify-center`}
      style={{ animation: "slideUp 0.4s ease-out" }}
      key={`${problem.a}-${problem.b}-${problem.op}`}
    >
      {mode === "visual" && <VisualProblem problem={problem} fontSize={fontSize} />}
      {mode === "numeric" && <NumericProblem problem={problem} fontSize={fontSize} />}
      {mode === "story" && <StoryProblem problem={problem} fontSize={fontSize} />}
    </div>
  );
}
