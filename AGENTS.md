# Agent Notes

## Project Shape

- Vite + React + TypeScript single-page prototype for a Spanish-learning app.
- `src/app/App.tsx` is now a thin application orchestrator; screens, mock data, layout, and shared UI live in dedicated folders.
- Entry point is `src/main.tsx`, which imports `src/styles/index.css`.
- Original product/design brief is preserved in `src/imports/pasted_text/spanish-learning-app-design.md`; use it as the source of truth for intended screens and features.
- This folder is not currently a git repository.

## Commands

- Install dependencies: `npm install`
- Start dev server: `npm run dev`
- Build production bundle: `npm run build`
- There is no test or lint script defined in `package.json` yet.

## Main Files

- `src/app/App.tsx`: top-level screen state, lesson mode, dark mode wiring, and screen selection.
- `src/app/types.ts`: app-level screen/navigation types.
- `src/app/data/mockData.tsx`: static learner data, navigation config, roadmap, challenges, vocabulary, grammar, practice, chart, and achievement data.
- `src/app/screens/`: one file per major product screen.
- `src/app/components/common/learning-ui.tsx`: repeated learning UI helpers such as progress rings, XP bars, badges, and stat cards.
- `src/app/components/layout/AppShell.tsx`: desktop sidebar, mobile bottom nav, app shell, and learner summary.
- `src/app/components/ui/`: shadcn/Radix-style UI primitives generated with the bundle. Prefer reusing these when extracting or adding components.
- `src/app/components/figma/ImageWithFallback.tsx`: helper component from the Figma export.
- `src/styles/theme.css`: CSS variables, Tailwind v4 theme mapping, light/dark color tokens, base typography.
- `src/styles/tailwind.css`: Tailwind v4 imports and source scanning.
- `src/styles/fonts.css`: Google font imports for Plus Jakarta Sans and Nunito.
- `vite.config.ts`: Vite config, `@` alias to `src`, Tailwind plugin, React plugin, and Figma asset resolver. Keep the Make/Tailwind comments in mind before removing plugins.

## App Navigation

`src/app/types.ts` defines `type Screen = "home" | "learn" | "lesson" | "challenges" | "vocabulary" | "grammar" | "practice" | "progress" | "profile"`.

Screen components currently live in `src/app/screens/`:

- `HomeScreen`
- `LearnScreen`
- `LessonScreen`
- `ChallengesScreen`
- `VocabularyScreen`
- `GrammarScreen`
- `PracticeScreen`
- `ProgressScreen`
- `ProfileScreen`

Desktop uses a left sidebar. Mobile uses a fixed bottom nav. Lesson mode hides the app shell and renders `LessonScreen` directly.

## Current Implementation Notes

- Data is static mock data in `src/app/data/mockData.tsx`: user profile, daily challenges, vocabulary words, grammar topics, roadmap, practice scenarios, activity chart data, achievements.
- Charts use `recharts`.
- Icons use `lucide-react`; keep using it for new app icons.
- Dark mode is local React state plus toggling the `dark` class on `document.documentElement`.
- Lesson completion is tracked in `App.tsx` and persisted in localStorage as `studySpanish.completedLessons`; study-day streak activity is persisted as `studySpanish.studyDates`. `LearnScreen`, `TestsScreen`, and `HomeScreen` receive progress from the app shell.
- Some achievement values in `App.tsx` use emoji. Keep consistency unless replacing the badge system.
- `ProgressScreen` uses `Math.random()` for the streak calendar, so it changes on every render.
- `node_modules` may be absent in a fresh workspace.

## Design Direction

- Warm Spanish/Latin America inspired palette: primary coral/orange, accent yellow, supporting blue/green/purple.
- Visual language: friendly but not childish, rounded cards, subtle shadows, progress indicators, micro-interactions.
- Preserve responsive behavior for desktop, tablet, and mobile.
- Keep the main learner action visually prominent, especially “Continue Learning.”
- Avoid placeholder lesson copy; use realistic Spanish examples and translations.

## When Making Changes

- Prefer small component extraction only when it makes the screen files easier to work with.
- Preserve Tailwind v4 style conventions and existing CSS variables from `theme.css`.
- Reuse existing arrays/types for mock UI before introducing new state models.
- Check mobile layout after substantial UI changes because bottom navigation is always fixed.
- If adding real routing or persistence later, document the new data/navigation boundary here.
