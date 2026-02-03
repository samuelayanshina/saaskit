// lib/serverAuth.ts
import {NextRequest} from "next/server";
import {adminAuth} from "@/lib/firebaseAdmin";
import {prisma} from "@/lib/prisma";

export type ServerUser = {
  uid: string;
  email?: string;
  claims?: Record<string, any>;
  role?: string;
  organizationId?: string;
};

export async function requireUser(req: NextRequest): Promise<ServerUser> {
  const sessionCookie =
    req.cookies.get("__session")?.value ||
    req.cookies.get("session")?.value;

  if (!sessionCookie) {
    throw new Error("UNAUTHENTICATED");
  }

  // 🔐 Verify session cookie (unchanged)
  const decoded = await adminAuth.verifySessionCookie(sessionCookie, true);

  // 🏢 Fetch org membership (RBAC layer)
  const membership = await prisma.membership.findFirst({
    where: {userId: decoded.uid},
  });

  return {
    uid: decoded.uid,
    email: decoded.email,
    claims: decoded,
    role: membership?.role,
    organizationId: membership?.organizationId,
  };
}
