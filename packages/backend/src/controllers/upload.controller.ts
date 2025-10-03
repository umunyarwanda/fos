import { Request, Response } from 'express';
import cloudinary from '../config/cloudinary';
import { IResponseDto, IUploadMultipleResDto, IUploadResDto } from '../shared/interfaces/upload/response/IUploadResDto';

// Upload single image
export const uploadSingleImage = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file provided',
        data: null
      } as IResponseDto<null>);
    }

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: 'auto',
          folder: 'fos', // Optional: organize uploads in a folder
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(req.file!.buffer);
    });

    const uploadResDto: IUploadResDto = {
      public_id: (result as any).public_id,
      secure_url: (result as any).secure_url,
      url: (result as any).url,
      width: (result as any).width,
      height: (result as any).height,
      format: (result as any).format,
      bytes: (result as any).bytes
    }
    return res.status(200).json({
      success: true,
      message: 'Image uploaded successfully',
      data: uploadResDto
    } as IResponseDto<any>);

  } catch (error) {
    console.error('Upload single image error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error during image upload',
      data: null
    } as IResponseDto<null>);
  }
};

// Upload single image as raw binary
export const uploadSingleImageBinary = async (req: Request, res: Response) => {
  try {
    if (!req.body || req.body.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No binary data provided',
        data: null
      } as IResponseDto<null>);
    }

    // Upload to Cloudinary using raw buffer
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: 'auto',
          folder: 'fos',
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(Buffer.from(req.body));
    });

    const uploadResDto: IUploadResDto = {
      public_id: (result as any).public_id,
      secure_url: (result as any).secure_url,
      url: (result as any).url,
      width: (result as any).width,
      height: (result as any).height,
      format: (result as any).format,
      bytes: (result as any).bytes
    }

    return res.status(200).json({
      success: true,
      message: 'Image uploaded successfully',
      data: uploadResDto
    } as IResponseDto<any>);

  } catch (error) {
    console.error('Upload single image binary error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error during image upload',
      data: null
    } as IResponseDto<null>);
  }
};

// Upload multiple images
export const uploadMultipleImages = async (req: Request, res: Response) => {
  try {
    if (!req.files || (req.files as any[]).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No image files provided',
        data: null
      } as IResponseDto<null>);
    }

    const files = req.files as any[];
    const uploadPromises = files.map(file => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            resource_type: 'auto',
            folder: 'fos',
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(file.buffer);
      });
    });

    const results = await Promise.all(uploadPromises);

    const uploadedImages = results.map((result: any) => ({
      public_id: result.public_id,
      secure_url: result.secure_url,
      url: result.url,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes
    }));

    const uploadMultipleResDto: IUploadMultipleResDto = {
      images: uploadedImages,
      count: uploadedImages.length
    }

    return res.status(200).json({
      success: true,
      message: 'Images uploaded successfully',
      data: {
        images: uploadedImages,
        count: uploadedImages.length
      }
    } as IResponseDto<any>);

  } catch (error) {
    console.error('Upload multiple images error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error during image upload',
      data: null
    } as IResponseDto<null>);
  }
};

// Delete image from Cloudinary
export const deleteImage = async (req: Request, res: Response) => {
  try {
    const { public_id } = req.params;

    if (!public_id) {
      return res.status(400).json({
        success: false,
        message: 'Public ID is required',
        data: null
      } as IResponseDto<null>);
    }

    const result = await cloudinary.uploader.destroy(public_id);

    if (result.result === 'ok') {
      return res.status(200).json({
        success: true,
        message: 'Image deleted successfully',
        data: { public_id, deleted: true }
      } as IResponseDto<any>);
    } else {
      return res.status(404).json({
        success: false,
        message: 'Image not found or already deleted',
        data: null
      } as IResponseDto<null>);
    }

  } catch (error) {
    console.error('Delete image error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error during image deletion',
      data: null
    } as IResponseDto<null>);
  }
};