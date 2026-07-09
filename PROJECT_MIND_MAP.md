# StudySpanish Project Mind Map

## App Entry
- `src/main.tsx` mounts the Vite React app.
- `src/app/App.tsx` owns active screen state, lesson/test selection, profile/settings persistence, dark mode, and completion tracking.
- `src/styles/index.css` imports fonts, Tailwind, theme tokens, and global styles.

## Navigation Shell
- `src/app/components/layout/AppShell.tsx` renders the desktop sidebar, mobile bottom nav, learner summary, and main content frame.
- `src/app/types.ts` defines screen ids used by the app shell and screen routing.

## Curriculum And Mock Data
- `src/app/data/mockData.tsx` is the main content source: nav items, learner defaults, vocabulary, grammar topics, roadmap, lessons, tests, practice sessions, charts, and achievements.
- `learningRoadmap` controls the ordered Learn path.
- `lessonCatalog` controls guided lesson content and quiz questions.
- `testSessions` controls milestone tests.

## Screens
- `src/app/screens/HomeScreen.tsx` shows daily status and continue-learning entry points.
- `src/app/screens/LearnScreen.tsx` shows the course path and links into lessons, tests, vocabulary, grammar, and practice.
- `src/app/screens/LessonScreen.tsx` renders lesson notes, listen buttons, quiz questions, hearts, progress, and completion.
- `src/app/screens/TestSessionScreen.tsx` renders longer milestone tests.
- `src/app/screens/VocabularyScreen.tsx`, `GrammarScreen.tsx`, and `PracticeScreen.tsx` render focused study modes.
- `src/app/screens/ProgressScreen.tsx` and `ProfileScreen.tsx` handle learner stats and preferences.

## Shared UI
- `src/app/components/common/learning-ui.tsx` contains repeated learning widgets such as headers, badges, stat cards, rings, and XP bars.
- `src/app/components/ui/` contains shadcn/Radix-style primitives.
- `src/app/components/figma/ImageWithFallback.tsx` is a Figma export helper.

## Audio And Assets
- `src/app/audio.ts` wraps browser speech synthesis for Spanish listening.
- `src/app/avatars.ts` stores profile avatar choices.

## Product Source
- `src/imports/pasted_text/spanish-learning-app-design.md` preserves the original product/design brief.
