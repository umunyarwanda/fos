import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Video } from '../entities/Video';
import { ICreateVideoReqDto } from '../shared/interfaces/videos/request/ICreateVideoReqDto';
import { IUpdateVideoReqDto } from '../shared/interfaces/videos/request/IUpdateVideoReqDto';
import { IGetVideoResDto } from '../shared/interfaces/videos/response/IGetVideoResDto';
import { IResponseDto } from '../shared/interfaces/IResponseDto';
import dayjs from 'dayjs';

export class VideosController {
  /**
   * @swagger
   * /api/videos:
   *   get:
   *     summary: Get all videos
   *     tags: [Videos]
   *     parameters:
   *       - in: query
   *         name: type
   *         schema:
   *           type: string
   *           enum: [performance, concert]
   *         description: Filter by video type
   *       - in: query
   *         name: isActive
   *         schema:
   *           type: boolean
   *         description: Filter by active status
   *       - in: query
   *         name: isFeatured
   *         schema:
   *           type: boolean
   *         description: Filter by featured status
   *     responses:
   *       200:
   *         description: List of videos
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Video'
   *       500:
   *         description: Internal server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  // GET /api/videos - Get all videos
  static async getAllVideos(req: Request, res: Response): Promise<void> {
    try {
      const { type, isActive, isFeatured } = req.query;
      const videoRepository = AppDataSource.getRepository(Video);
      
      let query = videoRepository.createQueryBuilder('video');
      
      // Apply filters
      if (type) {
        query = query.andWhere('video.type = :type', { type });
      }
      
      if (isActive !== undefined) {
        query = query.andWhere('video.isActive = :isActive', { isActive: isActive === 'true' });
      }
      
      if (isFeatured !== undefined) {
        query = query.andWhere('video.isFeatured = :isFeatured', { isFeatured: isFeatured === 'true' });
      }
      
      const videos = await query
        .orderBy('video.createdAt', 'DESC')
        .getMany();

      const response: IGetVideoResDto[] = videos.map(video => ({
        id: video.id,
        url: video.url,
        title: video.title,
        description: video.description,
        type: video.type,
        isActive: video.isActive,
        isFeatured: video.isFeatured,
        createdAt: video.createdAt ? dayjs(video.createdAt).format('DD MMM YYYY HH:mm') : null,
        updatedAt: video.updatedAt ? dayjs(video.updatedAt).format('DD MMM YYYY HH:mm') : null,
      }));

      const formattedResponse: IResponseDto<IGetVideoResDto[]> = {
        success: true,
        data: response,
      };
      res.json(formattedResponse);
    } catch (error) {
      console.error('Error fetching videos:', error);
      res.status(500).json({ message: 'Error fetching videos' });
    }
  }

  /**
   * @swagger
   * /api/videos/{id}:
   *   get:
   *     summary: Get video by ID
   *     tags: [Videos]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: Video ID
   *     responses:
   *       200:
   *         description: Video found
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 data:
   *                   $ref: '#/components/schemas/Video'
   *       404:
   *         description: Video not found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   *       500:
   *         description: Internal server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  // GET /api/videos/:id - Get video by ID
  static async getVideoById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const videoRepository = AppDataSource.getRepository(Video);
      
      const video = await videoRepository.findOne({
        where: { id: parseInt(id) }
      });

      if (!video) {
        res.status(404).json({ message: 'Video not found' });
        return;
      }

      const response: IGetVideoResDto = {
        id: video.id,
        url: video.url,
        title: video.title,
        description: video.description,
        type: video.type,
        isActive: video.isActive,
        isFeatured: video.isFeatured,
        createdAt: video.createdAt ? dayjs(video.createdAt).format('DD MMM YYYY HH:mm') : null,
        updatedAt: video.updatedAt ? dayjs(video.updatedAt).format('DD MMM YYYY HH:mm') : null,
      };

      const formattedResponse: IResponseDto<IGetVideoResDto> = {
        success: true,
        data: response,
      };
      res.json(formattedResponse);
    } catch (error) {
      console.error('Error fetching video:', error);
      res.status(500).json({ message: 'Error fetching video' });
    }
  }

  /**
   * @swagger
   * /api/videos:
   *   post:
   *     summary: Create new video
   *     tags: [Videos]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateVideoRequest'
   *     responses:
   *       201:
   *         description: Video created successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 data:
   *                   $ref: '#/components/schemas/Video'
   *       400:
   *         description: Validation error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ValidationError'
   *       500:
   *         description: Internal server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  // POST /api/videos - Create new video
  static async createVideo(req: Request, res: Response): Promise<void> {
    try {
      const videoData: ICreateVideoReqDto = req.body;
      const videoRepository = AppDataSource.getRepository(Video);
      
      const video = videoRepository.create(videoData);
      const savedVideo = await videoRepository.save(video);

      const response: IGetVideoResDto = {
        id: savedVideo.id,
        url: savedVideo.url,
        title: savedVideo.title,
        description: savedVideo.description,
        type: savedVideo.type,
        isActive: savedVideo.isActive,
        isFeatured: savedVideo.isFeatured,
        createdAt: savedVideo.createdAt ? dayjs(savedVideo.createdAt).format('DD MMM YYYY HH:mm') : null,
        updatedAt: savedVideo.updatedAt ? dayjs(savedVideo.updatedAt).format('DD MMM YYYY HH:mm') : null,
      };

      const formattedResponse: IResponseDto<IGetVideoResDto> = {
        success: true,
        data: response,
      };
      res.status(201).json(formattedResponse);
    } catch (error: any) {
      console.error('Error creating video:', error);
      res.status(500).json({ message: 'Error creating video' });
    }
  }

  /**
   * @swagger
   * /api/videos/{id}:
   *   put:
   *     summary: Update video
   *     tags: [Videos]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: Video ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateVideoRequest'
   *     responses:
   *       200:
   *         description: Video updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 data:
   *                   $ref: '#/components/schemas/Video'
   *       400:
   *         description: Validation error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ValidationError'
   *       404:
   *         description: Video not found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   *       500:
   *         description: Internal server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  // PUT /api/videos/:id - Update video
  static async updateVideo(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateData: IUpdateVideoReqDto = req.body;
      const videoRepository = AppDataSource.getRepository(Video);
      
      const video = await videoRepository.findOne({
        where: { id: parseInt(id) }
      });

      if (!video) {
        res.status(404).json({ message: 'Video not found' });
        return;
      }

      Object.assign(video, updateData);
      const updatedVideo = await videoRepository.save(video);

      const response: IGetVideoResDto = {
        id: updatedVideo.id,
        url: updatedVideo.url,
        title: updatedVideo.title,
        description: updatedVideo.description,
        type: updatedVideo.type,
        isActive: updatedVideo.isActive,
        isFeatured: updatedVideo.isFeatured,
        createdAt: updatedVideo.createdAt ? dayjs(updatedVideo.createdAt).format('DD MMM YYYY HH:mm') : null,
        updatedAt: updatedVideo.updatedAt ? dayjs(updatedVideo.updatedAt).format('DD MMM YYYY HH:mm') : null,
      };

      const formattedResponse: IResponseDto<IGetVideoResDto> = {
        success: true,
        data: response,
      };
      res.json(formattedResponse);
    } catch (error: any) {
      console.error('Error updating video:', error);
      res.status(500).json({ message: 'Error updating video' });
    }
  }

  /**
   * @swagger
   * /api/videos/{id}:
   *   delete:
   *     summary: Delete video (soft delete)
   *     tags: [Videos]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: Video ID
   *     responses:
   *       200:
   *         description: Video deleted successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 message:
   *                   type: string
   *                   example: Video deleted successfully
   *       404:
   *         description: Video not found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   *       500:
   *         description: Internal server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  // DELETE /api/videos/:id - Delete video (soft delete)
  static async deleteVideo(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const videoRepository = AppDataSource.getRepository(Video);
      
      const video = await videoRepository.findOne({
        where: { id: parseInt(id) }
      });

      if (!video) {
        res.status(404).json({ message: 'Video not found' });
        return;
      }

      await videoRepository.softDelete(parseInt(id));

      res.json({ 
        success: true, 
        message: 'Video deleted successfully' 
      });
    } catch (error: any) {
      console.error('Error deleting video:', error);
      res.status(500).json({ message: 'Error deleting video' });
    }
  }
}