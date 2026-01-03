import Link from 'next/link'
import { Job } from '@/types'
import JobCard from './JobCard'

interface JobListProps {
  jobs: Job[]
  bookmarkedJobIds?: string[]
}

export default function JobList({ jobs, bookmarkedJobIds = [] }: JobListProps) {
  if (jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-600">No jobs found</p>
        <p className="text-gray-500 mt-2">Check back later for new opportunities</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" role="list" aria-label="Job listings">
      {jobs.map((job) => (
        <JobCard 
          key={job.id} 
          job={job} 
          isBookmarked={bookmarkedJobIds.includes(job.id)} 
        />
      ))}
    </div>
  )
}
