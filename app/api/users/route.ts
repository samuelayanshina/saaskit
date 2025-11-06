// import {NextResponse} from "next/server"
// import prisma from "@/lib/prisma"

// export async function GET() {
//   try {
//     const users = await prisma.user.findMany()
//     return NextResponse.json(users)
//   } catch (err) {
//     console.error(err)
//     return NextResponse.json({error: "Failed"}, {status:500})
//   }
// }

// export async function POST(request: Request) {
//   try {
//     const {name, email, password} = await request.json()
//     const user = await prisma.user.create({data:{name, email, password}})
//     return NextResponse.json(user, {status:201})
//   } catch (err) {
//     console.error(err)
//     return NextResponse.json({error: "Failed"}, {status:500})
//   }
// }

// export async function PATCH(request: Request) {
//   try {
//     const body = await request.json()
//     const {id, name, email} = body
//     if(!id) return NextResponse.json({error: "Missing id"}, {status:400})
//     const updated = await prisma.user.update({where:{id}, data:{name, email}})
//     return NextResponse.json(updated)
//   } catch (err) {
//     console.error(err)
//     return NextResponse.json({error: "Failed"}, {status:500})
//   }
// }


import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const {searchParams} = new URL(request.url);
    const teamSlug = searchParams.get("team");
    const plan = searchParams.get("plan");
    const email = searchParams.get("email");

    const users = await prisma.user.findMany({
      where: {
        ...(email ? {email: {contains: email, mode: "insensitive"}} : {}),
        ...(plan ? {billing: {plan}} : {}),
        ...(teamSlug ? {teams: {some: {slug: teamSlug}}} : {}),
      },
      include: {
        teams: true,
        documents: true,
        sentLetters: true,
        billing: true,
      },
    });

    return NextResponse.json({success: true, count: users.length, data: users});
  } catch (error: any) {
    console.error("❌ Error fetching filtered users:", error);
    return NextResponse.json({success: false, error: error.message}, {status: 500});
  } finally {
    await prisma.$disconnect();
  }
}
