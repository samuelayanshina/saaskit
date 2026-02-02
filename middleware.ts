import {NextRequest, NextResponse} from "next/server";

export function middleware(req: NextRequest) {
  const DEV_FORCE_ACCESS = process.env.NODE_ENV === "development";

  // 🔓 TEMP DEV UNLOCK — bypass auth locally
  if (DEV_FORCE_ACCESS) {
    return NextResponse.next();
  }

  const {pathname} = req.nextUrl;

  // 🔒 Protect dashboard routes in prod
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
