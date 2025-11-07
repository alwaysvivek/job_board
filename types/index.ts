export interface Job {
  id: string
  title: string
  description: string
  url?: string | null
  jobType: string
  location: string
  jobAuthor?: string | null
  remoteOk: boolean
  applyUrl: string
  avatar?: string | null
  userId: string
  createdAt: Date
  updatedAt: Date
  user?: User
}

export interface User {
  id: string
  name?: string | null
  email: string
  image?: string | null
  admin: boolean
  stripeId?: string | null
  cardBrand?: string | null
  cardLast4?: string | null
  cardExpMonth?: string | null
  cardExpYear?: string | null
  expiresAt?: Date | null
  createdAt: Date
  updatedAt: Date
}

export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Freelance'

export const JOB_TYPES: JobType[] = ['Full-time', 'Part-time', 'Contract', 'Freelance']

export interface JobFormData {
  title: string
  description: string
  url?: string
  jobType: JobType
  location: string
  jobAuthor?: string
  remoteOk: boolean
  applyUrl: string
  avatar?: string
}
