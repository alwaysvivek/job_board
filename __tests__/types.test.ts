import { describe, it, expect } from 'vitest'
import { JOB_TYPES } from '@/types'

describe('Job Types', () => {
  it('should have correct job types', () => {
    expect(JOB_TYPES).toEqual(['Full-time', 'Part-time', 'Contract', 'Freelance'])
  })

  it('should have 4 job types', () => {
    expect(JOB_TYPES).toHaveLength(4)
  })
})
