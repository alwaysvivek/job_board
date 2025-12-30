import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { stripe, STRIPE_PRICE_AMOUNT } from '@/lib/stripe'
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
  paymentMethodId: z.string().min(1, 'Payment method is required'),
})

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const validatedData = jobSchema.parse(body)

    // Create Stripe charge
    const paymentIntent = await stripe.paymentIntents.create({
      amount: STRIPE_PRICE_AMOUNT,
      currency: 'usd',
      payment_method: validatedData.paymentMethodId,
      confirm: true,
      description: `Job posting: ${validatedData.title}`,
      metadata: {
        userId: session.user.id,
        jobType: validatedData.jobType,
      },
      return_url: `${process.env.NEXTAUTH_URL}/jobs`,
    })

    if (paymentIntent.status !== 'succeeded') {
      return NextResponse.json(
        { error: 'Payment failed' },
        { status: 400 }
      )
    }

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
        userId: session.user.id,
      },
    })

    // Update user with payment info
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        stripeId: paymentIntent.id,
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
