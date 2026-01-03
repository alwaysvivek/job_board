import { useState, ChangeEvent, FormEvent } from 'react'

export function useForm<T extends Record<string, any>>(
  initialState: T,
  onSubmit: (data: T) => Promise<void>
) {
  const [formData, setFormData] = useState<T>(initialState)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await onSubmit(formData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return { formData, setFormData, error, setError, loading, handleChange, handleSubmit }
}
