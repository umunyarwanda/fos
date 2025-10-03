import React, { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router'
import type { ILoginResDto } from '@shared/interfaces/auth/response/ILoginResDto'
import type { IRegisterResDto } from '@shared/interfaces/auth/response/IRegisterResDto'
import type { IResponseDto } from '@shared/interfaces/IResponseDto'

// Types
export interface User {
  id: number
  email: string
  username: string
  firstName: string
  lastName: string
  phone: string
  isActive: boolean
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  email: string
  username: string
  password: string
  confirmPassword: string
  firstName: string
  lastName: string
  phone?: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  register: (credentials: RegisterCredentials) => Promise<void>
  logout: () => void
  refreshToken: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

import { authApi } from '~/utils/api'

// Auth Provider Component
interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  const isAuthenticated = !!user && !!token

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedToken = localStorage.getItem('token')
        const storedUser = localStorage.getItem('user')

        if (storedToken && storedUser) {
          // Parse user from localStorage
          const user = JSON.parse(storedUser)
          setUser(user)
          setToken(storedToken)
        }
      } catch (error) {
        console.error('Auth initialization failed:', error)
        // Clear invalid data
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      } finally {
        setIsLoading(false)
      }
    }

    initializeAuth()
  }, [])

  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true)
      const response: IResponseDto<ILoginResDto> = await authApi.login(credentials)
      
      if (response.success && response.data) {
        const { user, token } = response.data
        
        // Store in localStorage
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
        
        // Update state
        setUser(user)
        setToken(token)
        
        // Navigate to dashboard
        navigate('/dashboard')
      } else {
        throw new Error('Login failed')
      }
    } catch (error) {
      console.error('Login error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (credentials: RegisterCredentials) => {
    try {
      setIsLoading(true)
      const response: IResponseDto<IRegisterResDto> = await authApi.register(credentials)
      
      if (response.success && response.data) {
        const { user, token } = response.data
        
        // Store in localStorage
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
        
        // Update state
        setUser(user)
        setToken(token)
        
        // Navigate to dashboard
        navigate('/dashboard')
      } else {
        throw new Error('Registration failed')
      }
    } catch (error) {
      console.error('Registration error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    // Clear localStorage
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    
    // Clear state
    setUser(null)
    setToken(null)
    
    // Navigate to login
    navigate('/login')
  }

  const refreshToken = async () => {
    // Since there's no verify endpoint, we'll just check localStorage
    // The token will be validated on the next API request
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')
    
    if (storedToken && storedUser) {
      try {
        const user = JSON.parse(storedUser)
        setUser(user)
        setToken(storedToken)
      } catch (error) {
        console.error('Token refresh failed:', error)
        logout()
      }
    } else {
      logout()
    }
  }

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    refreshToken,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthContext