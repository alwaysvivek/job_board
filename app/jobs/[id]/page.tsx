import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'

interface PageProps {
  params: { id: string }
}

export default async function JobDetailPage({ params }: PageProps) {
  const job = await prisma.job.findUnique({
    where: { id: params.id },
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link 
          href="/" 
          className="text-primary-600 hover:text-primary-700 font-medium mb-6 inline-block"
          aria-label="Back to all jobs"
        >
          ← Back to Jobs
        </Link>

        <article className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {job.title}
              </h1>
              <p className="text-lg text-gray-600">
                {job.jobAuthor || job.user?.name || 'Anonymous'}
              </p>
            </div>
            {job.avatar && (
              <img
                src={job.avatar}
                alt={`${job.title} company logo`}
                className="w-20 h-20 rounded-lg object-cover ml-6"
              />
            )}
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
              {job.jobType}
            </span>
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
              📍 {job.location}
            </span>
            {job.remoteOk && (
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800">
                🌐 Remote OK
              </span>
            )}
          </div>

          <div className="prose max-w-none mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
            <div className="text-gray-700 whitespace-pre-wrap">
              {job.description}
            </div>
          </div>

          {job.url && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Company Website</h3>
              <a
                href={job.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 hover:underline"
              >
                {job.url}
              </a>
            </div>
          )}

          <div className="pt-6 border-t border-gray-200">
            <a
              href={job.applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-block text-center text-lg"
              aria-label={`Apply for ${job.title}`}
            >
              Apply Now
            </a>
            <p className="text-sm text-gray-500 mt-4">
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
