import { useState, useEffect } from 'react'
import { specialProgramsApi } from '../services/specialProgramsApi'
import type { IGetSpecialProgramResDto } from '@shared/interfaces/special-programs/response/IGetSpecialProgramResDto'
import type { ICreateSpecialProgramReqDto } from '@shared/interfaces/special-programs/request/ICreateSpecialProgramReqDto'
import type { IUpdateSpecialProgramReqDto } from '@shared/interfaces/special-programs/request/IUpdateSpecialProgramReqDto'

export const useSpecialPrograms = () => {
  const [specialPrograms, setSpecialPrograms] = useState<IGetSpecialProgramResDto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch all special programs
  const fetchSpecialPrograms = async () => {
    try {
      setLoading(true)
      setError(null)
      const programs = await specialProgramsApi.getAllSpecialPrograms()
      setSpecialPrograms(programs)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch special programs')
    } finally {
      setLoading(false)
    }
  }

  // Refetch data
  const refetch = () => {
    fetchSpecialPrograms()
  }

  // Get special program by ID
  const getSpecialProgramById = async (id: number): Promise<IGetSpecialProgramResDto | null> => {
    try {
      return await specialProgramsApi.getSpecialProgramById(id)
    } catch (err) {
      console.error('Error fetching special program:', err)
      return null
    }
  }

  // Create special program
  const createSpecialProgram = async (data: ICreateSpecialProgramReqDto): Promise<void> => {
    try {
      const newProgram = await specialProgramsApi.createSpecialProgram(data)
      setSpecialPrograms(prev => [newProgram, ...prev])
    } catch (err) {
      throw err
    }
  }

  // Update special program
  const updateSpecialProgram = async (id: number, data: IUpdateSpecialProgramReqDto): Promise<void> => {
    try {
      const updatedProgram = await specialProgramsApi.updateSpecialProgram(id, data)
      setSpecialPrograms(prev => prev.map(program => 
        program.id === id ? updatedProgram : program
      ))
    } catch (err) {
      throw err
    }
  }

  // Delete special program
  const deleteSpecialProgram = async (id: number): Promise<void> => {
    try {
      await specialProgramsApi.deleteSpecialProgram(id)
      setSpecialPrograms(prev => prev.filter(program => program.id !== id))
    } catch (err) {
      throw err
    }
  }

  // Fetch data on mount
  useEffect(() => {
    fetchSpecialPrograms()
  }, [])

  return {
    specialPrograms,
    loading,
    error,
    refetch,
    getSpecialProgramById,
    createSpecialProgram,
    updateSpecialProgram,
    deleteSpecialProgram
  }
}