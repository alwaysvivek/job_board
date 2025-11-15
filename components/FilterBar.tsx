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
    <div className="glass rounded-glass p-4 mb-8" role="navigation" aria-label="Job type filters">
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
  )
}
