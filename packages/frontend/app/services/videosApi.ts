import { apiRequest } from '~/utils/api'
import type { IResponseDto } from '@shared/interfaces/IResponseDto'
import type { IGetVideoResDto } from '@shared/interfaces/videos/response/IGetVideoResDto'
import type { ICreateVideoReqDto } from '@shared/interfaces/videos/request/ICreateVideoReqDto'
import type { IUpdateVideoReqDto } from '@shared/interfaces/videos/request/IUpdateVideoReqDto'

const API_BASE_URL = 'http://localhost:3000/api'

// Videos API functions
export const videosApi = {
  // Get all videos
  getAllVideos: (): Promise<IResponseDto<IGetVideoResDto[]>> =>
    apiRequest('/videos', {
      method: 'GET',
    }),


  // Get video by ID
  getVideoById: (id: number): Promise<IResponseDto<IGetVideoResDto>> =>
    apiRequest(`/videos/${id}`, {
      method: 'GET',
    }),

  // Create new video
  createVideo: (videoData: ICreateVideoReqDto): Promise<IResponseDto<IGetVideoResDto>> =>
    apiRequest('/videos', {
      method: 'POST',
      body: JSON.stringify(videoData),
    }),

  // Update video
  updateVideo: (id: number, videoData: IUpdateVideoReqDto): Promise<IResponseDto<IGetVideoResDto>> =>
    apiRequest(`/videos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(videoData),
    }),

  // Delete video
  deleteVideo: (id: number): Promise<IResponseDto<{ message: string }>> =>
    apiRequest(`/videos/${id}`, {
      method: 'DELETE',
    }),
}

export default videosApi