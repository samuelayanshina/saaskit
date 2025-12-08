import {NextResponse} from "next/server";
import stripe from "@/lib/stripe";
import firestore from "@/lib/firebaseAdmin";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {userId, teamId, plan} = body;

    if (!userId && !teamId) {
      return NextResponse.json({error: "userId or teamId required"}, {status: 400});
    }

    // Find or create Stripe Customer - store/ref in Firestore under users/{userId}
    const userRef = firestore.doc(`users/${userId}`);
    const userSnap = await userRef.get();
    let stripeCustomerId = userSnap.exists ? userSnap.get("stripeCustomerId") : null;

    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        metadata: {userId: userId || "", teamId: teamId || ""},
      });
      stripeCustomerId = customer.id;
      await userRef.set({stripeCustomerId}, {merge: true});
    }

    // Map plan to price id (you must create Price IDs in Stripe dashboard)
    const priceMap: Record<string,string> = {
      free: "price_free_placeholder",
      pro: "price_pro_yourPriceId",
      enterprise: "price_enterprise_yourPriceId",
    };

    const priceId = priceMap[plan || "pro"];
    if (!priceId) {
      return NextResponse.json({error: "Invalid plan"}, {status: 400});
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: stripeCustomerId,
      line_items: [{price: priceId, quantity: 1}],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard/billing?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard/billing?cancel=1`,
      metadata: {userId: userId || "", teamId: teamId || ""},
    });

    return NextResponse.json({url: session.url});
  } catch (err:any) {
    console.error("create-checkout-session error:", err);
    return NextResponse.json({error: err.message || "Unknown"}, {status: 500});
  }
}
