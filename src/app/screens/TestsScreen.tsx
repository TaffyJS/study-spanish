import { useState } from "react";
import { CheckCircle2, ClipboardList, Clock, Play, Trophy } from "lucide-react";
import { testSessions } from "../data/mockData";
import { PageHeader } from "../components/common/learning-ui";

export function TestsScreen({ onTest, completedTestIds = [] }: { onTest: (testId: string) => void; completedTestIds?: string[] }) {
  const [activeLevel, setActiveLevel] = useState<"A1" | "A2" | "B1">("A1");
  const completedTests = new Set(completedTestIds);
  const visibleTests = testSessions.filter(test => test.level === activeLevel);
  const completedInLevel = visibleTests.filter(test => completedTests.has(test.id)).length;

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto space-y-5">
      <PageHeader title="Tests" description="Longer checkpoint sessions for when you are ready to prove a level" />

      <div className="flex gap-2 flex-wrap">
        {(["A1", "A2", "B1"] as const).map((lv) => (
          <button key={lv} onClick={() => setActiveLevel(lv)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeLevel === lv ? "bg-primary text-white shadow-md shadow-primary/30" : "bg-card border border-border text-muted-foreground hover:border-primary/50 hover:text-primary"}`}>
            {lv}
          </button>
        ))}
      </div>

      <div className="rounded-2xl p-5 bg-gradient-to-r from-amber-500 to-orange-600 text-white">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-extrabold text-lg mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{activeLevel} Assessment Track</h2>
            <p className="text-white/80 text-sm mb-3">Tests are separate from lessons and include longer mixed sections.</p>
          </div>
          <div className="rounded-2xl bg-white/15 p-3">
            <Trophy size={24} />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-white/20 rounded-full h-2">
            <div className="h-full rounded-full bg-white transition-all" style={{ width: `${visibleTests.length ? (completedInLevel / visibleTests.length) * 100 : 0}%` }} />
          </div>
          <span className="text-white/80 text-sm">{completedInLevel}/{visibleTests.length}</span>
        </div>
      </div>

      <div className="space-y-3">
        {visibleTests.map((test) => {
            const done = completedTests.has(test.id);
            return (
              <button key={test.id} onClick={() => onTest(test.id)}
                className={`w-full text-left rounded-2xl p-4 border transition-all shadow-sm ${
                  done ? "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800" : "bg-card border-border hover:border-primary/30 hover:shadow-md"
                }`}>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs bg-yellow-200 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-0.5 rounded-full font-bold">Milestone Test</span>
                      {done && <span className="text-xs bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 px-2 py-0.5 rounded-full font-bold">Passed</span>}
                    </div>
                    <h3 className="font-extrabold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{test.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{test.summary}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs font-bold text-muted-foreground">
                        <Clock size={12} /> {test.duration}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs font-bold text-muted-foreground">
                        <ClipboardList size={12} /> {test.questions.length} questions
                      </span>
                      <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-bold text-muted-foreground">Pass {test.passingScore}%</span>
                    </div>
                  </div>
                  {done ? <CheckCircle2 size={18} className="text-green-500" /> :
                   <div className="bg-primary text-white text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1 self-start"><Play size={11} className="ml-0.5" />Start Test</div>}
                </div>
              </button>
            );
          })}
      </div>
    </div>
  );
}
