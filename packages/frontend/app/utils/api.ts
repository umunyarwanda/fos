// API utility functions
import type { IResponseDto } from '@shared/interfaces/IResponseDto'
import type { ILoginResDto } from '@shared/interfaces/auth/response/ILoginResDto'
import type { IRegisterResDto } from '@shared/interfaces/auth/response/IRegisterResDto'
import { BASE_URL } from '@shared/variables/urls'

const API_BASE_URL = BASE_URL

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public response?: Response
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`
  const token = localStorage.getItem('token')
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  }

  try {
    const response = await fetch(url, config)
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Network error' }))
      throw new ApiError(
        errorData.message || `HTTP error! status: ${response.status}`,
        response.status,
        response
      )
    }

    return await response.json()
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    console.error('API request failed:', error)
    throw new ApiError('Network request failed')
  }
}

// Auth API functions
export const authApi = {
  login: (credentials: { email: string; password: string }): Promise<IResponseDto<ILoginResDto>> =>
    apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  register: (credentials: {
    email: string
    username: string
    password: string
    confirmPassword: string
    firstName: string
    lastName: string
    phone?: string
  }): Promise<IResponseDto<IRegisterResDto>> =>
    apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  // Note: No verify endpoint in backend, tokens are validated on each request
}

export default apiRequest