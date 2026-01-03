import { prisma } from '@/lib/prisma'
import JobList from '@/components/JobList'
import Header from '@/components/Header'
import JobFilters from '@/components/JobFilters'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export const revalidate = 60

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function SearchPage({ searchParams }: PageProps) {
  const session = await getServerSession(authOptions)
  const resolvedParams = await searchParams
  const query = resolvedParams.q as string | undefined
  const jobType = resolvedParams.jobType as string | undefined
  const remoteOnly = resolvedParams.remote === 'true'

  // Build where clause
  const where: any = {
    AND: [
      {
        OR: [
          { expiresAt: null },
          { expiresAt: { gte: new Date() } }
        ]
      }
    ]
  }

  if (query) {
    where.AND.push({
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
        { jobAuthor: { contains: query, mode: 'insensitive' } },
        { location: { contains: query, mode: 'insensitive' } },
      ]
    })
  }

  if (jobType) {
    where.AND.push({ jobType })
  }

  if (remoteOnly) {
    where.AND.push({ remoteOk: true })
  }

  const [jobs, bookmarkedJobIds] = await Promise.all([
    prisma.job.findMany({
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
    }),
    session?.user?.id 
      ? prisma.bookmark.findMany({
          where: { userId: session.user.id },
          select: { jobId: true }
        }).then(bookmarks => bookmarks.map(b => b.jobId))
      : Promise.resolve([])
  ])

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link 
          href="/"
          className="text-primary-600 hover:text-primary-700 font-semibold mb-8 inline-flex items-center gap-2 transition-colors duration-300"
          aria-label="Back to all jobs"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to All Jobs
        </Link>

        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-primary-600 to-gray-900 bg-clip-text text-transparent">
            Search Results
          </h1>
          {query && (
            <p className="text-lg text-gray-600 font-medium mb-8">
              Found {jobs.length} result{jobs.length !== 1 ? 's' : ''} for &quot;{query}&quot;
            </p>
          )}
        </div>

        <JobFilters selectedType={jobType} />
        
        {jobs.length === 0 ? (
          <div className="card text-center py-16">
            <div className="mb-6">
              <svg className="w-24 h-24 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">No jobs found</h2>
            <p className="text-gray-600 mb-8 font-medium">
              Try adjusting your search or browse all available jobs
            </p>
            <Link href="/" className="btn-primary inline-block">
              View All Jobs
            </Link>
          </div>
        ) : (
          <JobList jobs={jobs} bookmarkedJobIds={bookmarkedJobIds} />
        )}
      </main>
    </div>
  )
}
