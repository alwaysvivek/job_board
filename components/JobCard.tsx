import Link from 'next/link'
import Image from 'next/image'
import { Job } from '@/types'

interface JobCardProps {
  job: Job
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <article className="card" role="listitem">
      <Link href={`/jobs/${job.id}`} className="block group">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors mb-1">
              {job.title}
            </h3>
            <p className="text-gray-600 text-sm">
              {job.jobAuthor || job.user?.name || 'Anonymous'}
            </p>
          </div>
          {job.avatar && (
            <Image
              src={job.avatar}
              alt={`${job.title} company logo`}
              width={48}
              height={48}
              className="rounded-lg object-cover ml-4"
            />
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
            {job.jobType}
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {job.location}
          </span>
          {job.remoteOk && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Remote OK
            </span>
          )}
        </div>

        <p className="text-gray-700 line-clamp-3 mb-4">
          {job.description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <span className="text-sm text-gray-500">
            Posted {new Date(job.createdAt).toLocaleDateString()}
          </span>
          <span className="text-primary-600 font-medium group-hover:underline" aria-label="View job details">
            View Details →
          </span>
        </div>
      </Link>
    </article>
  )
}
