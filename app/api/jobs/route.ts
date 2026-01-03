import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const jobSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  url: z.string().url().optional().or(z.literal('')),
  jobType: z.enum(['Full-time', 'Part-time', 'Contract', 'Freelance']),
  location: z.string().min(1, 'Location is required'),
  jobAuthor: z.string().optional(),
  remoteOk: z.boolean(),
  applyUrl: z.string().url('Invalid application URL'),
  expiresAt: z.string().optional().or(z.literal('')),
})

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const validatedData = jobSchema.parse(body)

    // Create job
    const job = await prisma.job.create({
      data: {
        title: validatedData.title,
        description: validatedData.description,
        url: validatedData.url || null,
        jobType: validatedData.jobType,
        location: validatedData.location,
        jobAuthor: validatedData.jobAuthor,
        remoteOk: validatedData.remoteOk,
        applyUrl: validatedData.applyUrl,
        expiresAt: validatedData.expiresAt ? new Date(validatedData.expiresAt) : null,
        userId: session.user.id,
      },
    })

    return NextResponse.json(job, { status: 201 })
  } catch (error) {
    console.error('Error creating job:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const jobs = await prisma.job.findMany({
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
    console.error('Error fetching jobs:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
