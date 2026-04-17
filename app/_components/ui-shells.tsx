import { LogoIcon } from "./icons";

type BrowserFrameProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

export function BrowserFrame({ title, children, className = "" }: BrowserFrameProps) {
  return (
    <section
      className={`overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.12)] ${className}`}
      aria-label={title}
    >
      <div className="flex h-10 items-center justify-between border-b border-slate-100 bg-slate-50 px-4">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
        </div>
        <p className="text-xs font-semibold text-slate-500">{title}</p>
      </div>
      {children}
    </section>
  );
}

type PhoneFrameProps = {
  title: string;
  children: React.ReactNode;
  dark?: boolean;
};

export function PhoneFrame({ title, children, dark = false }: PhoneFrameProps) {
  return (
    <section className="mx-auto w-full max-w-[280px]" aria-label={title}>
      <div className="rounded-[28px] border-[8px] border-slate-950 bg-slate-950 shadow-[0_24px_60px_rgba(15,23,42,0.28)]">
        <div
          className={`relative min-h-[560px] overflow-hidden rounded-[20px] ${
            dark ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-950"
          }`}
        >
          <div className="absolute left-1/2 top-0 z-20 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-slate-950" />
          <div className="flex h-8 items-end justify-between px-5 pb-1 text-[10px] font-bold">
            <span>9:41</span>
            <span>5G 100%</span>
          </div>
          {children}
        </div>
      </div>
    </section>
  );
}

export function BrandMark({ compact = false, label = "SportsBook" }: { compact?: boolean; label?: string }) {
  return (
    <div className="flex items-center gap-2 font-black text-slate-950">
      <LogoIcon className="h-8 w-8 text-emerald-600" />
      {!compact && <span>{label}</span>}
    </div>
  );
}
