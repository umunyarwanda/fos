import { apiRequest } from '~/utils/api'
import type { IResponseDto } from '@shared/interfaces/IResponseDto'
import type { IGetContactResDto } from '@shared/interfaces/contacts/response/IGetContactResDto'
import type { ICreateContactReqDto } from '@shared/interfaces/contacts/request/ICreateContactReqDto'
import type { IUpdateContactReqDto } from '@shared/interfaces/contacts/request/IUpdateContactReqDto'

const API_BASE_URL = 'http://localhost:3000/api'

// Contacts API functions
export const contactsApi = {
  // Get all contacts
  getAllContacts: (): Promise<IResponseDto<IGetContactResDto[]>> =>
    apiRequest('/contacts', {
      method: 'GET',
    }),

  // Get contact by ID
  getContactById: (id: number): Promise<IResponseDto<IGetContactResDto>> =>
    apiRequest(`/contacts/${id}`, {
      method: 'GET',
    }),

  // Create new contact
  createContact: (contactData: ICreateContactReqDto): Promise<IResponseDto<IGetContactResDto>> =>
    apiRequest('/contacts', {
      method: 'POST',
      body: JSON.stringify(contactData),
    }),

  // Update contact
  updateContact: (id: number, contactData: IUpdateContactReqDto): Promise<IResponseDto<IGetContactResDto>> =>
    apiRequest(`/contacts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(contactData),
    }),

  // Delete contact
  deleteContact: (id: number): Promise<IResponseDto<{ message: string }>> =>
    apiRequest(`/contacts/${id}`, {
      method: 'DELETE',
    }),
}

export default contactsApi