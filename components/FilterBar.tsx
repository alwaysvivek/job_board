'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { JOB_TYPES } from '@/types'

interface FilterBarProps {
  selectedType?: string
}

export default function FilterBar({ selectedType }: FilterBarProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6" role="navigation" aria-label="Job type filters">
      <div className="flex flex-wrap gap-2">
        <Link
          href="/"
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            !selectedType
              ? 'bg-primary-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedType === type
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              aria-current={selectedType === type ? 'page' : undefined}
            >
              {type}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
