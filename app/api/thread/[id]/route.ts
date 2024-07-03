import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id:number = parseInt(params.id)
    const thread = await prisma.thread.findUnique({
      where: {
        id: id,
      },
      include: {
        posts: true,
      },
    })
    if (thread) {
      return NextResponse.json(thread)
    } else {
      return NextResponse.json({ error: 'Thread not found' }, { status: 404 })
    }
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
