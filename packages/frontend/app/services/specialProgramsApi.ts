import type { IResponseDto } from '@shared/interfaces/IResponseDto'
import type { IGetSpecialProgramResDto } from '@shared/interfaces/special-programs/response/IGetSpecialProgramResDto'
import type { ICreateSpecialProgramReqDto } from '@shared/interfaces/special-programs/request/ICreateSpecialProgramReqDto'
import type { IUpdateSpecialProgramReqDto } from '@shared/interfaces/special-programs/request/IUpdateSpecialProgramReqDto'

const API_BASE_URL = 'http://localhost:3000/api'

export const specialProgramsApi = {
  // Get all special programs
  async getAllSpecialPrograms(): Promise<IGetSpecialProgramResDto[]> {
    const token = localStorage.getItem('token')
    
    if (!token) {
      throw new Error('No authentication token found')
    }

    const response = await fetch(`${API_BASE_URL}/special-programs`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Network error' }))
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
    }

    const result: IResponseDto<IGetSpecialProgramResDto[]> = await response.json()
    return result.data
  },


  // Get special program by ID
  async getSpecialProgramById(id: number): Promise<IGetSpecialProgramResDto> {
    const token = localStorage.getItem('token')
    
    if (!token) {
      throw new Error('No authentication token found')
    }

    const response = await fetch(`${API_BASE_URL}/special-programs/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Network error' }))
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
    }

    const result: IResponseDto<IGetSpecialProgramResDto> = await response.json()
    return result.data
  },

  // Create special program
  async createSpecialProgram(data: ICreateSpecialProgramReqDto): Promise<IGetSpecialProgramResDto> {
    const token = localStorage.getItem('token')
    
    if (!token) {
      throw new Error('No authentication token found')
    }

    const response = await fetch(`${API_BASE_URL}/special-programs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Network error' }))
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
    }

    const result: IResponseDto<IGetSpecialProgramResDto> = await response.json()
    return result.data
  },

  // Update special program
  async updateSpecialProgram(id: number, data: IUpdateSpecialProgramReqDto): Promise<IGetSpecialProgramResDto> {
    const token = localStorage.getItem('token')
    
    if (!token) {
      throw new Error('No authentication token found')
    }

    const response = await fetch(`${API_BASE_URL}/special-programs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Network error' }))
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
    }

    const result: IResponseDto<IGetSpecialProgramResDto> = await response.json()
    return result.data
  },

  // Delete special program
  async deleteSpecialProgram(id: number): Promise<void> {
    const token = localStorage.getItem('token')
    
    if (!token) {
      throw new Error('No authentication token found')
    }

    const response = await fetch(`${API_BASE_URL}/special-programs/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Network error' }))
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
    }
  }
}