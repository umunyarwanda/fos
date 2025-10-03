import type { IResponseDto } from '@shared/interfaces/IResponseDto'
import type { IUploadResDto } from '@shared/interfaces/upload/response/IUploadResDto'

const API_BASE_URL = 'http://localhost:3000/api'

export const uploadApi = {
  // Upload single image as multipart/form-data (like Postman)
  async uploadSingleImage(file: File): Promise<IUploadResDto> {
    const token = localStorage.getItem('token')
    console.log('Token for upload:', token ? 'Present' : 'Missing')
    
    if (!token) {
      throw new Error('No authentication token found')
    }

    // Create FormData like Postman example
    const formData = new FormData()
    formData.append('image', file)

    const response = await fetch(`${API_BASE_URL}/upload/single`, {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${token}`,
        // Don't set Content-Type - let browser set it with boundary
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Network error' }))
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
    }

    const result: IResponseDto<IUploadResDto> = await response.json()
    return result.data
  },

  // Upload multiple images (like Postman example)
  async uploadMultipleImages(files: File[]): Promise<IUploadResDto[]> {
    const token = localStorage.getItem('token')
    console.log('Token for multiple upload:', token ? 'Present' : 'Missing')
    
    if (!token) {
      throw new Error('No authentication token found')
    }

    // Create FormData like Postman example - multiple files with same field name
    const formData = new FormData()
    files.forEach((file) => {
      formData.append('images', file)  // Same field name for all files
    })

    const response = await fetch(`${API_BASE_URL}/upload/multiple`, {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${token}`,
        // Don't set Content-Type - let browser set it with boundary
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Network error' }))
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
    }

    const result: IResponseDto<IUploadResDto[]> = await response.json()
    return result.data
  },

  // Delete image
  async deleteImage(publicId: string): Promise<void> {
    const token = localStorage.getItem('token')
    
    if (!token) {
      throw new Error('No authentication token found')
    }

    const response = await fetch(`${API_BASE_URL}/upload/${publicId}`, {
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