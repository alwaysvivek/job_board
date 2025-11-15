import { prisma } from '@/lib/prisma'
import JobList from '@/components/JobList'
import Header from '@/components/Header'
import FilterBar from '@/components/FilterBar'

export const revalidate = 60 // Revalidate every 60 seconds

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function HomePage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams
  const jobType = resolvedParams.jobType as string | undefined

  const jobs = await prisma.job.findMany({
    where: jobType ? { jobType } : {},
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

  // Transform jobs to match the Job type
  const transformedJobs = jobs.map(job => ({
    ...job,
    user: job.user ? {
      ...job.user,
      id: '',
      admin: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    } : undefined
  }))

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-primary-600 to-gray-900 bg-clip-text text-transparent">
            Find Your Next Opportunity
          </h1>
          <p className="text-lg text-gray-600 font-medium">
            Browse {jobs.length} available job{jobs.length !== 1 ? 's' : ''} from top companies
          </p>
        </div>

        <FilterBar selectedType={jobType} />
        
        <JobList jobs={transformedJobs} />
      </main>
    </div>
  )
}
