// lib/firebaseAdmin.ts
import admin from "firebase-admin";

if (!process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
  throw new Error("Missing FIREBASE_SERVICE_ACCOUNT_JSON");
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(
      JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON)
    ),
  });
}

export const adminAuth = admin.auth();
export const adminDb = admin.firestore();

export async function verifyFirebaseToken(token:string){
  return adminAuth.verifyIdToken(token);
}
