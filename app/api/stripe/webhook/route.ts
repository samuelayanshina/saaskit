import {NextResponse} from "next/server";
import stripe from "@/lib/stripe";
import firestore from "@/lib/firebaseAdmin";

export const runtime = "nodejs"; // recommended for stripe webhook

export async function POST(request: Request) {
  const buf = await request.arrayBuffer();
  const rawBody = Buffer.from(buf);

  const sig = request.headers.get("stripe-signature") || "";
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err:any) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json({error: "Webhook error"}, {status: 400});
  }

  try {
    const type = event.type;
    const data = event.data.object;

    if (type === "checkout.session.completed") {
      const session = data as any;
      const customerId = session.customer;
      const metadata = session.metadata || {};
      const userId = metadata.userId || null;
      const teamId = metadata.teamId || null;

      // store customer id and subscription id to user/team doc
      if (userId) {
        await firestore.doc(`users/${userId}`).set({stripeCustomerId: customerId}, {merge: true});
      }
      if (teamId) {
        await firestore.doc(`teams/${teamId}`).set({stripeCustomerId: customerId}, {merge: true});
      }
    }

    if (type === "customer.subscription.updated" || type === "customer.subscription.created") {
      const sub = data as any;
      const customerId = sub.customer;
      const plan = sub.items?.data?.[0]?.price?.id || null;
      const status = sub.status;
      const currentPeriodEnd = new Date(sub.current_period_end * 1000);

      // find user document with this stripeCustomerId
      const usersRef = firestore.collection("users").where("stripeCustomerId","==",customerId);
      const usersSnap = await usersRef.get();
      if (!usersSnap.empty) {
        for (const doc of usersSnap.docs) {
          await doc.ref.set({currentPlan: plan, status, currentPeriodEnd: currentPeriodEnd.toISOString()}, {merge: true});
        }
      }

      // also check teams collection
      const teamsRef = firestore.collection("teams").where("stripeCustomerId","==",customerId);
      const teamsSnap = await teamsRef.get();
      if (!teamsSnap.empty) {
        for (const doc of teamsSnap.docs) {
          await doc.ref.set({currentPlan: plan, status, currentPeriodEnd: currentPeriodEnd.toISOString()}, {merge: true});
        }
      }
    }

    if (type === "customer.subscription.deleted") {
      const sub = data as any;
      const customerId = sub.customer;
      await firestore.collection("users").where("stripeCustomerId","==",customerId).get().then(snap=>{
        snap.forEach((d)=>d.ref.set({status: "cancelled"}, {merge: true}));
      });
      await firestore.collection("teams").where("stripeCustomerId","==",customerId).get().then(snap=>{
        snap.forEach((d)=>d.ref.set({status: "cancelled"}, {merge: true}));
      });
    }

    // return 200 to stripe
    return NextResponse.json({received: true});
  } catch (err:any) {
    console.error("Webhook handling failed:", err);
    return NextResponse.json({error: err.message || "failed"}, {status: 500});
  }
}
