// import { NextResponse } from "next/server";
// import stripe from "@/lib/stripe";
// import firestore from "@/lib/firebaseAdmin";

// // Debug GET (do not delete yet — Jarvis needs this for testing)
// export async function GET() {
//   return new Response("GET OK", { status: 200 });
// }

// // MAIN POST HANDLER
// export async function POST(request: Request) {
//   console.log("🔵 POST /create-portal-session HIT");

//   try {
//     const { userId, returnUrl } = await request.json();
//     if (!userId) {
//       return NextResponse.json({ error: "userId required" }, { status: 400 });
//     }

//     const userRef = firestore.doc(`users/${userId}`);
//     const snap = await userRef.get();
//     const stripeCustomerId = snap.exists ? snap.get("stripeCustomerId") : null;

//     if (!stripeCustomerId) {
//       return NextResponse.json({ error: "No stripe customer for user" }, { status: 400 });
//     }

//     const session = await stripe.billingPortal.sessions.create({
//       customer: stripeCustomerId,
//       return_url:
//         returnUrl ||
//         `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard/billing`,
//     });

//     return NextResponse.json({ url: session.url });
//   } catch (err: any) {
//     console.error("create-portal-session error:", err);
//     return NextResponse.json({ error: err.message || "Unknown" }, { status: 500 });
//   }
// }



import { NextResponse } from "next/server";
import stripe from "@/lib/stripe";
import { adminAuth, adminDb } from "@/lib/firebaseAdmin";

export async function POST(request: Request) {
  try {
    const { idToken, returnUrl } = await request.json();

    if (!idToken) {
      return NextResponse.json(
        { error: "Missing idToken" },
        { status: 401 }
      );
    }

    // 🔐 Verify Firebase ID Token
    const decoded = await adminAuth.verifyIdToken(idToken);
    const uid = decoded.uid;

    // 🔎 Load user document
    const userRef = adminDb.doc(`users/${uid}`);
    const snap = await userRef.get();

    if (!snap.exists) {
      return NextResponse.json(
        { error: "User record not found" },
        { status: 404 }
      );
    }

    const stripeCustomerId = snap.get("stripeCustomerId");

    if (!stripeCustomerId) {
      return NextResponse.json(
        { error: "Stripe customer not linked" },
        { status: 400 }
      );
    }

    // 🔁 Create Stripe Customer Portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url:
        returnUrl ??
        `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing`,
    });

    return NextResponse.json({ url: session.url });

  } catch (err: any) {
    console.error("Stripe portal error:", err);

    return NextResponse.json(
      { error: err.message || "Internal error" },
      { status: 500 }
    );
  }
}
