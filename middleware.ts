import {NextRequest, NextResponse} from "next/server";
import {adminAuth} from "@/lib/firebaseAdmin";

export async function middleware(req: NextRequest) {
  const {pathname} = req.nextUrl;

  // Only protect dashboard routes
  if (!pathname.startsWith("/dashboard")) {
    return NextResponse.next();
  }

  // Accept both cookie names (no breakage)
  const sessionCookie =
    req.cookies.get("_session")?.value ||
    req.cookies.get("__session")?.value;

  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // 🔐 REAL verification (production-grade)
    await adminAuth.verifySessionCookie(sessionCookie, true);

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
