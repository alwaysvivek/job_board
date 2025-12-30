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
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Post a New Job
        </h1>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800">
              <strong>Posting Fee:</strong> $300.00 - Your job will be featured on our platform and reach thousands of qualified candidates.
            </p>
          </div>
          
          <JobForm />
        </div>
      </main>
    </div>
  )
}
