'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  end: number;
  suffix?: string;
  prefix?: string;
  durationMs?: number;
  className?: string;
};

export function CountUp({
  end,
  suffix = '',
  prefix = '',
  durationMs = 1400,
  className = '',
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || started.current) return;
        started.current = true;
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - t0) / durationMs, 1);
          // ease-out cubic
          const eased = 1 - Math.pow(1 - p, 3);
          setValue(Math.round(eased * end));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end, durationMs]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toLocaleString('en-IN')}
      {suffix}
    </span>
  );
}
