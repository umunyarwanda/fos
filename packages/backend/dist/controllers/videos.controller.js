"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideosController = void 0;
const database_1 = require("../config/database");
const Video_1 = require("../entities/Video");
const dayjs_1 = __importDefault(require("dayjs"));
class VideosController {
    static async getAllVideos(req, res) {
        try {
            const { type, isActive, isFeatured } = req.query;
            const videoRepository = database_1.AppDataSource.getRepository(Video_1.Video);
            let query = videoRepository.createQueryBuilder('video');
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
            const response = videos.map(video => ({
                id: video.id,
                url: video.url,
                title: video.title,
                description: video.description,
                type: video.type,
                isActive: video.isActive,
                isFeatured: video.isFeatured,
                createdAt: video.createdAt ? (0, dayjs_1.default)(video.createdAt).format('DD MMM YYYY HH:mm') : null,
                updatedAt: video.updatedAt ? (0, dayjs_1.default)(video.updatedAt).format('DD MMM YYYY HH:mm') : null,
            }));
            const formattedResponse = {
                success: true,
                data: response,
            };
            res.json(formattedResponse);
        }
        catch (error) {
            console.error('Error fetching videos:', error);
            res.status(500).json({ message: 'Error fetching videos' });
        }
    }
    static async getVideoById(req, res) {
        try {
            const { id } = req.params;
            const videoRepository = database_1.AppDataSource.getRepository(Video_1.Video);
            const video = await videoRepository.findOne({
                where: { id: parseInt(id) }
            });
            if (!video) {
                res.status(404).json({ message: 'Video not found' });
                return;
            }
            const response = {
                id: video.id,
                url: video.url,
                title: video.title,
                description: video.description,
                type: video.type,
                isActive: video.isActive,
                isFeatured: video.isFeatured,
                createdAt: video.createdAt ? (0, dayjs_1.default)(video.createdAt).format('DD MMM YYYY HH:mm') : null,
                updatedAt: video.updatedAt ? (0, dayjs_1.default)(video.updatedAt).format('DD MMM YYYY HH:mm') : null,
            };
            const formattedResponse = {
                success: true,
                data: response,
            };
            res.json(formattedResponse);
        }
        catch (error) {
            console.error('Error fetching video:', error);
            res.status(500).json({ message: 'Error fetching video' });
        }
    }
    static async createVideo(req, res) {
        try {
            const videoData = req.body;
            const videoRepository = database_1.AppDataSource.getRepository(Video_1.Video);
            const video = videoRepository.create(videoData);
            const savedVideo = await videoRepository.save(video);
            const response = {
                id: savedVideo.id,
                url: savedVideo.url,
                title: savedVideo.title,
                description: savedVideo.description,
                type: savedVideo.type,
                isActive: savedVideo.isActive,
                isFeatured: savedVideo.isFeatured,
                createdAt: savedVideo.createdAt ? (0, dayjs_1.default)(savedVideo.createdAt).format('DD MMM YYYY HH:mm') : null,
                updatedAt: savedVideo.updatedAt ? (0, dayjs_1.default)(savedVideo.updatedAt).format('DD MMM YYYY HH:mm') : null,
            };
            const formattedResponse = {
                success: true,
                data: response,
            };
            res.status(201).json(formattedResponse);
        }
        catch (error) {
            console.error('Error creating video:', error);
            res.status(500).json({ message: 'Error creating video' });
        }
    }
    static async updateVideo(req, res) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const videoRepository = database_1.AppDataSource.getRepository(Video_1.Video);
            const video = await videoRepository.findOne({
                where: { id: parseInt(id) }
            });
            if (!video) {
                res.status(404).json({ message: 'Video not found' });
                return;
            }
            Object.assign(video, updateData);
            const updatedVideo = await videoRepository.save(video);
            const response = {
                id: updatedVideo.id,
                url: updatedVideo.url,
                title: updatedVideo.title,
                description: updatedVideo.description,
                type: updatedVideo.type,
                isActive: updatedVideo.isActive,
                isFeatured: updatedVideo.isFeatured,
                createdAt: updatedVideo.createdAt ? (0, dayjs_1.default)(updatedVideo.createdAt).format('DD MMM YYYY HH:mm') : null,
                updatedAt: updatedVideo.updatedAt ? (0, dayjs_1.default)(updatedVideo.updatedAt).format('DD MMM YYYY HH:mm') : null,
            };
            const formattedResponse = {
                success: true,
                data: response,
            };
            res.json(formattedResponse);
        }
        catch (error) {
            console.error('Error updating video:', error);
            res.status(500).json({ message: 'Error updating video' });
        }
    }
    static async deleteVideo(req, res) {
        try {
            const { id } = req.params;
            const videoRepository = database_1.AppDataSource.getRepository(Video_1.Video);
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
        }
        catch (error) {
            console.error('Error deleting video:', error);
            res.status(500).json({ message: 'Error deleting video' });
        }
    }
}
exports.VideosController = VideosController;
//# sourceMappingURL=videos.controller.js.map