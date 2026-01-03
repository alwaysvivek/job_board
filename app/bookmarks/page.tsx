import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Header from '@/components/Header'
import JobList from '@/components/JobList'
import Link from 'next/link'

export default async function BookmarksPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.id) {
    redirect('/auth/signin')
  }

  const bookmarks = await prisma.bookmark.findMany({
    where: { userId: session.user.id },
    include: {
      job: {
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  // Filter out expired jobs
  const activeJobs = bookmarks
    .map(b => b.job)
    .filter(job => !job.expiresAt || new Date(job.expiresAt) >= new Date())

  const bookmarkedJobIds = activeJobs.map(j => j.id)

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link 
            href="/" 
            className="text-primary-600 hover:text-primary-700 font-semibold mb-4 inline-flex items-center gap-2 transition-colors duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Jobs
          </Link>
        </div>

        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-primary-600 bg-clip-text text-transparent">
            My Bookmarked Jobs
          </h1>
          <p className="text-lg text-gray-600 font-medium">
            You have {activeJobs.length} saved job{activeJobs.length !== 1 ? 's' : ''}
          </p>
        </div>

        {activeJobs.length === 0 ? (
          <div className="text-center py-12 glass rounded-glass">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            <p className="text-xl text-gray-600 mb-2">No bookmarked jobs yet</p>
            <p className="text-gray-500 mb-6">Start bookmarking jobs you're interested in</p>
            <Link href="/" className="btn-primary inline-block">
              Browse Jobs
            </Link>
          </div>
        ) : (
          <JobList jobs={activeJobs} bookmarkedJobIds={bookmarkedJobIds} />
        )}
      </main>
    </div>
  )
}
