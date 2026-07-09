import { useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Flame } from "lucide-react";
import { allAchievements, monthlyData, skillData, type LearnerProfile, weeklyData } from "../data/mockData";
import { PageHeader } from "../components/common/learning-ui";

export function ProgressScreen({ user }: { user: LearnerProfile }) {
  const [period, setPeriod] = useState<"week" | "month">("week");
  const chartData = period === "week" ? weeklyData : monthlyData;
  const xKey = period === "week" ? "day" : "week";

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-5">
      <PageHeader title="Your Progress" description="Track your learning journey" />

      {/* Key Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Day Streak", value: `${user.streak}🔥`, sub: `Best: 31 days`, color: "bg-orange-100 dark:bg-orange-950 text-orange-600" },
          { label: "Total XP", value: user.xp.toLocaleString(), sub: "Points earned", color: "bg-yellow-100 dark:bg-yellow-950 text-yellow-600" },
          { label: "Days Studied", value: "47", sub: "Out of 60", color: "bg-blue-100 dark:bg-blue-950 text-blue-600" },
          { label: "Words Mastered", value: "420", sub: `of ${user.totalWords}`, color: "bg-green-100 dark:bg-green-950 text-green-600" },
        ].map(s => (
          <div key={s.label} className="bg-card border border-border rounded-2xl p-4 shadow-sm">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 text-xs font-bold ${s.color}`} />
            <p className="text-2xl font-extrabold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{s.value}</p>
            <p className="text-xs font-semibold text-foreground mt-0.5">{s.label}</p>
            <p className="text-xs text-muted-foreground">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Activity Chart */}
      <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>XP Activity</h2>
          <div className="flex gap-1 bg-muted rounded-lg p-1">
            {(["week", "month"] as const).map(p => (
              <button key={p} onClick={() => setPeriod(p)}
                className={`px-3 py-1 rounded-md text-xs font-semibold capitalize transition-all ${period === p ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}>
                {p}
              </button>
            ))}
          </div>
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="xpGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#E8602C" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#E8602C" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey={xKey} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", fontSize: "12px" }} />
              <Area type="monotone" dataKey="xp" stroke="#E8602C" strokeWidth={2.5} fill="url(#xpGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Skills */}
      <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
        <h2 className="font-bold text-foreground mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Skill Breakdown</h2>
        <div className="space-y-3">
          {skillData.map(s => (
            <div key={s.skill} className="flex items-center gap-3">
              <span className="w-20 text-sm text-muted-foreground flex-shrink-0">{s.skill}</span>
              <div className="flex-1 bg-muted rounded-full h-2.5 overflow-hidden">
                <div className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${s.score}%`, background: s.score >= 70 ? "#16A34A" : s.score >= 50 ? "#E8602C" : "#FABC2A" }} />
              </div>
              <span className="w-9 text-right text-sm font-bold text-foreground">{s.score}%</span>
            </div>
          ))}
        </div>
        <div className="flex gap-3 mt-4">
          {[["Strong", "#16A34A"], ["Building", "#E8602C"], ["Focus Here", "#FABC2A"]].map(([l, c]) => (
            <div key={l} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: c as string }} />
              <span className="text-xs text-muted-foreground">{l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div>
        <h2 className="font-bold text-foreground mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Achievements</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {allAchievements.map(a => (
            <div key={a.label} className={`bg-card border rounded-2xl p-4 shadow-sm transition-all ${a.earned ? "border-border" : "border-dashed border-border opacity-50"}`}>
              <div className="text-3xl mb-2" style={{ filter: a.earned ? "none" : "grayscale(100%)" }}>{a.icon}</div>
              <p className="font-bold text-sm text-foreground">{a.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{a.desc}</p>
              <p className={`text-xs font-semibold mt-2 ${a.earned ? "text-primary" : "text-muted-foreground"}`}>+{a.xp} XP</p>
            </div>
          ))}
        </div>
      </div>

      {/* Streak Calendar */}
      <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Flame size={18} className="text-orange-500" />
          <h2 className="font-bold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Streak Calendar</h2>
        </div>
        <div className="grid grid-cols-7 gap-1.5">
          {Array.from({ length: 28 }).map((_, i) => {
            const active = Math.random() > 0.25;
            return (
              <div key={i} className={`aspect-square rounded-lg transition-all ${active ? "bg-primary/80 shadow-sm" : "bg-muted"}`} title={active ? "Studied" : "Missed"} />
            );
          })}
        </div>
        <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
          <span>4 weeks ago</span>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded bg-muted" /><span>None</span>
            <div className="w-2.5 h-2.5 rounded bg-primary/80 ml-2" /><span>Studied</span>
          </div>
          <span>Today</span>
        </div>
      </div>
    </div>
  );
}
