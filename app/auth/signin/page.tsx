'use client'

import { Suspense } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import { useForm } from '@/lib/utils/useForm'
import { FormField, ErrorAlert, AuthLayout } from '@/lib/utils/auth-components'

function SignInForm() {
  const router = useRouter()
  const callbackUrl = useSearchParams().get('callbackUrl') || '/'
  
  const { formData, error, loading, handleChange, handleSubmit } = useForm(
    { email: '', password: '' },
    async (data) => {
      const result = await signIn('credentials', { ...data, redirect: false })
      if (result?.error) throw new Error('Invalid email or password')
      router.push(callbackUrl)
      router.refresh()
    }
  )

  return (
    <AuthLayout title="Sign In" subtitle="Welcome back! Sign in to your account">
      {error && <ErrorAlert message={error} />}
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField label="Email" id="email" name="email" type="email" required
          value={formData.email} onChange={handleChange} placeholder="your@email.com" autoComplete="email" />
        <FormField label="Password" id="password" name="password" type="password" required
          value={formData.password} onChange={handleChange} placeholder="••••••••" autoComplete="current-password" />
        <button type="submit" disabled={loading} className="btn-primary w-full py-3">
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-gray-600">
        Don&apos;t have an account?{' '}
        <Link href="/auth/signup" className="text-primary-600 hover:text-primary-700 font-semibold">Sign up</Link>
      </p>
    </AuthLayout>
  )
}

export default function SignInPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-md mx-auto px-4 py-12">
        <Suspense fallback={<div className="text-center glass rounded-glass p-8">Loading...</div>}>
          <SignInForm />
        </Suspense>
      </main>
    </div>
  )
}
