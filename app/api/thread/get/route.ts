import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  const threads = await prisma.thread.findMany({
    include: {
      posts: true
    }
  })
  return NextResponse.json(threads)
}