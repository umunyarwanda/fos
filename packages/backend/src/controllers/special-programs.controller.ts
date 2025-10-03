import { Request, Response } from 'express';
import { plainToClass } from 'class-transformer';
import { AppDataSource } from '../config/database';
import { SpecialProgram } from '../entities/SpecialProgram';
import { SpecialProgramResponseDto } from '../dtos/special-programs/response/special-program-response.dto';
import { ICreateSpecialProgramReqDto } from '../shared/interfaces/special-programs/request/ICreateSpecialProgramReqDto';
import { IUpdateSpecialProgramReqDto } from '../shared/interfaces/special-programs/request/IUpdateSpecialProgramReqDto';
import { IGetSpecialProgramResDto } from '../shared/interfaces/special-programs/response/IGetSpecialProgramResDto';
import { IResponseDto } from '../shared/interfaces/IResponseDto';
import dayjs from 'dayjs';

export class SpecialProgramsController {
  /**
   * @swagger
   * /api/special-programs:
   *   get:
   *     summary: Get all special programs
   *     tags: [Special Programs]
   *     parameters:
   *       - in: query
   *         name: featured
   *         schema:
   *           type: boolean
   *         description: Filter by featured programs only
   *       - in: query
   *         name: minAge
   *         schema:
   *           type: integer
   *         description: Filter by minimum age
   *       - in: query
   *         name: maxAge
   *         schema:
   *           type: integer
   *         description: Filter by maximum age
   *     responses:
   *       200:
   *         description: List of special programs
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
   *                     $ref: '#/components/schemas/SpecialProgram'
   *       500:
   *         description: Internal server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  // GET /api/special-programs - Get all special programs
  static async getAllSpecialPrograms(req: Request, res: Response): Promise<void> {
    try {
      const specialProgramRepository = AppDataSource.getRepository(SpecialProgram);
      const programs = await specialProgramRepository.find({
        order: { startDate: 'ASC' }
      });

      const response = programs.map(program => ({
        id: program.id,
        title: program.title,
        subtitle: program.subtitle,
        description: program.description,
        startDate: program.startDate ? dayjs(program.startDate).format('DD MMM YYYY') : null,
        endDate: program.endDate ? dayjs(program.endDate).format('DD MMM YYYY') : null,
        startTime: program.startTime ? program.startTime : null,
        endTime: program.endTime ? program.endTime : null,
        location: program.location,
        address: program.address,
        capacity: program.capacity,
        monthlyTuition: program.monthlyTuition,
        minAge: program.minAge,
        maxAge: program.maxAge,
        isActive: program.isActive,
        isFeatured: program.isFeatured,
        tags: program.tags,
        galleryImages: program.galleryImages,
        instructors: program.instructors,
        curriculum: program.curriculum,
        whatsIncluded: program.whatsIncluded,
        schedule: program.schedule,
        createdAt: program.createdAt ? dayjs(program.createdAt).format('DD MMM YYYY HH:mm') : null,
        updatedAt: program.updatedAt ? dayjs(program.updatedAt).format('DD MMM YYYY HH:mm') : null,
      }));

      const formattedResponse: IResponseDto<any[]> = {
        success: true,
        data: response,
      };
      res.json(formattedResponse);
      // const formattedResponse: IResponseDto<IGetSpecialProgramResDto[]> = {
      //   success: true,
      //   data: response,
      // };
      // res.json(formattedResponse);
    } catch (error) {
      console.error('Error fetching special programs:', error);
      res.status(500).json({ message: 'Error fetching special programs' });
    }
  }

  /**
   * @swagger
   * /api/special-programs/{id}:
   *   get:
   *     summary: Get special program by ID
   *     tags: [Special Programs]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: Special Program ID
   *     responses:
   *       200:
   *         description: Special program found
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 data:
   *                   $ref: '#/components/schemas/SpecialProgram'
   *       404:
   *         description: Special program not found
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
  // GET /api/special-programs/:id - Get special program by ID
  static async getSpecialProgramById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const specialProgramRepository = AppDataSource.getRepository(SpecialProgram);
      const program = await specialProgramRepository.findOne({ 
        where: { id: parseInt(id) },
        relations: ['director']
      });
      
      if (!program) {
        res.status(404).json({ message: 'Special program not found' });
        return;
      }
      
      const response: IGetSpecialProgramResDto = {
        id: program.id,
        title: program.title,
        subtitle: program.subtitle,
        description: program.description,
        startDate: program.startDate.toISOString().split('T')[0],
        endDate: program.endDate.toISOString().split('T')[0],
        startTime: program.startTime,
        endTime: program.endTime,
        location: program.location,
        address: program.address,
        capacity: program.capacity,
        monthlyTuition: program.monthlyTuition,
        minAge: program.minAge,
        maxAge: program.maxAge,
        isActive: program.isActive,
        isFeatured: program.isFeatured,
        tags: program.tags,
        galleryImages: program.galleryImages,
        instructors: program.instructors,
        curriculum: program.curriculum,
        whatsIncluded: program.whatsIncluded,
        schedule: program.schedule,
        directorId: program.directorId,
        createdAt: program.createdAt.toISOString(),
        updatedAt: program.updatedAt.toISOString(),
      };

      const formattedResponse: IResponseDto<IGetSpecialProgramResDto> = {
        success: true,
        data: response,
      };
      res.json(formattedResponse);
    } catch (error) {
      console.error('Error fetching special program:', error);
      res.status(500).json({ message: 'Error fetching special program' });
    }
  }

  /**
   * @swagger
   * /api/special-programs:
   *   post:
   *     summary: Create new special program
   *     tags: [Special Programs]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateSpecialProgramRequest'
   *     responses:
   *       201:
   *         description: Special program created successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 data:
   *                   $ref: '#/components/schemas/SpecialProgram'
   *       400:
   *         description: Bad request - validation error
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
  // POST /api/special-programs - Create new special program
  static async createSpecialProgram(req: Request, res: Response): Promise<void> {
    try {
      const programData: ICreateSpecialProgramReqDto = req.body;
      const { 
        title, 
        subtitle, 
        description, 
        startDate, 
        endDate, 
        startTime, 
        endTime, 
        location, 
        address, 
        capacity, 
        monthlyTuition, 
        minAge, 
        maxAge, 
        isFeatured, 
        tags, 
        galleryImages, 
        instructors, 
        curriculum, 
        whatsIncluded, 
        schedule 
      } = programData;
      
      const specialProgramRepository = AppDataSource.getRepository(SpecialProgram);
      const program = specialProgramRepository.create({
        title,
        subtitle,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        startTime,
        endTime,
        location,
        address,
        capacity,
        monthlyTuition,
        minAge,
        maxAge,
        isFeatured: isFeatured || false,
        tags,
        galleryImages,
        instructors,
        curriculum,
        whatsIncluded,
        schedule,
      });
      
      const savedProgram = await specialProgramRepository.save(program);
      
      const response: IGetSpecialProgramResDto = {
        id: savedProgram.id,
        title: savedProgram.title,
        subtitle: savedProgram.subtitle,
        description: savedProgram.description,
        startDate: savedProgram.startDate.toISOString().split('T')[0],
        endDate: savedProgram.endDate.toISOString().split('T')[0],
        startTime: savedProgram.startTime,
        endTime: savedProgram.endTime,
        location: savedProgram.location,
        address: savedProgram.address,
        capacity: savedProgram.capacity,
        monthlyTuition: savedProgram.monthlyTuition,
        minAge: savedProgram.minAge,
        maxAge: savedProgram.maxAge,
        isActive: savedProgram.isActive,
        isFeatured: savedProgram.isFeatured,
        tags: savedProgram.tags,
        galleryImages: savedProgram.galleryImages,
        instructors: savedProgram.instructors,
        curriculum: savedProgram.curriculum,
        whatsIncluded: savedProgram.whatsIncluded,
        schedule: savedProgram.schedule,
        directorId: savedProgram.directorId,
        createdAt: savedProgram.createdAt.toISOString(),
        updatedAt: savedProgram.updatedAt.toISOString(),
      };
      
      const formattedResponse: IResponseDto<IGetSpecialProgramResDto> = {
        success: true,
        data: response,
      };
      
      res.status(201).json(formattedResponse);
    } catch (error: any) {
      console.error('Error creating special program:', error);
      res.status(500).json({ message: 'Error creating special program' });
    }
  }

  /**
   * @swagger
   * /api/special-programs/{id}:
   *   put:
   *     summary: Update special program
   *     tags: [Special Programs]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: Special Program ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateSpecialProgramRequest'
   *     responses:
   *       200:
   *         description: Special program updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 data:
   *                   $ref: '#/components/schemas/SpecialProgram'
   *       400:
   *         description: Bad request - validation error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ValidationError'
   *       404:
   *         description: Special program not found
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
  // PUT /api/special-programs/:id - Update special program
  static async updateSpecialProgram(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateData: IUpdateSpecialProgramReqDto = req.body;
      
      const specialProgramRepository = AppDataSource.getRepository(SpecialProgram);
      const program = await specialProgramRepository.findOne({ where: { id: parseInt(id) } });
      
      if (!program) {
        res.status(404).json({ message: 'Special program not found' });
        return;
      }
      
      // Update only provided fields
      Object.keys(updateData).forEach(key => {
        if (updateData[key as keyof IUpdateSpecialProgramReqDto] !== undefined) {
          if (key === 'startDate' || key === 'endDate') {
            (program as any)[key] = new Date(updateData[key as keyof IUpdateSpecialProgramReqDto] as string);
          } else {
            (program as any)[key] = updateData[key as keyof IUpdateSpecialProgramReqDto];
          }
        }
      });
      
      const updatedProgram = await specialProgramRepository.save(program);
      
      const response: IGetSpecialProgramResDto = {
        id: updatedProgram.id,
        title: updatedProgram.title,
        subtitle: updatedProgram.subtitle,
        description: updatedProgram.description,
        startDate: updatedProgram.startDate.toISOString().split('T')[0],
        endDate: updatedProgram.endDate.toISOString().split('T')[0],
        startTime: updatedProgram.startTime,
        endTime: updatedProgram.endTime,
        location: updatedProgram.location,
        address: updatedProgram.address,
        capacity: updatedProgram.capacity,
        monthlyTuition: updatedProgram.monthlyTuition,
        minAge: updatedProgram.minAge,
        maxAge: updatedProgram.maxAge,
        isActive: updatedProgram.isActive,
        isFeatured: updatedProgram.isFeatured,
        tags: updatedProgram.tags,
        galleryImages: updatedProgram.galleryImages,
        instructors: updatedProgram.instructors,
        curriculum: updatedProgram.curriculum,
        whatsIncluded: updatedProgram.whatsIncluded,
        schedule: updatedProgram.schedule,
        directorId: updatedProgram.directorId,
        createdAt: updatedProgram.createdAt.toISOString(),
        updatedAt: updatedProgram.updatedAt.toISOString(),
      };
      
      const formattedResponse: IResponseDto<IGetSpecialProgramResDto> = {
        success: true,
        data: response,
      };
      
      res.json(formattedResponse);
    } catch (error: any) {
      console.error('Error updating special program:', error);
      res.status(500).json({ message: 'Error updating special program' });
    }
  }

  /**
   * @swagger
   * /api/special-programs/{id}:
   *   delete:
   *     summary: Delete special program (soft delete)
   *     tags: [Special Programs]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: Special Program ID
   *     responses:
   *       200:
   *         description: Special program deleted successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 data:
   *                   type: object
   *                   properties:
   *                     message:
   *                       type: string
   *                       example: 'Special program deleted successfully'
   *       404:
   *         description: Special program not found
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
  // DELETE /api/special-programs/:id - Delete special program (soft delete)
  static async deleteSpecialProgram(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const specialProgramRepository = AppDataSource.getRepository(SpecialProgram);
      const program = await specialProgramRepository.findOne({ where: { id: parseInt(id) } });
      
      if (!program) {
        res.status(404).json({ message: 'Special program not found' });
        return;
      }
      
      // Soft delete - TypeORM will set deletedAt timestamp
      await specialProgramRepository.softRemove(program);
      
      const formattedResponse: IResponseDto<{ message: string }> = {
        success: true,
        data: { message: 'Special program deleted successfully' },
      };
      
      res.json(formattedResponse);
    } catch (error) {
      console.error('Error deleting special program:', error);
      res.status(500).json({ message: 'Error deleting special program' });
    }
  }

  /**
   * @swagger
   * /api/special-programs/featured:
   *   get:
   *     summary: Get featured special programs
   *     tags: [Special Programs]
   *     responses:
   *       200:
   *         description: List of featured special programs
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
   *                     $ref: '#/components/schemas/SpecialProgram'
   *       500:
   *         description: Internal server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  // GET /api/special-programs/featured - Get featured special programs
  static async getFeaturedSpecialPrograms(req: Request, res: Response): Promise<void> {
    try {
      const specialProgramRepository = AppDataSource.getRepository(SpecialProgram);
      const programs = await specialProgramRepository.find({
        where: { isFeatured: true, isActive: true },
        relations: ['director'],
        order: { startDate: 'ASC' }
      });

      const response: IGetSpecialProgramResDto[] = programs.map(program => ({
        id: program.id,
        title: program.title,
        subtitle: program.subtitle,
        description: program.description,
        startDate: program.startDate.toISOString().split('T')[0],
        endDate: program.endDate.toISOString().split('T')[0],
        startTime: program.startTime,
        endTime: program.endTime,
        location: program.location,
        address: program.address,
        capacity: program.capacity,
        monthlyTuition: program.monthlyTuition,
        minAge: program.minAge,
        maxAge: program.maxAge,
        isActive: program.isActive,
        isFeatured: program.isFeatured,
        tags: program.tags,
        galleryImages: program.galleryImages,
        instructors: program.instructors,
        curriculum: program.curriculum,
        whatsIncluded: program.whatsIncluded,
        schedule: program.schedule,
        directorId: program.directorId,
        createdAt: program.createdAt.toISOString(),
        updatedAt: program.updatedAt.toISOString(),
      }));

      const formattedResponse: IResponseDto<IGetSpecialProgramResDto[]> = {
        success: true,
        data: response,
      };
      res.json(formattedResponse);
    } catch (error) {
      console.error('Error fetching featured special programs:', error);
      res.status(500).json({ message: 'Error fetching featured special programs' });
    }
  }
}