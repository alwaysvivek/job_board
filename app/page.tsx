import { prisma } from '@/lib/prisma'
import JobList from '@/components/JobList'
import Header from '@/components/Header'
import FilterBar from '@/components/FilterBar'

export const revalidate = 60 // Revalidate every 60 seconds

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function HomePage({ searchParams }: PageProps) {
  const jobType = searchParams.jobType as string | undefined

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Find Your Next Opportunity
          </h1>
          <p className="text-lg text-gray-600">
            Browse {jobs.length} available job{jobs.length !== 1 ? 's' : ''} from top companies
          </p>
        </div>

        <FilterBar selectedType={jobType} />
        
        <JobList jobs={jobs} />
      </main>
    </div>
  )
}
