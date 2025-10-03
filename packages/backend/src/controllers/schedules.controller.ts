import { Request, Response } from 'express';
import { plainToClass } from 'class-transformer';
import { AppDataSource } from '../config/database';
import { Schedule } from '../entities/Schedule';
import { ScheduleResponseDto } from '../dtos/schedules/response/schedule-response.dto';
import { ICreateScheduleReqDto } from '../shared/interfaces/schedules/request/ICreateScheduleReqDto';
import { IUpdateScheduleReqDto } from '../shared/interfaces/schedules/request/IUpdateScheduleReqDto';
import { IGetScheduleResDto } from '../shared/interfaces/schedules/response/IGetScheduleResDto';
import { IResponseDto } from '../shared/interfaces/IResponseDto';
import dayjs from 'dayjs';
import { EScheduleStatus } from '../shared/enum/EScheduleStatus.enum';

export class SchedulesController {
  /**
   * @swagger
   * /api/schedules:
   *   get:
   *     summary: Get all schedules
   *     tags: [Schedules]
   *     parameters:
   *       - in: query
   *         name: eventType
   *         schema:
   *           type: string
   *           enum: [rehearsal, performance, outreach, recording, meeting, other]
   *         description: Filter by event type
   *       - in: query
   *         name: status
   *         schema:
   *           type: string
   *           enum: [confirmed, tentative, cancelled, completed]
   *         description: Filter by status
   *       - in: query
   *         name: startDate
   *         schema:
   *           type: string
   *           format: date
   *         description: Filter by start date (YYYY-MM-DD)
   *       - in: query
   *         name: endDate
   *         schema:
   *           type: string
   *           format: date
   *         description: Filter by end date (YYYY-MM-DD)
   *     responses:
   *       200:
   *         description: List of schedules
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
   *                     $ref: '#/components/schemas/Schedule'
   *       500:
   *         description: Internal server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  // GET /api/schedules - Get all schedules
  static async getAllSchedules(req: Request, res: Response): Promise<void> {
    try {
      const { eventType, status, startDate, endDate } = req.query;
      const scheduleRepository = AppDataSource.getRepository(Schedule);
      
      let query = scheduleRepository.createQueryBuilder('schedule');
      
      // Apply filters
      if (eventType) {
        query = query.andWhere('schedule.eventType = :eventType', { eventType });
      }
      
      if (status) {
        query = query.andWhere('schedule.status = :status', { status });
      }
      
      if (startDate) {
        query = query.andWhere('schedule.scheduleDate >= :startDate', { startDate });
      }
      
      if (endDate) {
        query = query.andWhere('schedule.scheduleDate <= :endDate', { endDate });
      }
      
      const schedules = await query
        .orderBy('schedule.scheduleDate', 'ASC')
        .addOrderBy('schedule.startTime', 'ASC')
        .getMany();

      const response: IGetScheduleResDto[] = schedules.map(schedule => ({
        id: schedule.id,
        title: schedule.title,
        description: schedule.description,
        scheduleDate: schedule.scheduleDate ? dayjs(schedule.scheduleDate).format('DD MMM YYYY') : null,
        startTime: schedule.startTime ? schedule.startTime : null,
        endTime: schedule.endTime ? schedule.endTime : null,
        location: schedule.location,
        address: schedule.address,
        eventType: schedule.eventType,
        status: schedule.status,
        isRecurring: schedule.isRecurring,
        recurrencePattern: schedule.recurrencePattern,
        recurrenceInterval: schedule.recurrenceInterval,
        isActive: schedule.isActive,
        createdAt: schedule.createdAt ? dayjs(schedule.createdAt).format('DD MMM YYYY HH:mm') : null,
        updatedAt: schedule.updatedAt ? dayjs(schedule.updatedAt).format('DD MMM YYYY HH:mm') : null,
      }));

      const formattedResponse: IResponseDto<IGetScheduleResDto[]> = {
        success: true,
        data: response,
      };
      res.json(formattedResponse);
    } catch (error) {
      console.error('Error fetching schedules:', error);
      res.status(500).json({ message: 'Error fetching schedules' });
    }
  }

  /**
   * @swagger
   * /api/schedules/{id}:
   *   get:
   *     summary: Get schedule by ID
   *     tags: [Schedules]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: Schedule ID
   *     responses:
   *       200:
   *         description: Schedule found
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 data:
   *                   $ref: '#/components/schemas/Schedule'
   *       404:
   *         description: Schedule not found
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
  // GET /api/schedules/:id - Get schedule by ID
  static async getScheduleById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const scheduleRepository = AppDataSource.getRepository(Schedule);
      const schedule = await scheduleRepository.findOne({ where: { id: parseInt(id) } });
      
      if (!schedule) {
        res.status(404).json({ message: 'Schedule not found' });
        return;
      }
      
      const response: IGetScheduleResDto = {
        id: schedule.id,
        title: schedule.title,
        description: schedule.description,
        scheduleDate: schedule.scheduleDate.toISOString().split('T')[0],
        startTime: schedule.startTime,
        endTime: schedule.endTime,
        location: schedule.location,
        address: schedule.address,
        eventType: schedule.eventType,
        status: schedule.status,
        isRecurring: schedule.isRecurring,
        recurrencePattern: schedule.recurrencePattern,
        recurrenceInterval: schedule.recurrenceInterval,
        isActive: schedule.isActive,
        createdAt: schedule.createdAt.toISOString(),
        updatedAt: schedule.updatedAt.toISOString(),
      };

      const formattedResponse: IResponseDto<IGetScheduleResDto> = {
        success: true,
        data: response,
      };
      res.json(formattedResponse);
    } catch (error) {
      console.error('Error fetching schedule:', error);
      res.status(500).json({ message: 'Error fetching schedule' });
    }
  }

  /**
   * @swagger
   * /api/schedules:
   *   post:
   *     summary: Create new schedule
   *     tags: [Schedules]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateScheduleRequest'
   *     responses:
   *       201:
   *         description: Schedule created successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 data:
   *                   $ref: '#/components/schemas/Schedule'
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
  // POST /api/schedules - Create new schedule
  static async createSchedule(req: Request, res: Response): Promise<void> {
    try {
      const scheduleData: ICreateScheduleReqDto = req.body;
      const { 
        title, 
        description, 
        scheduleDate, 
        startTime, 
        endTime, 
        location, 
        address, 
        eventType, 
        status, 
        isRecurring, 
        recurrencePattern, 
        recurrenceInterval 
      } = scheduleData;
      
      const scheduleRepository = AppDataSource.getRepository(Schedule);
      const schedule = scheduleRepository.create({
        title,
        description,
        scheduleDate: new Date(scheduleDate),
        startTime,
        endTime,
        location,
        address,
        eventType,
        status: status || EScheduleStatus.TENTATIVE,
        isRecurring: isRecurring || false,
        recurrencePattern,
        recurrenceInterval,
      });
      
      const savedSchedule = await scheduleRepository.save(schedule);
      
      const response: IGetScheduleResDto = {
        id: savedSchedule.id,
        title: savedSchedule.title,
        description: savedSchedule.description,
        scheduleDate: savedSchedule.scheduleDate.toISOString().split('T')[0],
        startTime: savedSchedule.startTime,
        endTime: savedSchedule.endTime,
        location: savedSchedule.location,
        address: savedSchedule.address,
        eventType: savedSchedule.eventType,
        status: savedSchedule.status,
        isRecurring: savedSchedule.isRecurring,
        recurrencePattern: savedSchedule.recurrencePattern,
        recurrenceInterval: savedSchedule.recurrenceInterval,
        isActive: savedSchedule.isActive,
        createdAt: savedSchedule.createdAt.toISOString(),
        updatedAt: savedSchedule.updatedAt.toISOString(),
      };
      
      const formattedResponse: IResponseDto<IGetScheduleResDto> = {
        success: true,
        data: response,
      };
      
      res.status(201).json(formattedResponse);
    } catch (error: any) {
      console.error('Error creating schedule:', error);
      res.status(500).json({ message: 'Error creating schedule' });
    }
  }

  /**
   * @swagger
   * /api/schedules/{id}:
   *   put:
   *     summary: Update schedule
   *     tags: [Schedules]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: Schedule ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateScheduleRequest'
   *     responses:
   *       200:
   *         description: Schedule updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 data:
   *                   $ref: '#/components/schemas/Schedule'
   *       400:
   *         description: Bad request - validation error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ValidationError'
   *       404:
   *         description: Schedule not found
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
  // PUT /api/schedules/:id - Update schedule
  static async updateSchedule(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateData: IUpdateScheduleReqDto = req.body;
      
      const scheduleRepository = AppDataSource.getRepository(Schedule);
      const schedule = await scheduleRepository.findOne({ where: { id: parseInt(id) } });
      
      if (!schedule) {
        res.status(404).json({ message: 'Schedule not found' });
        return;
      }
      
      // Update only provided fields
      Object.keys(updateData).forEach(key => {
        if (updateData[key as keyof IUpdateScheduleReqDto] !== undefined) {
          if (key === 'scheduleDate') {
            (schedule as any)[key] = new Date(updateData[key as keyof IUpdateScheduleReqDto] as string);
          } else {
            (schedule as any)[key] = updateData[key as keyof IUpdateScheduleReqDto];
          }
        }
      });
      
      const updatedSchedule = await scheduleRepository.save(schedule);
      
      const response: IGetScheduleResDto = {
        id: updatedSchedule.id,
        title: updatedSchedule.title,
        description: updatedSchedule.description,
        scheduleDate: updatedSchedule.scheduleDate.toISOString().split('T')[0],
        startTime: updatedSchedule.startTime,
        endTime: updatedSchedule.endTime,
        location: updatedSchedule.location,
        address: updatedSchedule.address,
        eventType: updatedSchedule.eventType,
        status: updatedSchedule.status,
        isRecurring: updatedSchedule.isRecurring,
        recurrencePattern: updatedSchedule.recurrencePattern,
        recurrenceInterval: updatedSchedule.recurrenceInterval,
        isActive: updatedSchedule.isActive,
        createdAt: updatedSchedule.createdAt.toISOString(),
        updatedAt: updatedSchedule.updatedAt.toISOString(),
      };
      
      const formattedResponse: IResponseDto<IGetScheduleResDto> = {
        success: true,
        data: response,
      };
      
      res.json(formattedResponse);
    } catch (error: any) {
      console.error('Error updating schedule:', error);
      res.status(500).json({ message: 'Error updating schedule' });
    }
  }

  /**
   * @swagger
   * /api/schedules/{id}:
   *   delete:
   *     summary: Delete schedule (soft delete)
   *     tags: [Schedules]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: Schedule ID
   *     responses:
   *       200:
   *         description: Schedule deleted successfully
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
   *                       example: 'Schedule deleted successfully'
   *       404:
   *         description: Schedule not found
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
  // DELETE /api/schedules/:id - Delete schedule (soft delete)
  static async deleteSchedule(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const scheduleRepository = AppDataSource.getRepository(Schedule);
      const schedule = await scheduleRepository.findOne({ where: { id: parseInt(id) } });
      
      if (!schedule) {
        res.status(404).json({ message: 'Schedule not found' });
        return;
      }
      
      // Soft delete - TypeORM will set deletedAt timestamp
      await scheduleRepository.softRemove(schedule);
      
      const formattedResponse: IResponseDto<{ message: string }> = {
        success: true,
        data: { message: 'Schedule deleted successfully' },
      };
      
      res.json(formattedResponse);
    } catch (error) {
      console.error('Error deleting schedule:', error);
      res.status(500).json({ message: 'Error deleting schedule' });
    }
  }

  /**
   * @swagger
   * /api/schedules/grouped-by-month:
   *   get:
   *     summary: Get schedules grouped by month
   *     tags: [Schedules]
   *     parameters:
   *       - in: query
   *         name: year
   *         schema:
   *           type: integer
   *           default: 2025
   *         description: Year to get schedules for
   *       - in: query
   *         name: eventType
   *         schema:
   *           type: string
   *           enum: [rehearsal, performance, outreach, recording, meeting, other]
   *         description: Filter by event type
   *       - in: query
   *         name: status
   *         schema:
   *           type: string
   *           enum: [confirmed, tentative, cancelled, completed]
   *         description: Filter by status
   *     responses:
   *       200:
   *         description: Schedules grouped by month
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
   *                       date:
   *                         type: string
   *                         example: "Sep 2025"
   *                       schedules:
   *                         type: array
   *                         items:
   *                           $ref: '#/components/schemas/Schedule'
   *       500:
   *         description: Internal server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  // GET /api/schedules/grouped-by-month - Get schedules grouped by month
  static async getSchedulesGroupedByMonth(req: Request, res: Response): Promise<void> {
    try {
      const { year = new Date().getFullYear(), eventType, status } = req.query;
      const scheduleRepository = AppDataSource.getRepository(Schedule);
      
      let query = scheduleRepository.createQueryBuilder('schedule');
      
      // Apply filters (same as getAllSchedules)
      if (eventType) {
        query = query.andWhere('schedule.eventType = :eventType', { eventType });
      }
      
      if (status) {
        query = query.andWhere('schedule.status = :status', { status });
      }
      
      // Optional year filtering - TEMPORARILY DISABLED FOR DEBUGGING
      // if (year) {
      //   const startDate = new Date(parseInt(year as string), 0, 1); // January 1st
      //   const endDate = new Date(parseInt(year as string), 11, 31); // December 31st
      //   query = query.andWhere('schedule.scheduleDate >= :startDate', { startDate })
      //               .andWhere('schedule.scheduleDate <= :endDate', { endDate });
      // }
      
      console.log('Query parameters:', { year, eventType, status });
      console.log('Generated SQL:', query.getSql());
      
      // First, let's test without any filters to see if we get any schedules at all
      const allSchedules = await scheduleRepository.find();
      console.log('Total schedules in database:', allSchedules.length);
      
      const schedules = await query
        .orderBy('schedule.scheduleDate', 'ASC')
        .addOrderBy('schedule.startTime', 'ASC')
        .getMany();

      console.log('Found schedules after filtering:', schedules.length);

      // Group schedules by month
      const groupedSchedules: Array<{ date: string; schedules: IGetScheduleResDto[] }> = [];
      const monthGroups = new Map<string, IGetScheduleResDto[]>();

      schedules.forEach(schedule => {
        const scheduleDate = new Date(schedule.scheduleDate);
        const monthKey = scheduleDate.toLocaleDateString('en-US', { 
          month: 'short', 
          year: 'numeric' 
        });
        
        const scheduleResponse: IGetScheduleResDto = {
          id: schedule.id,
          title: schedule.title,
          description: schedule.description,
          scheduleDate: schedule.scheduleDate ? dayjs(schedule.scheduleDate).format('DD MMM YYYY') : null,
          startTime: schedule.startTime ? schedule.startTime : null,
          endTime: schedule.endTime ? schedule.endTime : null,
          location: schedule.location,
          address: schedule.address,
          eventType: schedule.eventType,
          status: schedule.status,
          isRecurring: schedule.isRecurring,
          recurrencePattern: schedule.recurrencePattern,
          recurrenceInterval: schedule.recurrenceInterval,
          isActive: schedule.isActive,
          createdAt: schedule.createdAt ? dayjs(schedule.createdAt).format('DD MMM YYYY HH:mm') : null,
          updatedAt: schedule.updatedAt ? dayjs(schedule.updatedAt).format('DD MMM YYYY HH:mm') : null,
        };

        if (!monthGroups.has(monthKey)) {
          monthGroups.set(monthKey, []);
        }
        monthGroups.get(monthKey)!.push(scheduleResponse);
      });

      // Convert Map to array format
      monthGroups.forEach((schedules, date) => {
        groupedSchedules.push({ date, schedules });
      });

      // Sort by date
      groupedSchedules.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA.getTime() - dateB.getTime();
      });

      const formattedResponse: IResponseDto<Array<{ date: string; schedules: IGetScheduleResDto[] }>> = {
        success: true,
        data: groupedSchedules,
      };
      res.json(formattedResponse);
    } catch (error) {
      console.error('Error fetching schedules grouped by month:', error);
      res.status(500).json({ message: 'Error fetching schedules grouped by month' });
    }
  }

  /**
   * @swagger
   * /api/schedules/upcoming:
   *   get:
   *     summary: Get upcoming schedules
   *     tags: [Schedules]
   *     parameters:
   *       - in: query
   *         name: days
   *         schema:
   *           type: integer
   *           default: 30
   *         description: Number of days to look ahead
   *       - in: query
   *         name: eventType
   *         schema:
   *           type: string
   *           enum: [rehearsal, performance, outreach, recording, meeting, other]
   *         description: Filter by event type
   *     responses:
   *       200:
   *         description: List of upcoming schedules
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
   *                     $ref: '#/components/schemas/Schedule'
   *       500:
   *         description: Internal server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  // GET /api/schedules/upcoming - Get upcoming schedules
  static async getUpcomingSchedules(req: Request, res: Response): Promise<void> {
    try {
      const { days = 30, eventType } = req.query;
      const scheduleRepository = AppDataSource.getRepository(Schedule);
      
      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + parseInt(days as string));
      
      let query = scheduleRepository.createQueryBuilder('schedule')
        .where('schedule.scheduleDate >= :startDate', { startDate })
        .andWhere('schedule.scheduleDate <= :endDate', { endDate })
        .andWhere('schedule.isActive = :isActive', { isActive: true });
      
      if (eventType) {
        query = query.andWhere('schedule.eventType = :eventType', { eventType });
      }
      
      const schedules = await query
        .orderBy('schedule.scheduleDate', 'ASC')
        .addOrderBy('schedule.startTime', 'ASC')
        .getMany();

      const response: IGetScheduleResDto[] = schedules.map(schedule => ({
        id: schedule.id,
        title: schedule.title,
        description: schedule.description,
        scheduleDate: schedule.scheduleDate.toISOString().split('T')[0],
        startTime: schedule.startTime,
        endTime: schedule.endTime,
        location: schedule.location,
        address: schedule.address,
        eventType: schedule.eventType,
        status: schedule.status,
        isRecurring: schedule.isRecurring,
        recurrencePattern: schedule.recurrencePattern,
        recurrenceInterval: schedule.recurrenceInterval,
        isActive: schedule.isActive,
        createdAt: schedule.createdAt.toISOString(),
        updatedAt: schedule.updatedAt.toISOString(),
      }));

      const formattedResponse: IResponseDto<IGetScheduleResDto[]> = {
        success: true,
        data: response,
      };
      res.json(formattedResponse);
    } catch (error) {
      console.error('Error fetching upcoming schedules:', error);
      res.status(500).json({ message: 'Error fetching upcoming schedules' });
    }
  }

  // GET /api/schedules/debug - Debug endpoint to test basic functionality
  static async debugSchedules(req: Request, res: Response): Promise<void> {
    try {
      const scheduleRepository = AppDataSource.getRepository(Schedule);
      const allSchedules = await scheduleRepository.find();
      
      console.log('Debug - Total schedules found:', allSchedules.length);
      console.log('Debug - First schedule:', allSchedules[0]);
      
      res.json({
        success: true,
        total: allSchedules.length,
        schedules: allSchedules.map(s => ({
          id: s.id,
          title: s.title,
          scheduleDate: s.scheduleDate,
          startTime: s.startTime,
          endTime: s.endTime,
          eventType: s.eventType,
          status: s.status,
          isActive: s.isActive
        }))
      });
    } catch (error) {
      console.error('Debug error:', error);
      res.status(500).json({ message: 'Debug error', error });
    }
  }
}