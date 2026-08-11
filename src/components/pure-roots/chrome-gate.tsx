'use client';

import type { ReactNode } from 'react';
import { usePathname } from '@/i18n/routing';

/** Hides marketing Header/Footer on admin routes. */
export function ChromeGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith('/admin')) return null;
  return <>{children}</>;
}
