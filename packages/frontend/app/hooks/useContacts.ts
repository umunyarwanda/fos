import { useState, useEffect } from 'react'
import { contactsApi } from '~/services/contactsApi'
import type { IGetContactResDto } from '@shared/interfaces/contacts/response/IGetContactResDto'
import type { ICreateContactReqDto } from '@shared/interfaces/contacts/request/ICreateContactReqDto'
import type { IUpdateContactReqDto } from '@shared/interfaces/contacts/request/IUpdateContactReqDto'

export interface UseContactsReturn {
  contacts: IGetContactResDto[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
  getContactById: (id: number) => Promise<IGetContactResDto | null>
  createContact: (contactData: ICreateContactReqDto) => Promise<IGetContactResDto | null>
  updateContact: (id: number, contactData: IUpdateContactReqDto) => Promise<IGetContactResDto | null>
  deleteContact: (id: number) => Promise<boolean>
}

export function useContacts(): UseContactsReturn {
  const [contacts, setContacts] = useState<IGetContactResDto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchContacts = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const contactsResponse = await contactsApi.getAllContacts()

      if (contactsResponse.success && contactsResponse.data) {
        setContacts(contactsResponse.data)
      }
    } catch (err) {
      console.error('Error fetching contacts:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch contacts')
    } finally {
      setLoading(false)
    }
  }

  const getContactById = async (id: number): Promise<IGetContactResDto | null> => {
    try {
      const response = await contactsApi.getContactById(id)
      if (response.success && response.data) {
        return response.data
      }
      return null
    } catch (err) {
      console.error('Error fetching contact by ID:', err)
      return null
    }
  }

  const refetch = async () => {
    await fetchContacts()
  }

  const createContact = async (contactData: ICreateContactReqDto): Promise<IGetContactResDto | null> => {
    try {
      const response = await contactsApi.createContact(contactData)
      if (response.success && response.data) {
        // Refresh contacts list
        await refetch()
        return response.data
      }
      return null
    } catch (err) {
      console.error('Error creating contact:', err)
      throw err
    }
  }

  const updateContact = async (id: number, contactData: IUpdateContactReqDto): Promise<IGetContactResDto | null> => {
    try {
      const response = await contactsApi.updateContact(id, contactData)
      if (response.success && response.data) {
        // Refresh contacts list
        await refetch()
        return response.data
      }
      return null
    } catch (err) {
      console.error('Error updating contact:', err)
      throw err
    }
  }

  const deleteContact = async (id: number): Promise<boolean> => {
    try {
      const response = await contactsApi.deleteContact(id)
      if (response.success) {
        // Refresh contacts list
        await refetch()
        return true
      }
      return false
    } catch (err) {
      console.error('Error deleting contact:', err)
      throw err
    }
  }

  useEffect(() => {
    fetchContacts()
  }, [])

  return {
    contacts,
    loading,
    error,
    refetch,
    getContactById,
    createContact,
    updateContact,
    deleteContact
  }
}

export default useContacts