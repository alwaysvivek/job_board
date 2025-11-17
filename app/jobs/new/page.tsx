import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import Header from '@/components/Header'
import JobForm from '@/components/JobForm'

export default async function NewJobPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/signin?callbackUrl=/jobs/new')
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-gray-900 to-primary-600 bg-clip-text text-transparent">
          Post a New Job
        </h1>
        <p className="text-gray-600 mb-8 text-lg">
          Share your opportunity with thousands of qualified candidates
        </p>
        
        <div className="glass rounded-glass p-8 md:p-10">
          <JobForm />
        </div>
      </main>
    </div>
  )
}
