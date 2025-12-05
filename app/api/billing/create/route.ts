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
  nextBillingDate: z.string().optional().nullable(),   // <- Updated
  status: z.enum(["active","trialing","cancelled"]).optional().default("active"),
});

// Compute next billing date
const computeNextBillingDate = (plan, providedIso)=> {
  if (providedIso) return new Date(providedIso);
  if (plan === "free") return null;
  return addDays(new Date(), 30);
};

export async function POST(request: Request) {
  try{
    const body = await request.json();
    const parsed = payloadSchema.parse(body);

    const {
      userId,
      teamId,
      plan,
      customerId,
      subscriptionId,
      nextBillingDate,
      status
    } = parsed;

    if ((userId && teamId) || (!userId && !teamId)) {
      return NextResponse.json(
        {error: "Provide exactly one of userId or teamId"},
        {status: 400}
      );
    }

    const prisma = getPrisma;

    const billingDate = computeNextBillingDate(plan, nextBillingDate);

    const dataToWrite = {
      plan,
      status,
      customerId,
      subscriptionId,
      nextBillingDate: billingDate,      // <- Updated field
    };

    // TEAM BILLING
    if (teamId) {
      const existing = await prisma.billing.findUnique({where:{teamId}});

      if (existing) {
        const updated = await prisma.billing.update({
          where:{teamId},
          data: {...dataToWrite, updatedAt: new Date()},
        });
        return NextResponse.json({billing: updated});
      }

      const created = await prisma.billing.create({
        data: {
          ...dataToWrite,
          team: {connect:{id: teamId}},
        },
        include: {team: true},
      });

      // Auto-create owner membership if needed
      const memberCount = await prisma.teamMember.count({where:{teamId}});
      if (memberCount === 0 && userId) {
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
    }

    // USER BILLING
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
        user: {connect:{id: userId}},
      },
      include: {user: true},
    });

    return NextResponse.json({billing: created});
  }catch(err:any){
    if (err?.name === "ZodError") {
      return NextResponse.json({error: err.errors}, {status: 400});
    }
    console.error("Billing create error:", err);
    return NextResponse.json({error: err?.message ?? "Unknown error"}, {status: 500});
  }
}
