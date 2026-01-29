import {NextRequest, NextResponse} from "next/server";

export function middleware(req:NextRequest){
  const {pathname} = req.nextUrl;

  // Only protect dashboard routes
  if (pathname.startsWith("/dashboard")) {
    const hasAuthCookie =
      req.cookies.get("__session") || // Firebase hosting
      req.cookies.get("session");     // Custom session (future)

    if (!hasAuthCookie) {
      const loginUrl = new URL("/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
