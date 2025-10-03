import { useState, useEffect } from 'react'
import { eventsApi } from '~/services/eventsApi'
import type { IGetEventResDto } from '@shared/interfaces/events/response/IGetEventResDto'
import type { ICreateEventReqDto } from '@shared/interfaces/events/request/ICreateEventReqDto'
import type { IUpdateEventReqDto } from '@shared/interfaces/events/request/IUpdateEventReqDto'

export interface UseEventsReturn {
  events: IGetEventResDto[]
  featuredEvents: IGetEventResDto[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
  getEventById: (id: number) => Promise<IGetEventResDto | null>
  createEvent: (eventData: ICreateEventReqDto) => Promise<IGetEventResDto | null>
  updateEvent: (id: number, eventData: IUpdateEventReqDto) => Promise<IGetEventResDto | null>
  deleteEvent: (id: number) => Promise<boolean>
}

export function useEvents(): UseEventsReturn {
  const [events, setEvents] = useState<IGetEventResDto[]>([])
  const [featuredEvents, setFeaturedEvents] = useState<IGetEventResDto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchEvents = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const [eventsResponse, featuredResponse] = await Promise.all([
        eventsApi.getAllEvents(),
        eventsApi.getFeaturedEvents()
      ])

      if (eventsResponse.success && eventsResponse.data) {
        setEvents(eventsResponse.data)
      }

      if (featuredResponse.success && featuredResponse.data) {
        setFeaturedEvents(featuredResponse.data)
      }
    } catch (err) {
      console.error('Error fetching events:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch events')
    } finally {
      setLoading(false)
    }
  }

  const getEventById = async (id: number): Promise<IGetEventResDto | null> => {
    try {
      const response = await eventsApi.getEventById(id)
      if (response.success && response.data) {
        return response.data
      }
      return null
    } catch (err) {
      console.error('Error fetching event by ID:', err)
      return null
    }
  }

  const refetch = async () => {
    await fetchEvents()
  }

  const createEvent = async (eventData: ICreateEventReqDto): Promise<IGetEventResDto | null> => {
    try {
      const response = await eventsApi.createEvent(eventData)
      if (response.success && response.data) {
        // Refresh events list
        await refetch()
        return response.data
      }
      return null
    } catch (err) {
      console.error('Error creating event:', err)
      throw err
    }
  }

  const updateEvent = async (id: number, eventData: IUpdateEventReqDto): Promise<IGetEventResDto | null> => {
    try {
      const response = await eventsApi.updateEvent(id, eventData)
      if (response.success && response.data) {
        // Refresh events list
        await refetch()
        return response.data
      }
      return null
    } catch (err) {
      console.error('Error updating event:', err)
      throw err
    }
  }

  const deleteEvent = async (id: number): Promise<boolean> => {
    try {
      const response = await eventsApi.deleteEvent(id)
      if (response.success) {
        // Refresh events list
        await refetch()
        return true
      }
      return false
    } catch (err) {
      console.error('Error deleting event:', err)
      throw err
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  return {
    events,
    featuredEvents,
    loading,
    error,
    refetch,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
  }
}

export default useEvents