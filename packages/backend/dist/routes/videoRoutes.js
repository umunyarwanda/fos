"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const videos_controller_1 = require("../controllers/videos.controller");
const validation_middleware_1 = require("../middleware/validation.middleware");
const create_video_dto_1 = require("../dtos/videos/request/create-video.dto");
const update_video_dto_1 = require("../dtos/videos/request/update-video.dto");
const router = express_1.default.Router();
router.get('/', videos_controller_1.VideosController.getAllVideos);
router.get('/:id', videos_controller_1.VideosController.getVideoById);
router.post('/', (0, validation_middleware_1.validateDto)(create_video_dto_1.CreateVideoDto), videos_controller_1.VideosController.createVideo);
router.put('/:id', (0, validation_middleware_1.validateDto)(update_video_dto_1.UpdateVideoDto), videos_controller_1.VideosController.updateVideo);
router.delete('/:id', videos_controller_1.VideosController.deleteVideo);
exports.default = router;
//# sourceMappingURL=videoRoutes.js.map