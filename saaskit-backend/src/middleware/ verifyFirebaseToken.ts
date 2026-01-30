import { Request, Response, NextFunction } from "express";
import { adminAuth } from "../lib/firebaseAdmin";

export interface AuthRequest extends Request {
  uid?: string;
}

export async function verifyFirebaseToken(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing Authorization header" });
  }

  const idToken = authHeader.split("Bearer ")[1];

  try {
    const decoded = await adminAuth.verifyIdToken(idToken);
    req.uid = decoded.uid;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}
