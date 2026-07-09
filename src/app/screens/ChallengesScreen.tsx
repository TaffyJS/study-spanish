import { useState } from "react";
import { ArrowLeft, CheckCircle2, X } from "lucide-react";
import { challenges, practiceSessions, vocabWords, type LessonQuestion } from "../data/mockData";
import type { Screen } from "../types";
import { PageHeader } from "../components/common/learning-ui";

type ChallengeProgress = Record<number, { done: number; completed: boolean }>;

type ChallengesScreenProps = {
  onLesson: (lessonId: number) => void;
  onNavigate: (screen: Screen) => void;
};

const challengeQuestions: Record<number, LessonQuestion[]> = {
  1: vocabWords.slice(0, 5).map((word) => ({
    type: "translate",
    prompt: `What does "${word.word}" mean?`,
    options: [word.translation, "good morning", "the table", "to travel"],
    correct: 0,
    explanation: `"${word.word}" means "${word.translation}." ${word.sentence}`,
  })),
  2: practiceSessions.find(session => session.id === "Grammar Drill")?.questions ?? [],
  3: [
    { type: "choose", prompt: "Choose the Spanish for \"hello\".", options: ["Hola", "Gracias", "Adios", "Libro"], correct: 0, explanation: "\"Hola\" is hello." },
    { type: "choose", prompt: "Choose the correct article: ____ libro.", options: ["la", "el", "las", "una"], correct: 1, explanation: "\"Libro\" is masculine, so use \"el libro.\"" },
    { type: "translate", prompt: "What does \"ciudad\" mean?", options: ["city", "food", "work", "question"], correct: 0, explanation: "\"Ciudad\" means city." },
    { type: "choose", prompt: "Complete: Yo ____ español.", options: ["hablas", "hablo", "hablan", "hablamos"], correct: 1, explanation: "With \"yo,\" hablar becomes \"hablo.\"" },
  ],
  4: practiceSessions.find(session => session.id === "Listening")?.questions ?? [],
  5: practiceSessions.find(session => session.id === "Sentence Builder")?.questions ?? [
    { type: "build", prompt: "Choose the natural sentence.", options: ["Yo hablo español.", "Español hablo yo el.", "Hablo yo el español.", "Yo español hablar."], correct: 0, explanation: "Subject + verb + object is natural here: \"Yo hablo español.\"" },
  ],
};

export function ChallengesScreen({ onLesson, onNavigate }: ChallengesScreenProps) {
  const [claimed, setClaimed] = useState<Set<number>>(new Set());
  const [progress, setProgress] = useState<ChallengeProgress>(() => Object.fromEntries(challenges.map(c => [c.id, { done: c.done, completed: c.completed }])));
  const [activeId, setActiveId] = useState<number | null>(null);
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(0);

  const decoratedChallenges = challenges.map(challenge => ({ ...challenge, ...progress[challenge.id] }));
  const activeChallenge = decoratedChallenges.find(challenge => challenge.id === activeId);
  const questions = activeId ? challengeQuestions[activeId] ?? [] : [];
  const currentQuestion = questions[step];
  const total = challenges.reduce((s, c) => s + c.xp, 0);
  const earned = decoratedChallenges.filter(c => c.completed).reduce((s, c) => s + c.xp, 0);

  const startChallenge = (id: number) => {
    if (id === 2 && !challengeQuestions[id]?.length) {
      onNavigate("grammar");
      return;
    }
    setActiveId(id);
    setStep(0);
    setSelected(null);
    setAnswered(false);
    setCorrect(0);
  };

  const finishChallenge = () => {
    if (!activeChallenge) return;
    setProgress(current => ({
      ...current,
      [activeChallenge.id]: { done: activeChallenge.total, completed: true },
    }));
    setActiveId(null);
    setStep(0);
    setSelected(null);
    setAnswered(false);
  };

  const handleSelect = (idx: number) => {
    if (answered || !currentQuestion) return;
    setSelected(idx);
    setAnswered(true);
    if (idx === currentQuestion.correct) setCorrect(value => value + 1);
    if (activeChallenge) {
      setProgress(current => ({
        ...current,
        [activeChallenge.id]: {
          done: Math.min(activeChallenge.total, (current[activeChallenge.id]?.done ?? 0) + 1),
          completed: false,
        },
      }));
    }
  };

  const handleNext = () => {
    if (step + 1 >= questions.length) {
      finishChallenge();
      return;
    }
    setStep(value => value + 1);
    setSelected(null);
    setAnswered(false);
  };

  if (activeChallenge && currentQuestion) {
    return (
      <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-5">
        <div className="flex items-center gap-3">
          <button onClick={() => setActiveId(null)} className="p-2 rounded-xl bg-card border border-border text-muted-foreground hover:text-foreground">
            <ArrowLeft size={18} />
          </button>
          <div className="flex-1">
            <p className="text-xs font-bold uppercase tracking-wider text-primary">Daily Challenge</p>
            <h1 className="font-extrabold text-foreground text-xl" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{activeChallenge.title}</h1>
          </div>
          <span className="text-xs font-bold text-primary bg-secondary px-2.5 py-1 rounded-lg">+{activeChallenge.xp} XP</span>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-5">
          <div>
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>Question {step + 1} of {questions.length}</span>
              <span>{correct} correct</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-primary transition-all" style={{ width: `${((step + Number(answered)) / questions.length) * 100}%` }} />
            </div>
          </div>

          <div>
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">{currentQuestion.type}</span>
            <h2 className="text-xl font-extrabold text-foreground mt-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{currentQuestion.prompt}</h2>
            {currentQuestion.instruction && <p className="text-sm text-muted-foreground mt-1">{currentQuestion.instruction}</p>}
          </div>

          <div className="grid gap-3">
            {currentQuestion.options.map((option, idx) => {
              let style = "bg-background border-border text-foreground hover:border-primary/50";
              if (answered && idx === currentQuestion.correct) style = "bg-green-50 dark:bg-green-950 border-green-500 text-green-700 dark:text-green-300";
              else if (answered && idx === selected) style = "bg-red-50 dark:bg-red-950 border-red-500 text-red-700 dark:text-red-300";
              else if (answered) style = "bg-background border-border text-muted-foreground opacity-60";
              return (
                <button key={option} onClick={() => handleSelect(idx)} className={`rounded-xl border-2 p-3 text-left text-sm font-bold transition-all ${style}`}>
                  {option}
                </button>
              );
            })}
          </div>

          {answered && (
            <div className="rounded-xl bg-secondary p-3">
              <p className="text-sm font-semibold text-foreground">{currentQuestion.explanation}</p>
            </div>
          )}
        </div>

        <button disabled={!answered} onClick={handleNext}
          className={`w-full rounded-2xl py-4 text-sm font-extrabold transition-colors ${answered ? "bg-primary text-white shadow-lg shadow-primary/25 hover:bg-orange-600" : "bg-muted text-muted-foreground cursor-not-allowed"}`}>
          {step + 1 >= questions.length ? "Finish Challenge" : "Next Question"}
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-5">
      <PageHeader title="Daily Challenges" description="Complete all 5 to earn a bonus reward" />

      <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <span className="font-semibold text-sm text-foreground">Today's Progress</span>
          <span className="text-sm font-bold text-primary">{earned} / {total} XP</span>
        </div>
        <div className="flex gap-2 mb-3">
          {decoratedChallenges.map((c) => (
            <div key={c.id} className={`flex-1 h-2 rounded-full transition-all ${c.completed ? "bg-green-500" : "bg-muted"}`} />
          ))}
        </div>
        <p className="text-xs text-muted-foreground">{decoratedChallenges.filter(c => c.completed).length} of 5 complete</p>
      </div>

      <div className="space-y-3">
        {decoratedChallenges.map((c) => (
          <div key={c.id} className={`bg-card border rounded-2xl p-5 shadow-sm transition-all ${c.completed ? "border-green-200 dark:border-green-800" : "border-border"}`}>
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${c.bg}`}>
                <c.icon size={22} className={c.color} />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-foreground text-base" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{c.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{c.desc}</p>
                  </div>
                  <span className="text-xs font-bold text-primary bg-secondary px-2.5 py-1 rounded-lg flex-shrink-0">+{c.xp} XP</span>
                </div>
                <div className="mt-3">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                      <div className="h-full rounded-full bg-primary transition-all duration-700" style={{ width: `${(c.done / c.total) * 100}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{c.done}/{c.total}</span>
                  </div>
                  {c.completed ? (
                    claimed.has(c.id) ? (
                      <div className="flex items-center gap-1.5 text-green-600 text-sm font-semibold">
                        <CheckCircle2 size={16} /> Reward Claimed
                      </div>
                    ) : (
                      <button onClick={() => setClaimed(s => new Set([...s, c.id]))}
                        className="mt-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-bold rounded-xl transition-colors shadow-sm">
                        Claim Reward
                      </button>
                    )
                  ) : (
                    <div className="flex gap-2 flex-wrap">
                      <button onClick={() => startChallenge(c.id)} className="mt-1 px-4 py-2 bg-primary text-white text-sm font-bold rounded-xl hover:bg-orange-600 transition-colors shadow-sm shadow-primary/30">
                        Start Challenge
                      </button>
                      {c.id === 2 && <button onClick={() => onNavigate("grammar")} className="mt-1 px-3 py-2 bg-secondary text-primary text-sm font-bold rounded-xl hover:bg-primary/10 transition-colors">Open Grammar</button>}
                      {c.id === 3 && <button onClick={() => onLesson(1)} className="mt-1 px-3 py-2 bg-secondary text-primary text-sm font-bold rounded-xl hover:bg-primary/10 transition-colors">Review Lesson</button>}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {decoratedChallenges.every(c => c.completed) && (
        <div className="rounded-2xl p-5 text-center" style={{ background: "linear-gradient(135deg, #FABC2A22, #E8602C22)", border: "1px solid #E8602C44" }}>
          <div className="text-4xl mb-2">🏆</div>
          <h3 className="font-extrabold text-foreground text-lg">All Challenges Complete!</h3>
          <p className="text-muted-foreground text-sm mt-1">You earned a <strong>+50 XP</strong> bonus streak reward.</p>
        </div>
      )}
    </div>
  );
}
