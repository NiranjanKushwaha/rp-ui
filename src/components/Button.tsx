import { type ButtonHTMLAttributes, type ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'onDark' | 'ghost';

const variants: Record<Variant, string> = {
  primary:
    'bg-brand text-white hover:bg-brand-deep shadow-sm focus-visible:ring-brand',
  secondary:
    'bg-surface text-brand-deep border-[1.5px] border-brand hover:bg-hero-mist focus-visible:ring-brand',
  onDark:
    'bg-surface text-forest-deep hover:bg-hero-mist focus-visible:ring-white',
  ghost:
    'bg-transparent text-brand-deep hover:bg-hero-mist focus-visible:ring-brand',
};

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  children: ReactNode;
};

export function Button({
  variant = 'primary',
  className = '',
  children,
  ...rest
}: Props) {
  return (
    <button
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-[15px] font-semibold tracking-[0.2px] transition active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
