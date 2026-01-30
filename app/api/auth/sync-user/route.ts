import {NextResponse} from "next/server";
import {adminAuth, adminDb} from "@/lib/firebaseAdmin";

export async function POST(req: Request) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({error:"Unauthorized"}, {status:401});
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = await adminAuth.verifyIdToken(token);
    const uid = decoded.uid;

    const userRef = adminDb.doc(`users/${uid}`);
    const snap = await userRef.get();

    if (!snap.exists) {
      await userRef.set({
        uid,
        email: decoded.email ?? null,
        name: decoded.name ?? null,
        photoURL: decoded.picture ?? null,
        createdAt: new Date(),
      });
    }

    return NextResponse.json({ok:true});
  } catch {
    return NextResponse.json({error:"Invalid token"}, {status:401});
  }
}
