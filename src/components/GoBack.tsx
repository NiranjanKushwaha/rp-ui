'use client';

import type { ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from '@/i18n/routing';
import { cn } from '@/lib/utils';

type GoBackVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type GoBackSize = 'sm' | 'md' | 'lg';

const VARIANT: Record<GoBackVariant, string> = {
  primary:
    'sheen bg-primary text-primary-foreground shadow-soft hover:-translate-y-0.5 hover:shadow-lift',
  secondary:
    'bg-secondary text-secondary-foreground border border-hairline hover:border-gold/45 hover:bg-accent hover:text-accent-foreground',
  outline:
    'border border-input bg-transparent text-foreground hover:border-gold/60 hover:bg-accent/40',
  ghost: 'text-muted-foreground hover:bg-secondary hover:text-foreground',
};

const SIZE: Record<GoBackSize, string> = {
  sm: 'min-h-9 px-4 text-[13px]',
  md: 'min-h-11 px-5 text-sm',
  lg: 'min-h-14 px-7 text-[15px]',
};

export type GoBackProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children'
> & {
  /** Button label. Defaults to "Go back". */
  label?: ReactNode;
  /** Used when there is no browser history to return to. */
  fallbackHref?: string;
  variant?: GoBackVariant;
  size?: GoBackSize;
  /** Hide the leading arrow icon. */
  hideIcon?: boolean;
  full?: boolean;
};

/**
 * Reusable history-aware back control.
 * Prefer `router.back()`; fall back to `fallbackHref` when history is empty.
 */
export function GoBack({
  label = 'Go back',
  fallbackHref = '/',
  variant = 'outline',
  size = 'md',
  hideIcon = false,
  full = false,
  className,
  type = 'button',
  onClick,
  ...rest
}: GoBackProps) {
  const router = useRouter();

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    onClick?.(event);
    if (event.defaultPrevented) return;

    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
      return;
    }

    router.push(fallbackHref);
  }

  return (
    <button
      type={type}
      onClick={handleClick}
      className={cn(
        'tap focus-lux inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight',
        'disabled:pointer-events-none disabled:opacity-45 disabled:shadow-none',
        VARIANT[variant],
        SIZE[size],
        full && 'w-full',
        className,
      )}
      {...rest}
    >
      {!hideIcon && <ArrowLeft className="size-4 shrink-0" aria-hidden />}
      {label}
    </button>
  );
}
