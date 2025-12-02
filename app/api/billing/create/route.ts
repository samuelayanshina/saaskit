// app/api/billing/create/route.ts
import {NextResponse} from "next/server";
import getPrisma from "@/lib/prisma";
import {z} from "zod";
import {addDays} from "date-fns";

const payloadSchema = z.object({
  userId: z.string().optional(),
  teamId: z.string().optional(),
  plan: z.enum(["free","pro","enterprise"]).optional().default("free"),
  customerId: z.string().optional().nullable(),
  subscriptionId: z.string().optional().nullable(),
  currentPeriodEnd: z.string().optional().nullable(), // ISO date string optional
  status: z.enum(["active","trialing","cancelled"]).optional().default("active"),
});

// Utility to parse date string or fallback
const parseOrDefaultPeriod = (plan, providedIso)=> {
  if (providedIso) return new Date(providedIso);
  if (plan === "free") return null;
  return addDays(new Date(), 30);
};

export async function POST(request: Request) {
  try{
    const body = await request.json();
    const parsed = payloadSchema.parse(body);

    const {userId, teamId, plan, customerId, subscriptionId, currentPeriodEnd, status} = parsed;

    // Validation rules from your spec
    if ((userId && teamId) || (!userId && !teamId)) {
      return NextResponse.json({error: "Provide exactly one of userId or teamId"}, {status:400});
    }

    const prisma = getPrisma;

    // compute period
    const periodDate = parseOrDefaultPeriod(plan, currentPeriodEnd);

    // Shared data
    const dataToWrite = {
      plan,
      status,
      customerId,
      subscriptionId,
      currentPeriodEnd: periodDate,
    };

    if (teamId) {
      // Check existing billing for team
      const existing = await prisma.billing.findUnique({where:{teamId}});
      if (existing) {
        // Update existing
        const updated = await prisma.billing.update({
          where:{teamId},
          data: {...dataToWrite, updatedAt: new Date()},
        });
        return NextResponse.json({billing: updated});
      }

      // create new team billing
      const created = await prisma.billing.create({
        data: {
          ...dataToWrite,
          team: {connect: {id: teamId}},
        },
        include: {team: true},
      });

      // Auto-assign Owner role if this team has no members:
      const memberCount = await prisma.teamMember.count({where:{teamId}});
      if (memberCount === 0 && userId) {
        // Create a TeamMember as Owner for the invoking user if userId present
        // For safety: only create if user exists
        const user = await prisma.user.findUnique({where:{id: userId}});
        if (user) {
          await prisma.teamMember.create({
            data: {
              team: {connect:{id: teamId}},
              user: {connect:{id: userId}},
              role: "Owner",
            }
          });
        }
      }

      return NextResponse.json({billing: created});
    } else {
      // userId path
      const existing = await prisma.billing.findUnique({where:{userId}});
      if (existing) {
        const updated = await prisma.billing.update({
          where:{userId},
          data: {...dataToWrite, updatedAt: new Date()},
        });
        return NextResponse.json({billing: updated});
      }
      const created = await prisma.billing.create({
        data: {
          ...dataToWrite,
          user: {connect: {id: userId}},
        },
        include: {user: true},
      });
      return NextResponse.json({billing: created});
    }
  }catch(err:any){
    // zod error handling
    if (err?.name === "ZodError") {
      return NextResponse.json({error: err.errors}, {status:400});
    }
    console.error("Billing create error:", err);
    return NextResponse.json({error: err?.message ?? "Unknown error"}, {status:500});
  }
}
