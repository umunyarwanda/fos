import { useState, useEffect } from 'react'
import { videosApi } from '~/services/videosApi'
import type { IGetVideoResDto } from '@shared/interfaces/videos/response/IGetVideoResDto'
import type { ICreateVideoReqDto } from '@shared/interfaces/videos/request/ICreateVideoReqDto'
import type { IUpdateVideoReqDto } from '@shared/interfaces/videos/request/IUpdateVideoReqDto'

export interface UseVideosReturn {
  videos: IGetVideoResDto[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
  getVideoById: (id: number) => Promise<IGetVideoResDto | null>
  createVideo: (videoData: ICreateVideoReqDto) => Promise<IGetVideoResDto | null>
  updateVideo: (id: number, videoData: IUpdateVideoReqDto) => Promise<IGetVideoResDto | null>
  deleteVideo: (id: number) => Promise<boolean>
}

export function useVideos(): UseVideosReturn {
  const [videos, setVideos] = useState<IGetVideoResDto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchVideos = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const videosResponse = await videosApi.getAllVideos()

      if (videosResponse.success && videosResponse.data) {
        setVideos(videosResponse.data)
      }
    } catch (err) {
      console.error('Error fetching videos:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch videos')
    } finally {
      setLoading(false)
    }
  }

  const getVideoById = async (id: number): Promise<IGetVideoResDto | null> => {
    try {
      const response = await videosApi.getVideoById(id)
      if (response.success && response.data) {
        return response.data
      }
      return null
    } catch (err) {
      console.error('Error fetching video by ID:', err)
      return null
    }
  }

  const refetch = async () => {
    await fetchVideos()
  }

  const createVideo = async (videoData: ICreateVideoReqDto): Promise<IGetVideoResDto | null> => {
    try {
      const response = await videosApi.createVideo(videoData)
      if (response.success && response.data) {
        // Refresh videos list
        await refetch()
        return response.data
      }
      return null
    } catch (err) {
      console.error('Error creating video:', err)
      throw err
    }
  }

  const updateVideo = async (id: number, videoData: IUpdateVideoReqDto): Promise<IGetVideoResDto | null> => {
    try {
      const response = await videosApi.updateVideo(id, videoData)
      if (response.success && response.data) {
        // Refresh videos list
        await refetch()
        return response.data
      }
      return null
    } catch (err) {
      console.error('Error updating video:', err)
      throw err
    }
  }

  const deleteVideo = async (id: number): Promise<boolean> => {
    try {
      const response = await videosApi.deleteVideo(id)
      if (response.success) {
        // Refresh videos list
        await refetch()
        return true
      }
      return false
    } catch (err) {
      console.error('Error deleting video:', err)
      throw err
    }
  }

  useEffect(() => {
    fetchVideos()
  }, [])

  return {
    videos,
    loading,
    error,
    refetch,
    getVideoById,
    createVideo,
    updateVideo,
    deleteVideo
  }
}

export default useVideos