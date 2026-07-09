import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { user, type LearnerSettings } from "../data/mockData";
import { ProfileScreen } from "./ProfileScreen";

const settings: LearnerSettings = {
  dailyStudyGoal: 15,
  dailyWordGoal: 10,
  spanishRegion: "Latin American",
  learningGoal: "General Fluency",
  audio: true,
  accessibility: "Standard",
};

describe("ProfileScreen", () => {
  it("calls the app reset handler after RESET confirmation", async () => {
    const resetAllProgress = vi.fn();
    const tester = userEvent.setup();

    render(
      <ProfileScreen
        darkMode={false}
        setDarkMode={vi.fn()}
        user={{ ...user, name: "Tester", xp: 300, wordsLearned: 20, lessonsCompleted: 2 }}
        settings={settings}
        onUserChange={vi.fn()}
        onSettingsChange={vi.fn()}
        onResetAllProgress={resetAllProgress}
      />,
    );

    await tester.click(screen.getByRole("button", { name: "Reset All Progress" }));
    await tester.type(screen.getByPlaceholderText("Type RESET here"), "RESET");
    await tester.click(screen.getByRole("button", { name: "Reset" }));

    expect(resetAllProgress).toHaveBeenCalledTimes(1);
    expect(screen.getByText("Progress Reset")).toBeInTheDocument();
  });
});
