import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import JobActions from '@/components/JobActions'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function JobDetailPage({ params }: PageProps) {
  const session = await getServerSession(authOptions)
  const { id } = await params
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
    notFound()
  }

  // Check if current user can edit this job
  let canEdit = false
  if (session?.user?.id) {
    const currentUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { admin: true },
    })
    canEdit = job.userId === session.user.id || currentUser?.admin === true
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link 
          href="/" 
          className="text-primary-600 hover:text-primary-700 font-semibold mb-8 inline-flex items-center gap-2 transition-colors duration-300"
          aria-label="Back to all jobs"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Jobs
        </Link>

        <JobActions jobId={job.id} canEdit={canEdit} />

        <article className="glass rounded-glass p-8 md:p-10">
          <div className="flex items-start justify-between mb-8">
            <div className="flex-1">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-primary-600 bg-clip-text text-transparent mb-3">
                {job.title}
              </h1>
              <p className="text-lg text-gray-700 font-medium">
                {job.jobAuthor || job.user?.name || 'Anonymous'}
              </p>
            </div>
            {job.avatar && (
              <Image
                src={job.avatar}
                alt={`${job.title} company logo`}
                width={80}
                height={80}
                className="rounded-glass object-cover ml-6 shadow-glass"
              />
            )}
          </div>

          <div className="flex flex-wrap gap-3 mb-8">
            <span className="tag bg-gradient-to-r from-primary-50 to-primary-100 text-primary-700 border-primary-200 text-sm">
              {job.jobType}
            </span>
            <span className="tag bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 border-gray-200 text-sm">
              📍 {job.location}
            </span>
            {job.remoteOk && (
              <span className="tag bg-gradient-to-r from-green-50 to-green-100 text-green-700 border-green-200 text-sm">
                🌐 Remote OK
              </span>
            )}
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
            <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
              {job.description}
            </div>
          </div>

          {job.url && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Company Website</h3>
              <a
                href={job.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 font-medium hover:underline transition-colors duration-300"
              >
                {job.url}
              </a>
            </div>
          )}

          <div className="pt-8 border-t border-white/40">
            <a
              href={job.applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-block text-center text-lg px-12 py-4"
              aria-label={`Apply for ${job.title}`}
            >
              Apply Now
            </a>
            <p className="text-sm text-gray-500 mt-6 font-medium">
              Posted on {new Date(job.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </article>
      </main>
    </div>
  )
}
