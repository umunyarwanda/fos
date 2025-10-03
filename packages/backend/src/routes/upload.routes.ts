import { Router, type Router as ExpressRouter } from 'express';
import { 
  uploadSingleImage, 
  uploadSingleImageBinary,
  uploadMultipleImages, 
  deleteImage 
} from '../controllers/upload.controller';
import { uploadSingle, uploadMultiple, handleUploadError } from '../middleware/upload.middleware';
import { authenticateToken } from '../middleware/auth.middleware';

/**
 * @swagger
 * tags:
 *   name: Upload
 *   description: Image upload endpoints
 */

const router: ExpressRouter = Router();

/**
 * @swagger
 * /api/upload/single:
 *   post:
 *     summary: Upload a single image
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image file to upload
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         public_id:
 *                           type: string
 *                         secure_url:
 *                           type: string
 *                         url:
 *                           type: string
 *                         width:
 *                           type: number
 *                         height:
 *                           type: number
 *                         format:
 *                           type: string
 *                         bytes:
 *                           type: number
 *       400:
 *         description: Bad request - no file or invalid file
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized
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
// Single image upload route (multipart/form-data)
router.post('/single', authenticateToken, uploadSingle, handleUploadError, uploadSingleImage);

/**
 * @swagger
 * /api/upload/multiple:
 *   post:
 *     summary: Upload multiple images
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Image files to upload (max 10)
 *     responses:
 *       200:
 *         description: Images uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         images:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               public_id:
 *                                 type: string
 *                               secure_url:
 *                                 type: string
 *                               url:
 *                                 type: string
 *                               width:
 *                                 type: number
 *                               height:
 *                                 type: number
 *                               format:
 *                                 type: string
 *                               bytes:
 *                                 type: number
 *                         count:
 *                           type: number
 *       400:
 *         description: Bad request - no files or too many files
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized
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
router.post('/multiple', authenticateToken, uploadMultiple, handleUploadError, uploadMultipleImages);

/**
 * @swagger
 * /api/upload/delete/{public_id}:
 *   delete:
 *     summary: Delete an image
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: public_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Cloudinary public ID of the image to delete
 *     responses:
 *       200:
 *         description: Image deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         public_id:
 *                           type: string
 *                         deleted:
 *                           type: boolean
 *       400:
 *         description: Bad request - public ID required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Image not found
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
router.delete('/delete/:public_id', authenticateToken, deleteImage);

export default router;