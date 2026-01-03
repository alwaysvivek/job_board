'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'

interface JobActionsProps {
  jobId: string
  canEdit: boolean
}

export default function JobActions({ jobId, canEdit }: JobActionsProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  if (!canEdit) {
    return null
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    
    try {
      const response = await fetch(`/api/jobs/${jobId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to delete job')
      }

      router.push('/')
      router.refresh()
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to delete job')
      setIsDeleting(false)
      setShowConfirm(false)
    }
  }

  return (
    <div className="flex gap-3 mb-6">
      <Link
        href={`/jobs/${jobId}/edit`}
        className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-glass hover:bg-primary-700 transition-colors duration-300 font-medium shadow-glass"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        Edit Job
      </Link>
      
      {!showConfirm ? (
        <button
          onClick={() => setShowConfirm(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-glass hover:bg-red-700 transition-colors duration-300 font-medium shadow-glass"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Delete Job
        </button>
      ) : (
        <div className="inline-flex items-center gap-2">
          <span className="text-sm text-gray-700 font-medium">Are you sure?</span>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-4 py-2 bg-red-600 text-white rounded-glass hover:bg-red-700 transition-colors duration-300 font-medium text-sm disabled:opacity-50"
          >
            {isDeleting ? 'Deleting...' : 'Yes, Delete'}
          </button>
          <button
            onClick={() => setShowConfirm(false)}
            disabled={isDeleting}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-glass hover:bg-gray-400 transition-colors duration-300 font-medium text-sm disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  )
}
