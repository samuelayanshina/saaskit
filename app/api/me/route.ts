import {NextRequest, NextResponse} from "next/server";
import {requireUser} from "@/lib/serverAuth";

export async function GET(req: NextRequest) {
  try {
    const user = await requireUser(req);

    return NextResponse.json({
      uid: user.uid,
      email: user.email,
    });
  } catch {
    return NextResponse.json({error: "Unauthorized"}, {status: 401});
  }
}
