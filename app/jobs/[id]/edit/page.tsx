import { prisma } from '@/lib/prisma'
import { notFound, redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import JobForm from '@/components/JobForm'
import Header from '@/components/Header'
import Link from 'next/link'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditJobPage({ params }: PageProps) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.id) {
    redirect('/auth/signin')
  }

  const { id } = await params
  const job = await prisma.job.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          id: true,
          admin: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  })

  if (!job) {
    notFound()
  }

  // Check if user owns the job or is admin
  const currentUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { admin: true },
  })

  if (job.userId !== session.user.id && !currentUser?.admin) {
    redirect('/')
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link 
          href={`/jobs/${job.id}`}
          className="text-primary-600 hover:text-primary-700 font-semibold mb-8 inline-flex items-center gap-2 transition-colors duration-300"
          aria-label="Back to job"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Job
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-primary-600 bg-clip-text text-transparent mb-3">
            Edit Job
          </h1>
          <p className="text-lg text-gray-600 font-medium">
            Update the details for this job posting
          </p>
        </div>

        <div className="card">
          <JobForm job={job} mode="edit" />
        </div>
      </main>
    </div>
  )
}
