export interface ErrorDetail {
  path: string
  message: string
}

export interface ApiError extends Error {
  status?: number
  data?: ErrorDetail[]
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
    const error: ApiError = new Error(data.error.message)
    error.status = response.status
    error.data = data.error.details
    error.statusCode = response.status
    throw error
  }

  if (response.status === 204) {
    return {
      message: 'No content',
    }
  }

  return response.json()
}
