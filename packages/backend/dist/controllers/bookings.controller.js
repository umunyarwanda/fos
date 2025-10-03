"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingsController = void 0;
const database_1 = require("../config/database");
const dayjs_1 = __importDefault(require("dayjs"));
const Booking_1 = require("../entities/Booking");
const EBooking_enum_1 = require("../shared/enum/EBooking.enum");
const Commission_1 = require("../entities/Commission");
class BookingsController {
    static async getAllBookings(req, res) {
        try {
            const { status, commissionId, startDate, endDate } = req.query;
            const bookingRepository = database_1.AppDataSource.getRepository(Booking_1.Booking);
            let query = bookingRepository.createQueryBuilder('booking')
                .leftJoinAndSelect('booking.commission', 'commission');
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
            const response = bookings.map(booking => ({
                id: booking.id,
                fullName: booking.fullName,
                email: booking.email,
                phoneNumber: booking.phoneNumber,
                eventLocation: booking.eventLocation,
                eventDate: booking.eventDate ? (0, dayjs_1.default)(booking.eventDate).format('DD MMM YYYY') : null,
                duration: booking.duration,
                additionalMessage: booking.additionalMessage,
                commissionId: booking.commissionId,
                customEventType: booking.customEventType,
                status: booking.status,
                confirmedAt: booking.confirmedAt ? (0, dayjs_1.default)(booking.confirmedAt).format('DD MMM YYYY HH:mm') : null,
                completedAt: booking.completedAt ? (0, dayjs_1.default)(booking.completedAt).format('DD MMM YYYY HH:mm') : null,
                createdAt: booking.createdAt ? (0, dayjs_1.default)(booking.createdAt).format('DD MMM YYYY HH:mm') : null,
                updatedAt: booking.updatedAt ? (0, dayjs_1.default)(booking.updatedAt).format('DD MMM YYYY HH:mm') : null,
            }));
            const formattedResponse = {
                success: true,
                data: response,
            };
            res.json(formattedResponse);
        }
        catch (error) {
            console.error('Error fetching bookings:', error);
            res.status(500).json({ message: 'Error fetching bookings' });
        }
    }
    static async getBookingById(req, res) {
        try {
            const { id } = req.params;
            const bookingRepository = database_1.AppDataSource.getRepository(Booking_1.Booking);
            const booking = await bookingRepository.findOne({
                where: { id: parseInt(id) },
                relations: ['commission']
            });
            if (!booking) {
                res.status(404).json({ message: 'Booking not found' });
                return;
            }
            const response = {
                id: booking.id,
                fullName: booking.fullName,
                email: booking.email,
                phoneNumber: booking.phoneNumber,
                eventLocation: booking.eventLocation,
                eventDate: booking.eventDate ? (0, dayjs_1.default)(booking.eventDate).format('DD MMM YYYY') : null,
                duration: booking.duration,
                additionalMessage: booking.additionalMessage,
                commissionId: booking.commissionId,
                customEventType: booking.customEventType,
                status: booking.status,
                confirmedAt: booking.confirmedAt ? (0, dayjs_1.default)(booking.confirmedAt).format('DD MMM YYYY HH:mm') : null,
                completedAt: booking.completedAt ? (0, dayjs_1.default)(booking.completedAt).format('DD MMM YYYY HH:mm') : null,
                createdAt: booking.createdAt ? (0, dayjs_1.default)(booking.createdAt).format('DD MMM YYYY HH:mm') : null,
                updatedAt: booking.updatedAt ? (0, dayjs_1.default)(booking.updatedAt).format('DD MMM YYYY HH:mm') : null,
            };
            const formattedResponse = {
                success: true,
                data: response,
            };
            res.json(formattedResponse);
        }
        catch (error) {
            console.error('Error fetching booking:', error);
            res.status(500).json({ message: 'Error fetching booking' });
        }
    }
    static async createBooking(req, res) {
        try {
            const bookingData = req.body;
            const bookingRepository = database_1.AppDataSource.getRepository(Booking_1.Booking);
            if (bookingData.commissionId) {
                const commissionRepository = database_1.AppDataSource.getRepository(Commission_1.Commission);
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
            const booking = bookingRepository.create({
                ...bookingData,
                eventDate: new Date(bookingData.eventDate)
            });
            const savedBooking = await bookingRepository.save(booking);
            const response = {
                id: savedBooking.id,
                fullName: savedBooking.fullName,
                email: savedBooking.email,
                phoneNumber: savedBooking.phoneNumber,
                eventLocation: savedBooking.eventLocation,
                eventDate: savedBooking.eventDate ? (0, dayjs_1.default)(savedBooking.eventDate).format('DD MMM YYYY') : null,
                duration: savedBooking.duration,
                additionalMessage: savedBooking.additionalMessage,
                commissionId: savedBooking.commissionId,
                customEventType: savedBooking.customEventType,
                status: savedBooking.status,
                confirmedAt: savedBooking.confirmedAt ? (0, dayjs_1.default)(savedBooking.confirmedAt).format('DD MMM YYYY HH:mm') : null,
                completedAt: savedBooking.completedAt ? (0, dayjs_1.default)(savedBooking.completedAt).format('DD MMM YYYY HH:mm') : null,
                createdAt: savedBooking.createdAt ? (0, dayjs_1.default)(savedBooking.createdAt).format('DD MMM YYYY HH:mm') : null,
                updatedAt: savedBooking.updatedAt ? (0, dayjs_1.default)(savedBooking.updatedAt).format('DD MMM YYYY HH:mm') : null,
            };
            const formattedResponse = {
                success: true,
                data: response,
            };
            res.status(201).json(formattedResponse);
        }
        catch (error) {
            console.error('Error creating booking:', error);
            res.status(500).json({ message: 'Error creating booking' });
        }
    }
    static async updateBooking(req, res) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const bookingRepository = database_1.AppDataSource.getRepository(Booking_1.Booking);
            const booking = await bookingRepository.findOne({
                where: { id: parseInt(id) }
            });
            if (!booking) {
                res.status(404).json({ message: 'Booking not found' });
                return;
            }
            if (updateData.commissionId) {
                const commissionRepository = database_1.AppDataSource.getRepository(Commission_1.Commission);
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
            if (updateData.status && updateData.status !== booking.status) {
                if (updateData.status === EBooking_enum_1.BookingStatus.CONFIRMED && !booking.confirmedAt) {
                    updateData.confirmedAt = new Date();
                }
                if (updateData.status === EBooking_enum_1.BookingStatus.COMPLETED && !booking.completedAt) {
                    updateData.completedAt = new Date();
                }
            }
            Object.assign(booking, updateData);
            const updatedBooking = await bookingRepository.save(booking);
            const response = {
                id: updatedBooking.id,
                fullName: updatedBooking.fullName,
                email: updatedBooking.email,
                phoneNumber: updatedBooking.phoneNumber,
                eventLocation: updatedBooking.eventLocation,
                eventDate: updatedBooking.eventDate ? (0, dayjs_1.default)(updatedBooking.eventDate).format('DD MMM YYYY') : null,
                duration: updatedBooking.duration,
                additionalMessage: updatedBooking.additionalMessage,
                commissionId: updatedBooking.commissionId,
                customEventType: updatedBooking.customEventType,
                status: updatedBooking.status,
                confirmedAt: updatedBooking.confirmedAt ? (0, dayjs_1.default)(updatedBooking.confirmedAt).format('DD MMM YYYY HH:mm') : null,
                completedAt: updatedBooking.completedAt ? (0, dayjs_1.default)(updatedBooking.completedAt).format('DD MMM YYYY HH:mm') : null,
                createdAt: updatedBooking.createdAt ? (0, dayjs_1.default)(updatedBooking.createdAt).format('DD MMM YYYY HH:mm') : null,
                updatedAt: updatedBooking.updatedAt ? (0, dayjs_1.default)(updatedBooking.updatedAt).format('DD MMM YYYY HH:mm') : null,
            };
            const formattedResponse = {
                success: true,
                data: response,
            };
            res.json(formattedResponse);
        }
        catch (error) {
            console.error('Error updating booking:', error);
            res.status(500).json({ message: 'Error updating booking' });
        }
    }
    static async deleteBooking(req, res) {
        try {
            const { id } = req.params;
            const bookingRepository = database_1.AppDataSource.getRepository(Booking_1.Booking);
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
        }
        catch (error) {
            console.error('Error deleting booking:', error);
            res.status(500).json({ message: 'Error deleting booking' });
        }
    }
    static async getPendingBookings(req, res) {
        try {
            const bookingRepository = database_1.AppDataSource.getRepository(Booking_1.Booking);
            const bookings = await bookingRepository.find({
                where: { status: EBooking_enum_1.BookingStatus.PENDING },
                relations: ['commission'],
                order: { createdAt: 'DESC' }
            });
            const response = bookings.map(booking => ({
                id: booking.id,
                fullName: booking.fullName,
                email: booking.email,
                phoneNumber: booking.phoneNumber,
                eventLocation: booking.eventLocation,
                eventDate: booking.eventDate ? (0, dayjs_1.default)(booking.eventDate).format('DD MMM YYYY') : null,
                duration: booking.duration,
                additionalMessage: booking.additionalMessage,
                commissionId: booking.commissionId,
                customEventType: booking.customEventType,
                status: booking.status,
                confirmedAt: booking.confirmedAt ? (0, dayjs_1.default)(booking.confirmedAt).format('DD MMM YYYY HH:mm') : null,
                completedAt: booking.completedAt ? (0, dayjs_1.default)(booking.completedAt).format('DD MMM YYYY HH:mm') : null,
                createdAt: booking.createdAt ? (0, dayjs_1.default)(booking.createdAt).format('DD MMM YYYY HH:mm') : null,
                updatedAt: booking.updatedAt ? (0, dayjs_1.default)(booking.updatedAt).format('DD MMM YYYY HH:mm') : null,
            }));
            const formattedResponse = {
                success: true,
                data: response,
            };
            res.json(formattedResponse);
        }
        catch (error) {
            console.error('Error fetching pending bookings:', error);
            res.status(500).json({ message: 'Error fetching pending bookings' });
        }
    }
}
exports.BookingsController = BookingsController;
//# sourceMappingURL=bookings.controller.js.map