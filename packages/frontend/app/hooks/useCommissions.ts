import { useState, useEffect } from 'react'
import { commissionsApi } from '~/services/commissionsApi'
import type { IGetCommissionResDto } from '@shared/interfaces/commissions/response/IGetCommissionResDto'
import type { ICreateCommissionReqDto } from '@shared/interfaces/commissions/request/ICreateCommissionReqDto'
import type { IUpdateCommissionReqDto } from '@shared/interfaces/commissions/request/IUpdateCommissionReqDto'

export interface UseCommissionsReturn {
  commissions: IGetCommissionResDto[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
  getCommissionById: (id: number) => Promise<IGetCommissionResDto | null>
  createCommission: (commissionData: ICreateCommissionReqDto) => Promise<IGetCommissionResDto | null>
  updateCommission: (id: number, commissionData: IUpdateCommissionReqDto) => Promise<IGetCommissionResDto | null>
  deleteCommission: (id: number) => Promise<boolean>
}

export function useCommissions(): UseCommissionsReturn {
  const [commissions, setCommissions] = useState<IGetCommissionResDto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCommissions = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const commissionsResponse = await commissionsApi.getAllCommissions()

      if (commissionsResponse.success && commissionsResponse.data) {
        setCommissions(commissionsResponse.data)
      }
    } catch (err) {
      console.error('Error fetching commissions:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch commissions')
    } finally {
      setLoading(false)
    }
  }

  const getCommissionById = async (id: number): Promise<IGetCommissionResDto | null> => {
    try {
      const response = await commissionsApi.getCommissionById(id)
      if (response.success && response.data) {
        return response.data
      }
      return null
    } catch (err) {
      console.error('Error fetching commission by ID:', err)
      return null
    }
  }

  const refetch = async () => {
    await fetchCommissions()
  }

  const createCommission = async (commissionData: ICreateCommissionReqDto): Promise<IGetCommissionResDto | null> => {
    try {
      const response = await commissionsApi.createCommission(commissionData)
      if (response.success && response.data) {
        // Refresh commissions list
        await refetch()
        return response.data
      }
      return null
    } catch (err) {
      console.error('Error creating commission:', err)
      throw err
    }
  }

  const updateCommission = async (id: number, commissionData: IUpdateCommissionReqDto): Promise<IGetCommissionResDto | null> => {
    try {
      const response = await commissionsApi.updateCommission(id, commissionData)
      if (response.success && response.data) {
        // Refresh commissions list
        await refetch()
        return response.data
      }
      return null
    } catch (err) {
      console.error('Error updating commission:', err)
      throw err
    }
  }

  const deleteCommission = async (id: number): Promise<boolean> => {
    try {
      const response = await commissionsApi.deleteCommission(id)
      if (response.success) {
        // Refresh commissions list
        await refetch()
        return true
      }
      return false
    } catch (err) {
      console.error('Error deleting commission:', err)
      throw err
    }
  }

  useEffect(() => {
    fetchCommissions()
  }, [])

  return {
    commissions,
    loading,
    error,
    refetch,
    getCommissionById,
    createCommission,
    updateCommission,
    deleteCommission
  }
}

export default useCommissions