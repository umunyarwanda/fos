import express, { Router } from 'express';
import { SchedulesController } from '../controllers/schedules.controller';
import { validateDto } from '../middleware/validation.middleware';
import { CreateScheduleDto } from '../dtos/schedules/request/create-schedule.dto';
import { UpdateScheduleDto } from '../dtos/schedules/request/update-schedule.dto';

const router: Router = express.Router();

// GET /api/schedules - Get all schedules (no validation needed)
router.get('/', SchedulesController.getAllSchedules);

// GET /api/schedules/grouped-by-month - Get schedules grouped by month (no validation needed)
router.get('/grouped-by-month', SchedulesController.getSchedulesGroupedByMonth);

// GET /api/schedules/upcoming - Get upcoming schedules (no validation needed)
router.get('/upcoming', SchedulesController.getUpcomingSchedules);

// GET /api/schedules/debug - Debug endpoint (no validation needed)
router.get('/debug', SchedulesController.debugSchedules);

// GET /api/schedules/:id - Get schedule by ID (no validation needed)
router.get('/:id', SchedulesController.getScheduleById);

// POST /api/schedules - Create new schedule (with validation)
router.post('/', validateDto(CreateScheduleDto), SchedulesController.createSchedule);

// PUT /api/schedules/:id - Update schedule (with validation)
router.put('/:id', validateDto(UpdateScheduleDto), SchedulesController.updateSchedule);

// DELETE /api/schedules/:id - Delete schedule (soft delete) (no validation needed)
router.delete('/:id', SchedulesController.deleteSchedule);

export default router;