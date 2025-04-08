import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  });
  
  // Check if user is trying to access admin page
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!token) {
      // Not logged in, redirect to login page
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    if (!(token as any).is_admin) {
      // Not an admin, redirect to home page
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
}; 