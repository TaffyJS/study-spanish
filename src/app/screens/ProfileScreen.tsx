import { useState } from "react";
import { AlertTriangle, Award, Bell, ChevronRight, Flame, LogOut, Moon, Pencil, Settings, Sun, Volume2, X } from "lucide-react";
import type { LearnerProfile, LearnerSettings } from "../data/mockData";
import { Badge } from "../components/common/learning-ui";

type ProfileScreenProps = {
  darkMode: boolean;
  setDarkMode: (v: boolean) => void;
  user: LearnerProfile;
  settings: LearnerSettings;
  onUserChange: (patch: Partial<LearnerProfile>) => void;
  onSettingsChange: (patch: Partial<LearnerSettings>) => void;
  onResetAllProgress: () => void;
};

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button onClick={onChange} className={`w-11 h-6 rounded-full transition-all relative ${checked ? "bg-primary" : "bg-muted"}`}>
      <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${checked ? "translate-x-5" : ""}`} />
    </button>
  );
}

function SelectControl<T extends string>({ value, options, onChange }: { value: T; options: T[]; onChange: (value: T) => void }) {
  return (
    <select value={value} onChange={event => onChange(event.target.value as T)}
      className="rounded-xl border border-border bg-input-background px-3 py-2 text-sm font-semibold text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20">
      {options.map(option => <option key={option} value={option}>{option}</option>)}
    </select>
  );
}

function Stepper({ value, suffix, min, max, step, onChange }: { value: number; suffix: string; min: number; max: number; step: number; onChange: (value: number) => void }) {
  const set = (next: number) => onChange(Math.min(max, Math.max(min, next)));
  return (
    <div className="flex items-center gap-2">
      <button onClick={() => set(value - step)} className="w-8 h-8 rounded-lg bg-muted text-foreground font-bold hover:bg-secondary">-</button>
      <div className="min-w-24 text-center">
        <p className="text-sm font-bold text-foreground">{value}</p>
        <p className="text-[10px] text-muted-foreground">{suffix}</p>
      </div>
      <button onClick={() => set(value + step)} className="w-8 h-8 rounded-lg bg-muted text-foreground font-bold hover:bg-secondary">+</button>
    </div>
  );
}

export function ProfileScreen({ darkMode, setDarkMode, user, settings, onUserChange, onSettingsChange, onResetAllProgress }: ProfileScreenProps) {
  const [showReset, setShowReset] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [resetInput, setResetInput] = useState("");
  const [notifs, setNotifs] = useState({ daily: true, vocab: true, streak: true, weekly: false });
  const [resetConfirmed, setResetConfirmed] = useState(false);
  const [draftName, setDraftName] = useState(user.name);
  const [draftUsername, setDraftUsername] = useState(user.username);

  const openEdit = () => {
    setDraftName(user.name);
    setDraftUsername(user.username);
    setShowEdit(true);
  };

  const saveEdit = () => {
    const name = draftName.trim();
    const username = draftUsername.trim().replace(/^@/, "");
    if (!name || !username) return;
    onUserChange({ name, username });
    setShowEdit(false);
  };

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-5">
      <div className="bg-card border border-border rounded-3xl p-6 shadow-sm flex items-center gap-5">
        <img src={user.avatar} alt="Profile" className="w-20 h-20 rounded-2xl object-cover bg-muted" />
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-extrabold text-foreground truncate" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{user.name}</h1>
          <p className="text-muted-foreground text-sm truncate">@{user.username}</p>
          <div className="flex items-center gap-3 mt-2 flex-wrap">
            <Badge label={`Level ${user.level}`} />
            <Badge label={user.levelLabel} />
            <div className="flex items-center gap-1 text-xs text-orange-600 font-semibold"><Flame size={13} />{user.streak} day streak</div>
          </div>
        </div>
        <button onClick={openEdit} className="p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground" aria-label="Edit profile"><Pencil size={16} /></button>
      </div>

      <div className="grid grid-cols-3 gap-3 text-center">
        {[["XP", user.xp.toLocaleString()], ["Words", user.wordsLearned], ["Lessons", user.lessonsCompleted]].map(([l, v]) => (
          <div key={String(l)} className="bg-card border border-border rounded-2xl p-4 shadow-sm">
            <p className="text-xl font-extrabold text-foreground">{v}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{l}</p>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="font-bold text-foreground text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Learning Preferences</h2>
        </div>
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-border">
          <span className="text-sm text-foreground">Daily Study Goal</span>
          <Stepper value={settings.dailyStudyGoal} suffix="minutes" min={5} max={120} step={5} onChange={value => onSettingsChange({ dailyStudyGoal: value })} />
        </div>
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-border">
          <span className="text-sm text-foreground">Daily Word Goal</span>
          <Stepper value={settings.dailyWordGoal} suffix="words" min={1} max={100} step={1} onChange={value => onSettingsChange({ dailyWordGoal: value })} />
        </div>
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-border">
          <span className="text-sm text-foreground">Spanish Region</span>
          <SelectControl value={settings.spanishRegion} options={["Latin American", "Spain", "Mixed"]} onChange={value => onSettingsChange({ spanishRegion: value })} />
        </div>
        <div className="flex items-center justify-between gap-3 px-5 py-4">
          <span className="text-sm text-foreground">Learning Goal</span>
          <SelectControl value={settings.learningGoal} options={["General Fluency", "Travel", "Work", "School", "Conversation"]} onChange={value => onSettingsChange({ learningGoal: value })} />
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="font-bold text-foreground text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>App Settings</h2>
        </div>
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-3">
            {darkMode ? <Moon size={16} className="text-muted-foreground" /> : <Sun size={16} className="text-muted-foreground" />}
            <span className="text-sm text-foreground">Dark Mode</span>
          </div>
          <Toggle checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
        </div>
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-3">
            <Volume2 size={16} className="text-muted-foreground" />
            <span className="text-sm text-foreground">Audio</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">{settings.audio ? "On" : "Off"}</span>
            <Toggle checked={settings.audio} onChange={() => onSettingsChange({ audio: !settings.audio })} />
          </div>
        </div>
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-border">
          <div className="flex items-center gap-3">
            <Settings size={16} className="text-muted-foreground" />
            <span className="text-sm text-foreground">Accessibility</span>
          </div>
          <SelectControl value={settings.accessibility} options={["Standard", "Large Text", "High Contrast"]} onChange={value => onSettingsChange({ accessibility: value })} />
        </div>
        <button onClick={() => setShowPrivacy(true)} className="w-full flex items-center justify-between px-5 py-4 hover:bg-muted/30 transition-colors text-left">
          <div className="flex items-center gap-3">
            <Settings size={16} className="text-muted-foreground" />
            <span className="text-sm text-foreground">Privacy</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Manage</span>
            <ChevronRight size={14} className="text-muted-foreground" />
          </div>
        </button>
      </div>

      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="font-bold text-foreground text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Notifications</h2>
        </div>
        {[
          { key: "daily" as const, label: "Daily Reminders" },
          { key: "vocab" as const, label: "Vocabulary Exam Ready" },
          { key: "streak" as const, label: "Streak at Risk" },
          { key: "weekly" as const, label: "Weekly Progress Report" },
        ].map(({ key, label }) => (
          <div key={key} className="flex items-center justify-between px-5 py-4 border-b border-border last:border-0">
            <div className="flex items-center gap-3">
              <Bell size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground">{label}</span>
            </div>
            <Toggle checked={notifs[key]} onChange={() => setNotifs(n => ({ ...n, [key]: !n[key] }))} />
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
        <button className="w-full flex items-center gap-3 px-5 py-4 hover:bg-muted/30 transition-colors border-b border-border text-left">
          <Award size={16} className="text-muted-foreground" />
          <span className="text-sm text-foreground">Download My Data</span>
          <ChevronRight size={14} className="text-muted-foreground ml-auto" />
        </button>
        <button className="w-full flex items-center gap-3 px-5 py-4 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors text-left text-red-600">
          <LogOut size={16} />
          <span className="text-sm font-semibold">Log Out</span>
        </button>
      </div>

      <div className="border-2 border-dashed border-red-200 dark:border-red-900 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle size={16} className="text-red-500" />
          <h2 className="font-bold text-red-500 text-sm">Danger Zone</h2>
        </div>
        <p className="text-xs text-muted-foreground mb-4">These actions are irreversible. Proceed with caution.</p>
        <div className="space-y-2">
          {["Reset Vocabulary Progress", "Reset Grammar Progress", "Reset Streak Only", "Restart Placement Level"].map(opt => (
            <button key={opt} className="w-full text-left text-sm text-red-600 hover:text-red-700 py-1.5 flex items-center justify-between group hover:bg-red-50 dark:hover:bg-red-950/30 px-3 rounded-lg transition-colors">
              {opt} <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
          <button onClick={() => setShowReset(true)}
            className="w-full mt-2 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold text-sm transition-colors shadow-sm">
            Reset All Progress
          </button>
        </div>
      </div>

      {showEdit && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowEdit(false)}>
          <div className="bg-card rounded-3xl p-6 max-w-sm w-full shadow-2xl" onClick={event => event.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-extrabold text-foreground text-lg" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Edit Profile</h2>
              <button onClick={() => setShowEdit(false)} className="text-muted-foreground hover:text-foreground"><X size={20} /></button>
            </div>
            <label className="block text-sm text-foreground mb-1">Name</label>
            <input value={draftName} onChange={event => setDraftName(event.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-input-background border border-border text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 mb-4" />
            <label className="block text-sm text-foreground mb-1">Username</label>
            <input value={draftUsername} onChange={event => setDraftUsername(event.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-input-background border border-border text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 mb-5" />
            <button onClick={saveEdit} disabled={!draftName.trim() || !draftUsername.trim()}
              className="w-full py-3 rounded-xl bg-primary text-white font-bold hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">Save Profile</button>
          </div>
        </div>
      )}

      {showPrivacy && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowPrivacy(false)}>
          <div className="bg-card rounded-3xl p-6 max-w-sm w-full shadow-2xl" onClick={event => event.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-extrabold text-foreground text-lg" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Privacy</h2>
              <button onClick={() => setShowPrivacy(false)} className="text-muted-foreground hover:text-foreground"><X size={20} /></button>
            </div>
            <div className="space-y-3 text-sm">
              <div className="rounded-2xl bg-secondary p-4">
                <p className="font-bold text-foreground">Local profile</p>
                <p className="text-muted-foreground mt-1">Your name and preferences are saved in this browser only.</p>
              </div>
              <div className="rounded-2xl bg-muted/50 p-4">
                <p className="font-bold text-foreground">Audio setting</p>
                <p className="text-muted-foreground mt-1">Pronunciation audio is currently {settings.audio ? "on" : "off"}.</p>
              </div>
            </div>
            <button onClick={() => setShowPrivacy(false)} className="mt-5 w-full py-3 rounded-xl bg-primary text-white font-bold hover:bg-orange-600 transition-colors">Done</button>
          </div>
        </div>
      )}

      {showReset && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => { setShowReset(false); setResetInput(""); setResetConfirmed(false); }}>
          <div className="bg-card rounded-3xl p-6 max-w-sm w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            {resetConfirmed ? (
              <div className="text-center py-4">
                <div className="text-5xl mb-3">✅</div>
                <h2 className="font-extrabold text-foreground text-xl mb-2">Progress Reset</h2>
                <p className="text-muted-foreground text-sm mb-5">Your learning progress has been reset. Start fresh!</p>
                <button onClick={() => { setShowReset(false); setResetInput(""); setResetConfirmed(false); }}
                  className="w-full py-3 rounded-xl bg-primary text-white font-bold hover:bg-orange-600 transition-colors">OK</button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-extrabold text-foreground text-lg" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Reset All Progress?</h2>
                  <button onClick={() => { setShowReset(false); setResetInput(""); }} className="text-muted-foreground hover:text-foreground"><X size={20} /></button>
                </div>
                <div className="bg-red-50 dark:bg-red-950/50 rounded-2xl p-4 mb-4 border border-red-200 dark:border-red-800">
                  <p className="text-sm text-red-700 dark:text-red-400 font-medium">This will permanently delete:</p>
                  <ul className="text-xs text-red-600 dark:text-red-400 mt-2 space-y-1 list-disc list-inside">
                    <li>All lesson progress</li>
                    <li>Vocabulary learning data</li>
                    <li>Grammar progress</li>
                    <li>Streak history & achievements</li>
                    <li>XP and level</li>
                  </ul>
                </div>
                <p className="text-sm text-muted-foreground mb-3">Type <strong className="text-foreground">RESET</strong> to confirm:</p>
                <input value={resetInput} onChange={e => setResetInput(e.target.value)} placeholder="Type RESET here"
                  className="w-full px-4 py-3 rounded-xl bg-input-background border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/20 mb-4 transition-all" />
                <div className="flex gap-3">
                  <button onClick={() => { setShowReset(false); setResetInput(""); }}
                    className="flex-1 py-3 rounded-xl bg-muted text-foreground font-semibold hover:bg-muted/80 transition-colors text-sm">Cancel</button>
                  <button
                    onClick={() => {
                      if (resetInput !== "RESET") return;
                      onResetAllProgress();
                      setResetConfirmed(true);
                    }}
                    disabled={resetInput !== "RESET"}
                    className="flex-1 py-3 rounded-xl bg-red-500 text-white font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-red-600 transition-colors text-sm shadow-sm">
                    Reset
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
