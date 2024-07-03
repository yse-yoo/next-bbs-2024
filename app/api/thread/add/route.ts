import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  const { title, content } = await request.json()
  const thread = await prisma.thread.create({
    data: { title, content },
  })
  return NextResponse.json(thread)
}