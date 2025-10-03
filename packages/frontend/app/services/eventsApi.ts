import { apiRequest } from '~/utils/api'
import type { IResponseDto } from '@shared/interfaces/IResponseDto'
import type { IGetEventResDto } from '@shared/interfaces/events/response/IGetEventResDto'
import type { ICreateEventReqDto } from '@shared/interfaces/events/request/ICreateEventReqDto'
import type { IUpdateEventReqDto } from '@shared/interfaces/events/request/IUpdateEventReqDto'

const API_BASE_URL = 'http://localhost:3000/api'

// Events API functions
export const eventsApi = {
  // Get all events
  getAllEvents: (): Promise<IResponseDto<IGetEventResDto[]>> =>
    apiRequest('/events', {
      method: 'GET',
    }),

  // Get featured events
  getFeaturedEvents: (): Promise<IResponseDto<IGetEventResDto[]>> =>
    apiRequest('/events/featured', {
      method: 'GET',
    }),

  // Get event by ID
  getEventById: (id: number): Promise<IResponseDto<IGetEventResDto>> =>
    apiRequest(`/events/${id}`, {
      method: 'GET',
    }),

  // Create new event
  createEvent: (eventData: ICreateEventReqDto): Promise<IResponseDto<IGetEventResDto>> =>
    apiRequest('/events', {
      method: 'POST',
      body: JSON.stringify(eventData),
    }),

  // Update event
  updateEvent: (id: number, eventData: IUpdateEventReqDto): Promise<IResponseDto<IGetEventResDto>> =>
    apiRequest(`/events/${id}`, {
      method: 'PUT',
      body: JSON.stringify(eventData),
    }),

  // Delete event
  deleteEvent: (id: number): Promise<IResponseDto<{ message: string }>> =>
    apiRequest(`/events/${id}`, {
      method: 'DELETE',
    }),
}

export default eventsApi