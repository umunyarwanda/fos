"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookings_controller_1 = require("../controllers/bookings.controller");
const validation_middleware_1 = require("../middleware/validation.middleware");
const create_booking_dto_1 = require("../dtos/bookings/request/create-booking.dto");
const update_booking_dto_1 = require("../dtos/bookings/request/update-booking.dto");
const urls_1 = require("../shared/variables/urls");
const router = express_1.default.Router();
router.get('/', bookings_controller_1.BookingsController.getAllBookings);
router.get(urls_1.BOOKINGS_URL.GET_PENDING_BOOKINGS, bookings_controller_1.BookingsController.getPendingBookings);
router.get('/:id', bookings_controller_1.BookingsController.getBookingById);
router.post('/', (0, validation_middleware_1.validateDto)(create_booking_dto_1.CreateBookingDto), bookings_controller_1.BookingsController.createBooking);
router.put('/:id', (0, validation_middleware_1.validateDto)(update_booking_dto_1.UpdateBookingDto), bookings_controller_1.BookingsController.updateBooking);
router.delete('/:id', bookings_controller_1.BookingsController.deleteBooking);
exports.default = router;
//# sourceMappingURL=bookingRoutes.js.map