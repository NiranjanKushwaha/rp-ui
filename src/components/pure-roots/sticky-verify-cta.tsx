'use client';
import { useEffect, useState } from "react";
import { QrCode, ScanLine } from "lucide-react";

/** Mobile-only sticky verify bar. Appears after the hero, hides near the footer. */
export function StickyVerifyCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const nearEnd = y + window.innerHeight > document.body.scrollHeight - 420;
      setShow(y > 520 && !nearEnd);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={[
        "fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden",
        "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
      ].join(" ")}
      aria-hidden={!show}
    >
      <div className="glass mx-auto flex max-w-md items-center gap-3 rounded-full p-2 pl-4 shadow-lift">
        <span className="min-w-0 flex-1">
          <span className="block truncate font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Batch on your cap
          </span>
          <span className="block truncate text-sm font-medium">Check it in 3 seconds</span>
        </span>
        <a
          href="#verify"
          className="tap focus-lux grid size-11 shrink-0 place-items-center rounded-full border border-hairline bg-secondary text-foreground"
          aria-label="Scan QR code"
        >
          <QrCode className="size-5" aria-hidden />
        </a>
        <a
          href="#verify"
          className="sheen tap focus-lux inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-soft"
        >
          <ScanLine className="size-4" aria-hidden />
          Verify
        </a>
      </div>
    </div>
  );
}
