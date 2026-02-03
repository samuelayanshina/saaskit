import {NextRequest} from "next/server";
import {adminAuth} from "@/lib/firebaseAdmin";

export type ServerUser = {
  uid: string;
  email?: string;
  claims?: Record<string, any>;
};

export async function requireUser(req: NextRequest): Promise<ServerUser> {
  const sessionCookie =
    req.cookies.get("__session")?.value ||
    req.cookies.get("session")?.value;

  if (!sessionCookie) {
    throw new Error("UNAUTHENTICATED");
  }

  const decoded = await adminAuth.verifySessionCookie(sessionCookie, true);

  return {
    uid: decoded.uid,
    email: decoded.email,
    claims: decoded,
  };
}
