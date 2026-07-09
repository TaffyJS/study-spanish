# study-spanish

Study Spanish is a Vite, React, and TypeScript prototype for a friendly Spanish-learning app. It focuses on daily practice, lesson progression, vocabulary review, grammar topics, challenges, learner progress, and profile stats.

## Features

- Responsive single-page app with desktop sidebar navigation and mobile bottom navigation
- Home dashboard with learner summary, streaks, XP, progress, and daily actions
- Lesson flow with persisted completion state in localStorage
- Learn, practice, vocabulary, grammar, challenges, progress, and profile screens
- Static mock learning data for roadmap lessons, achievements, activity charts, and practice scenarios
- Warm Spanish-inspired design system using Tailwind CSS v4, shadcn/Radix-style UI primitives, lucide-react icons, and Recharts
- Light and dark mode support

## Tech Stack

- Vite
- React
- TypeScript
- Tailwind CSS v4
- Radix UI primitives
- lucide-react
- Recharts
- Vitest and Testing Library

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Run tests:

```bash
npm run test:run
```

## Project Structure

- `src/app/App.tsx` wires app state, screen selection, lesson mode, dark mode, and localStorage-backed progress.
- `src/app/screens/` contains the main product screens.
- `src/app/data/mockData.tsx` contains the prototype learning content and learner data.
- `src/app/components/layout/AppShell.tsx` contains desktop and mobile navigation.
- `src/app/components/common/learning-ui.tsx` contains shared learning UI components.
- `src/styles/` contains theme tokens, fonts, Tailwind imports, and global styles.

## Notes

The app currently uses static mock data and browser localStorage. The original product/design brief is preserved in `src/imports/pasted_text/spanish-learning-app-design.md`.
