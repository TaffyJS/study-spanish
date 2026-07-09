import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, MessageCircle, Mic, RotateCcw, Volume2, XCircle } from "lucide-react";
import { getQuestionAudioText, speakSpanish } from "../audio";
import { conversationScenarios, getPracticeSession, practiceSessions, practiceTypes } from "../data/mockData";
import { Badge, PageHeader } from "../components/common/learning-ui";

export function PracticeScreen({ audioEnabled = true }: { audioEnabled?: boolean }) {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [scenario, setScenario] = useState<string | null>(null);

  const session = sessionId ? getPracticeSession(sessionId) : null;
  const question = session?.questions[step];
  const progress = session ? ((step + (answered ? 1 : 0)) / session.questions.length) * 100 : 0;
  const accuracy = session ? Math.round((correctCount / session.questions.length) * 100) : 0;

  const startSession = (id: string, scenarioLabel?: string) => {
    setSessionId(id);
    setScenario(scenarioLabel ?? null);
    setStep(0);
    setSelected(null);
    setAnswered(false);
    setCorrectCount(0);
    setCompleted(false);
  };

  const closeSession = () => {
    setSessionId(null);
    setScenario(null);
    setStep(0);
    setSelected(null);
    setAnswered(false);
    setCorrectCount(0);
    setCompleted(false);
  };

  const answer = (idx: number) => {
    if (!question || answered) return;
    setSelected(idx);
    setAnswered(true);
    if (idx === question.correct) setCorrectCount(count => count + 1);
  };

  const next = () => {
    if (!session) return;
    if (step + 1 >= session.questions.length) {
      setCompleted(true);
      return;
    }
    setStep(current => current + 1);
    setSelected(null);
    setAnswered(false);
  };

  if (session && completed) {
    return (
      <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-5">
        <button onClick={closeSession} className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground">
          <ArrowLeft size={16} /> Back to Practice Hub
        </button>

        <div className="bg-card border border-border rounded-3xl p-6 text-center shadow-sm">
          <div className="text-5xl mb-3">🎯</div>
          <h1 className="text-2xl font-extrabold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{session.title} complete</h1>
          <p className="text-sm text-muted-foreground mt-1">You answered {correctCount} of {session.questions.length} correctly.</p>
          <div className="grid grid-cols-3 gap-3 mt-5">
            {[["Accuracy", `${accuracy}%`], ["Questions", session.questions.length], ["Review", session.questions.length - correctCount]].map(([label, value]) => (
              <div key={label} className="rounded-2xl bg-muted/60 p-4">
                <p className="text-xl font-extrabold text-foreground">{value}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-3 mt-6">
            <button onClick={() => startSession(session.id, scenario ?? undefined)} className="flex-1 rounded-2xl bg-muted text-foreground py-3 text-sm font-bold hover:bg-muted/80 transition-colors">
              Practice Again
            </button>
            <button onClick={closeSession} className="flex-1 rounded-2xl bg-primary text-white py-3 text-sm font-bold hover:bg-orange-600 transition-colors shadow-sm shadow-primary/30">
              Done
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (session && question) {
    return (
      <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-5">
        <button onClick={closeSession} className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground">
          <ArrowLeft size={16} /> Back to Practice Hub
        </button>

        <div className="bg-card border border-border rounded-3xl p-5 shadow-sm">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <Badge label={scenario ?? session.title} />
              <h1 className="text-xl font-extrabold text-foreground mt-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{session.title}</h1>
              <p className="text-sm text-muted-foreground">{session.desc}</p>
            </div>
            <span className="text-xs font-bold text-primary bg-secondary rounded-full px-3 py-1">{step + 1}/{session.questions.length}</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="bg-card border border-border rounded-3xl p-5 shadow-sm">
          <div className="text-center mb-5">
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">{question.type}</span>
            <h2 className="mt-2 text-xl font-extrabold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{question.prompt}</h2>
            {question.instruction && <p className="text-sm text-muted-foreground mt-2">{question.instruction}</p>}
            {(question.type === "listen" || question.type === "pronounce") && (
              <button
                onClick={() => speakSpanish(getQuestionAudioText(question), audioEnabled)}
                disabled={!audioEnabled}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-secondary text-primary px-4 py-2 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-50"
                aria-label={audioEnabled ? `Play Spanish audio for ${getQuestionAudioText(question)}` : "Audio is off"}
              >
                {question.type === "listen" ? <Volume2 size={16} /> : <Mic size={16} />}
                {question.type === "listen" ? "Play prompt" : "Play pronunciation"}
              </button>
            )}
          </div>

          <div className="space-y-3">
            {question.options.map((option, idx) => {
              const correct = answered && idx === question.correct;
              const wrong = answered && selected === idx && idx !== question.correct;
              const muted = answered && !correct && !wrong;
              return (
                <button
                  key={option}
                  onClick={() => answer(idx)}
                  className={`w-full rounded-2xl border-2 p-4 text-left font-semibold transition-all ${
                    correct ? "border-green-500 bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300" :
                    wrong ? "border-red-500 bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300" :
                    muted ? "border-border bg-card text-muted-foreground opacity-50" :
                    "border-border bg-card text-foreground hover:border-primary/50 hover:bg-secondary"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">{String.fromCharCode(65 + idx)}</span>
                    {option}
                  </span>
                </button>
              );
            })}
          </div>

          {answered && (
            <div className={`mt-4 rounded-2xl p-4 border ${selected === question.correct ? "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800" : "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800"}`}>
              <p className={`font-bold flex items-center gap-2 ${selected === question.correct ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300"}`}>
                {selected === question.correct ? <CheckCircle2 size={17} /> : <XCircle size={17} />}
                {selected === question.correct ? "Correct" : "Not quite"}
              </p>
              <p className="text-sm text-muted-foreground mt-1">{question.explanation}</p>
            </div>
          )}

          <button
            onClick={next}
            disabled={!answered}
            className="mt-5 w-full rounded-2xl bg-primary text-white py-3.5 text-sm font-bold hover:bg-orange-600 disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed transition-colors shadow-sm shadow-primary/30 disabled:shadow-none"
          >
            {step + 1 >= session.questions.length ? "See Results" : "Next Exercise"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-5">
      <PageHeader title="Practice Hub" description="Choose a session and start practicing immediately" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {practiceTypes.map((practice) => (
          <button
            key={practice.label}
            onClick={() => startSession(practice.label)}
            className="bg-card border border-border rounded-2xl p-4 text-left hover:shadow-md hover:border-primary/30 transition-all group active:scale-[0.98]"
          >
            <div className="flex items-start gap-4">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${practice.color}`}>
                <practice.icon size={20} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{practice.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{practice.desc}</p>
                <p className="text-xs font-semibold text-primary mt-2 inline-flex items-center gap-1">
                  Start session <ArrowRight size={13} />
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <MessageCircle size={18} className="text-primary" />
          <h2 className="font-bold text-foreground text-base" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Conversation Simulations</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-4">Choose a scenario, then respond to realistic Spanish prompts.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {conversationScenarios.map((scenarioItem) => (
            <button
              key={scenarioItem.label}
              onClick={() => startSession("Conversation", scenarioItem.label)}
              className="bg-card border border-border rounded-2xl p-5 flex items-center gap-4 text-left hover:shadow-md hover:border-primary/40 transition-all group active:scale-[0.98]"
            >
              <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                <scenarioItem.icon size={22} className="text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-foreground group-hover:text-primary transition-colors" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{scenarioItem.label}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge label={scenarioItem.level} />
                  <span className="text-xs text-muted-foreground">3 replies</span>
                </div>
              </div>
              <ArrowRight size={16} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl p-5 border border-border bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center flex-shrink-0">
            <RotateCcw size={22} className="text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <h3 className="font-bold text-foreground text-base mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Everything Saves as Review</h3>
            <p className="text-sm text-muted-foreground">Every answer includes a correction, so wrong answers feel like useful review rather than a dead end.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
