import { Request, Response } from 'express';
import { plainToClass } from 'class-transformer';
import { AppDataSource } from '../config/database';
import { BookingResponseDto } from '../dtos/bookings/response/booking-response.dto';
import { ICreateBookingReqDto } from '../shared/interfaces/bookings/request/ICreateBookingReqDto';
import { IUpdateBookingReqDto } from '../shared/interfaces/bookings/request/IUpdateBookingReqDto';
import { IGetBookingResDto } from '../shared/interfaces/bookings/response/IGetBookingResDto';
import { IResponseDto } from '../shared/interfaces/IResponseDto';
import dayjs from 'dayjs';
import { Booking } from '../entities/Booking';
import { BookingStatus } from '../shared/enum/EBooking.enum';
import { Commission } from '../entities/Commission';

export class BookingsController {
  /**
   * @swagger
   * /api/bookings:
   *   get:
   *     summary: Get all bookings
   *     tags: [Bookings]
   *     parameters:
   *       - in: query
   *         name: status
   *         schema:
   *           type: string
   *           enum: [pending, confirmed, in_progress, completed, cancelled]
   *         description: Filter by booking status
   *       - in: query
   *         name: commissionId
   *         schema:
   *           type: integer
   *         description: Filter by commission ID
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
   *         description: List of bookings
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
   *                     $ref: '#/components/schemas/Booking'
   *       500:
   *         description: Internal server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  // GET /api/bookings - Get all bookings
  static async getAllBookings(req: Request, res: Response): Promise<void> {
    try {
      const { status, commissionId, startDate, endDate } = req.query;
      const bookingRepository = AppDataSource.getRepository(Booking);
      
      let query = bookingRepository.createQueryBuilder('booking')
        .leftJoinAndSelect('booking.commission', 'commission');
      
      // Apply filters
      if (status) {
        query = query.andWhere('booking.status = :status', { status });
      }
      
      if (commissionId) {
        query = query.andWhere('booking.commissionId = :commissionId', { commissionId });
      }
      
      if (startDate) {
        query = query.andWhere('booking.eventDate >= :startDate', { startDate });
      }
      
      if (endDate) {
        query = query.andWhere('booking.eventDate <= :endDate', { endDate });
      }
      
      const bookings = await query
        .orderBy('booking.createdAt', 'DESC')
        .getMany();

      const response: IGetBookingResDto[] = bookings.map(booking => ({
        id: booking.id,
        fullName: booking.fullName,
        email: booking.email,
        phoneNumber: booking.phoneNumber,
        eventLocation: booking.eventLocation,
        eventDate: booking.eventDate ? dayjs(booking.eventDate).format('DD MMM YYYY') : null,
        duration: booking.duration,
        additionalMessage: booking.additionalMessage,
        commissionId: booking.commissionId,
        customEventType: booking.customEventType,
        status: booking.status,
        confirmedAt: booking.confirmedAt ? dayjs(booking.confirmedAt).format('DD MMM YYYY HH:mm') : null,
        completedAt: booking.completedAt ? dayjs(booking.completedAt).format('DD MMM YYYY HH:mm') : null,
        createdAt: booking.createdAt ? dayjs(booking.createdAt).format('DD MMM YYYY HH:mm') : null,
        updatedAt: booking.updatedAt ? dayjs(booking.updatedAt).format('DD MMM YYYY HH:mm') : null,
      }));

      const formattedResponse: IResponseDto<IGetBookingResDto[]> = {
        success: true,
        data: response,
      };
      res.json(formattedResponse);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      res.status(500).json({ message: 'Error fetching bookings' });
    }
  }

  /**
   * @swagger
   * /api/bookings/{id}:
   *   get:
   *     summary: Get booking by ID
   *     tags: [Bookings]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: Booking ID
   *     responses:
   *       200:
   *         description: Booking found
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 data:
   *                   $ref: '#/components/schemas/Booking'
   *       404:
   *         description: Booking not found
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
  // GET /api/bookings/:id - Get booking by ID
  static async getBookingById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const bookingRepository = AppDataSource.getRepository(Booking);
      
      const booking = await bookingRepository.findOne({
        where: { id: parseInt(id) },
        relations: ['commission']
      });

      if (!booking) {
        res.status(404).json({ message: 'Booking not found' });
        return;
      }

      const response: IGetBookingResDto = {
        id: booking.id,
        fullName: booking.fullName,
        email: booking.email,
        phoneNumber: booking.phoneNumber,
        eventLocation: booking.eventLocation,
        eventDate: booking.eventDate ? dayjs(booking.eventDate).format('DD MMM YYYY') : null,
        duration: booking.duration,
        additionalMessage: booking.additionalMessage,
        commissionId: booking.commissionId,
        customEventType: booking.customEventType,
        status: booking.status,
        confirmedAt: booking.confirmedAt ? dayjs(booking.confirmedAt).format('DD MMM YYYY HH:mm') : null,
        completedAt: booking.completedAt ? dayjs(booking.completedAt).format('DD MMM YYYY HH:mm') : null,
        createdAt: booking.createdAt ? dayjs(booking.createdAt).format('DD MMM YYYY HH:mm') : null,
        updatedAt: booking.updatedAt ? dayjs(booking.updatedAt).format('DD MMM YYYY HH:mm') : null,
      };

      const formattedResponse: IResponseDto<IGetBookingResDto> = {
        success: true,
        data: response,
      };
      res.json(formattedResponse);
    } catch (error) {
      console.error('Error fetching booking:', error);
      res.status(500).json({ message: 'Error fetching booking' });
    }
  }

  /**
   * @swagger
   * /api/bookings:
   *   post:
   *     summary: Create new booking
   *     tags: [Bookings]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateBookingRequest'
   *     responses:
   *       201:
   *         description: Booking created successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 data:
   *                   $ref: '#/components/schemas/Booking'
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
  // POST /api/bookings - Create new booking
  static async createBooking(req: Request, res: Response): Promise<void> {
    try {
      const bookingData: ICreateBookingReqDto = req.body;
      const bookingRepository = AppDataSource.getRepository(Booking);
      
      if (bookingData.commissionId) {
        const commissionRepository = AppDataSource.getRepository(Commission);
        const commission = await commissionRepository.findOne({
          where: { id: bookingData.commissionId }
        });
        
        if (!commission) {
          res.status(400).json({ 
            message: 'Commission not found',
            success: false 
          });
          return;
        }
      }

      // Convert ISO date string to Date object
      const booking = bookingRepository.create({
        ...bookingData,
        eventDate: new Date(bookingData.eventDate)
      });
      
      const savedBooking = await bookingRepository.save(booking);

      const response: IGetBookingResDto = {
        id: savedBooking.id,
        fullName: savedBooking.fullName,
        email: savedBooking.email,
        phoneNumber: savedBooking.phoneNumber,
        eventLocation: savedBooking.eventLocation,
        eventDate: savedBooking.eventDate ? dayjs(savedBooking.eventDate).format('DD MMM YYYY') : null,
        duration: savedBooking.duration,
        additionalMessage: savedBooking.additionalMessage,
        commissionId: savedBooking.commissionId,
        customEventType: savedBooking.customEventType,
        status: savedBooking.status,
        confirmedAt: savedBooking.confirmedAt ? dayjs(savedBooking.confirmedAt).format('DD MMM YYYY HH:mm') : null,
        completedAt: savedBooking.completedAt ? dayjs(savedBooking.completedAt).format('DD MMM YYYY HH:mm') : null,
        createdAt: savedBooking.createdAt ? dayjs(savedBooking.createdAt).format('DD MMM YYYY HH:mm') : null,
        updatedAt: savedBooking.updatedAt ? dayjs(savedBooking.updatedAt).format('DD MMM YYYY HH:mm') : null,
      };

      const formattedResponse: IResponseDto<IGetBookingResDto> = {
        success: true,
        data: response,
      };
      res.status(201).json(formattedResponse);
    } catch (error: any) {
      console.error('Error creating booking:', error);
      res.status(500).json({ message: 'Error creating booking' });
    }
  }

  /**
   * @swagger
   * /api/bookings/{id}:
   *   put:
   *     summary: Update booking
   *     tags: [Bookings]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: Booking ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateBookingRequest'
   *     responses:
   *       200:
   *         description: Booking updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 data:
   *                   $ref: '#/components/schemas/Booking'
   *       400:
   *         description: Validation error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ValidationError'
   *       404:
   *         description: Booking not found
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
  // PUT /api/bookings/:id - Update booking
  static async updateBooking(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateData: IUpdateBookingReqDto = req.body;
      const bookingRepository = AppDataSource.getRepository(Booking);
      
      const booking = await bookingRepository.findOne({
        where: { id: parseInt(id) }
      });

      if (!booking) {
        res.status(404).json({ message: 'Booking not found' });
        return;
      }

      if (updateData.commissionId) {
        const commissionRepository = AppDataSource.getRepository(Commission);
        const commission = await commissionRepository.findOne({
          where: { id: updateData.commissionId }
        });
        
        if (!commission) {
          res.status(400).json({ 
            message: 'Commission not found',
            success: false 
          });
          return;
        }
      }

      // Handle status changes
      if (updateData.status && updateData.status !== booking.status) {
        if (updateData.status === BookingStatus.CONFIRMED && !booking.confirmedAt) {
          updateData.confirmedAt = new Date();
        }
        if (updateData.status === BookingStatus.COMPLETED && !booking.completedAt) {
          updateData.completedAt = new Date();
        }
      }

      // Convert ISO date string to Date object if provided
      // if (updateData.eventDate) {
      //   updateData.eventDate = new Date(updateData.eventDate);
      // }

      Object.assign(booking, updateData);
      const updatedBooking = await bookingRepository.save(booking);

      const response: IGetBookingResDto = {
        id: updatedBooking.id,
        fullName: updatedBooking.fullName,
        email: updatedBooking.email,
        phoneNumber: updatedBooking.phoneNumber,
        eventLocation: updatedBooking.eventLocation,
        eventDate: updatedBooking.eventDate ? dayjs(updatedBooking.eventDate).format('DD MMM YYYY') : null,
        duration: updatedBooking.duration,
        additionalMessage: updatedBooking.additionalMessage,
        commissionId: updatedBooking.commissionId,
        customEventType: updatedBooking.customEventType,
        status: updatedBooking.status,
        confirmedAt: updatedBooking.confirmedAt ? dayjs(updatedBooking.confirmedAt).format('DD MMM YYYY HH:mm') : null,
        completedAt: updatedBooking.completedAt ? dayjs(updatedBooking.completedAt).format('DD MMM YYYY HH:mm') : null,
        createdAt: updatedBooking.createdAt ? dayjs(updatedBooking.createdAt).format('DD MMM YYYY HH:mm') : null,
        updatedAt: updatedBooking.updatedAt ? dayjs(updatedBooking.updatedAt).format('DD MMM YYYY HH:mm') : null,
      };

      const formattedResponse: IResponseDto<IGetBookingResDto> = {
        success: true,
        data: response,
      };
      res.json(formattedResponse);
    } catch (error: any) {
      console.error('Error updating booking:', error);
      res.status(500).json({ message: 'Error updating booking' });
    }
  }

  /**
   * @swagger
   * /api/bookings/{id}:
   *   delete:
   *     summary: Delete booking (soft delete)
   *     tags: [Bookings]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: Booking ID
   *     responses:
   *       200:
   *         description: Booking deleted successfully
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
   *                   example: Booking deleted successfully
   *       404:
   *         description: Booking not found
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
  // DELETE /api/bookings/:id - Delete booking (soft delete)
  static async deleteBooking(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const bookingRepository = AppDataSource.getRepository(Booking);
      
      const booking = await bookingRepository.findOne({
        where: { id: parseInt(id) }
      });

      if (!booking) {
        res.status(404).json({ message: 'Booking not found' });
        return;
      }

      await bookingRepository.softDelete(parseInt(id));

      res.json({ 
        success: true, 
        message: 'Booking deleted successfully' 
      });
    } catch (error: any) {
      console.error('Error deleting booking:', error);
      res.status(500).json({ message: 'Error deleting booking' });
    }
  }

  /**
   * @swagger
   * /api/bookings/pending:
   *   get:
   *     summary: Get pending bookings
   *     tags: [Bookings]
   *     responses:
   *       200:
   *         description: List of pending bookings
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
   *                     $ref: '#/components/schemas/Booking'
   *       500:
   *         description: Internal server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  // GET /api/bookings/pending - Get pending bookings
  static async getPendingBookings(req: Request, res: Response): Promise<void> {
    try {
      const bookingRepository = AppDataSource.getRepository(Booking);
      
      const bookings = await bookingRepository.find({
        where: { status: BookingStatus.PENDING },
        relations: ['commission'],
        order: { createdAt: 'DESC' }
      });

      const response: IGetBookingResDto[] = bookings.map(booking => ({
        id: booking.id,
        fullName: booking.fullName,
        email: booking.email,
        phoneNumber: booking.phoneNumber,
        eventLocation: booking.eventLocation,
        eventDate: booking.eventDate ? dayjs(booking.eventDate).format('DD MMM YYYY') : null,
        duration: booking.duration,
        additionalMessage: booking.additionalMessage,
        commissionId: booking.commissionId,
        customEventType: booking.customEventType,
        status: booking.status,
        confirmedAt: booking.confirmedAt ? dayjs(booking.confirmedAt).format('DD MMM YYYY HH:mm') : null,
        completedAt: booking.completedAt ? dayjs(booking.completedAt).format('DD MMM YYYY HH:mm') : null,
        createdAt: booking.createdAt ? dayjs(booking.createdAt).format('DD MMM YYYY HH:mm') : null,
        updatedAt: booking.updatedAt ? dayjs(booking.updatedAt).format('DD MMM YYYY HH:mm') : null,
      }));

      const formattedResponse: IResponseDto<IGetBookingResDto[]> = {
        success: true,
        data: response,
      };
      res.json(formattedResponse);
    } catch (error) {
      console.error('Error fetching pending bookings:', error);
      res.status(500).json({ message: 'Error fetching pending bookings' });
    }
  }
}