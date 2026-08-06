'use client';
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useInView } from "@/lib/motion";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={cn(inView && "pr-reveal", !inView && "opacity-0", className)}
      style={inView ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

export function Section({
  id,
  children,
  className,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("scroll-mt-20 px-5 py-20 sm:px-8 md:py-28", className)}>
      <div className="mx-auto w-full max-w-7xl">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  blurb,
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  blurb?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "mb-12 max-w-2xl",
        align === "center" && "mx-auto text-center",
      )}
    >
      <span className="eyebrow mb-4 block text-primary">{eyebrow}</span>
      <h2 className="text-3xl leading-[1.08] text-balance sm:text-4xl md:text-5xl">{title}</h2>
      {blurb ? (
        <p className="mt-5 text-base leading-relaxed text-muted-foreground text-pretty">{blurb}</p>
      ) : null}
    </div>
  );
}

export function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-hairline bg-secondary px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}
