'use client';
import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";
import { forwardRef, useId } from "react";
import { AlertTriangle, CheckCircle2, Clock3, Loader2, Info } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─────────────────────────── Button ─────────────────────────── */

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

const VARIANT: Record<ButtonVariant, string> = {
  primary:
    "sheen bg-primary text-primary-foreground shadow-soft hover:-translate-y-0.5 hover:shadow-lift",
  secondary:
    "bg-secondary text-secondary-foreground border border-hairline hover:border-gold/45 hover:bg-accent hover:text-accent-foreground",
  outline:
    "border border-input bg-transparent text-foreground hover:border-gold/60 hover:bg-accent/40",
  ghost: "text-muted-foreground hover:bg-secondary hover:text-foreground",
  danger:
    "bg-destructive text-destructive-foreground shadow-soft hover:-translate-y-0.5 hover:shadow-lift",
};

const SIZE: Record<ButtonSize, string> = {
  sm: "min-h-9 px-4 text-[13px]",
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-14 px-7 text-[15px]",
};

export interface LuxButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: ReactNode;
  full?: boolean;
}

export const LuxButton = forwardRef<HTMLButtonElement, LuxButtonProps>(function LuxButton(
  { variant = "primary", size = "md", loading, icon, full, className, children, disabled, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      data-loading={loading ? "true" : undefined}
      className={cn(
        "tap focus-lux inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight",
        "disabled:pointer-events-none disabled:opacity-45 disabled:shadow-none",
        VARIANT[variant],
        SIZE[size],
        full && "w-full",
        className,
      )}
      {...rest}
    >
      {loading ? <Loader2 className="size-4 animate-spin" aria-hidden /> : icon}
      {children}
    </button>
  );
});

/* ─────────────────────────── Badges ─────────────────────────── */

export type VerdictTone = "pass" | "pending" | "failed" | "neutral";

const TONE: Record<VerdictTone, { cls: string; icon: ReactNode; label: string }> = {
  pass: {
    cls: "border-success/35 bg-success/12 text-success",
    icon: <CheckCircle2 className="size-3.5" aria-hidden />,
    label: "Verified",
  },
  pending: {
    cls: "border-gold/40 bg-gold/12 text-accent-foreground",
    icon: <Clock3 className="size-3.5" aria-hidden />,
    label: "Pending",
  },
  failed: {
    cls: "border-destructive/35 bg-destructive/12 text-destructive",
    icon: <AlertTriangle className="size-3.5" aria-hidden />,
    label: "Failed",
  },
  neutral: {
    cls: "border-hairline bg-secondary text-muted-foreground",
    icon: <Info className="size-3.5" aria-hidden />,
    label: "Info",
  },
};

export function StatusBadge({
  tone = "neutral",
  children,
  className,
  pulse,
}: {
  tone?: VerdictTone;
  children?: ReactNode;
  className?: string;
  pulse?: boolean;
}) {
  const t = TONE[tone];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em]",
        t.cls,
        pulse && "pr-pulse-ring",
        className,
      )}
    >
      {t.icon}
      {children ?? t.label}
    </span>
  );
}

export function MetaChip({
  icon,
  label,
  value,
  className,
}: {
  icon?: ReactNode;
  label: string;
  value?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "tap inline-flex items-center gap-2 rounded-full border border-hairline bg-secondary/70 px-3 py-1.5 text-xs hover:border-gold/45 hover:bg-accent/50",
        className,
      )}
    >
      {icon ? <span className="text-primary">{icon}</span> : null}
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </span>
      {value ? <span className="font-medium text-foreground">{value}</span> : null}
    </span>
  );
}

/* ─────────────────────────── Field ─────────────────────────── */

export interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
  error?: string;
  success?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
}

export const Field = forwardRef<HTMLInputElement, FieldProps>(function Field(
  { label, hint, error, success, leading, trailing, className, id, ...rest },
  ref,
) {
  const auto = useId();
  const inputId = id ?? auto;
  const msgId = `${inputId}-msg`;
  return (
    <div className="w-full">
      <label htmlFor={inputId} className="eyebrow mb-2 block">
        {label}
      </label>
      <div className="relative">
        {leading ? (
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
            {leading}
          </span>
        ) : null}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={hint || error || success ? msgId : undefined}
          className={cn(
            "focus-lux h-14 w-full rounded-2xl border bg-card text-foreground placeholder:text-muted-foreground",
            "px-4 text-sm transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-50",
            leading && "pl-11",
            trailing && "pr-12",
            error
              ? "border-destructive"
              : success
                ? "border-success/60"
                : "border-input hover:border-gold/45",
            className,
          )}
          {...rest}
        />
        {trailing ? (
          <span className="absolute right-3 top-1/2 -translate-y-1/2">{trailing}</span>
        ) : null}
      </div>
      {error ? (
        <p id={msgId} role="alert" className="mt-2 flex items-center gap-1.5 text-xs text-destructive">
          <AlertTriangle className="size-3.5 shrink-0" aria-hidden />
          {error}
        </p>
      ) : success ? (
        <p id={msgId} role="status" className="mt-2 flex items-center gap-1.5 text-xs text-success">
          <CheckCircle2 className="size-3.5 shrink-0" aria-hidden />
          {success}
        </p>
      ) : hint ? (
        <p id={msgId} className="mt-2 font-mono text-[11px] text-muted-foreground">
          {hint}
        </p>
      ) : null}
    </div>
  );
});

/* ─────────────────────────── Data table ─────────────────────────── */

export function DataTable({
  caption,
  columns,
  rows,
}: {
  caption?: string;
  columns: string[];
  rows: ReactNode[][];
}) {
  return (
    <div className="lux-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[34rem] border-collapse text-sm">
          {caption ? (
            <caption className="eyebrow border-b border-hairline bg-surface-2/60 px-5 py-3 text-left">
              {caption}
            </caption>
          ) : null}
          <thead>
            <tr className="border-b border-hairline">
              {columns.map((c) => (
                <th
                  key={c}
                  scope="col"
                  className="px-5 py-3 text-left font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground"
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr
                key={i}
                className="border-b border-hairline/60 transition-colors last:border-0 hover:bg-accent/25"
              >
                {r.map((cell, j) => (
                  <td
                    key={j}
                    className={cn(
                      "px-5 py-3.5 align-middle",
                      j === 0 ? "font-mono text-xs text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─────────────────────────── Empty state ─────────────────────────── */

export function EmptyState({
  icon,
  title,
  body,
  action,
  tone = "neutral",
}: {
  icon: ReactNode;
  title: string;
  body: string;
  action?: ReactNode;
  tone?: VerdictTone;
}) {
  return (
    <div className="lux-card grain flex flex-col items-center px-6 py-12 text-center sm:px-10">
      <span
        className={cn(
          "grid size-16 place-items-center rounded-2xl border",
          TONE[tone].cls,
        )}
      >
        {icon}
      </span>
      <h3 className="mt-5 font-display text-xl">{title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground text-pretty">{body}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}

export function SkeletonRow({ className }: { className?: string }) {
  return <div className={cn("skeleton h-4 rounded-full", className)} />;
}
