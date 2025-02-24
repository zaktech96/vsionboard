import { NextResponse } from 'next/server';

export default function middleware(req: any) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.[\\w]+$|_next/static|_next/image|assets|favicon.ico).*)',
  ],
};
