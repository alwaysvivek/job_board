import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth, errorResponse } from '@/lib/utils/api-helpers'

export async function GET() {
  try {
    const session = await requireAuth()
    const bookmarks = await prisma.bookmark.findMany({
      where: { userId: session.user.id },
      include: {
        job: { include: { user: { select: { name: true, email: true } } } }
      },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(bookmarks)
  } catch (error: any) {
    return error.message === 'Unauthorized' ? errorResponse(error.message, 401) : errorResponse('Failed to fetch bookmarks', 500)
  }
}

export async function POST(request: Request) {
  try {
    const session = await requireAuth()
    const { jobId } = await request.json()
    if (!jobId) return errorResponse('Job ID is required')

    const job = await prisma.job.findUnique({ where: { id: jobId } })
    if (!job) return errorResponse('Job not found', 404)

    const existing = await prisma.bookmark.findUnique({
      where: { userId_jobId: { userId: session.user.id, jobId } }
    })
    if (existing) return errorResponse('Job already bookmarked')

    const bookmark = await prisma.bookmark.create({
      data: { userId: session.user.id, jobId }
    })
    return NextResponse.json(bookmark, { status: 201 })
  } catch (error: any) {
    return error.message === 'Unauthorized' ? errorResponse(error.message, 401) : errorResponse('Failed to create bookmark', 500)
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await requireAuth()
    const jobId = new URL(request.url).searchParams.get('jobId')
    if (!jobId) return errorResponse('Job ID is required')

    const bookmark = await prisma.bookmark.findUnique({
      where: { userId_jobId: { userId: session.user.id, jobId } }
    })
    if (!bookmark) return errorResponse('Bookmark not found', 404)

    await prisma.bookmark.delete({ where: { id: bookmark.id } })
    return NextResponse.json({ message: 'Bookmark removed' })
  } catch (error: any) {
    return error.message === 'Unauthorized' ? errorResponse(error.message, 401) : errorResponse('Failed to remove bookmark', 500)
  }
}
