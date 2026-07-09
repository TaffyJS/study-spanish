import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { user } from "../data/mockData";
import { HomeScreen } from "./HomeScreen";

describe("HomeScreen", () => {
  it("continues with the first incomplete A1 lesson", () => {
    render(
      <HomeScreen
        user={{ ...user, name: "Tester" }}
        completedLessonIds={[1]}
        onNavigate={vi.fn()}
        onLesson={vi.fn()}
      />,
    );

    expect(screen.getByText("Numbers & Formation")).toBeInTheDocument();
    expect(screen.getByText(/Lesson 2 of 12/)).toBeInTheDocument();
  });
});
