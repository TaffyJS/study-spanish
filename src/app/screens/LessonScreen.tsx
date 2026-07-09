import { useState } from "react";
import { Heart, Lightbulb, Volume2, X } from "lucide-react";
import { getQuestionAudioText, speakSpanish } from "../audio";
import { getLessonContent } from "../data/mockData";

function AudioButton({ text, enabled, label = "Listen" }: { text: string; enabled: boolean; label?: string }) {
  return (
    <button
      type="button"
      onClick={() => speakSpanish(text, enabled)}
      disabled={!enabled}
      className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs font-bold text-primary hover:border-primary/50 hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50"
      aria-label={enabled ? `${label}: ${text}` : "Audio is off"}
    >
      <Volume2 size={14} />
      {label}
    </button>
  );
}

export function LessonScreen({
  lessonId,
  onBack,
  onComplete,
  audioEnabled = true,
}: {
  lessonId: number;
  onBack: () => void;
  onComplete?: (lessonId: number) => void;
  audioEnabled?: boolean;
}) {
  const [step, setStep] = useState(0);
  const [hearts, setHearts] = useState(5);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const lesson = getLessonContent(lessonId);
  const questions = lesson.questions;
  const q = questions[step];
  const progress = (step / questions.length) * 100;
  const accuracy = Math.round((correctCount / questions.length) * 100);

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (idx === q.correct) {
      setCorrectCount(count => count + 1);
    } else {
      setHearts(h => Math.max(0, h - 1));
    }
  };

  const handleNext = () => {
    if (step + 1 >= questions.length) {
      onComplete?.(lesson.id);
      setCompleted(true);
      return;
    }
    setStep(s => s + 1);
    setSelected(null);
    setAnswered(false);
  };

  if (completed) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ background: "linear-gradient(135deg, #FFF8F5, #FFF4EE)" }}>
        <div className="max-w-md w-full text-center space-y-6">
          <div className="text-7xl">🎉</div>
          <h1 className="text-3xl font-extrabold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>¡Excelente!</h1>
          <p className="text-muted-foreground">{lesson.title} complete. Review the parts you missed whenever you like.</p>
          <div className="grid grid-cols-3 gap-4">
            {[["Accuracy", `${accuracy}%`, "🏆"], ["XP Earned", `+${lesson.xp} XP`, "⭐"], ["Words", `${lesson.words.length} new`, "📚"]].map(([l, v, ic]) => (
              <div key={l} className="bg-card rounded-2xl p-4 border border-border shadow-sm">
                <div className="text-2xl mb-1">{ic}</div>
                <div className="font-bold text-foreground text-lg">{v}</div>
                <div className="text-xs text-muted-foreground">{l}</div>
              </div>
            ))}
          </div>
          <button onClick={onBack} className="w-full py-4 rounded-2xl bg-primary text-white font-bold text-base hover:bg-orange-600 transition-colors shadow-lg shadow-primary/30">
            Continue Learning
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur border-b border-border z-10 px-4 md:px-8 py-3">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <button onClick={onBack} className="text-muted-foreground hover:text-foreground transition-colors"><X size={20} /></button>
          <div className="flex-1">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>{lesson.level} · {lesson.title}</span>
              <span>{step + 1}/{questions.length}</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
              <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm font-bold text-red-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Heart key={i} size={18} fill={i < hearts ? "currentColor" : "none"} className={i >= hearts ? "text-muted-foreground" : ""} />
            ))}
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="max-w-2xl w-full space-y-6">
          <div className="rounded-2xl bg-secondary border border-border p-4">
            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">{lesson.duration} lesson</p>
            <p className="text-sm text-secondary-foreground">{lesson.summary}</p>
            <div className="flex gap-2 flex-wrap mt-3">
              {lesson.words.map(word => (
                <button
                  key={word}
                  type="button"
                  onClick={() => speakSpanish(word, audioEnabled)}
                  disabled={!audioEnabled}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-card border border-border text-xs font-semibold text-foreground hover:border-primary/50 disabled:cursor-not-allowed disabled:opacity-60"
                  aria-label={audioEnabled ? `Listen to ${word}` : "Audio is off"}
                >
                  <Volume2 size={12} className="text-primary" />
                  {word}
                </button>
              ))}
            </div>
          </div>

          {lesson.studySections?.map(section => (
            <section key={section.title} className="rounded-2xl border border-border bg-card p-4 shadow-sm">
              <div className="mb-3">
                <h3 className="font-extrabold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{section.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{section.explanation}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {section.items.map(item => (
                  <div key={`${section.title}-${item.label}-${item.spanish}`} className="rounded-xl border border-border bg-background p-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-xs font-bold uppercase tracking-wider text-primary">{item.label}</p>
                        <p className="mt-1 font-extrabold text-foreground break-words">{item.spanish}</p>
                        <p className="text-sm text-muted-foreground">{item.english}</p>
                      </div>
                      <AudioButton text={item.audioText ?? item.spanish} enabled={audioEnabled} />
                    </div>
                    {item.note && <p className="mt-2 text-xs font-medium text-muted-foreground">{item.note}</p>}
                  </div>
                ))}
              </div>
            </section>
          ))}

          <div className="text-center">
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">{q.type}</span>
            <h2 className="mt-3 text-xl md:text-2xl font-bold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{q.prompt}</h2>
            {q.instruction && <p className="text-sm text-muted-foreground mt-2">{q.instruction}</p>}
            {(q.type === "listen" || q.type === "pronounce") && (
              <button
                onClick={() => speakSpanish(getQuestionAudioText(q), audioEnabled)}
                disabled={!audioEnabled}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary text-white px-4 py-2 text-sm font-bold shadow-sm shadow-primary/30 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label={audioEnabled ? `Play Spanish audio for ${getQuestionAudioText(q)}` : "Audio is off"}
              >
                {q.type === "listen" ? <Volume2 size={16} /> : <Lightbulb size={16} />}
                {q.type === "listen" ? "Replay audio" : "Play pronunciation"}
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 gap-3">
            {q.options.map((opt, idx) => {
              let style = "bg-card border-border text-foreground hover:border-primary/50 hover:bg-secondary cursor-pointer";
              if (answered && idx === q.correct) style = "bg-green-50 dark:bg-green-950 border-green-500 text-green-700 dark:text-green-300";
              else if (answered && idx === selected && idx !== q.correct) style = "bg-red-50 dark:bg-red-950 border-red-500 text-red-700 dark:text-red-300";
              else if (answered) style = "bg-card border-border text-muted-foreground opacity-50";
              return (
                <button key={idx} onClick={() => handleSelect(idx)}
                  className={`w-full p-4 rounded-2xl border-2 text-left font-semibold text-base transition-all ${style}`}>
                  <span className="inline-flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground flex-shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-1">{opt}</span>
                    {/[a-záéíóúñü]/i.test(opt) && (
                      <span
                        role="button"
                        tabIndex={-1}
                        onClick={event => {
                          event.stopPropagation();
                          speakSpanish(opt, audioEnabled);
                        }}
                        className="ml-auto inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-primary hover:bg-primary/10"
                        aria-label={audioEnabled ? `Listen to ${opt}` : "Audio is off"}
                      >
                        <Volume2 size={15} />
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
          {answered && (
            <div className={`rounded-2xl p-4 ${selected === q.correct ? "bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800" : "bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800"}`}>
              <p className={`font-bold mb-1 ${selected === q.correct ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300"}`}>
                {selected === q.correct ? "✓ Correct! Excellent!" : "✗ Not quite — keep going!"}
              </p>
              <p className="text-sm text-muted-foreground">
                {q.explanation}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 border-t border-border bg-background/95 backdrop-blur px-4 md:px-8 py-4">
        <div className="max-w-2xl mx-auto">
          {answered ? (
            <button onClick={handleNext} className="w-full py-4 rounded-2xl bg-primary text-white font-bold text-base hover:bg-orange-600 transition-colors shadow-lg shadow-primary/30">
              {step + 1 >= questions.length ? "See Results" : "Next Question →"}
            </button>
          ) : (
            <button disabled className="w-full py-4 rounded-2xl bg-muted text-muted-foreground font-bold text-base cursor-not-allowed">
              Select an answer
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
