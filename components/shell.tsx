"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import {
  AtSign,
  CalendarCheck,
  ChevronDown,
  ChevronRight,
  CircleUser,
  Clapperboard,
  Flame,
  Home,
  Layers,
  Lightbulb,
  Megaphone,
  Menu,
  Mic,
  PenTool,
  Search,
  Timer,
  Video,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";
import { user } from "@/lib/mock";
import { cx } from "./ui";

type Item = { href: string; label: string; icon: LucideIcon; tint?: string };

const top: Item[] = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/campaigns", label: "Campaigns", icon: Megaphone },
];

const create: Item[] = [
  { href: "/ideation", label: "Ideation", icon: Lightbulb, tint: "#CA8A04" },
  { href: "/film", label: "Film", icon: Video, tint: "#DC2626" },
  { href: "/editing", label: "Editing", icon: Clapperboard, tint: "#7C3AED" },
  { href: "/scheduler", label: "Scheduler", icon: CalendarCheck, tint: "#059669" },
  { href: "/variations", label: "Variations", icon: Layers, tint: "#2563EB" },
];

const tools: Item[] = [
  { href: "/accounts", label: "Accounts", icon: CircleUser, tint: "#2563EB" },
  { href: "/transcribe", label: "Transcribe", icon: Mic, tint: "#0891B2" },
  { href: "/emails", label: "Emails", icon: AtSign, tint: "#DB2777" },
  { href: "/warm-up", label: "Warm-up", icon: Flame, tint: "#EA580C" },
  { href: "/timer", label: "Timer", icon: Timer, tint: "#65A30D" },
];

const all = [...top, ...create, ...tools];

function isActive(path: string, href: string) {
  return href === "/" ? path === "/" : path.startsWith(href);
}

function Logo() {
  // 3x3 dot grid: replace with your own mark
  return (
    <span className="grid grid-cols-3 gap-[2px]">
      {Array.from({ length: 9 }).map((_, i) => (
        <span key={i} className={cx("h-[5px] w-[5px] rounded-[1.5px]", [0, 2, 4, 7].includes(i) ? "bg-brand" : "bg-brand/30")} />
      ))}
    </span>
  );
}

function Row({ item, path, nested, onGo }: { item: Item; path: string; nested?: boolean; onGo: () => void }) {
  const Icon = item.icon;
  const active = isActive(path, item.href);
  return (
    <Link
      href={item.href}
      onClick={onGo}
      className={cx(
        "flex items-center gap-2.5 rounded-[10px] px-3 py-[7px] text-[15px] transition",
        active ? "bg-[#E4E4E4] font-medium" : "hover:bg-[#EAEAEA]",
      )}
    >
      {item.tint ? (
        <span
          className="flex h-[22px] w-[22px] items-center justify-center rounded-md"
          style={{ background: item.tint + "1F", color: item.tint }}
        >
          <Icon size={13} strokeWidth={2.2} />
        </span>
      ) : (
        <Icon size={18} strokeWidth={1.8} className="text-[#3a3a3a]" />
      )}
      <span className={nested ? "text-[15px]" : ""}>{item.label}</span>
    </Link>
  );
}

function Group({ label, icon: Icon, items, path, onGo }: { label: string; icon: LucideIcon; items: Item[]; path: string; onGo: () => void }) {
  const holdsActive = items.some((i) => isActive(path, i.href));
  const [open, setOpen] = useState(true);
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className={cx(
          "flex w-full items-center gap-2.5 rounded-[10px] px-3 py-[7px] text-[15px] hover:bg-[#EAEAEA]",
          holdsActive && !open && "bg-[#E4E4E4]",
        )}
      >
        <span className="flex h-[22px] w-[22px] items-center justify-center rounded-md bg-brand-wash text-brand-text">
          <Icon size={13} strokeWidth={2.2} />
        </span>
        <span className="flex-1 text-left font-medium">{label}</span>
        {open ? <ChevronDown size={16} className="text-muted" /> : <ChevronRight size={16} className="text-muted" />}
      </button>
      {open && (
        <div className="ml-[22px] mt-0.5 space-y-0.5 border-l border-line pl-2">
          {items.map((i) => (
            <Row key={i.href} item={i} path={path} nested onGo={onGo} />
          ))}
        </div>
      )}
    </div>
  );
}

function Sidebar({ path, onGo }: { path: string; onGo: () => void }) {
  return (
    <div className="flex h-full flex-col px-3 pb-3 pt-3.5">
      <div className="mb-3 flex items-center gap-2.5 px-2">
        <Logo />
        <span className="text-[15px] font-semibold">Your Brand</span>
      </div>
      <div className="mb-3 flex items-center gap-2 rounded-[10px] border border-line bg-white px-3 py-2 text-sm text-muted">
        <Search size={15} /> Search
        <span className="ml-auto rounded border border-line px-1.5 text-[11px]">⌘K</span>
      </div>
      <nav className="no-scrollbar flex-1 space-y-0.5 overflow-y-auto">
        {top.map((i) => (
          <Row key={i.href} item={i} path={path} onGo={onGo} />
        ))}
        <div className="px-3 pb-1 pt-4 text-[13px] text-muted">Workspace</div>
        <Group label="Create" icon={PenTool} items={create} path={path} onGo={onGo} />
        <Group label="Tools" icon={Wrench} items={tools} path={path} onGo={onGo} />
      </nav>
      <div className="mt-3 flex items-center gap-2.5 px-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand to-[#2E8C79] text-xs font-semibold text-white">
          {user.initials}
        </span>
        <div className="leading-tight">
          <div className="text-sm font-semibold">{user.first}</div>
          <div className="text-xs text-muted">{user.handle}</div>
        </div>
      </div>
    </div>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  const path = usePathname();
  const [menu, setMenu] = useState(false);
  const current = all.find((i) => isActive(path, i.href)) ?? top[0];
  const CurrentIcon = current.icon;

  return (
    <div className="flex h-screen flex-col">
      <div className="flex items-center justify-center gap-2 bg-ink px-4 py-2 text-center text-[13px] text-white">
        <span>
          free template. every number is sample data, and the tools marked <b>look only</b> are yours to hook up.
        </span>
      </div>
      <div className="flex min-h-0 flex-1">
        <aside className="hidden w-[262px] shrink-0 md:block">
          <Sidebar path={path} onGo={() => {}} />
        </aside>
        {menu && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div className="absolute inset-0 bg-black/30" onClick={() => setMenu(false)} />
            <div className="absolute inset-y-0 left-0 w-[270px] bg-side shadow-xl">
              <Sidebar path={path} onGo={() => setMenu(false)} />
            </div>
          </div>
        )}
        <div className="flex min-w-0 flex-1 flex-col md:pr-2 md:pt-1.5">
          <div className="flex items-center gap-2 px-2 pb-1.5 pt-1.5 md:px-0 md:pt-0">
            <button className="rounded-lg p-1.5 hover:bg-[#EAEAEA] md:hidden" onClick={() => setMenu(true)} aria-label="menu">
              {menu ? <X size={18} /> : <Menu size={18} />}
            </button>
            <div className="flex items-center gap-2 rounded-[10px] border border-line bg-white px-3 py-1.5 text-sm md:w-[200px]">
              <CurrentIcon size={14} />
              {current.label}
            </div>
          </div>
          <main className="min-h-0 flex-1 overflow-y-auto border-line bg-white md:rounded-t-[14px] md:border">
            <div className="mx-auto max-w-[1180px] px-4 py-6 md:px-6 md:py-8">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
