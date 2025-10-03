import express, { Router } from 'express';
import { VideosController } from '../controllers/videos.controller';
import { validateDto } from '../middleware/validation.middleware';
import { CreateVideoDto } from '../dtos/videos/request/create-video.dto';
import { UpdateVideoDto } from '../dtos/videos/request/update-video.dto';

const router: Router = express.Router();

// GET /api/videos - Get all videos (public)
router.get('/', VideosController.getAllVideos);

// GET /api/videos/:id - Get video by ID (public)
router.get('/:id', VideosController.getVideoById);

// POST /api/videos - Create new video (admin only)
router.post('/', validateDto(CreateVideoDto), VideosController.createVideo);

// PUT /api/videos/:id - Update video (admin only)
router.put('/:id', validateDto(UpdateVideoDto), VideosController.updateVideo);

// DELETE /api/videos/:id - Delete video (admin only)
router.delete('/:id', VideosController.deleteVideo);

export default router;