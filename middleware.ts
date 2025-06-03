import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import path from 'path';
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

    const {pathname} = request.nextUrl;
    const token = request.cookies.get("token")?.value;

    const protectedPaths = ['/game', '/ranking']
    const isProtectedRoute = protectedPaths.some((path) => pathname.startsWith(path));

  if(isProtectedRoute && !token){

    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/game/:path*', '/ranking/:path*'],
}

