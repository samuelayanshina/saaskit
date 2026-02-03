// app/api/auth/session/route.ts
import {NextResponse} from "next/server";
import {adminAuth} from "@/lib/firebaseAdmin";

export async function POST(req: Request) {
  try {
    const {idToken} = await req.json();

    if (!idToken) {
      return NextResponse.json({error: "Missing token"}, {status: 400});
    }

    // Verify Firebase ID token
    const decoded = await adminAuth.verifyIdToken(idToken);

    // Create session cookie (5 days)
    const expiresIn = 60 * 60 * 24 * 5 * 1000;

    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn,
    });

    const res = NextResponse.json({success: true});

    res.cookies.set("__session", sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: expiresIn / 1000,
      path: "/",
    });

    return res;
  } catch (err) {
    return NextResponse.json({error: "Invalid token"}, {status: 401});
  }
}
