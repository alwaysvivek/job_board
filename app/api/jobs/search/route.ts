import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const query = searchParams.get('q') || ''
    const jobType = searchParams.get('jobType')
    const location = searchParams.get('location')
    const remoteOnly = searchParams.get('remote') === 'true'

    // Build where clause
    const where: any = {}

    if (query) {
      where.OR = [
        { title: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
        { jobAuthor: { contains: query, mode: 'insensitive' } },
        { location: { contains: query, mode: 'insensitive' } },
      ]
    }

    if (jobType) {
      where.jobType = jobType
    }

    if (location) {
      where.location = { contains: location, mode: 'insensitive' }
    }

    if (remoteOnly) {
      where.remoteOk = true
    }

    const jobs = await prisma.job.findMany({
      where,
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(jobs)
  } catch (error) {
    console.error('Error searching jobs:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
