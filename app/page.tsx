import { prisma } from '@/lib/prisma'
import JobList from '@/components/JobList'
import Header from '@/components/Header'
import JobFilters from '@/components/JobFilters'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import Link from 'next/link'

export const revalidate = 60 // Revalidate every 60 seconds

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function HomePage({ searchParams }: PageProps) {
  const session = await getServerSession(authOptions)
  const resolvedParams = await searchParams
  const jobType = resolvedParams.jobType as string | undefined
  const sortBy = resolvedParams.sortBy as string | undefined
  const page = parseInt(resolvedParams.page as string || '1')
  const perPage = 12

  // Build where clause
  const where: any = {
    AND: [
      jobType ? { jobType } : {},
      {
        OR: [
          { expiresAt: null },
          { expiresAt: { gte: new Date() } }
        ]
      }
    ]
  }

  // Build orderBy clause
  let orderBy: any = { createdAt: 'desc' }
  if (sortBy === 'views') {
    orderBy = { viewCount: 'desc' }
  } else if (sortBy === 'company') {
    orderBy = { jobAuthor: 'asc' }
  }

  const [jobs, totalCount, bookmarkedJobIds] = await Promise.all([
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
      orderBy,
      skip: (page - 1) * perPage,
      take: perPage,
    }),
    prisma.job.count({ where }),
    session?.user?.id 
      ? prisma.bookmark.findMany({
          where: { userId: session.user.id },
          select: { jobId: true }
        }).then(bookmarks => bookmarks.map(b => b.jobId))
      : Promise.resolve([])
  ])

  const totalPages = Math.ceil(totalCount / perPage)

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-primary-600 to-gray-900 bg-clip-text text-transparent">
            Find Your Next Opportunity
          </h1>
          <p className="text-lg text-gray-600 font-medium mb-8">
            Browse {totalCount} available job{totalCount !== 1 ? 's' : ''} from top companies
          </p>
        </div>

        <JobFilters selectedType={jobType} />

        {/* Sorting Options */}
        <div className="mb-6 flex flex-wrap gap-3 items-center">
          <span className="text-sm font-semibold text-gray-700">Sort by:</span>
          <Link
            href={`?${new URLSearchParams({ ...(jobType && { jobType }), sortBy: 'recent' }).toString()}`}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              !sortBy || sortBy === 'recent'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Most Recent
          </Link>
          <Link
            href={`?${new URLSearchParams({ ...(jobType && { jobType }), sortBy: 'views' }).toString()}`}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              sortBy === 'views'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Most Viewed
          </Link>
          <Link
            href={`?${new URLSearchParams({ ...(jobType && { jobType }), sortBy: 'company' }).toString()}`}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              sortBy === 'company'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Company (A-Z)
          </Link>
        </div>
        
        <JobList jobs={jobs} bookmarkedJobIds={bookmarkedJobIds} />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center gap-2">
            {page > 1 && (
              <Link
                href={`?${new URLSearchParams({ ...(jobType && { jobType }), ...(sortBy && { sortBy }), page: String(page - 1) }).toString()}`}
                className="px-4 py-2 bg-white border border-gray-300 rounded-glass hover:bg-gray-50 transition-colors duration-300 font-medium"
              >
                Previous
              </Link>
            )}
            
            <div className="flex gap-2">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                const pageNum = i + 1
                return (
                  <Link
                    key={pageNum}
                    href={`?${new URLSearchParams({ ...(jobType && { jobType }), ...(sortBy && { sortBy }), page: String(pageNum) }).toString()}`}
                    className={`px-4 py-2 rounded-glass font-medium transition-all duration-300 ${
                      page === pageNum
                        ? 'bg-primary-600 text-white'
                        : 'bg-white border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </Link>
                )
              })}
              {totalPages > 5 && (
                <>
                  <span className="px-2 py-2">...</span>
                  <Link
                    href={`?${new URLSearchParams({ ...(jobType && { jobType }), ...(sortBy && { sortBy }), page: String(totalPages) }).toString()}`}
                    className={`px-4 py-2 rounded-glass font-medium transition-all duration-300 ${
                      page === totalPages
                        ? 'bg-primary-600 text-white'
                        : 'bg-white border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {totalPages}
                  </Link>
                </>
              )}
            </div>

            {page < totalPages && (
              <Link
                href={`?${new URLSearchParams({ ...(jobType && { jobType }), ...(sortBy && { sortBy }), page: String(page + 1) }).toString()}`}
                className="px-4 py-2 bg-white border border-gray-300 rounded-glass hover:bg-gray-50 transition-colors duration-300 font-medium"
              >
                Next
              </Link>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
