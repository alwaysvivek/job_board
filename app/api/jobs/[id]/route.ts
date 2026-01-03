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

interface RouteContext {
  params: Promise<{ id: string }>
}

// GET a single job by ID
export async function GET(
  req: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params
    
    const job = await prisma.job.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })

    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 })
    }

    return NextResponse.json(job)
  } catch (error) {
    console.error('Error fetching job:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// UPDATE a job
export async function PUT(
  req: NextRequest,
  context: RouteContext
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await context.params
    
    // Check if job exists and belongs to the user
    const existingJob = await prisma.job.findUnique({
      where: { id },
    })

    if (!existingJob) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 })
    }

    // Check if user owns the job or is admin
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { admin: true },
    })

    if (existingJob.userId !== session.user.id && !user?.admin) {
      return NextResponse.json(
        { error: 'Forbidden: You do not own this job' },
        { status: 403 }
      )
    }

    const body = await req.json()
    const validatedData = jobSchema.parse(body)

    // Update job
    const updatedJob = await prisma.job.update({
      where: { id },
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
      },
    })

    return NextResponse.json(updatedJob)
  } catch (error) {
    console.error('Error updating job:', error)
    
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

// DELETE a job
export async function DELETE(
  req: NextRequest,
  context: RouteContext
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await context.params
    
    // Check if job exists and belongs to the user
    const existingJob = await prisma.job.findUnique({
      where: { id },
    })

    if (!existingJob) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 })
    }

    // Check if user owns the job or is admin
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { admin: true },
    })

    if (existingJob.userId !== session.user.id && !user?.admin) {
      return NextResponse.json(
        { error: 'Forbidden: You do not own this job' },
        { status: 403 }
      )
    }

    // Delete job
    await prisma.job.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Job deleted successfully' })
  } catch (error) {
    console.error('Error deleting job:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
