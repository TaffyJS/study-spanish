import { describe, expect, it } from "vitest";
import { getLessonContent, learningRoadmap, lessonCatalog } from "./mockData";

describe("beginner curriculum", () => {
  it("has real study content for every non-test A1 roadmap lesson", () => {
    const lessons = learningRoadmap.A1.lessons.filter(lesson => !lesson.isTest);

    expect(lessons.length).toBeGreaterThan(0);
    expect(lessons.every(lesson => lesson.id in lessonCatalog)).toBe(true);

    for (const lesson of lessons) {
      const content = getLessonContent(lesson.id);

      expect(content.summary).not.toContain("Practice a focused set");
      expect(content.studySections?.length).toBeGreaterThan(0);
      expect(content.questions.length).toBeGreaterThan(0);
    }
  });

  it("covers alphabet, numbers, pronouns, and possession foundations", () => {
    expect(getLessonContent(1).studySections?.[0].items.map(item => item.label)).toEqual(
      expect.arrayContaining(["A", "B", "C", "Ñ", "Z"]),
    );
    expect(getLessonContent(2).summary).toContain("veinti-");
    expect(getLessonContent(3).words).toEqual(expect.arrayContaining(["yo", "tu", "ella", "nosotros"]));
    expect(getLessonContent(6).studySections?.flatMap(section => section.items.map(item => item.spanish))).toEqual(
      expect.arrayContaining(["su coche", "este coche es suyo"]),
    );
  });
});
