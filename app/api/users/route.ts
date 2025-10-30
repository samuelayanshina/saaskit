import {NextResponse} from "next/server"
import {prisma} from "@/lib/prisma"

export async function GET() {
  const users = await prisma.user.findMany()
  return NextResponse.json(users)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {name, email, password} = body

    if(!email || !password) {
      return NextResponse.json({error: "Email and password are required"}, {status: 400})
    }

    const user = await prisma.user.create({
      data: {name, email, password}
    })

    return NextResponse.json(user, {status: 201})
  } catch (error) {
    console.error(error)
    return NextResponse.json({error: "Something went wrong"}, {status: 500})
  }
}
