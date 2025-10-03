import express, { Router } from 'express';
import { EventsController } from '../controllers/events.controller';
import { validateDto } from '../middleware/validation.middleware';
import { CreateEventDto } from '../dtos/events/request/create-event.dto';
import { UpdateEventDto } from '../dtos/events/request/update-event.dto';

const router: Router = express.Router();

// GET /api/events - Get all events (no validation needed)
router.get('/', EventsController.getAllEvents);

// GET /api/events/featured - Get featured events (no validation needed)
router.get('/featured', EventsController.getFeaturedEvents);

// GET /api/events/:id - Get event by ID (no validation needed)
router.get('/:id', EventsController.getEventById);

// POST /api/events - Create new event (with validation)
router.post('/', validateDto(CreateEventDto), EventsController.createEvent);

// PUT /api/events/:id - Update event (with validation)
router.put('/:id', validateDto(UpdateEventDto), EventsController.updateEvent);

// DELETE /api/events/:id - Delete event (soft delete) (no validation needed)
router.delete('/:id', EventsController.deleteEvent);

export default router;