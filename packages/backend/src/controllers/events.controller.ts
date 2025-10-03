import { Request, Response } from 'express';
import { plainToClass } from 'class-transformer';
import { AppDataSource } from '../config/database';
import { Event } from '../entities/Event';
import { EventResponseDto } from '../dtos/events/response/event-response.dto';
import { ICreateEventReqDto } from '../shared/interfaces/events/request/ICreateEventReqDto';
import { IUpdateEventReqDto } from '../shared/interfaces/events/request/IUpdateEventReqDto';
import { IGetEventResDto } from '../shared/interfaces/events/response/IGetEventResDto';
import { IResponseDto } from '../shared/interfaces/IResponseDto';

export class EventsController {
  /**
   * @swagger
   * /api/events:
   *   get:
   *     summary: Get all events
   *     tags: [Events]
   *     parameters:
   *       - in: query
   *         name: featured
   *         schema:
   *           type: boolean
   *         description: Filter by featured events only
   *       - in: query
   *         name: venueType
   *         schema:
   *           type: string
   *           enum: [indoor, outdoor]
   *         description: Filter by venue type
   *     responses:
   *       200:
   *         description: List of events
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
   *                     $ref: '#/components/schemas/Event'
   *       500:
   *         description: Internal server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  // GET /api/events - Get all events
  static async getAllEvents(req: Request, res: Response): Promise<void> {
    try {
      const eventRepository = AppDataSource.getRepository(Event);
      const events = await eventRepository.find({
        relations: ['organizer'],
        order: { eventDate: 'ASC' }
      });

      const response: IGetEventResDto[] = events.map(event => ({
        id: event.id,
        title: event.title,
        subtitle: event.subtitle,
        description: event.description,
        eventDate: event.eventDate.toISOString(),
        startTime: event.startTime,
        endTime: event.endTime,
        location: event.location,
        address: event.address,
        capacity: event.capacity,
        isActive: event.isActive,
        isFeatured: event.isFeatured,
        tags: event.tags,
        galleryImages: event.galleryImages,
        featuredPerformers: event.featuredPerformers,
        venueType: event.venueType,
        organizerId: event.organizerId,
        createdAt: event.createdAt.toISOString(),
        updatedAt: event.updatedAt.toISOString(),
      }));

      const formattedResponse: IResponseDto<IGetEventResDto[]> = {
        success: true,
        data: response,
      };
      res.json(formattedResponse);
    } catch (error) {
      console.error('Error fetching events:', error);
      res.status(500).json({ message: 'Error fetching events' });
    }
  }

  /**
   * @swagger
   * /api/events/{id}:
   *   get:
   *     summary: Get event by ID
   *     tags: [Events]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: Event ID
   *     responses:
   *       200:
   *         description: Event found
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 data:
   *                   $ref: '#/components/schemas/Event'
   *       404:
   *         description: Event not found
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
  // GET /api/events/:id - Get event by ID
  static async getEventById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const eventRepository = AppDataSource.getRepository(Event);
      const event = await eventRepository.findOne({ 
        where: { id: parseInt(id) },
        relations: ['organizer']
      });
      
      if (!event) {
        res.status(404).json({ message: 'Event not found' });
        return;
      }
      
      const response: IGetEventResDto = {
        id: event.id,
        title: event.title,
        subtitle: event.subtitle,
        description: event.description,
        eventDate: event.eventDate.toISOString(),
        startTime: event.startTime,
        endTime: event.endTime,
        location: event.location,
        address: event.address,
        capacity: event.capacity,
        isActive: event.isActive,
        isFeatured: event.isFeatured,
        tags: event.tags,
        galleryImages: event.galleryImages,
        featuredPerformers: event.featuredPerformers,
        venueType: event.venueType,
        organizerId: event.organizerId,
        createdAt: event.createdAt.toISOString(),
        updatedAt: event.updatedAt.toISOString(),
      };

      const formattedResponse: IResponseDto<IGetEventResDto> = {
        success: true,
        data: response,
      };
      res.json(formattedResponse);
    } catch (error) {
      console.error('Error fetching event:', error);
      res.status(500).json({ message: 'Error fetching event' });
    }
  }

  /**
   * @swagger
   * /api/events:
   *   post:
   *     summary: Create new event
   *     tags: [Events]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateEventRequest'
   *     responses:
   *       201:
   *         description: Event created successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 data:
   *                   $ref: '#/components/schemas/Event'
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
  // POST /api/events - Create new event
  static async createEvent(req: Request, res: Response): Promise<void> {
    try {
      const eventData: ICreateEventReqDto = req.body;
      const { 
        title, 
        subtitle, 
        description, 
        eventDate, 
        startTime, 
        endTime, 
        location, 
        address, 
        capacity, 
        isFeatured, 
        tags, 
        galleryImages, 
        featuredPerformers, 
        venueType 
      } = eventData;
      
      const eventRepository = AppDataSource.getRepository(Event);
      const event = eventRepository.create({
        title,
        subtitle,
        description,
        eventDate: new Date(eventDate),
        startTime,
        endTime,
        location,
        address,
        capacity,
        isFeatured: isFeatured || false,
        tags,
        galleryImages,
        featuredPerformers,
        venueType,
      });
      
      const savedEvent = await eventRepository.save(event);
      
      const response: IGetEventResDto = {
        id: savedEvent.id,
        title: savedEvent.title,
        subtitle: savedEvent.subtitle,
        description: savedEvent.description,
        eventDate: savedEvent.eventDate.toISOString(),
        startTime: savedEvent.startTime,
        endTime: savedEvent.endTime,
        location: savedEvent.location,
        address: savedEvent.address,
        capacity: savedEvent.capacity,
        isActive: savedEvent.isActive,
        isFeatured: savedEvent.isFeatured,
        tags: savedEvent.tags,
        galleryImages: savedEvent.galleryImages,
        featuredPerformers: savedEvent.featuredPerformers,
        venueType: savedEvent.venueType,
        organizerId: savedEvent.organizerId,
        createdAt: savedEvent.createdAt.toISOString(),
        updatedAt: savedEvent.updatedAt.toISOString(),
      };
      
      const formattedResponse: IResponseDto<IGetEventResDto> = {
        success: true,
        data: response,
      };
      
      res.status(201).json(formattedResponse);
    } catch (error: any) {
      console.error('Error creating event:', error);
      res.status(500).json({ message: 'Error creating event' });
    }
  }

  /**
   * @swagger
   * /api/events/{id}:
   *   put:
   *     summary: Update event
   *     tags: [Events]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: Event ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateEventRequest'
   *     responses:
   *       200:
   *         description: Event updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 data:
   *                   $ref: '#/components/schemas/Event'
   *       400:
   *         description: Bad request - validation error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ValidationError'
   *       404:
   *         description: Event not found
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
  // PUT /api/events/:id - Update event
  static async updateEvent(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateData: IUpdateEventReqDto = req.body;
      
      const eventRepository = AppDataSource.getRepository(Event);
      const event = await eventRepository.findOne({ where: { id: parseInt(id) } });
      
      if (!event) {
        res.status(404).json({ message: 'Event not found' });
        return;
      }
      
      // Update only provided fields
      Object.keys(updateData).forEach(key => {
        if (updateData[key as keyof IUpdateEventReqDto] !== undefined) {
          if (key === 'eventDate') {
            (event as any)[key] = new Date(updateData[key as keyof IUpdateEventReqDto] as string);
          } else {
            (event as any)[key] = updateData[key as keyof IUpdateEventReqDto];
          }
        }
      });
      
      const updatedEvent = await eventRepository.save(event);
      
      const response: IGetEventResDto = {
        id: updatedEvent.id,
        title: updatedEvent.title,
        subtitle: updatedEvent.subtitle,
        description: updatedEvent.description,
        eventDate: updatedEvent.eventDate.toISOString(),
        startTime: updatedEvent.startTime,
        endTime: updatedEvent.endTime,
        location: updatedEvent.location,
        address: updatedEvent.address,
        capacity: updatedEvent.capacity,
        isActive: updatedEvent.isActive,
        isFeatured: updatedEvent.isFeatured,
        tags: updatedEvent.tags,
        galleryImages: updatedEvent.galleryImages,
        featuredPerformers: updatedEvent.featuredPerformers,
        venueType: updatedEvent.venueType,
        organizerId: updatedEvent.organizerId,
        createdAt: updatedEvent.createdAt.toISOString(),
        updatedAt: updatedEvent.updatedAt.toISOString(),
      };
      
      const formattedResponse: IResponseDto<IGetEventResDto> = {
        success: true,
        data: response,
      };
      
      res.json(formattedResponse);
    } catch (error: any) {
      console.error('Error updating event:', error);
      res.status(500).json({ message: 'Error updating event' });
    }
  }

  /**
   * @swagger
   * /api/events/{id}:
   *   delete:
   *     summary: Delete event (soft delete)
   *     tags: [Events]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: Event ID
   *     responses:
   *       200:
   *         description: Event deleted successfully
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
   *                       example: 'Event deleted successfully'
   *       404:
   *         description: Event not found
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
  // DELETE /api/events/:id - Delete event (soft delete)
  static async deleteEvent(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const eventRepository = AppDataSource.getRepository(Event);
      const event = await eventRepository.findOne({ where: { id: parseInt(id) } });
      
      if (!event) {
        res.status(404).json({ message: 'Event not found' });
        return;
      }
      
      // Soft delete - TypeORM will set deletedAt timestamp
      await eventRepository.softRemove(event);
      
      const formattedResponse: IResponseDto<{ message: string }> = {
        success: true,
        data: { message: 'Event deleted successfully' },
      };
      
      res.json(formattedResponse);
    } catch (error) {
      console.error('Error deleting event:', error);
      res.status(500).json({ message: 'Error deleting event' });
    }
  }

  /**
   * @swagger
   * /api/events/featured:
   *   get:
   *     summary: Get featured events
   *     tags: [Events]
   *     responses:
   *       200:
   *         description: List of featured events
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
   *                     $ref: '#/components/schemas/Event'
   *       500:
   *         description: Internal server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  // GET /api/events/featured - Get featured events
  static async getFeaturedEvents(req: Request, res: Response): Promise<void> {
    try {
      const eventRepository = AppDataSource.getRepository(Event);
      const events = await eventRepository.find({
        where: { isFeatured: true, isActive: true },
        relations: ['organizer'],
        order: { eventDate: 'ASC' }
      });

      const response: IGetEventResDto[] = events.map(event => ({
        id: event.id,
        title: event.title,
        subtitle: event.subtitle,
        description: event.description,
        eventDate: event.eventDate.toISOString(),
        startTime: event.startTime,
        endTime: event.endTime,
        location: event.location,
        address: event.address,
        capacity: event.capacity,
        isActive: event.isActive,
        isFeatured: event.isFeatured,
        tags: event.tags,
        galleryImages: event.galleryImages,
        featuredPerformers: event.featuredPerformers,
        venueType: event.venueType,
        organizerId: event.organizerId,
        createdAt: event.createdAt.toISOString(),
        updatedAt: event.updatedAt.toISOString(),
      }));

      const formattedResponse: IResponseDto<IGetEventResDto[]> = {
        success: true,
        data: response,
      };
      res.json(formattedResponse);
    } catch (error) {
      console.error('Error fetching featured events:', error);
      res.status(500).json({ message: 'Error fetching featured events' });
    }
  }
}