import { BookOpen, Flame, Globe, Moon, Star, Sun } from "lucide-react";
import type { ReactNode } from "react";
import type { Screen } from "../../types";
import { nav, type LearnerProfile } from "../../data/mockData";
import { XPBar } from "../common/learning-ui";

type AppShellProps = {
  activeNav: Screen;
  darkMode: boolean;
  user: LearnerProfile;
  onDarkModeChange: (value: boolean) => void;
  onNavigate: (screen: Screen) => void;
  children: ReactNode;
};

function formatCompactXp(xp: number) {
  return xp < 1000 ? xp.toLocaleString() : `${(xp / 1000).toFixed(1)}k`;
}

function Sidebar({ activeNav, darkMode, user, onDarkModeChange, onNavigate }: Omit<AppShellProps, "children">) {
  return (
    <aside className="hidden md:flex flex-col w-60 flex-shrink-0 bg-sidebar border-r border-sidebar-border h-full overflow-y-auto">
      <div className="px-5 py-6 flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-md shadow-primary/30">
          <Globe size={18} className="text-white" />
        </div>
        <div>
          <p className="font-extrabold text-foreground text-sm leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Español</p>
          <p className="text-xs text-muted-foreground leading-tight">Learning App</p>
        </div>
      </div>

      <div className="mx-3 mb-4 rounded-2xl bg-secondary p-3.5">
        <div className="flex items-center gap-2.5">
          <img src={user.avatar} alt="Avatar" className="w-9 h-9 rounded-xl object-cover bg-muted" />
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm text-foreground truncate">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.levelLabel}</p>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="text-xs font-bold text-primary flex items-center justify-center gap-0.5"><Flame size={11} />{user.streak}</p>
            <p className="text-[10px] text-muted-foreground">Streak</p>
          </div>
          <div>
            <p className="text-xs font-bold text-foreground">{user.level}</p>
            <p className="text-[10px] text-muted-foreground">Level</p>
          </div>
          <div>
            <p className="text-xs font-bold text-yellow-600 flex items-center justify-center gap-0.5"><Star size={11} />{formatCompactXp(user.xp)}</p>
            <p className="text-[10px] text-muted-foreground">XP</p>
          </div>
        </div>
        <div className="mt-2.5">
          <XPBar current={user.xp} max={user.nextLevelXp} />
        </div>
      </div>

      <nav className="px-3 flex-1 space-y-1">
        {nav.map(({ id, label, icon: Icon }) => {
          const active = activeNav === id;
          return (
            <button key={id} onClick={() => onNavigate(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${active ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm" : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"}`}>
              <Icon size={17} className={active ? "text-primary" : "text-muted-foreground"} />
              {label}
              {id === "challenges" && (
                <span className="ml-auto w-5 h-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">3</span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <button onClick={() => onDarkModeChange(!darkMode)}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors">
          {darkMode ? <Sun size={17} className="text-muted-foreground" /> : <Moon size={17} className="text-muted-foreground" />}
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </aside>
  );
}

function MobileNav({ activeNav, onNavigate }: Pick<AppShellProps, "activeNav" | "onNavigate">) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-md border-t border-border z-40 safe-area-bottom">
      <div className="flex items-center">
        {nav.map(({ id, label, icon: Icon }) => {
          const active = activeNav === id;
          return (
            <button key={id} onClick={() => onNavigate(id)}
              className={`flex-1 flex flex-col items-center gap-1 py-3 transition-all ${active ? "text-primary" : "text-muted-foreground"}`}>
              <div className={`relative ${active ? "scale-110" : ""} transition-transform`}>
                <Icon size={20} strokeWidth={active ? 2.5 : 1.8} />
                {id === "challenges" && <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-primary text-white text-[8px] flex items-center justify-center font-bold">3</span>}
              </div>
              <span className={`text-[9px] font-semibold ${active ? "text-primary" : ""}`}>{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export function AppShell({ activeNav, darkMode, user, onDarkModeChange, onNavigate, children }: AppShellProps) {
  return (
    <div className={`${darkMode ? "dark" : ""} flex h-screen overflow-hidden bg-background`} style={{ fontFamily: "'Nunito', sans-serif" }}>
      <Sidebar activeNav={activeNav} darkMode={darkMode} user={user} onDarkModeChange={onDarkModeChange} onNavigate={onNavigate} />
      <main className="flex-1 overflow-y-auto pb-20 md:pb-0 scrollbar-hide">
        {children}
      </main>
      <MobileNav activeNav={activeNav} onNavigate={onNavigate} />
    </div>
  );
}
