import Link from 'next/link'
import Image from 'next/image'
import { Job } from '@/types'

interface JobCardProps {
  job: Job
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <article className="card group cursor-pointer" role="listitem">
      <Link href={`/jobs/${job.id}`} className="block">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 group-hover:bg-gradient-to-r group-hover:from-primary-500 group-hover:to-primary-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 mb-2">
              {job.title}
            </h3>
            <p className="text-gray-600 text-sm font-medium">
              {job.jobAuthor || job.user?.name || 'Anonymous'}
            </p>
          </div>
          {job.avatar && (
            <Image
              src={job.avatar}
              alt={`${job.title} company logo`}
              width={56}
              height={56}
              className="rounded-glass object-cover ml-4 shadow-glass"
            />
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="tag bg-gradient-to-r from-primary-50 to-primary-100 text-primary-700 border-primary-200">
            {job.jobType}
          </span>
          <span className="tag bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 border-gray-200">
            📍 {job.location}
          </span>
          {job.remoteOk && (
            <span className="tag bg-gradient-to-r from-green-50 to-green-100 text-green-700 border-green-200">
              🌐 Remote OK
            </span>
          )}
        </div>

        <p className="text-gray-700 line-clamp-3 mb-5 leading-relaxed">
          {job.description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-white/40">
          <span className="text-sm text-gray-500 font-medium">
            Posted {new Date(job.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
          <span className="text-primary-600 font-semibold group-hover:translate-x-1 transition-transform duration-300 inline-flex items-center gap-2" aria-label="View job details">
            View Details 
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </Link>
    </article>
  )
}
