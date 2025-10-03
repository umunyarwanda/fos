"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImage = exports.uploadMultipleImages = exports.uploadSingleImageBinary = exports.uploadSingleImage = void 0;
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const uploadSingleImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No image file provided',
                data: null
            });
        }
        const result = await new Promise((resolve, reject) => {
            cloudinary_1.default.uploader.upload_stream({
                resource_type: 'auto',
                folder: 'fos',
            }, (error, result) => {
                if (error)
                    reject(error);
                else
                    resolve(result);
            }).end(req.file.buffer);
        });
        const uploadResDto = {
            public_id: result.public_id,
            secure_url: result.secure_url,
            url: result.url,
            width: result.width,
            height: result.height,
            format: result.format,
            bytes: result.bytes
        };
        return res.status(200).json({
            success: true,
            message: 'Image uploaded successfully',
            data: uploadResDto
        });
    }
    catch (error) {
        console.error('Upload single image error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error during image upload',
            data: null
        });
    }
};
exports.uploadSingleImage = uploadSingleImage;
const uploadSingleImageBinary = async (req, res) => {
    try {
        if (!req.body || req.body.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No binary data provided',
                data: null
            });
        }
        const result = await new Promise((resolve, reject) => {
            cloudinary_1.default.uploader.upload_stream({
                resource_type: 'auto',
                folder: 'fos',
            }, (error, result) => {
                if (error)
                    reject(error);
                else
                    resolve(result);
            }).end(Buffer.from(req.body));
        });
        const uploadResDto = {
            public_id: result.public_id,
            secure_url: result.secure_url,
            url: result.url,
            width: result.width,
            height: result.height,
            format: result.format,
            bytes: result.bytes
        };
        return res.status(200).json({
            success: true,
            message: 'Image uploaded successfully',
            data: uploadResDto
        });
    }
    catch (error) {
        console.error('Upload single image binary error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error during image upload',
            data: null
        });
    }
};
exports.uploadSingleImageBinary = uploadSingleImageBinary;
const uploadMultipleImages = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No image files provided',
                data: null
            });
        }
        const files = req.files;
        const uploadPromises = files.map(file => {
            return new Promise((resolve, reject) => {
                cloudinary_1.default.uploader.upload_stream({
                    resource_type: 'auto',
                    folder: 'fos',
                }, (error, result) => {
                    if (error)
                        reject(error);
                    else
                        resolve(result);
                }).end(file.buffer);
            });
        });
        const results = await Promise.all(uploadPromises);
        const uploadedImages = results.map((result) => ({
            public_id: result.public_id,
            secure_url: result.secure_url,
            url: result.url,
            width: result.width,
            height: result.height,
            format: result.format,
            bytes: result.bytes
        }));
        const uploadMultipleResDto = {
            images: uploadedImages,
            count: uploadedImages.length
        };
        return res.status(200).json({
            success: true,
            message: 'Images uploaded successfully',
            data: {
                images: uploadedImages,
                count: uploadedImages.length
            }
        });
    }
    catch (error) {
        console.error('Upload multiple images error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error during image upload',
            data: null
        });
    }
};
exports.uploadMultipleImages = uploadMultipleImages;
const deleteImage = async (req, res) => {
    try {
        const { public_id } = req.params;
        if (!public_id) {
            return res.status(400).json({
                success: false,
                message: 'Public ID is required',
                data: null
            });
        }
        const result = await cloudinary_1.default.uploader.destroy(public_id);
        if (result.result === 'ok') {
            return res.status(200).json({
                success: true,
                message: 'Image deleted successfully',
                data: { public_id, deleted: true }
            });
        }
        else {
            return res.status(404).json({
                success: false,
                message: 'Image not found or already deleted',
                data: null
            });
        }
    }
    catch (error) {
        console.error('Delete image error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error during image deletion',
            data: null
        });
    }
};
exports.deleteImage = deleteImage;
//# sourceMappingURL=upload.controller.js.map