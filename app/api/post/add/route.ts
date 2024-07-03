import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const { threadId, content } = await request.json()
    const post = await prisma.post.create({
      data: { content, threadId: parseInt(threadId, 10) },
    })
    return NextResponse.json(post)
  } catch (error) {
    console.error(error)
    return NextResponse.error()
  }
}