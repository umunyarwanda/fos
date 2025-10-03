"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_controller_1 = require("../controllers/upload.controller");
const upload_middleware_1 = require("../middleware/upload.middleware");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.post('/single', auth_middleware_1.authenticateToken, upload_middleware_1.uploadSingle, upload_middleware_1.handleUploadError, upload_controller_1.uploadSingleImage);
router.post('/multiple', auth_middleware_1.authenticateToken, upload_middleware_1.uploadMultiple, upload_middleware_1.handleUploadError, upload_controller_1.uploadMultipleImages);
router.delete('/delete/:public_id', auth_middleware_1.authenticateToken, upload_controller_1.deleteImage);
exports.default = router;
//# sourceMappingURL=upload.routes.js.map