'use client';
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      onClick={toggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      className={cn(
        "focus-lux relative inline-flex h-11 w-[76px] shrink-0 items-center rounded-full border border-hairline bg-secondary p-1 transition-colors duration-300 hover:border-primary/40",
        className,
      )}
    >
      <span
        aria-hidden
        className="absolute left-1 size-9 rounded-full bg-linear-to-br from-gold to-copper shadow-soft transition-transform duration-[380ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ transform: isDark ? "translateX(0)" : "translateX(32px)" }}
      />
      <span className="relative z-10 grid size-9 place-items-center">
        <Moon
          className={cn("size-4 transition-colors duration-300", isDark ? "text-primary-foreground" : "text-muted-foreground")}
          strokeWidth={2.2}
          aria-hidden
        />
      </span>
      <span className="relative z-10 grid size-9 place-items-center">
        <Sun
          className={cn("size-4 transition-colors duration-300", isDark ? "text-muted-foreground" : "text-primary-foreground")}
          strokeWidth={2.2}
          aria-hidden
        />
      </span>
    </button>
  );
}
