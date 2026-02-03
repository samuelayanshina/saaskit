// app/api/billing/route.ts
import {NextRequest, NextResponse} from "next/server";
import prisma from "@/lib/prisma";
import {requirePermission} from "@/lib/serverAuth";

/* ============================
   READ — existing behavior
============================ */
export async function GET() {
  try {
    const billing = await prisma.billing.findMany({
      include: {team: true, user: true},
      orderBy: {updatedAt: "desc"},
    });

    return NextResponse.json(billing);
  } catch (error) {
    console.error("Error fetching billing data:", error);
    return NextResponse.json(
      {error: "Failed to fetch billing"},
      {status: 500}
    );
  }
}

/* ============================
   WRITE — RBAC protected
============================ */
export async function POST(req: NextRequest) {
  try {
    const user = await requirePermission(req, "billing:write");

    // later: create/update billing here
    return NextResponse.json({
      success: true,
      organizationId: user.organizationId,
    });
  } catch {
    return NextResponse.json({error: "Forbidden"}, {status: 403});
  }
}
