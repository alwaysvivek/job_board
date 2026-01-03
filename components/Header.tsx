'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

export default function Header() {
  const { data: session } = useSession()

  return (
    <header className="sticky top-0 z-50 glass" role="banner">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4" aria-label="Main navigation">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent hover:from-primary-600 hover:to-primary-700 transition-all duration-300">
            Job Board
          </Link>

          <div className="flex items-center space-x-3">
            {session ? (
              <>
                <Link
                  href="/bookmarks"
                  className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-300"
                  aria-label="Bookmarked jobs"
                >
                  Bookmarks
                </Link>
                <Link
                  href="/dashboard"
                  className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-300"
                  aria-label="My dashboard"
                >
                  My Jobs
                </Link>
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
                  className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-300"
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
