import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  const threads = await prisma.thread.findMany({
    orderBy: { createdAt: 'desc'},
    take: 5,
  })
  return NextResponse.json(threads)
}