'use client';
import { useEffect, useState } from "react";
import { Leaf, Menu, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#verify", label: "Verify" },
  { href: "#proof", label: "Proof" },
  { href: "#results", label: "Results" },
  { href: "#provenance", label: "Provenance" },
  { href: "#guarantee", label: "Guarantee" },
];

function LocaleSwitch() {
  const locale = useLocale();
  const pathname = usePathname();
  return (
    <div className="glass hidden items-center gap-0.5 rounded-full p-0.5 sm:flex">
      {(["en", "hi"] as const).map((l) => (
        <Link
          key={l}
          href={pathname}
          locale={l}
          className={cn(
            "tap focus-lux rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em]",
            locale === l
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {l}
        </Link>
      ))}
    </div>
  );
}

function Logo() {
  return (
    <Link href="/" className="focus-lux group flex min-w-0 items-center gap-3 rounded-md">
      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-linear-to-br from-gold to-copper text-primary-foreground shadow-soft transition-transform duration-500 group-hover:rotate-[8deg]">
        <Leaf className="size-4" strokeWidth={2.4} aria-hidden />
      </span>
      <span className="min-w-0 leading-none">
        <span className="block truncate font-display text-lg font-semibold tracking-tight">Pure Roots</span>
        <span className="eyebrow mt-1 hidden text-[9px] sm:block">Cold-pressed · Verified</span>
      </span>
    </Link>
  );
}


export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("#verify");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    LINKS.forEach((l) => {
      const el = document.querySelector(l.href);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-shadow duration-300",
        scrolled ? "glass shadow-soft" : "border-b border-transparent bg-background/40 backdrop-blur-sm",
      )}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5 py-3 sm:px-8">
        <Logo />

        <div className="flex items-center gap-2 sm:gap-4">
          <nav aria-label="Main" className="hidden items-center gap-7 text-sm font-medium text-muted-foreground lg:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                data-active={active === l.href}
                className="nav-link focus-lux rounded-sm hover:text-foreground data-[active=true]:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <Link
              href="/verify"
              className="nav-link focus-lux rounded-sm hover:text-foreground"
            >
              Certificate
            </Link>
          </nav>

          <LocaleSwitch />

          <ThemeToggle />

          <Link
            href="/verify"
            className="sheen focus-lux hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-transform duration-300 hover:-translate-y-0.5 sm:inline-flex"
          >
            Order Batch 004
          </Link>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="focus-lux grid size-11 shrink-0 place-items-center rounded-full border border-hairline bg-secondary text-foreground lg:hidden"
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className="glass border-t border-hairline lg:hidden"
      >
        <nav aria-label="Mobile" className="mx-auto grid max-w-7xl gap-1 px-5 py-4 sm:px-8">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="focus-lux flex min-h-11 items-center justify-between rounded-lg px-3 text-base font-medium text-foreground/90 transition-colors hover:bg-secondary"
            >
              {l.label}
              <span className="font-mono text-[10px] text-muted-foreground">0{LINKS.indexOf(l) + 1}</span>
            </a>
          ))}
          <Link
            href="/verify"
            onClick={() => setOpen(false)}
            className="focus-lux flex min-h-11 items-center justify-between rounded-lg px-3 text-base font-medium text-foreground/90 transition-colors hover:bg-secondary"
          >
            Certificate
            <span className="font-mono text-[10px] text-muted-foreground">06</span>
          </Link>
          <Link
            href="/verify"
            onClick={() => setOpen(false)}
            className="sheen tap mt-2 flex min-h-12 items-center justify-center rounded-full bg-primary px-5 font-semibold text-primary-foreground shadow-soft"
          >
            Order Batch 004
          </Link>

        </nav>
      </div>
    </header>
  );
}
