import { toast } from './toast'

export interface ApiError extends Error {
  status?: number
  error?: string
  statusCode?: number
}

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/'

export const customFetch = async (url: string, options: RequestInit = {}) => {
  const headers = new Headers(options.headers || {})
  headers.set('Content-Type', 'application/json')

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const data = await response.json()
    toast.error(data.error || 'An error occurred')
    
    const error: ApiError = new Error(data.error)
    error.status = response.status
    error.error = data.error
    error.statusCode = response.status
    throw error
  }

  return response.json()
}
