import { apiRequest } from '~/utils/api'
import type { IResponseDto } from '@shared/interfaces/IResponseDto'
import type { IGetCommissionResDto } from '@shared/interfaces/commissions/response/IGetCommissionResDto'
import type { ICreateCommissionReqDto } from '@shared/interfaces/commissions/request/ICreateCommissionReqDto'
import type { IUpdateCommissionReqDto } from '@shared/interfaces/commissions/request/IUpdateCommissionReqDto'

const API_BASE_URL = 'http://localhost:3000/api'

// Commissions API functions
export const commissionsApi = {
  // Get all commissions
  getAllCommissions: (): Promise<IResponseDto<IGetCommissionResDto[]>> =>
    apiRequest('/commissions', {
      method: 'GET',
    }),

  // Get commission by ID
  getCommissionById: (id: number): Promise<IResponseDto<IGetCommissionResDto>> =>
    apiRequest(`/commissions/${id}`, {
      method: 'GET',
    }),

  // Create new commission
  createCommission: (commissionData: ICreateCommissionReqDto): Promise<IResponseDto<IGetCommissionResDto>> =>
    apiRequest('/commissions', {
      method: 'POST',
      body: JSON.stringify(commissionData),
    }),

  // Update commission
  updateCommission: (id: number, commissionData: IUpdateCommissionReqDto): Promise<IResponseDto<IGetCommissionResDto>> =>
    apiRequest(`/commissions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(commissionData),
    }),

  // Delete commission
  deleteCommission: (id: number): Promise<IResponseDto<{ message: string }>> =>
    apiRequest(`/commissions/${id}`, {
      method: 'DELETE',
    }),
}

export default commissionsApi