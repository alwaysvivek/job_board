'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import { useForm } from '@/lib/utils/useForm'
import { FormField, ErrorAlert, AuthLayout } from '@/lib/utils/auth-components'

export default function SignUpPage() {
  const router = useRouter()
  
  const { formData, error, setError, loading, handleChange, handleSubmit } = useForm(
    { name: '', email: '', password: '', confirmPassword: '' },
    async (data) => {
      if (data.password !== data.confirmPassword) {
        throw new Error('Passwords do not match')
      }
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: data.name, email: data.email, password: data.password }),
      })
      if (!res.ok) {
        const json = await res.json()
        throw new Error(json.error || 'Failed to sign up')
      }
      router.push('/auth/signin?message=Account created successfully')
    }
  )

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-md mx-auto px-4 py-12">
        <AuthLayout title="Sign Up" subtitle="Create your account to get started">
          {error && <ErrorAlert message={error} />}
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormField label="Name" id="name" name="name" type="text" required
              value={formData.name} onChange={handleChange} placeholder="John Doe" autoComplete="name" />
            <FormField label="Email" id="email" name="email" type="email" required
              value={formData.email} onChange={handleChange} placeholder="your@email.com" autoComplete="email" />
            <FormField label="Password" id="password" name="password" type="password" required minLength={8}
              value={formData.password} onChange={handleChange} placeholder="••••••••" autoComplete="new-password" />
            <FormField label="Confirm Password" id="confirmPassword" name="confirmPassword" type="password" required minLength={8}
              value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••" autoComplete="new-password" />
            <button type="submit" disabled={loading} className="btn-primary w-full py-3">
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/auth/signin" className="text-primary-600 hover:text-primary-700 font-semibold">Sign in</Link>
          </p>
        </AuthLayout>
      </main>
    </div>
  )
}
