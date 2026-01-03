'use client'

import Link from 'next/link'
import { Job } from '@/types'
import JobActionButtons from './JobActionButtons'

interface JobDashboardListProps {
  jobs: Job[]
}

export default function JobDashboardList({ jobs }: JobDashboardListProps) {
  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <div key={job.id} className="card hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <Link 
                href={`/jobs/${job.id}`}
                className="group"
              >
                <h3 className="text-2xl font-semibold text-gray-900 group-hover:bg-gradient-to-r group-hover:from-primary-500 group-hover:to-primary-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 mb-2">
                  {job.title}
                </h3>
              </Link>
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
              <p className="text-gray-700 line-clamp-2 mb-4 leading-relaxed">
                {job.description}
              </p>
              <p className="text-sm text-gray-500 font-medium">
                Posted {new Date(job.createdAt).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </p>
            </div>
            
            <div className="ml-6">
              <JobActionButtons jobId={job.id} variant="inline" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
