import { useState } from "react";
import { ArrowLeft, CheckCircle2, ClipboardCheck, Volume2, XCircle } from "lucide-react";
import { getQuestionAudioText, speakSpanish } from "../audio";
import { getTestSession } from "../data/mockData";

export function TestSessionScreen({
  testId,
  onBack,
  onComplete,
  audioEnabled = true,
  completed = false,
}: {
  testId: string;
  onBack: () => void;
  onComplete?: (testId: string, xp: number) => void;
  audioEnabled?: boolean;
  completed?: boolean;
}) {
  const test = getTestSession(testId);
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [finished, setFinished] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [answers, setAnswers] = useState<Array<boolean | null>>(() => Array.from({ length: test.questions.length }, () => null));

  const question = test.questions[step];
  const progress = ((step + (answered ? 1 : 0)) / test.questions.length) * 100;
  const score = Math.round((correctCount / test.questions.length) * 100);
  const passed = score >= test.passingScore;

  const handleSelect = (idx: number) => {
    if (answered) return;
    const isCorrect = idx === question.correct;
    setSelected(idx);
    setAnswered(true);
    setAnswers(current => current.map((answer, index) => index === step ? isCorrect : answer));
    if (isCorrect) setCorrectCount(count => count + 1);
  };

  const handleNext = () => {
    if (step + 1 >= test.questions.length) {
      if (passed) onComplete?.(test.id, test.xp);
      setFinished(true);
      return;
    }
    setStep(current => current + 1);
    setSelected(null);
    setAnswered(false);
  };

  if (finished) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-8" style={{ fontFamily: "'Nunito', sans-serif" }}>
        <div className="mx-auto max-w-3xl space-y-5">
          <button onClick={onBack} className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-sm font-bold text-foreground hover:border-primary/50">
            <ArrowLeft size={16} /> Back to Tests
          </button>

          <div className={`rounded-2xl border p-6 shadow-sm ${passed ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/30" : "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950/30"}`}>
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{test.level} milestone</p>
                <h1 className="mt-1 text-2xl font-extrabold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {passed ? "Test passed" : "Keep practicing"}
                </h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  {passed ? `${test.title} is complete. Great work.` : `You need ${test.passingScore}% to pass this test.`}
                </p>
              </div>
              <div className="rounded-2xl bg-card px-5 py-4 text-center shadow-sm">
                <p className="text-4xl font-extrabold text-primary">{score}%</p>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Score</p>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-border bg-card p-4">
              <p className="text-2xl font-extrabold text-foreground">{correctCount}/{test.questions.length}</p>
              <p className="text-xs text-muted-foreground">Correct answers</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-4">
              <p className="text-2xl font-extrabold text-foreground">{test.passingScore}%</p>
              <p className="text-xs text-muted-foreground">Passing score</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-4">
              <p className="text-2xl font-extrabold text-foreground">{passed && !completed ? `+${test.xp}` : completed ? "Done" : "0"}</p>
              <p className="text-xs text-muted-foreground">XP earned</p>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-4">
            <h2 className="font-extrabold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Question Review</h2>
            <div className="mt-4 space-y-2">
              {test.questions.map((item, index) => {
                const correct = answers[index];
                return (
                  <div key={`${item.prompt}-${index}`} className="flex items-start gap-3 rounded-xl bg-muted/40 p-3">
                    {correct ? <CheckCircle2 size={18} className="mt-0.5 text-green-500" /> : <XCircle size={18} className="mt-0.5 text-red-500" />}
                    <div>
                      <p className="text-sm font-bold text-foreground">{index + 1}. {item.prompt}</p>
                      <p className="text-xs text-muted-foreground">{item.explanation}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background" style={{ fontFamily: "'Nunito', sans-serif" }}>
      <div className="sticky top-0 z-10 border-b border-border bg-background/95 px-4 py-3 backdrop-blur md:px-8">
        <div className="mx-auto flex max-w-3xl items-center gap-4">
          <button onClick={onBack} className="text-muted-foreground transition-colors hover:text-foreground" aria-label="Close test">
            <ArrowLeft size={20} />
          </button>
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex justify-between gap-3 text-xs text-muted-foreground">
              <span className="truncate">{test.level} · {test.title}</span>
              <span>{step + 1}/{test.questions.length}</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <div className="hidden items-center gap-2 rounded-xl bg-secondary px-3 py-2 text-xs font-bold text-primary sm:flex">
            <ClipboardCheck size={15} /> Pass {test.passingScore}%
          </div>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center p-4 md:p-6">
        <div className="w-full max-w-3xl space-y-5">
          <div className="rounded-2xl border border-border bg-secondary p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-primary">{test.duration} test</p>
                <p className="mt-1 text-sm text-secondary-foreground">{test.summary}</p>
              </div>
              <div className="flex flex-wrap gap-2 sm:justify-end">
                {test.focus.map(item => (
                  <span key={item} className="rounded-full border border-border bg-card px-2.5 py-1 text-xs font-bold text-foreground">{item}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">{question.type}</span>
            <h1 className="mt-3 text-xl font-extrabold text-foreground md:text-2xl" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {question.prompt}
            </h1>
            {question.instruction && <p className="mt-2 text-sm text-muted-foreground">{question.instruction}</p>}
            {(question.type === "listen" || question.type === "pronounce") && (
              <button
                onClick={() => speakSpanish(getQuestionAudioText(question), audioEnabled)}
                disabled={!audioEnabled}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-white shadow-sm shadow-primary/30 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Volume2 size={16} /> Play audio
              </button>
            )}
          </div>

          <div className="grid gap-3">
            {question.options.map((option, index) => {
              let style = "bg-card border-border text-foreground hover:border-primary/50 hover:bg-secondary cursor-pointer";
              if (answered && index === question.correct) style = "bg-green-50 dark:bg-green-950 border-green-500 text-green-700 dark:text-green-300";
              else if (answered && index === selected && index !== question.correct) style = "bg-red-50 dark:bg-red-950 border-red-500 text-red-700 dark:text-red-300";
              else if (answered) style = "bg-card border-border text-muted-foreground opacity-55";
              return (
                <button key={option} onClick={() => handleSelect(index)} className={`w-full rounded-2xl border-2 p-4 text-left text-base font-bold transition-all ${style}`}>
                  <span className="inline-flex items-center gap-3">
                    <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-muted text-xs font-extrabold text-muted-foreground">
                      {String.fromCharCode(65 + index)}
                    </span>
                    {option}
                  </span>
                </button>
              );
            })}
          </div>

          {answered && (
            <div className={`rounded-2xl border p-4 ${selected === question.correct ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950" : "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950"}`}>
              <p className={`font-extrabold ${selected === question.correct ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300"}`}>
                {selected === question.correct ? "Correct" : "Not quite"}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{question.explanation}</p>
            </div>
          )}
        </div>
      </div>

      <div className="sticky bottom-0 border-t border-border bg-background/95 px-4 py-4 backdrop-blur md:px-8">
        <div className="mx-auto max-w-3xl">
          <button
            onClick={handleNext}
            disabled={!answered}
            className="w-full rounded-2xl bg-primary py-4 text-base font-extrabold text-white shadow-lg shadow-primary/30 transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:shadow-none"
          >
            {answered ? step + 1 >= test.questions.length ? "See Results" : "Next Question" : "Select an answer"}
          </button>
        </div>
      </div>
    </div>
  );
}
