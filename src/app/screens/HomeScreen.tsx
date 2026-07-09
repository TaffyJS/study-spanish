import { BookOpen, Check, CheckCircle2, ChevronRight, Flame, GraduationCap, Library, Play, Sparkles, Star, TrendingUp, Volume2, ArrowRight } from "lucide-react";
import { speakSpanish } from "../audio";
import type { Screen } from "../types";
import { achievements, challenges, getLessonContent, learningRoadmap, type LearnerProfile, weekDays } from "../data/mockData";
import { ProgressRing, StatCard } from "../components/common/learning-ui";

function localDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function currentWeekActivity(studyDates: string[], studiedToday: boolean) {
  const activeDates = new Set(studyDates);
  if (studiedToday) activeDates.add(localDateKey());

  const today = new Date();
  const mondayOffset = (today.getDay() + 6) % 7;
  const monday = new Date(today);
  monday.setDate(today.getDate() - mondayOffset);

  return weekDays.map((_, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);
    return activeDates.has(localDateKey(date));
  });
}

export function HomeScreen({
  user,
  studyDates = [],
  studiedToday = false,
  completedLessonIds = [],
  onNavigate,
  onLesson,
  audioEnabled = true,
}: {
  user: LearnerProfile;
  studyDates?: string[];
  studiedToday?: boolean;
  completedLessonIds?: number[];
  onNavigate: (s: Screen) => void;
  onLesson: (lessonId: number) => void;
  audioEnabled?: boolean;
}) {
  const goalPct = Math.min((user.dailyDone / user.dailyGoal) * 100, 100);
  const xpPct = Math.min((user.xp / user.nextLevelXp) * 100, 100);
  const weekActivity = currentWeekActivity(studyDates, studiedToday);
  const completedLessons = new Set(completedLessonIds);
  const a1Lessons = learningRoadmap.A1.lessons;
  const nextRoadmapLesson = a1Lessons.find(lesson => !lesson.isTest && !completedLessons.has(lesson.id))
    ?? a1Lessons.find(lesson => !completedLessons.has(lesson.id))
    ?? a1Lessons[a1Lessons.length - 1];
  const nextLesson = getLessonContent(nextRoadmapLesson.id);
  const nextLessonIndex = a1Lessons.findIndex(lesson => lesson.id === nextRoadmapLesson.id) + 1;

  return (
    <div className="mx-auto max-w-4xl space-y-5 p-4 min-[380px]:p-5 md:p-6">
      {/* Welcome Banner */}
      <div className="relative rounded-3xl overflow-hidden" style={{ background: "linear-gradient(135deg, #E8602C 0%, #F47A4A 40%, #FABC2A 100%)" }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="relative p-6 md:p-8">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="min-w-0">
              <p className="text-white/80 text-sm font-medium mb-1">¡Buenos días!</p>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Hola, {user.name}! 👋
              </h1>
              <p className="text-white/70 text-sm">Level {user.level} · {user.levelLabel}</p>
            </div>
            <div className="grid w-full grid-cols-2 gap-3 min-[430px]:flex min-[430px]:w-auto">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-3 py-3 text-center sm:px-4">
                <div className="flex items-center justify-center gap-1 text-white font-bold text-lg">
                  <Flame size={18} className="text-yellow-300" />{user.streak}
                </div>
                <p className="text-white/70 text-xs">day streak</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-3 py-3 text-center sm:px-4">
                <div className="flex items-center justify-center gap-1 text-white font-bold text-lg">
                  <Star size={18} className="text-yellow-300" />{user.xp.toLocaleString()}
                </div>
                <p className="text-white/70 text-xs">XP total</p>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <div className="flex justify-between text-white/80 text-xs mb-2">
              <span>Level {user.level} Progress</span>
              <span>{user.xp} / {user.nextLevelXp} XP</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2.5">
              <div className="h-2.5 rounded-full bg-white transition-all duration-700" style={{ width: `${xpPct}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Continue Learning CTA */}
      <button onClick={() => onLesson(nextRoadmapLesson.id)} className="w-full group relative rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.98]" style={{ background: "linear-gradient(135deg, #1C1917 0%, #3D2C1E 100%)" }}>
        <div className="flex flex-col gap-4 px-4 py-5 min-[430px]:flex-row min-[430px]:items-center min-[430px]:justify-between sm:px-6">
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <div className="w-12 h-12 shrink-0 rounded-xl bg-primary/20 flex items-center justify-center">
              <Play size={22} className="text-primary ml-0.5" />
            </div>
            <div className="min-w-0 text-left">
              <p className="text-white/60 text-xs mb-0.5">Current Lesson</p>
              <p className="text-white font-bold text-base" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{nextLesson.title}</p>
              <p className="text-white/50 text-xs mt-0.5">{nextLesson.level} · Lesson {nextLessonIndex} of {a1Lessons.length} · ~{nextLesson.duration}</p>
            </div>
          </div>
          <div className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors group-hover:bg-orange-500 min-[430px]:w-auto">
            Continue <ArrowRight size={14} />
          </div>
        </div>
      </button>

      {/* Daily Goal + Week Streak */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
          <p className="text-xs text-muted-foreground font-medium mb-3">Daily Goal</p>
          <div className="flex items-center gap-3">
            <div className="relative">
              <ProgressRing value={user.dailyDone} max={user.dailyGoal} size={72} stroke={7} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold text-foreground">{Math.round(goalPct)}%</span>
              </div>
            </div>
            <div className="min-w-0">
              <p className="text-foreground font-bold text-xl">{user.dailyDone}<span className="text-muted-foreground text-sm font-normal">/{user.dailyGoal}m</span></p>
              <p className="text-xs text-muted-foreground">{user.dailyGoal - user.dailyDone} min left today</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
          <p className="text-xs text-muted-foreground font-medium mb-3">This Week</p>
          <div className="grid grid-cols-7 gap-1.5">
            {weekDays.map((d, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <div className={`h-7 w-7 rounded-full flex items-center justify-center transition-all ${weekActivity[i] ? "bg-primary shadow-sm" : "bg-muted"}`}>
                  {weekActivity[i] && <Check size={13} className="text-white" />}
                </div>
                <span className="text-xs text-muted-foreground">{d}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-1">
            <Flame size={14} className="text-orange-500" />
            <span className="text-xs text-muted-foreground"><strong className="text-foreground">{user.streak}</strong> day streak</span>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard value={user.wordsLearned} label="Words Learned" icon={Library} color="bg-blue-100 dark:bg-blue-950 text-blue-600" />
        <StatCard value={user.grammarTopics} label="Grammar Topics" icon={GraduationCap} color="bg-purple-100 dark:bg-purple-950 text-purple-600" />
        <StatCard value={user.lessonsCompleted} label="Lessons Done" icon={CheckCircle2} color="bg-green-100 dark:bg-green-950 text-green-600" />
        <StatCard value={`${Math.round((user.wordsLearned / user.totalWords) * 100)}%`} label="Vocab Covered" icon={TrendingUp} color="bg-orange-100 dark:bg-orange-950 text-orange-600" />
      </div>

      {/* Today's Challenges Preview */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-foreground text-base" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Today's Challenges</h2>
          <button onClick={() => onNavigate("challenges")} className="text-xs text-primary font-semibold flex items-center gap-0.5 hover:opacity-75 transition-opacity">
            View all <ChevronRight size={14} />
          </button>
        </div>
        <div className="space-y-2.5">
          {challenges.slice(0, 3).map((c) => (
            <div key={c.id} className={`bg-card border border-border rounded-xl p-4 flex items-center gap-3 shadow-sm transition-all ${c.completed ? "opacity-70" : ""}`}>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${c.bg}`}>
                <c.icon size={17} className={c.color} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold ${c.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>{c.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 bg-muted rounded-full h-1.5 overflow-hidden">
                    <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${(c.done / c.total) * 100}%` }} />
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{c.done}/{c.total}</span>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                {c.completed ? <CheckCircle2 size={20} className="text-green-500" /> : <span className="text-xs font-bold text-primary">+{c.xp} XP</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Phrase of the Day */}
      <div className="rounded-2xl p-5 border border-border shadow-sm" style={{ background: "linear-gradient(135deg, #FFF4EE, #FFF8F5)" }}>
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={16} className="text-primary" />
          <p className="text-xs font-semibold text-primary uppercase tracking-wider">Phrase of the Day</p>
        </div>
        <p className="text-xl font-bold text-foreground mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>"La práctica hace al maestro."</p>
        <p className="text-muted-foreground text-sm">"Practice makes perfect."</p>
        <button
          onClick={() => speakSpanish("La practica hace al maestro.", audioEnabled)}
          disabled={!audioEnabled}
          className="mt-3 flex items-center gap-1.5 text-xs text-primary font-medium hover:opacity-75 transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
          aria-label={audioEnabled ? "Listen to phrase of the day pronunciation" : "Audio is off"}
        >
          <Volume2 size={14} /> Listen to pronunciation
        </button>
      </div>

      {/* Recent Achievements */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-foreground text-base" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Recent Achievements</h2>
          <button onClick={() => onNavigate("progress")} className="text-xs text-primary font-semibold flex items-center gap-0.5 hover:opacity-75 transition-opacity">
            View all <ChevronRight size={14} />
          </button>
        </div>
        <div className="flex gap-3 flex-wrap">
          {achievements.filter(a => a.earned).map((a, i) => (
            <div key={i} className="bg-card border border-border rounded-2xl px-4 py-3 flex items-center gap-2 shadow-sm">
              <span className="text-xl">{a.icon}</span>
              <span className="text-sm font-semibold text-foreground">{a.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
