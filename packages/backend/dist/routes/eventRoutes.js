"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const events_controller_1 = require("../controllers/events.controller");
const validation_middleware_1 = require("../middleware/validation.middleware");
const create_event_dto_1 = require("../dtos/events/request/create-event.dto");
const update_event_dto_1 = require("../dtos/events/request/update-event.dto");
const router = express_1.default.Router();
router.get('/', events_controller_1.EventsController.getAllEvents);
router.get('/featured', events_controller_1.EventsController.getFeaturedEvents);
router.get('/:id', events_controller_1.EventsController.getEventById);
router.post('/', (0, validation_middleware_1.validateDto)(create_event_dto_1.CreateEventDto), events_controller_1.EventsController.createEvent);
router.put('/:id', (0, validation_middleware_1.validateDto)(update_event_dto_1.UpdateEventDto), events_controller_1.EventsController.updateEvent);
router.delete('/:id', events_controller_1.EventsController.deleteEvent);
exports.default = router;
//# sourceMappingURL=eventRoutes.js.map