import type { ElementType } from "react";

export function ProgressRing({ value, max, size = 80, stroke = 8, color = "#E8602C" }: { value: number; max: number; size?: number; stroke?: number; color?: string }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const fill = (value / max) * circ;
  return (
    <svg width={size} height={size} className="shrink-0 rotate-[-90deg]">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="currentColor" strokeWidth={stroke} className="text-muted" />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeDasharray={`${fill} ${circ}`} strokeLinecap="round" className="transition-all duration-700" />
    </svg>
  );
}

export function XPBar({ current, max }: { current: number; max: number }) {
  const pct = Math.min((current / max) * 100, 100);
  return (
    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
      <div className="h-2 rounded-full bg-gradient-to-r from-primary to-orange-400 transition-all duration-700" style={{ width: `${pct}%` }} />
    </div>
  );
}

export function Badge({ label }: { label: string }) {
  return <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-secondary text-secondary-foreground border border-border">{label}</span>;
}

export function PageHeader({ title, description }: { title: string; description: string }) {
  return (
    <div>
      <h1 className="text-2xl font-extrabold text-foreground mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{title}</h1>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
}

export function StatCard({ value, label, icon: Icon, color }: { value: string | number; label: string; icon: ElementType; color: string }) {
  return (
    <div className="bg-card rounded-2xl p-4 border border-border flex min-w-0 items-center gap-3 shadow-sm">
      <div className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center ${color}`}>
        <Icon size={18} />
      </div>
      <div className="min-w-0">
        <div className="truncate text-xl font-bold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{value}</div>
        <div className="text-xs leading-tight text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}
