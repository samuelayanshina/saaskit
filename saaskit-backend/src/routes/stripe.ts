import { Router } from "express";
import stripe from "../lib/stripe";
import { adminDb } from "../lib/firebaseAdmin";
import { verifyFirebaseToken, AuthRequest } from "../middleware/verifyFirebaseToken";

const router = Router();

router.post("/create-portal-session", verifyFirebaseToken, async (req: AuthRequest, res) => {
  try {
    const uid = req.uid!;
    const { returnUrl } = req.body;

    const snap = await adminDb.doc(`users/${uid}`).get();

    if (!snap.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    const stripeCustomerId = snap.get("stripeCustomerId");

    if (!stripeCustomerId) {
      return res.status(400).json({ error: "Stripe customer not linked" });
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url:
        returnUrl ?? `${process.env.APP_URL}/dashboard/billing`,
    });

    res.json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe portal error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
