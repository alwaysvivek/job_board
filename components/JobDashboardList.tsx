'use client'

import Link from 'next/link'
import { Job } from '@/types'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface JobDashboardListProps {
  jobs: Job[]
}

export default function JobDashboardList({ jobs }: JobDashboardListProps) {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (jobId: string) => {
    if (!confirm('Are you sure you want to delete this job?')) {
      return
    }

    setDeletingId(jobId)
    
    try {
      const response = await fetch(`/api/jobs/${jobId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to delete job')
      }

      router.refresh()
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to delete job')
      setDeletingId(null)
    }
  }

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
            
            <div className="flex flex-col gap-2 ml-6">
              <Link
                href={`/jobs/${job.id}/edit`}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-glass hover:bg-primary-700 transition-colors duration-300 font-medium text-sm whitespace-nowrap"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </Link>
              <button
                onClick={() => handleDelete(job.id)}
                disabled={deletingId === job.id}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-glass hover:bg-red-700 transition-colors duration-300 font-medium text-sm disabled:opacity-50 whitespace-nowrap"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                {deletingId === job.id ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
