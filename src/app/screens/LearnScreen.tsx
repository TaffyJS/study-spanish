import { ArrowRight, BookOpen, CheckCircle2, GraduationCap, Library, MessageCircle, Play, Sparkles, Volume2 } from "lucide-react";
import type { Screen } from "../types";
import { getLessonContent, grammarTopics, learningRoadmap, vocabTopics, vocabWords } from "../data/mockData";
import { speakSpanish } from "../audio";
import { Badge, PageHeader, XPBar } from "../components/common/learning-ui";

type LearnScreenProps = {
  onLesson: (lessonId: number) => void;
  onNavigate: (screen: Screen) => void;
  completedLessonIds?: number[];
};

const studyCollections = [
  {
    title: "Vocabulary",
    desc: "Study words by topic, save useful phrases, and mark words as learned.",
    icon: Library,
    color: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
    screen: "vocabulary" as Screen,
  },
  {
    title: "Grammar",
    desc: "Open a topic, read the pattern, and answer quick checks.",
    icon: GraduationCap,
    color: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
    screen: "grammar" as Screen,
  },
  {
    title: "Practice",
    desc: "Reinforce listening, reading, sentence building, and conversation.",
    icon: MessageCircle,
    color: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
    screen: "practice" as Screen,
  },
];

const curriculumUnits = [
  {
    title: "Foundation",
    desc: "Read and hear Spanish before memorizing grammar.",
    lessonIds: [1, 2],
  },
  {
    title: "People & Things",
    desc: "Pronouns, articles, and noun gender.",
    lessonIds: [3, 4],
  },
  {
    title: "Ownership",
    desc: "My car, his car, this car is his.",
    lessonIds: [5, 6],
  },
  {
    title: "First Sentences",
    desc: "Core verbs, greetings, and present tense.",
    lessonIds: [7, 8, 9, 10, 31],
  },
];

export function LearnScreen({ onLesson, onNavigate, completedLessonIds = [] }: LearnScreenProps) {
  const completedLessons = new Set(completedLessonIds);
  const a1Lessons = learningRoadmap.A1.lessons.filter(lesson => !lesson.isTest);
  const nextLesson = a1Lessons.find(lesson => !completedLessons.has(lesson.id)) ?? a1Lessons[0];
  const nextLessonContent = getLessonContent(nextLesson.id);

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-5">
      <PageHeader title="Learn" description="A guided beginner course that builds Spanish like a study book: sounds, numbers, people, things, ownership, and first sentences" />

      <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
            <Sparkles size={23} />
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold uppercase text-primary tracking-wider">Recommended next</p>
            <h2 className="text-xl font-extrabold text-foreground mt-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {nextLesson.title}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">{nextLessonContent.summary}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {nextLessonContent.words.slice(0, 6).map(word => (
                <button
                  key={word}
                  onClick={() => speakSpanish(word)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-xs font-bold text-foreground hover:border-primary/50"
                  aria-label={`Listen to ${word}`}
                >
                  <Volume2 size={12} className="text-primary" />
                  {word}
                </button>
              ))}
            </div>
          </div>
          <button onClick={() => onLesson(nextLesson.id)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-white shadow-md shadow-primary/25 hover:bg-orange-600 transition-colors">
            Study Now <ArrowRight size={16} />
          </button>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {studyCollections.map(({ title, desc, icon: Icon, color, screen }) => (
          <button key={title} onClick={() => onNavigate(screen)}
            className="text-left rounded-2xl border border-border bg-card p-4 shadow-sm hover:border-primary/40 hover:shadow-md transition-all">
            <div className={`w-11 h-11 rounded-2xl ${color} flex items-center justify-center mb-4`}>
              <Icon size={21} />
            </div>
            <h3 className="font-extrabold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{title}</h3>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{desc}</p>
          </button>
        ))}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-4">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="font-extrabold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Beginner Study Path</h2>
              <p className="text-sm text-muted-foreground">Follow the units in order, like chapters in a beginner book.</p>
            </div>
            <button onClick={() => onNavigate("tests")} className="text-xs font-bold text-primary hover:text-orange-600">View Tests</button>
          </div>
          <div className="space-y-4">
            {curriculumUnits.map(unit => (
              <div key={unit.title} className="rounded-2xl border border-border bg-background p-3">
                <div className="mb-3">
                  <h3 className="font-extrabold text-foreground">{unit.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{unit.desc}</p>
                </div>
                <div className="space-y-2">
                  {unit.lessonIds.map(lessonId => {
                    const lesson = a1Lessons.find(item => item.id === lessonId);
                    if (!lesson) return null;
                    const done = completedLessons.has(lesson.id);
                    const lessonContent = getLessonContent(lesson.id);
                    return (
                      <button key={lesson.id} onClick={() => onLesson(lesson.id)}
                        className={`w-full flex items-center gap-3 rounded-xl border p-3 text-left transition-colors ${
                          done ? "border-green-200 bg-green-50 hover:border-green-300 dark:border-green-800 dark:bg-green-950/30" : "border-border bg-card hover:border-primary/40 hover:bg-secondary"
                        }`}>
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-sm ${
                          done ? "bg-green-500 text-white" : "bg-secondary text-primary"
                        }`}>{done ? <CheckCircle2 size={17} /> : lesson.id}</div>
                        <div className="flex-1 min-w-0">
                          <p className={`font-bold text-sm truncate ${done ? "text-green-700 dark:text-green-300" : "text-foreground"}`}>{lesson.title}</p>
                          <p className="text-xs text-muted-foreground truncate">{done ? "Completed" : lessonContent.summary}</p>
                        </div>
                        {done ? <CheckCircle2 size={18} className="text-green-500" /> : <Play size={16} className="text-primary" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h2 className="font-extrabold text-foreground mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Study Snapshot</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-semibold text-foreground">Vocabulary topics</span>
                <span className="font-bold text-primary">{vocabTopics.length - 1}</span>
              </div>
              <XPBar current={new Set(vocabWords.map(word => word.topic)).size} max={vocabTopics.length - 1} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-semibold text-foreground">Grammar topics</span>
                <span className="font-bold text-primary">{grammarTopics.length}</span>
              </div>
              <XPBar current={grammarTopics.filter(topic => topic.done).length} max={grammarTopics.length} />
            </div>
            <div className="flex gap-2 flex-wrap pt-1">
              {["A1 basics", "useful phrases", "daily practice", "quick checks"].map(label => <Badge key={label} label={label} />)}
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-secondary text-primary flex items-center justify-center">
            <BookOpen size={20} />
          </div>
          <div>
            <h2 className="font-extrabold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>What to study next</h2>
            <p className="text-sm text-muted-foreground">Open a topic card to study. Use Tests only when you want exam-style practice.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {grammarTopics.slice(0, 4).map(topic => (
            <button key={topic.title} onClick={() => onNavigate("grammar")}
              className="rounded-xl border border-border bg-background p-3 text-left hover:border-primary/40 transition-colors">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${topic.current ? "bg-primary" : "bg-muted-foreground/30"}`} />
                <p className="font-bold text-sm text-foreground">{topic.title}</p>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{topic.level} · {topic.lessons} study cards</p>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
