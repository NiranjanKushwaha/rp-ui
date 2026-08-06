import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    '/',
    '/(en|hi|bn|te|mr|ta|gu|ur|kn|or|ml|pa|as|mai|sat|ks|ne|sd|kok|mni|doi)/:path*',
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
