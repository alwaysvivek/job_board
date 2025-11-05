'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

export default function Header() {
  const { data: session } = useSession()

  return (
    <header className="bg-white shadow-sm" role="banner">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4" aria-label="Main navigation">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary-600 hover:text-primary-700 transition-colors">
            Job Board
          </Link>

          <div className="flex items-center space-x-4">
            {session ? (
              <>
                <Link
                  href="/jobs/new"
                  className="btn-primary"
                  aria-label="Post a new job"
                >
                  Post a Job
                </Link>
                <button
                  onClick={() => signOut()}
                  className="btn-secondary"
                  aria-label="Sign out"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="btn-primary"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}
