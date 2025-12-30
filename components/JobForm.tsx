'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { JOB_TYPES } from '@/types'

export default function JobForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    jobType: 'Full-time',
    location: '',
    jobAuthor: '',
    remoteOk: false,
    applyUrl: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to create job')
      }

      const job = await response.json()
      router.push(`/jobs/${job.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 glass-dark border-red-300 rounded-glass" role="alert">
          <p className="text-red-700 font-medium">{error}</p>
        </div>
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
          Job Title *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          required
          value={formData.title}
          onChange={handleChange}
          className="input-field"
          placeholder="e.g. Senior React Developer"
        />
      </div>

      <div>
        <label htmlFor="jobAuthor" className="block text-sm font-semibold text-gray-700 mb-2">
          Company Name *
        </label>
        <input
          type="text"
          id="jobAuthor"
          name="jobAuthor"
          required
          value={formData.jobAuthor}
          onChange={handleChange}
          className="input-field"
          placeholder="e.g. Acme Corp"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="jobType" className="block text-sm font-semibold text-gray-700 mb-2">
            Job Type *
          </label>
          <select
            id="jobType"
            name="jobType"
            required
            value={formData.jobType}
            onChange={handleChange}
            className="input-field"
          >
            {JOB_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2">
            Location *
          </label>
          <input
            type="text"
            id="location"
            name="location"
            required
            value={formData.location}
            onChange={handleChange}
            className="input-field"
            placeholder="e.g. San Francisco, CA"
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
          Job Description *
        </label>
        <textarea
          id="description"
          name="description"
          required
          value={formData.description}
          onChange={handleChange}
          rows={8}
          className="input-field resize-none"
          placeholder="Describe the role, requirements, and benefits..."
        />
      </div>

      <div>
        <label htmlFor="applyUrl" className="block text-sm font-semibold text-gray-700 mb-2">
          Application URL *
        </label>
        <input
          type="url"
          id="applyUrl"
          name="applyUrl"
          required
          value={formData.applyUrl}
          onChange={handleChange}
          className="input-field"
          placeholder="https://company.com/apply"
        />
      </div>

      <div>
        <label htmlFor="url" className="block text-sm font-semibold text-gray-700 mb-2">
          Company Website
        </label>
        <input
          type="url"
          id="url"
          name="url"
          value={formData.url}
          onChange={handleChange}
          className="input-field"
          placeholder="https://company.com"
        />
      </div>

      <div className="flex items-center space-x-3 glass-dark p-4 rounded-glass">
        <input
          type="checkbox"
          id="remoteOk"
          name="remoteOk"
          checked={formData.remoteOk}
          onChange={handleChange}
          className="h-5 w-5 text-primary-600 focus:ring-primary-500 border-gray-300 rounded-lg cursor-pointer"
        />
        <label htmlFor="remoteOk" className="text-sm font-medium text-gray-700 cursor-pointer">
          🌐 This is a remote position
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full text-lg py-4"
      >
        {loading ? 'Posting Job...' : 'Post Job'}
      </button>
    </form>
  )
}
