import {NextRequest, NextResponse} from "next/server";
import {verifyFirebaseToken} from "@/lib/firebaseAdmin";

export async function GET(req:NextRequest){
  const authHeader = req.headers.get("authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({error:"Unauthorized"},{status:401});
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = await verifyFirebaseToken(token);

    return NextResponse.json({uid:decoded.uid});
  } catch {
    return NextResponse.json({error:"Invalid token"},{status:401});
  }
}
