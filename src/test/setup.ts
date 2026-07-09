import "@testing-library/jest-dom/vitest";

Object.defineProperty(window, "speechSynthesis", {
  configurable: true,
  value: {
    cancel: vi.fn(),
    getVoices: vi.fn(() => []),
    speak: vi.fn(),
  },
});
