import { useState } from "react";
import { Bookmark, CheckCircle2, Search, Volume2 } from "lucide-react";
import { speakSpanish } from "../audio";
import { vocabTopics, vocabWords } from "../data/mockData";
import { PageHeader, XPBar } from "../components/common/learning-ui";

export function VocabularyScreen({ audioEnabled = true }: { audioEnabled?: boolean }) {
  const [search, setSearch] = useState("");
  const [topic, setTopic] = useState("All");
  const [tab, setTab] = useState<"all" | "learned" | "unlearned" | "saved">("all");
  const [saved, setSaved] = useState<Set<string>>(new Set(vocabWords.filter(w => w.saved).map(w => w.word)));
  const [known, setKnown] = useState<Set<string>>(new Set(vocabWords.filter(w => w.known).map(w => w.word)));
  const learnedCount = known.size;
  const savedCount = saved.size;
  const topicCounts = vocabWords.reduce<Record<string, number>>((counts, word) => {
    counts[word.topic] = (counts[word.topic] ?? 0) + 1;
    return counts;
  }, {});

  const filtered = vocabWords.filter(w => {
    const matchSearch = w.word.toLowerCase().includes(search.toLowerCase()) || w.translation.toLowerCase().includes(search.toLowerCase());
    const matchTopic = topic === "All" || w.topic === topic;
    const matchTab = tab === "all" || (tab === "learned" && known.has(w.word)) || (tab === "unlearned" && !known.has(w.word)) || (tab === "saved" && saved.has(w.word));
    return matchSearch && matchTopic && matchTab;
  });

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-5">
      <PageHeader title="Vocabulary Library" description={`${learnedCount} of ${vocabWords.length} available words learned`} />

      {/* Overall Progress */}
      <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between gap-3 mb-2">
          <span className="font-semibold text-sm text-foreground">Overall Progress</span>
          <span className="text-sm font-bold text-primary">{learnedCount} / {vocabWords.length}</span>
        </div>
        <XPBar current={learnedCount} max={vocabWords.length} />
        <div className="grid grid-cols-3 gap-2 mt-3 sm:flex sm:gap-4">
          {[
            { label: "Learned", count: learnedCount, color: "text-green-600" },
            { label: "Saved", count: savedCount, color: "text-yellow-600" },
            { label: "Practicing", count: vocabWords.length - learnedCount, color: "text-orange-600" },
          ].map(s => (
            <div key={s.label} className="text-center">
              <p className={`font-bold text-lg ${s.color}`}>{s.count}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search words..."
          className="w-full pl-10 pr-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" />
      </div>

      {/* Topic Filter */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {vocabTopics.map(t => (
          <button key={t} onClick={() => setTopic(t)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${topic === t ? "bg-primary text-white shadow-sm" : "bg-card border border-border text-muted-foreground hover:border-primary/50"}`}>
            {t}{t !== "All" && topicCounts[t] ? ` (${topicCounts[t]})` : ""}
          </button>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-muted rounded-xl p-1">
        {(["all", "learned", "unlearned", "saved"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`flex-1 py-2 rounded-lg text-xs font-semibold capitalize transition-all ${tab === t ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
            {t}
          </button>
        ))}
      </div>

      {/* Word Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filtered.map((w) => (
          <div key={w.word} className={`bg-card border rounded-2xl p-4 shadow-sm transition-all hover:shadow-md ${known.has(w.word) ? "border-green-100 dark:border-green-900" : "border-border"}`}>
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-extrabold text-foreground text-lg" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{w.word}</h3>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{w.pos}</span>
                  {known.has(w.word) && <span className="text-xs text-green-600 bg-green-50 dark:bg-green-950 px-2 py-0.5 rounded-full font-semibold">Known</span>}
                </div>
                <p className="text-primary font-semibold mt-0.5">{w.translation}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{w.phonetic}</p>
              </div>
              <div className="flex gap-1.5">
                <button onClick={() => speakSpanish(w.word, audioEnabled)} disabled={!audioEnabled}
                  className={`p-2 rounded-lg transition-colors ${audioEnabled ? "hover:bg-muted text-muted-foreground hover:text-primary" : "text-muted-foreground/40 cursor-not-allowed"}`}
                  aria-label={audioEnabled ? `Hear ${w.word}` : "Audio is off"}>
                  <Volume2 size={15} />
                </button>
                <button onClick={() => setSaved(s => { const n = new Set(s); n.has(w.word) ? n.delete(w.word) : n.add(w.word); return n; })}
                  className={`p-2 rounded-lg transition-colors ${saved.has(w.word) ? "text-primary bg-secondary" : "hover:bg-muted text-muted-foreground hover:text-primary"}`}>
                  <Bookmark size={15} fill={saved.has(w.word) ? "currentColor" : "none"} />
                </button>
              </div>
            </div>
            <div className="mt-3 bg-muted/50 rounded-xl p-3">
              <p className="text-xs text-foreground italic">"{w.sentence}"</p>
              <p className="text-xs text-muted-foreground mt-1">"{w.sentenceTrans}"</p>
            </div>
            <div className="mt-3 flex items-center justify-between gap-3">
              <span className="text-xs text-muted-foreground">{w.topic}</span>
              <button onClick={() => setKnown(current => {
                const next = new Set(current);
                next.has(w.word) ? next.delete(w.word) : next.add(w.word);
                return next;
              })}
                className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-colors ${known.has(w.word) ? "bg-green-50 dark:bg-green-950 text-green-600" : "bg-secondary text-primary hover:bg-primary/10"}`}>
                <CheckCircle2 size={14} />
                {known.has(w.word) ? "Learned" : "Mark learned"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <Search size={40} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No words found. Try a different search.</p>
        </div>
      )}
    </div>
  );
}
