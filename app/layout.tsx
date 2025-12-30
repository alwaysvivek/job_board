import './globals.css'
import type { Metadata } from 'next'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'Job Board - Find Your Next Opportunity',
  description: 'A modern job board with glassmorphism design for posting and finding jobs',
  keywords: ['jobs', 'careers', 'employment', 'hiring'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
