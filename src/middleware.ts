import { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export const middleware = (req: NextRequest) => {
  const response = intlMiddleware(req);
  return response;
};

export const config = {
  matcher: ['/((?!api|_next|favicon.ico).*)'],
};
