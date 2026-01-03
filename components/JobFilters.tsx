'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { JOB_TYPES } from '@/types'

interface JobFiltersProps {
  selectedType?: string
}

export default function JobFilters({ selectedType }: JobFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    } else {
      router.push('/')
    }
  }

  return (
    <div className="space-y-6 mb-8">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="w-full max-w-3xl mx-auto">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search jobs by title, company, location..."
            className="input-field pr-12 text-lg py-4"
            aria-label="Search jobs"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-primary-600 hover:text-primary-700 transition-colors duration-300"
            aria-label="Submit search"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </form>

      {/* Filter Bar */}
      <div className="glass rounded-glass p-4" role="navigation" aria-label="Job type filters">
        <div className="flex flex-wrap gap-3">
          <Link
            href="/"
            className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
              !selectedType
                ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-glass'
                : 'glass-dark text-gray-700 hover:bg-white/70'
            }`}
            aria-current={!selectedType ? 'page' : undefined}
          >
            All Jobs
          </Link>
          {JOB_TYPES.map((type) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set('jobType', type)
            
            return (
              <Link
                key={type}
                href={`${pathname}?${params.toString()}`}
                className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                  selectedType === type
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-glass'
                    : 'glass-dark text-gray-700 hover:bg-white/70'
                }`}
                aria-current={selectedType === type ? 'page' : undefined}
              >
                {type}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
