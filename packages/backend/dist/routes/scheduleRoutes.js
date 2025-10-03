"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const schedules_controller_1 = require("../controllers/schedules.controller");
const validation_middleware_1 = require("../middleware/validation.middleware");
const create_schedule_dto_1 = require("../dtos/schedules/request/create-schedule.dto");
const update_schedule_dto_1 = require("../dtos/schedules/request/update-schedule.dto");
const router = express_1.default.Router();
router.get('/', schedules_controller_1.SchedulesController.getAllSchedules);
router.get('/grouped-by-month', schedules_controller_1.SchedulesController.getSchedulesGroupedByMonth);
router.get('/upcoming', schedules_controller_1.SchedulesController.getUpcomingSchedules);
router.get('/debug', schedules_controller_1.SchedulesController.debugSchedules);
router.get('/:id', schedules_controller_1.SchedulesController.getScheduleById);
router.post('/', (0, validation_middleware_1.validateDto)(create_schedule_dto_1.CreateScheduleDto), schedules_controller_1.SchedulesController.createSchedule);
router.put('/:id', (0, validation_middleware_1.validateDto)(update_schedule_dto_1.UpdateScheduleDto), schedules_controller_1.SchedulesController.updateSchedule);
router.delete('/:id', schedules_controller_1.SchedulesController.deleteSchedule);
exports.default = router;
//# sourceMappingURL=scheduleRoutes.js.map