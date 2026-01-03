'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface BookmarkButtonProps {
  jobId: string
  initialBookmarked?: boolean
}

export default function BookmarkButton({ jobId, initialBookmarked = false }: BookmarkButtonProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked)
  const [isLoading, setIsLoading] = useState(false)

  const handleToggleBookmark = async () => {
    if (!session) {
      router.push('/auth/signin')
      return
    }

    setIsLoading(true)
    
    try {
      if (isBookmarked) {
        const response = await fetch(`/api/bookmarks?jobId=${jobId}`, {
          method: 'DELETE',
        })

        if (!response.ok) {
          throw new Error('Failed to remove bookmark')
        }

        setIsBookmarked(false)
      } else {
        const response = await fetch('/api/bookmarks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ jobId }),
        })

        if (!response.ok) {
          throw new Error('Failed to add bookmark')
        }

        setIsBookmarked(true)
      }
      
      router.refresh()
    } catch (error) {
      console.error('Error toggling bookmark:', error)
      // Revert optimistic update on error
      setIsBookmarked(!isBookmarked)
    } finally {
      setIsLoading(false)
    }
  }

  if (!session) {
    return null
  }

  return (
    <button
      onClick={handleToggleBookmark}
      disabled={isLoading}
      className={`p-2 rounded-full transition-all duration-300 disabled:opacity-50 ${
        isBookmarked
          ? 'text-primary-600 bg-primary-50 hover:bg-primary-100'
          : 'text-gray-400 bg-gray-50 hover:bg-gray-100 hover:text-gray-600'
      }`}
      aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark this job'}
      title={isBookmarked ? 'Remove bookmark' : 'Bookmark this job'}
    >
      <svg 
        className="w-5 h-5" 
        fill={isBookmarked ? 'currentColor' : 'none'} 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" 
        />
      </svg>
    </button>
  )
}
