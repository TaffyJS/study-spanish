import { useMemo, useState } from "react";
import { ArrowLeft, CheckCircle2, GraduationCap, Play } from "lucide-react";
import { grammarTopics, type LessonQuestion } from "../data/mockData";
import { Badge, PageHeader, XPBar } from "../components/common/learning-ui";

type GrammarStudy = {
  rule: string;
  examples: Array<{ spanish: string; english: string; note: string }>;
  tips: string[];
  questions: LessonQuestion[];
};

const fallbackStudy: GrammarStudy = {
  rule: "Look for the subject, choose the matching verb or article, then check whether the sentence is making a statement, negative, or question.",
  examples: [
    { spanish: "Yo hablo espanol.", english: "I speak Spanish.", note: "Subject + verb + object" },
    { spanish: "Ella no trabaja hoy.", english: "She does not work today.", note: "Place no before the verb" },
  ],
  tips: ["Spanish word endings carry a lot of grammar information.", "Read the full sentence before choosing an article or verb form."],
  questions: [
    { type: "choose", prompt: "Choose the natural sentence.", options: ["Yo hablo espanol.", "Yo hablar espanol.", "Espanol yo habla.", "Hablo yo el espanol."], correct: 0, explanation: "Use the conjugated verb: yo hablo." },
    { type: "choose", prompt: "Where does \"no\" go in a basic negative sentence?", options: ["Before the verb", "After the noun", "At the end", "Before every word"], correct: 0, explanation: "Put \"no\" directly before the verb: Yo no hablo." },
  ],
};

const grammarStudy: Record<string, GrammarStudy> = {
  "Present Tense (-ar verbs)": {
    rule: "For regular -ar verbs, remove -ar and add endings: yo -o, tu -as, el/ella/usted -a, nosotros -amos, ellos/ellas/ustedes -an.",
    examples: [
      { spanish: "Yo hablo espanol.", english: "I speak Spanish.", note: "hablar -> hablo for yo" },
      { spanish: "Nosotros trabajamos en casa.", english: "We work at home.", note: "trabajar -> trabajamos for nosotros" },
      { spanish: "Ellas caminan al parque.", english: "They walk to the park.", note: "caminar -> caminan for ellas" },
    ],
    tips: ["The infinitive is the dictionary form: hablar, trabajar, caminar.", "The ending tells you who is doing the action, so subject pronouns are often optional."],
    questions: [
      { type: "choose", prompt: "Complete: Yo ____ espanol.", options: ["hablo", "hablas", "hablan", "hablamos"], correct: 0, explanation: "With yo, regular -ar verbs end in -o." },
      { type: "choose", prompt: "Complete: Nosotros ____ en casa.", options: ["trabajan", "trabajas", "trabajamos", "trabajo"], correct: 2, explanation: "With nosotros, regular -ar verbs end in -amos." },
      { type: "translate", prompt: "What does \"Ella baila\" mean?", options: ["She dances", "I dance", "They dance", "We dance"], correct: 0, explanation: "Baila is the el/ella/usted form of bailar." },
    ],
  },
  "Gender & Articles": {
    rule: "Spanish nouns have grammatical gender. Use el/un with many masculine singular nouns and la/una with many feminine singular nouns.",
    examples: [
      { spanish: "el libro", english: "the book", note: "masculine singular" },
      { spanish: "la casa", english: "the house", note: "feminine singular" },
      { spanish: "una ciudad grande", english: "a big city", note: "ciudad is feminine" },
    ],
    tips: ["Many nouns ending in -o are masculine and many ending in -a are feminine, but there are exceptions.", "Memorize new nouns with their article: el libro, la ciudad."],
    questions: [
      { type: "choose", prompt: "Choose the correct phrase.", options: ["la casa", "el casa", "los casa", "un casa"], correct: 0, explanation: "Casa is feminine: la casa." },
      { type: "choose", prompt: "Choose the correct phrase.", options: ["la libro", "una libro", "el libro", "las libro"], correct: 2, explanation: "Libro is masculine: el libro." },
    ],
  },
  "Subject Pronouns": {
    rule: "Subject pronouns name who does the action: yo, tu, el, ella, usted, nosotros, ellos, ellas, ustedes.",
    examples: [
      { spanish: "Yo estudio.", english: "I study.", note: "yo = I" },
      { spanish: "Tu hablas.", english: "You speak.", note: "tu = informal you" },
      { spanish: "Usted trabaja.", english: "You work.", note: "usted = formal you" },
    ],
    tips: ["Spanish often drops the subject pronoun because the verb ending already points to the subject.", "Use usted when you want a more formal tone."],
    questions: [
      { type: "choose", prompt: "Which pronoun means \"we\"?", options: ["yo", "tu", "nosotros", "ellas"], correct: 2, explanation: "Nosotros means we." },
      { type: "choose", prompt: "Which pronoun is formal \"you\"?", options: ["usted", "yo", "ella", "ellos"], correct: 0, explanation: "Usted is formal you." },
    ],
  },
  "Negative Sentences": {
    rule: "To make a basic Spanish sentence negative, place no directly before the conjugated verb.",
    examples: [
      { spanish: "Yo no hablo ingles.", english: "I do not speak English.", note: "no + verb" },
      { spanish: "Ella no come carne.", english: "She does not eat meat.", note: "no comes before come" },
    ],
    tips: ["Spanish does not need a helper like do/does for simple negatives.", "Keep no close to the verb."],
    questions: [
      { type: "choose", prompt: "Choose the correct negative sentence.", options: ["Yo no hablo ingles.", "Yo hablo no ingles.", "No yo ingles hablo.", "Yo ingles no."], correct: 0, explanation: "Place no before the verb: no hablo." },
      { type: "choose", prompt: "Complete: Ella ____ trabaja hoy.", options: ["no", "el", "muy", "una"], correct: 0, explanation: "Use no before trabaja." },
    ],
  },
  "Question Words": {
    rule: "Question words carry accents in direct questions: que, quien, cuando, donde, por que, como, cuanto.",
    examples: [
      { spanish: "¿Que estudias?", english: "What do you study?", note: "que = what" },
      { spanish: "¿Donde vives?", english: "Where do you live?", note: "donde = where" },
      { spanish: "¿Como estas?", english: "How are you?", note: "como = how" },
    ],
    tips: ["In Spanish, opening and closing question marks frame the question.", "Question words usually come near the beginning."],
    questions: [
      { type: "choose", prompt: "Which word asks \"where\"?", options: ["cuando", "donde", "quien", "cuanto"], correct: 1, explanation: "Donde means where." },
      { type: "choose", prompt: "Choose the best translation: ¿Que hablas?", options: ["What do you speak?", "Where do you live?", "Who speaks?", "When do you eat?"], correct: 0, explanation: "Que asks what." },
    ],
  },
};

export function GrammarScreen() {
  const [levelFilter, setLevelFilter] = useState("All");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(() => new Set(grammarTopics.filter(t => t.done).map(t => t.title)));
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const levels = ["All", "A1", "A2", "B1", "C1"];
  const filtered = grammarTopics.filter(t => levelFilter === "All" || t.level === levelFilter);
  const completed = completedTopics.size;
  const topic = grammarTopics.find(item => item.title === selectedTopic);
  const study = selectedTopic ? grammarStudy[selectedTopic] ?? fallbackStudy : null;
  const question = study?.questions[questionIndex];
  const answered = selectedAnswer !== null;

  const stats = useMemo(() => {
    const inProgress = grammarTopics.some(item => item.current && !completedTopics.has(item.title)) ? 1 : 0;
    return {
      completed,
      inProgress,
      locked: Math.max(0, grammarTopics.length - completed - inProgress),
    };
  }, [completed, completedTopics]);

  const openTopic = (title: string) => {
    setSelectedTopic(title);
    setQuestionIndex(0);
    setSelectedAnswer(null);
  };

  const closeTopic = () => {
    setSelectedTopic(null);
    setQuestionIndex(0);
    setSelectedAnswer(null);
  };

  const nextQuestion = () => {
    if (!study || !selectedTopic) return;
    if (questionIndex + 1 >= study.questions.length) {
      setCompletedTopics(current => new Set([...current, selectedTopic]));
      closeTopic();
      return;
    }
    setQuestionIndex(value => value + 1);
    setSelectedAnswer(null);
  };

  if (topic && study && question) {
    return (
      <div className="p-4 md:p-6 max-w-3xl mx-auto space-y-5">
        <div className="flex items-center gap-3">
          <button onClick={closeTopic} className="p-2 rounded-xl bg-card border border-border text-muted-foreground hover:text-foreground">
            <ArrowLeft size={18} />
          </button>
          <div className="flex-1">
            <p className="text-xs font-bold uppercase tracking-wider text-primary">Grammar Study</p>
            <h1 className="font-extrabold text-foreground text-xl" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{topic.title}</h1>
          </div>
          <Badge label={topic.level} />
        </div>

        <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
              <GraduationCap size={22} />
            </div>
            <div>
              <h2 className="font-extrabold text-foreground mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Rule</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{study.rule}</p>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {study.examples.map(example => (
            <div key={example.spanish} className="rounded-2xl border border-border bg-card p-4 shadow-sm">
              <p className="font-extrabold text-foreground">{example.spanish}</p>
              <p className="text-sm text-primary font-semibold mt-1">{example.english}</p>
              <p className="text-xs text-muted-foreground mt-2">{example.note}</p>
            </div>
          ))}
        </section>

        <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h2 className="font-extrabold text-foreground mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Quick Check</h2>
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>Question {questionIndex + 1} of {study.questions.length}</span>
            <span>{completedTopics.has(topic.title) ? "Completed" : "In study"}</span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden mb-5">
            <div className="h-full bg-primary transition-all" style={{ width: `${((questionIndex + Number(answered)) / study.questions.length) * 100}%` }} />
          </div>
          <p className="text-lg font-bold text-foreground mb-3">{question.prompt}</p>
          <div className="grid gap-2">
            {question.options.map((option, idx) => {
              let style = "bg-background border-border text-foreground hover:border-primary/50";
              if (answered && idx === question.correct) style = "bg-green-50 dark:bg-green-950 border-green-500 text-green-700 dark:text-green-300";
              else if (answered && idx === selectedAnswer) style = "bg-red-50 dark:bg-red-950 border-red-500 text-red-700 dark:text-red-300";
              else if (answered) style = "bg-background border-border text-muted-foreground opacity-60";
              return (
                <button key={option} onClick={() => !answered && setSelectedAnswer(idx)} className={`rounded-xl border-2 p-3 text-left text-sm font-bold transition-all ${style}`}>
                  {option}
                </button>
              );
            })}
          </div>
          {answered && (
            <div className="mt-3 rounded-xl bg-secondary p-3">
              <p className="text-sm font-semibold text-foreground">{question.explanation}</p>
            </div>
          )}
          <button disabled={!answered} onClick={nextQuestion}
            className={`mt-4 w-full rounded-2xl py-3 text-sm font-extrabold transition-colors ${answered ? "bg-primary text-white shadow-md shadow-primary/25 hover:bg-orange-600" : "bg-muted text-muted-foreground cursor-not-allowed"}`}>
            {questionIndex + 1 >= study.questions.length ? "Mark Topic Complete" : "Next Check"}
          </button>
        </section>

        <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h2 className="font-extrabold text-foreground mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Study Tips</h2>
          <div className="space-y-2">
            {study.tips.map(tip => (
              <div key={tip} className="rounded-xl bg-muted/50 p-3 text-sm text-foreground">{tip}</div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto space-y-5">
      <PageHeader title="Grammar" description={`${completed} of ${grammarTopics.length} topics completed`} />

      <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-foreground">Progress</span>
          <span className="text-sm font-bold text-primary">{completed}/{grammarTopics.length}</span>
        </div>
        <XPBar current={completed} max={grammarTopics.length} />
        <div className="mt-3 grid grid-cols-3 gap-3">
          {[["Completed", stats.completed, "text-green-600"], ["In Progress", stats.inProgress, "text-orange-500"], ["Available", stats.locked, "text-muted-foreground"]].map(([l, v, c]) => (
            <div key={String(l)} className="text-center">
              <p className={`font-bold text-xl ${c}`}>{v}</p>
              <p className="text-xs text-muted-foreground">{l}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3 flex-wrap">
        {[["Completed", "bg-green-500"], ["Current", "bg-orange-500"], ["Available", "bg-gray-300"]].map(([l, bg]) => (
          <div key={l} className="flex items-center gap-1.5">
            <div className={`w-2.5 h-2.5 rounded-full ${bg}`} />
            <span className="text-xs text-muted-foreground">{l}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {levels.map(l => (
          <button key={l} onClick={() => setLevelFilter(l)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${levelFilter === l ? "bg-primary text-white shadow-sm" : "bg-card border border-border text-muted-foreground hover:border-primary/50"}`}>
            {l}
          </button>
        ))}
      </div>

      <div className="space-y-2.5">
        {filtered.map((topic) => {
          const done = completedTopics.has(topic.title);
          return (
            <button key={topic.title} onClick={() => openTopic(topic.title)}
              className={`w-full text-left bg-card border rounded-2xl p-4 shadow-sm transition-all hover:shadow-md hover:border-primary/40 ${topic.current ? "border-primary/50" : done ? "border-green-100 dark:border-green-900" : "border-border"}`}>
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full flex-shrink-0 ${done ? "bg-green-500" : topic.current ? "bg-orange-500" : "bg-gray-300"}`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className={`text-sm font-semibold ${done ? "text-muted-foreground" : "text-foreground"} ${topic.current ? "text-primary" : ""}`}>{topic.title}</h3>
                    {topic.current && <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold">Current</span>}
                    {done && <span className="text-xs bg-green-50 dark:bg-green-950 text-green-600 px-2 py-0.5 rounded-full font-semibold">Completed</span>}
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <Badge label={topic.level} />
                    <span className="text-xs text-muted-foreground">{topic.lessons} study cards</span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  {done ? <CheckCircle2 size={20} className="text-green-500" /> :
                   <span className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-xl hover:bg-orange-600 transition-colors inline-flex items-center gap-1"><Play size={12} />Study</span>}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
