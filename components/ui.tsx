import type { ReactNode } from "react";
import { Facebook, Instagram, Plug, Youtube } from "lucide-react";
import { brandById, type Platform } from "@/lib/mock";

export function cx(...c: (string | false | null | undefined)[]) {
  return c.filter(Boolean).join(" ");
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx("rounded-card border border-line bg-white", className)}>{children}</div>;
}

export function Button({
  children,
  variant = "outline",
  className,
  ...rest
}: { variant?: "primary" | "outline" | "soft" } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const look = {
    primary: "bg-brand text-white hover:bg-brand-hover border-transparent",
    outline: "bg-white text-ink border-line hover:bg-side",
    soft: "bg-brand-wash text-brand-text border-transparent hover:brightness-95",
  }[variant];
  return (
    <button
      {...rest}
      className={cx(
        "inline-flex items-center justify-center gap-2 rounded-[10px] border px-3.5 py-2 text-sm font-medium transition disabled:opacity-50",
        look,
        className,
      )}
    >
      {children}
    </button>
  );
}

export function PageHeader({ title, sub, children }: { title: string; sub?: ReactNode; children?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h1 className="text-[28px] font-semibold tracking-tight">{title}</h1>
        {sub && <div className="text-sm text-muted">{sub}</div>}
      </div>
      {children && <div className="flex flex-wrap items-center gap-2">{children}</div>}
    </div>
  );
}

/** A square tile with the brand's initial, standing in for its logo. */
export function BrandTile({ id, size = 36 }: { id: string; size?: number }) {
  const b = brandById(id);
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-[9px] font-semibold text-white"
      style={{ background: b.color, width: size, height: size, fontSize: size * 0.42 }}
    >
      {b.name[0]}
    </span>
  );
}

function TikTok({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 1 1-2.59-2.59c.27 0 .53.04.77.12V9.77a5.7 5.7 0 0 0-.77-.05A5.68 5.68 0 1 0 15.54 15.4V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3a4.28 4.28 0 0 1-3.24-1.48Z" />
    </svg>
  );
}

export function PlatformIcon({ p, size = 16 }: { p: Platform; size?: number }) {
  if (p === "tiktok") return <TikTok size={size} />;
  if (p === "instagram") return <Instagram size={size} className="text-[#E1306C]" />;
  if (p === "youtube") return <Youtube size={size} className="text-[#FF0000]" />;
  return <Facebook size={size} className="text-[#1877F2]" />;
}

/**
 * Marks a part of the page that only shows the look. The real version needs
 * its own hookup (an api, a worker, an extension), so the button does nothing.
 */
export function NotHooked({ what }: { what: string }) {
  return (
    <div className="flex items-start gap-2.5 rounded-xl border border-dashed border-[#D9C9F5] bg-[#FAF7FF] px-3.5 py-2.5 text-[13px] text-[#5B3FA0]">
      <Plug size={15} className="mt-0.5 shrink-0" />
      <span>
        <b className="font-semibold">look only.</b> {what}
      </span>
    </div>
  );
}

export function Dot({ color }: { color: string }) {
  return <span className="inline-block h-2 w-2 rounded-full" style={{ background: color }} />;
}

export function Stat({ label, value, sub, green }: { label: string; value: ReactNode; sub?: ReactNode; green?: boolean }) {
  return (
    <div>
      <div className="text-[13px] text-muted">{label}</div>
      <div className={cx("mt-1 text-[22px] font-semibold tracking-tight", green && "text-money")}>{value}</div>
      {sub && <div className="mt-0.5 text-xs text-muted">{sub}</div>}
    </div>
  );
}

export const money = (n: number) => "$" + n.toLocaleString("en-US");
