import { useEffect, useRef, useState } from "react";
import type { Screen } from "./types";
import { animalAvatars, defaultAnimalAvatar } from "./avatars";
import { AppShell } from "./components/layout/AppShell";
import { getLessonContent, user as defaultUser, type LearnerProfile, type LearnerSettings } from "./data/mockData";
import { ChallengesScreen } from "./screens/ChallengesScreen";
import { GrammarScreen } from "./screens/GrammarScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { LearnScreen } from "./screens/LearnScreen";
import { LessonScreen } from "./screens/LessonScreen";
import { PracticeScreen } from "./screens/PracticeScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import { ProgressScreen } from "./screens/ProgressScreen";
import { TestSessionScreen } from "./screens/TestSessionScreen";
import { TestsScreen } from "./screens/TestsScreen";
import { VocabularyScreen } from "./screens/VocabularyScreen";

const profileStorageKey = "studySpanish.profile";
const settingsStorageKey = "studySpanish.settings";
const completedLessonsStorageKey = "studySpanish.completedLessons";
const completedTestsStorageKey = "studySpanish.completedTests";
const studyDatesStorageKey = "studySpanish.studyDates";

const defaultSettings: LearnerSettings = {
  dailyStudyGoal: defaultUser.dailyGoal,
  dailyWordGoal: 10,
  spanishRegion: "Latin American",
  learningGoal: "General Fluency",
  audio: true,
  accessibility: "Standard",
};

function readStoredProfile(): LearnerProfile | null {
  try {
    const raw = localStorage.getItem(profileStorageKey);
    if (!raw) return null;
    const parsed = { ...defaultUser, ...JSON.parse(raw) };
    return parsed.name?.trim() ? parsed : null;
  } catch {
    return null;
  }
}

function readStoredSettings(): LearnerSettings {
  try {
    const raw = localStorage.getItem(settingsStorageKey);
    return raw ? { ...defaultSettings, ...JSON.parse(raw) } : defaultSettings;
  } catch {
    return defaultSettings;
  }
}

function readStoredCompletedLessonIds(): number[] {
  try {
    const raw = localStorage.getItem(completedLessonsStorageKey);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((id): id is number => Number.isInteger(id));
  } catch {
    return [];
  }
}

function readStoredCompletedTestIds(): string[] {
  try {
    const raw = localStorage.getItem(completedTestsStorageKey);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((id): id is string => typeof id === "string" && id.length > 0);
  } catch {
    return [];
  }
}

function readStoredStudyDates(): string[] {
  try {
    const raw = localStorage.getItem(studyDatesStorageKey);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((date): date is string => typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date));
  } catch {
    return [];
  }
}

function writeStoredJson(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage may be disabled in embedded/private contexts; the app still works for the current session.
  }
}

function usernameFromName(name: string) {
  const base = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
  return base ? `${base}_learns` : "spanish_learner";
}

function localDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function toLocalDate(dateKey: string) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function daysBetween(fromDateKey: string, toDateKey: string) {
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.round((toLocalDate(toDateKey).getTime() - toLocalDate(fromDateKey).getTime()) / msPerDay);
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [darkMode, setDarkMode] = useState(false);
  const [selectedLessonId, setSelectedLessonId] = useState(1);
  const [selectedTestId, setSelectedTestId] = useState("a1-milestone");
  const [returnScreen, setReturnScreen] = useState<Screen>("learn");
  const [profile, setProfile] = useState<LearnerProfile>(() => readStoredProfile() ?? { ...defaultUser, name: "", username: "spanish_learner", avatar: defaultAnimalAvatar });
  const [settings, setSettings] = useState<LearnerSettings>(() => readStoredSettings());
  const [completedLessonIds, setCompletedLessonIds] = useState<number[]>(() => readStoredCompletedLessonIds());
  const [completedTestIds, setCompletedTestIds] = useState<string[]>(() => readStoredCompletedTestIds());
  const [studyDates, setStudyDates] = useState<string[]>(() => readStoredStudyDates());
  const completedLessonIdsRef = useRef(completedLessonIds);
  const completedTestIdsRef = useRef(completedTestIds);
  const studyDatesRef = useRef(studyDates);
  const [nameInput, setNameInput] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(defaultAnimalAvatar);
  const [needsName, setNeedsName] = useState(() => readStoredProfile() === null);
  const hasStudiedToday = studyDates.includes(localDateKey()) || profile.dailyDone > 0 || completedLessonIds.length > 0 || completedTestIds.length > 0;

  const displayProfile: LearnerProfile = {
    ...profile,
    name: profile.name || "Learner",
    streak: Math.max(profile.streak, hasStudiedToday ? 1 : 0),
    dailyGoal: settings.dailyStudyGoal,
  };

  useEffect(() => {
    if (!needsName) {
      writeStoredJson(profileStorageKey, profile);
    }
  }, [needsName, profile]);

  useEffect(() => {
    writeStoredJson(settingsStorageKey, settings);
  }, [settings]);

  useEffect(() => {
    completedLessonIdsRef.current = completedLessonIds;
    writeStoredJson(completedLessonsStorageKey, completedLessonIds);
  }, [completedLessonIds]);

  useEffect(() => {
    completedTestIdsRef.current = completedTestIds;
    writeStoredJson(completedTestsStorageKey, completedTestIds);
  }, [completedTestIds]);

  useEffect(() => {
    studyDatesRef.current = studyDates;
    writeStoredJson(studyDatesStorageKey, studyDates);
  }, [studyDates]);

  useEffect(() => {
    document.documentElement.classList.toggle("large-text", settings.accessibility === "Large Text");
    document.documentElement.classList.toggle("high-contrast", settings.accessibility === "High Contrast");
  }, [settings.accessibility]);

  const handleDark = (value: boolean) => {
    setDarkMode(value);
    document.documentElement.classList.toggle("dark", value);
  };

  const saveFirstName = () => {
    const name = nameInput.trim();
    if (!name) return;
    const nextProfile = {
      ...profile,
      name,
      username: usernameFromName(name),
      avatar: selectedAvatar,
    };
    writeStoredJson(profileStorageKey, nextProfile);
    setProfile(current => ({
      ...current,
      name,
      username: usernameFromName(name),
      avatar: selectedAvatar,
    }));
    setNeedsName(false);
  };

  const goLesson = (lessonId = 1, backTo: Screen = "learn") => {
    setSelectedLessonId(lessonId);
    setReturnScreen(backTo);
    setScreen("lesson");
  };
  const goTest = (testId = "a1-milestone") => {
    setSelectedTestId(testId);
    setReturnScreen("tests");
    setScreen("test");
  };
  const goBack = () => setScreen(returnScreen);
  const activeNav = screen === "lesson" ? "learn" : screen === "test" ? "tests" : screen;

  const recordStudyToday = () => {
    const today = localDateKey();
    const alreadyStudiedToday = studyDatesRef.current.includes(today);

    if (!alreadyStudiedToday) {
      const nextDates = [...studyDatesRef.current, today].sort();
      studyDatesRef.current = nextDates;
      writeStoredJson(studyDatesStorageKey, nextDates);
      setStudyDates(nextDates);
    }

    setProfile(current => {
      if (alreadyStudiedToday) {
        const nextProfile = { ...current, streak: Math.max(current.streak, 1) };
        writeStoredJson(profileStorageKey, nextProfile);
        return nextProfile;
      }

      const lastStudyDate = studyDatesRef.current.filter(date => date !== today).at(-1);
      const nextStreak = lastStudyDate
        ? daysBetween(lastStudyDate, today) === 1
          ? current.streak + 1
          : daysBetween(lastStudyDate, today) === 0
            ? current.streak
            : 1
        : Math.max(current.streak, 1);

      const nextProfile = {
        ...current,
        streak: Math.max(current.streak, nextStreak),
      };
      writeStoredJson(profileStorageKey, nextProfile);
      return nextProfile;
    });
  };

  const completeLesson = (lessonId: number) => {
    recordStudyToday();
    if (completedLessonIdsRef.current.includes(lessonId)) return;

    const lesson = getLessonContent(lessonId);
    completedLessonIdsRef.current = [...completedLessonIdsRef.current, lessonId];
    writeStoredJson(completedLessonsStorageKey, completedLessonIdsRef.current);
    setCompletedLessonIds(completedLessonIdsRef.current);
    setProfile(current => {
      const nextProfile = {
        ...current,
        xp: current.xp + lesson.xp,
        wordsLearned: Math.min(current.totalWords, current.wordsLearned + lesson.words.length),
        lessonsCompleted: current.lessonsCompleted + 1,
        dailyDone: Math.min(settings.dailyStudyGoal, current.dailyDone + Math.max(1, Number.parseInt(lesson.duration, 10) || 1)),
      };
      writeStoredJson(profileStorageKey, nextProfile);
      return nextProfile;
    });
  };

  const completeTest = (testId: string, xp: number) => {
    recordStudyToday();
    if (completedTestIdsRef.current.includes(testId)) return;

    completedTestIdsRef.current = [...completedTestIdsRef.current, testId];
    writeStoredJson(completedTestsStorageKey, completedTestIdsRef.current);
    setCompletedTestIds(completedTestIdsRef.current);
    setProfile(current => {
      const nextProfile = {
        ...current,
        xp: current.xp + xp,
        dailyDone: Math.min(settings.dailyStudyGoal, current.dailyDone + 15),
      };
      writeStoredJson(profileStorageKey, nextProfile);
      return nextProfile;
    });
  };

  const resetAllProgress = () => {
    completedLessonIdsRef.current = [];
    completedTestIdsRef.current = [];
    studyDatesRef.current = [];

    setCompletedLessonIds([]);
    setCompletedTestIds([]);
    setStudyDates([]);
    setProfile(current => {
      const nextProfile: LearnerProfile = {
        ...current,
        level: defaultUser.level,
        levelLabel: defaultUser.levelLabel,
        streak: 0,
        xp: 0,
        wordsLearned: 0,
        grammarTopics: 0,
        lessonsCompleted: 0,
        dailyDone: 0,
      };
      writeStoredJson(profileStorageKey, nextProfile);
      return nextProfile;
    });

    writeStoredJson(completedLessonsStorageKey, []);
    writeStoredJson(completedTestsStorageKey, []);
    writeStoredJson(studyDatesStorageKey, []);
  };

  if (screen === "lesson") {
    return (
      <div className={darkMode ? "dark" : ""} style={{ fontFamily: "'Nunito', sans-serif" }}>
        <LessonScreen lessonId={selectedLessonId} onBack={goBack} onComplete={completeLesson} audioEnabled={settings.audio} />
      </div>
    );
  }

  if (screen === "test") {
    return (
      <div className={darkMode ? "dark" : ""}>
        <TestSessionScreen
          testId={selectedTestId}
          onBack={goBack}
          onComplete={completeTest}
          audioEnabled={settings.audio}
          completed={completedTestIds.includes(selectedTestId)}
        />
      </div>
    );
  }

  return (
    <AppShell activeNav={activeNav} darkMode={darkMode} user={displayProfile} onDarkModeChange={handleDark} onNavigate={setScreen}>
      {needsName && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-3xl border border-border bg-card p-6 shadow-2xl">
            <p className="text-xs font-bold uppercase tracking-wider text-primary">Welcome</p>
            <h1 className="mt-2 text-2xl font-extrabold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>What should we call you?</h1>
            <p className="mt-2 text-sm text-muted-foreground">Your name will appear in the app and can be changed later from Profile.</p>
            <div className="mt-5">
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Choose an avatar</p>
              <div className="grid grid-cols-3 gap-2">
                {animalAvatars.map(avatar => {
                  const selected = selectedAvatar === avatar.src;
                  return (
                    <button
                      key={avatar.id}
                      type="button"
                      onClick={() => setSelectedAvatar(avatar.src)}
                      aria-label={`Choose ${avatar.label} avatar`}
                      aria-pressed={selected}
                      className={`rounded-2xl border-2 p-1.5 transition-all ${
                        selected ? "border-primary bg-secondary shadow-sm shadow-primary/20" : "border-border bg-background hover:border-primary/40"
                      }`}
                    >
                      <img src={avatar.src} alt="" className="aspect-square w-full rounded-xl object-cover" />
                    </button>
                  );
                })}
              </div>
            </div>
            <input
              value={nameInput}
              onChange={event => setNameInput(event.target.value)}
              onKeyDown={event => event.key === "Enter" && saveFirstName()}
              autoFocus
              placeholder="Enter your name"
              className="mt-5 w-full rounded-xl border border-border bg-input-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <button onClick={saveFirstName} disabled={!nameInput.trim()}
              className="mt-4 w-full rounded-2xl bg-primary py-3 font-extrabold text-white shadow-md shadow-primary/25 transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50">
              Start Learning
            </button>
          </div>
        </div>
      )}
      {screen === "home" && <HomeScreen user={displayProfile} studyDates={studyDates} studiedToday={hasStudiedToday} completedLessonIds={completedLessonIds} onNavigate={setScreen} onLesson={(lessonId) => goLesson(lessonId, "home")} audioEnabled={settings.audio} />}
      {screen === "learn" && <LearnScreen onLesson={(lessonId) => goLesson(lessonId, "learn")} onNavigate={setScreen} completedLessonIds={completedLessonIds} />}
      {screen === "tests" && <TestsScreen onTest={goTest} completedTestIds={completedTestIds} />}
      {screen === "challenges" && <ChallengesScreen onLesson={(lessonId) => goLesson(lessonId, "challenges")} onNavigate={setScreen} />}
      {screen === "vocabulary" && <VocabularyScreen audioEnabled={settings.audio} />}
      {screen === "grammar" && <GrammarScreen />}
      {screen === "practice" && <PracticeScreen audioEnabled={settings.audio} />}
      {screen === "progress" && <ProgressScreen user={displayProfile} />}
      {screen === "profile" && (
        <ProfileScreen
          darkMode={darkMode}
          setDarkMode={handleDark}
          user={displayProfile}
          settings={settings}
          onUserChange={patch => setProfile(current => ({ ...current, ...patch }))}
          onSettingsChange={patch => setSettings(current => ({ ...current, ...patch }))}
          onResetAllProgress={resetAllProgress}
        />
      )}
    </AppShell>
  );
}
