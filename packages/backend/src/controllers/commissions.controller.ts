import { Request, Response } from 'express';
import { plainToClass } from 'class-transformer';
import { AppDataSource } from '../config/database';
import { Commission } from '../entities/Commission';
import { CommissionResponseDto } from '../dtos/commissions/response/commission-response.dto';
import { ICreateCommissionReqDto } from '../shared/interfaces/commissions/request/ICreateCommissionReqDto';
import { IUpdateCommissionReqDto } from '../shared/interfaces/commissions/request/IUpdateCommissionReqDto';
import { IGetCommissionResDto } from '../shared/interfaces/commissions/response/IGetCommissionResDto';
import { IResponseDto } from '../shared/interfaces/IResponseDto';
import dayjs from 'dayjs';

export class CommissionsController {
  /**
   * @swagger
   * /api/commissions:
   *   get:
   *     summary: Get all commissions
   *     tags: [Commissions]
   *     parameters:
   *       - in: query
   *         name: minAmount
   *         schema:
   *           type: number
   *         description: Filter by minimum amount
   *       - in: query
   *         name: maxAmount
   *         schema:
   *           type: number
   *         description: Filter by maximum amount
   *     responses:
   *       200:
   *         description: List of commissions
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
   *                     type: object
   *                     properties:
   *                       id:
   *                         type: integer
   *                         example: 1
   *                       title:
   *                         type: string
   *                         example: "Piano Performance"
   *                       description:
   *                         type: string
   *                         example: "Professional piano performance for events"
   *                       amount:
   *                         type: number
   *                         format: decimal
   *                         example: 500.00
   *                       duration:
   *                         type: string
   *                         example: "2 hours"
   *                       coverImage:
   *                         type: string
   *                         example: "https://example.com/cover-image.jpg"
   *                       inclusions:
   *                         type: array
   *                         items:
   *                           type: string
   *                         example: ["Sound system", "Microphone", "Setup assistance"]
   *                       createdAt:
   *                         type: string
   *                         example: "15 Jan 2024 10:30"
   *                       updatedAt:
   *                         type: string
   *                         example: "15 Jan 2024 10:30"
   *       500:
   *         description: Internal server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  // GET /api/commissions - Get all commissions
  static async getAllCommissions(req: Request, res: Response): Promise<void> {
    try {
      const { minAmount, maxAmount } = req.query;
      const commissionRepository = AppDataSource.getRepository(Commission);
      
      let query = commissionRepository.createQueryBuilder('commission');
      
      // Apply filters
      if (minAmount) {
        query = query.andWhere('commission.amount >= :minAmount', { minAmount });
      }
      
      if (maxAmount) {
        query = query.andWhere('commission.amount <= :maxAmount', { maxAmount });
      }
      
      const commissions = await query
        .orderBy('commission.createdAt', 'DESC')
        .getMany();

      const response: IGetCommissionResDto[] = commissions.map(commission => ({
        id: commission.id,
        title: commission.title,
        description: commission.description,
        amount: commission.amount,
        duration: commission.duration,
        coverImage: commission.coverImage,
        inclusions: commission.inclusions,
        createdAt: commission.createdAt ? dayjs(commission.createdAt).format('DD MMM YYYY HH:mm') : null,
        updatedAt: commission.updatedAt ? dayjs(commission.updatedAt).format('DD MMM YYYY HH:mm') : null,
      }));

      const formattedResponse: IResponseDto<IGetCommissionResDto[]> = {
        success: true,
        data: response,
      };
      res.json(formattedResponse);
    } catch (error) {
      console.error('Error fetching commissions:', error);
      res.status(500).json({ message: 'Error fetching commissions' });
    }
  }

  /**
   * @swagger
   * /api/commissions/{id}:
   *   get:
   *     summary: Get commission by ID
   *     tags: [Commissions]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: Commission ID
   *     responses:
   *       200:
   *         description: Commission found
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
   *                     id:
   *                       type: integer
   *                       example: 1
   *                     title:
   *                       type: string
   *                       example: "Piano Performance"
   *                     description:
   *                       type: string
   *                       example: "Professional piano performance for events"
   *                     amount:
   *                       type: number
   *                       format: decimal
   *                       example: 500.00
   *                     duration:
   *                       type: string
   *                       example: "2 hours"
   *                     coverImage:
   *                       type: string
   *                       example: "https://example.com/cover-image.jpg"
   *                     inclusions:
   *                       type: array
   *                       items:
   *                         type: string
   *                       example: ["Sound system", "Microphone", "Setup assistance"]
   *                     createdAt:
   *                       type: string
   *                       example: "15 Jan 2024 10:30"
   *                     updatedAt:
   *                       type: string
   *                       example: "15 Jan 2024 10:30"
   *       404:
   *         description: Commission not found
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
  // GET /api/commissions/:id - Get commission by ID
  static async getCommissionById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const commissionRepository = AppDataSource.getRepository(Commission);
      
      const commission = await commissionRepository.findOne({
        where: { id: parseInt(id) }
      });

      if (!commission) {
        res.status(404).json({ message: 'Commission not found' });
        return;
      }

      const response: IGetCommissionResDto = {
        id: commission.id,
        title: commission.title,
        description: commission.description,
        amount: commission.amount,
        duration: commission.duration,
        coverImage: commission.coverImage,
        inclusions: commission.inclusions,
        createdAt: commission.createdAt ? dayjs(commission.createdAt).format('DD MMM YYYY HH:mm') : null,
        updatedAt: commission.updatedAt ? dayjs(commission.updatedAt).format('DD MMM YYYY HH:mm') : null,
      };

      const formattedResponse: IResponseDto<IGetCommissionResDto> = {
        success: true,
        data: response,
      };
      res.json(formattedResponse);
    } catch (error) {
      console.error('Error fetching commission:', error);
      res.status(500).json({ message: 'Error fetching commission' });
    }
  }

  /**
   * @swagger
   * /api/commissions:
   *   post:
   *     summary: Create new commission
   *     tags: [Commissions]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateCommissionRequest'
   *     responses:
   *       201:
   *         description: Commission created successfully
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
   *                     id:
   *                       type: integer
   *                       example: 1
   *                     title:
   *                       type: string
   *                       example: "Piano Performance"
   *                     description:
   *                       type: string
   *                       example: "Professional piano performance for events"
   *                     amount:
   *                       type: number
   *                       format: decimal
   *                       example: 500.00
   *                     duration:
   *                       type: string
   *                       example: "2 hours"
   *                     coverImage:
   *                       type: string
   *                       example: "https://example.com/cover-image.jpg"
   *                     inclusions:
   *                       type: array
   *                       items:
   *                         type: string
   *                       example: ["Sound system", "Microphone", "Setup assistance"]
   *                     createdAt:
   *                       type: string
   *                       example: "15 Jan 2024 10:30"
   *                     updatedAt:
   *                       type: string
   *                       example: "15 Jan 2024 10:30"
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
  // POST /api/commissions - Create new commission
  static async createCommission(req: Request, res: Response): Promise<void> {
    try {
      const commissionData: ICreateCommissionReqDto = req.body;
      const commissionRepository = AppDataSource.getRepository(Commission);
      
      const commission = commissionRepository.create(commissionData);
      const savedCommission = await commissionRepository.save(commission);

      const response: IGetCommissionResDto = {
        id: savedCommission.id,
        title: savedCommission.title,
        description: savedCommission.description,
        amount: savedCommission.amount,
        duration: savedCommission.duration,
        coverImage: savedCommission.coverImage,
        inclusions: savedCommission.inclusions,
        createdAt: savedCommission.createdAt ? dayjs(savedCommission.createdAt).format('DD MMM YYYY HH:mm') : null,
        updatedAt: savedCommission.updatedAt ? dayjs(savedCommission.updatedAt).format('DD MMM YYYY HH:mm') : null,
      };

      const formattedResponse: IResponseDto<IGetCommissionResDto> = {
        success: true,
        data: response,
      };
      res.status(201).json(formattedResponse);
    } catch (error: any) {
      console.error('Error creating commission:', error);
      res.status(500).json({ message: 'Error creating commission' });
    }
  }

  /**
   * @swagger
   * /api/commissions/{id}:
   *   put:
   *     summary: Update commission
   *     tags: [Commissions]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: Commission ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateCommissionRequest'
   *     responses:
   *       200:
   *         description: Commission updated successfully
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
   *                     id:
   *                       type: integer
   *                       example: 1
   *                     title:
   *                       type: string
   *                       example: "Piano Performance"
   *                     description:
   *                       type: string
   *                       example: "Professional piano performance for events"
   *                     amount:
   *                       type: number
   *                       format: decimal
   *                       example: 500.00
   *                     duration:
   *                       type: string
   *                       example: "2 hours"
   *                     coverImage:
   *                       type: string
   *                       example: "https://example.com/cover-image.jpg"
   *                     inclusions:
   *                       type: array
   *                       items:
   *                         type: string
   *                       example: ["Sound system", "Microphone", "Setup assistance"]
   *                     createdAt:
   *                       type: string
   *                       example: "15 Jan 2024 10:30"
   *                     updatedAt:
   *                       type: string
   *                       example: "15 Jan 2024 10:30"
   *       400:
   *         description: Validation error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ValidationError'
   *       404:
   *         description: Commission not found
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
  // PUT /api/commissions/:id - Update commission
  static async updateCommission(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateData: IUpdateCommissionReqDto = req.body;
      const commissionRepository = AppDataSource.getRepository(Commission);
      
      const commission = await commissionRepository.findOne({
        where: { id: parseInt(id) }
      });

      if (!commission) {
        res.status(404).json({ message: 'Commission not found' });
        return;
      }

      Object.assign(commission, updateData);
      const updatedCommission = await commissionRepository.save(commission);

      const response: IGetCommissionResDto = {
        id: updatedCommission.id,
        title: updatedCommission.title,
        description: updatedCommission.description,
        amount: updatedCommission.amount,
        duration: updatedCommission.duration,
        inclusions: updatedCommission.inclusions,
        coverImage: updatedCommission.coverImage,
        createdAt: updatedCommission.createdAt ? dayjs(updatedCommission.createdAt).format('DD MMM YYYY HH:mm') : null,
        updatedAt: updatedCommission.updatedAt ? dayjs(updatedCommission.updatedAt).format('DD MMM YYYY HH:mm') : null,
      };

      const formattedResponse: IResponseDto<IGetCommissionResDto> = {
        success: true,
        data: response,
      };
      res.json(formattedResponse);
    } catch (error: any) {
      console.error('Error updating commission:', error);
      res.status(500).json({ message: 'Error updating commission' });
    }
  }

  /**
   * @swagger
   * /api/commissions/{id}:
   *   delete:
   *     summary: Delete commission (soft delete)
   *     tags: [Commissions]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: Commission ID
   *     responses:
   *       200:
   *         description: Commission deleted successfully
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
   *                   example: Commission deleted successfully
   *       404:
   *         description: Commission not found
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
  // DELETE /api/commissions/:id - Delete commission (soft delete)
  static async deleteCommission(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const commissionRepository = AppDataSource.getRepository(Commission);
      
      const commission = await commissionRepository.findOne({
        where: { id: parseInt(id) }
      });

      if (!commission) {
        res.status(404).json({ message: 'Commission not found' });
        return;
      }

      await commissionRepository.softDelete(parseInt(id));

      res.json({ 
        success: true, 
        message: 'Commission deleted successfully' 
      });
    } catch (error: any) {
      console.error('Error deleting commission:', error);
      res.status(500).json({ message: 'Error deleting commission' });
    }
  }
}