import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// Auth helper
export async function requireAuth() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    throw new Error('Unauthorized')
  }
  return session
}

// Check if user is admin
export async function isAdmin(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId }, select: { admin: true } })
  return user?.admin || false
}

// Check if user owns resource or is admin
export async function canModifyResource(userId: string, ownerId: string) {
  return userId === ownerId || await isAdmin(userId)
}

// Standard error responses
export const errorResponse = (message: string, status: number = 400) => 
  NextResponse.json({ error: message }, { status })

// Get active jobs (not expired)
export const activeJobsWhere = {
  OR: [
    { expiresAt: null },
    { expiresAt: { gte: new Date() } }
  ]
}

// Get user's bookmarks
export async function getUserBookmarks(userId: string) {
  const bookmarks = await prisma.bookmark.findMany({
    where: { userId },
    select: { jobId: true }
  })
  return bookmarks.map(b => b.jobId)
}
