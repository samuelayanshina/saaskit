// app/api/billing/route.ts
import {NextResponse} from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try{
    const billing = await prisma.billing.findMany({
      include: {team: true, user: true},
      orderBy: {updatedAt: "desc"},   // <- Professional default
    });

    return NextResponse.json(billing);
  }catch(error){
    console.error("Error fetching billing data:", error);
    return NextResponse.json({error: "Failed to fetch billing"}, {status: 500});
  }
}
