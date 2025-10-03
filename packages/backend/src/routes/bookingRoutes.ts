import express, { Router } from 'express';
import { BookingsController } from '../controllers/bookings.controller';
import { validateDto } from '../middleware/validation.middleware';
import { CreateBookingDto } from '../dtos/bookings/request/create-booking.dto';
import { UpdateBookingDto } from '../dtos/bookings/request/update-booking.dto';
import { BOOKINGS_URL } from '../shared/variables/urls';

const router: Router = express.Router();

// GET /api/bookings - Get all bookings (no validation needed)
router.get('/', BookingsController.getAllBookings);

// GET /api/bookings/pending - Get pending bookings (no validation needed)
router.get(BOOKINGS_URL.GET_PENDING_BOOKINGS, BookingsController.getPendingBookings);

// GET /api/bookings/:id - Get booking by ID (no validation needed)
router.get('/:id', BookingsController.getBookingById);

// POST /api/bookings - Create new booking (with validation)
router.post('/', validateDto(CreateBookingDto), BookingsController.createBooking);

// PUT /api/bookings/:id - Update booking (with validation)
router.put('/:id', validateDto(UpdateBookingDto), BookingsController.updateBooking);

// DELETE /api/bookings/:id - Delete booking (no validation needed)
router.delete('/:id', BookingsController.deleteBooking);

export default router;