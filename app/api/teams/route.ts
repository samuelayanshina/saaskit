// import {NextResponse} from "next/server";
// import prisma from "@/lib/prisma";

// export async function GET() {
//   try {
//     const teams = await prisma.team.findMany({include: {members: true}});
//     return NextResponse.json(teams);
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({error: "Failed to fetch teams"}, {status: 500});
//   }
// }

// export async function PATCH(request: Request) {
//   try {
//     const body = await request.json();
//     const {id, name} = body;
//     if(!id) return NextResponse.json({error: "Missing id"}, {status:400});
//     const updated = await prisma.team.update({where:{id}, data:{name}});
//     return NextResponse.json(updated);
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({error: "Failed to update team"}, {status:500});
//   }
// }


import {NextResponse} from "next/server";
import prisma from "@/lib/prisma";
import {getSession} from "@/lib/auth";

export async function GET() {
  try {
    const teams = await prisma.team.findMany({
      include: {members: true, billing: true}, // ✅ FIXED: use 'members' not 'users'
    });
    return NextResponse.json(teams);
  } catch (err) {
    console.error(err);
    return NextResponse.json({error: "Failed to fetch teams"}, {status: 500});
  }
}
