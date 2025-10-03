"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchedulesController = void 0;
const database_1 = require("../config/database");
const Schedule_1 = require("../entities/Schedule");
const dayjs_1 = __importDefault(require("dayjs"));
const EScheduleStatus_enum_1 = require("@/shared/enum/EScheduleStatus.enum");
class SchedulesController {
    static async getAllSchedules(req, res) {
        try {
            const { eventType, status, startDate, endDate } = req.query;
            const scheduleRepository = database_1.AppDataSource.getRepository(Schedule_1.Schedule);
            let query = scheduleRepository.createQueryBuilder('schedule');
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
            const response = schedules.map(schedule => ({
                id: schedule.id,
                title: schedule.title,
                description: schedule.description,
                scheduleDate: schedule.scheduleDate ? (0, dayjs_1.default)(schedule.scheduleDate).format('DD MMM YYYY') : null,
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
                createdAt: schedule.createdAt ? (0, dayjs_1.default)(schedule.createdAt).format('DD MMM YYYY HH:mm') : null,
                updatedAt: schedule.updatedAt ? (0, dayjs_1.default)(schedule.updatedAt).format('DD MMM YYYY HH:mm') : null,
            }));
            const formattedResponse = {
                success: true,
                data: response,
            };
            res.json(formattedResponse);
        }
        catch (error) {
            console.error('Error fetching schedules:', error);
            res.status(500).json({ message: 'Error fetching schedules' });
        }
    }
    static async getScheduleById(req, res) {
        try {
            const { id } = req.params;
            const scheduleRepository = database_1.AppDataSource.getRepository(Schedule_1.Schedule);
            const schedule = await scheduleRepository.findOne({ where: { id: parseInt(id) } });
            if (!schedule) {
                res.status(404).json({ message: 'Schedule not found' });
                return;
            }
            const response = {
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
            const formattedResponse = {
                success: true,
                data: response,
            };
            res.json(formattedResponse);
        }
        catch (error) {
            console.error('Error fetching schedule:', error);
            res.status(500).json({ message: 'Error fetching schedule' });
        }
    }
    static async createSchedule(req, res) {
        try {
            const scheduleData = req.body;
            const { title, description, scheduleDate, startTime, endTime, location, address, eventType, status, isRecurring, recurrencePattern, recurrenceInterval } = scheduleData;
            const scheduleRepository = database_1.AppDataSource.getRepository(Schedule_1.Schedule);
            const schedule = scheduleRepository.create({
                title,
                description,
                scheduleDate: new Date(scheduleDate),
                startTime,
                endTime,
                location,
                address,
                eventType,
                status: status || EScheduleStatus_enum_1.EScheduleStatus.TENTATIVE,
                isRecurring: isRecurring || false,
                recurrencePattern,
                recurrenceInterval,
            });
            const savedSchedule = await scheduleRepository.save(schedule);
            const response = {
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
            const formattedResponse = {
                success: true,
                data: response,
            };
            res.status(201).json(formattedResponse);
        }
        catch (error) {
            console.error('Error creating schedule:', error);
            res.status(500).json({ message: 'Error creating schedule' });
        }
    }
    static async updateSchedule(req, res) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const scheduleRepository = database_1.AppDataSource.getRepository(Schedule_1.Schedule);
            const schedule = await scheduleRepository.findOne({ where: { id: parseInt(id) } });
            if (!schedule) {
                res.status(404).json({ message: 'Schedule not found' });
                return;
            }
            Object.keys(updateData).forEach(key => {
                if (updateData[key] !== undefined) {
                    if (key === 'scheduleDate') {
                        schedule[key] = new Date(updateData[key]);
                    }
                    else {
                        schedule[key] = updateData[key];
                    }
                }
            });
            const updatedSchedule = await scheduleRepository.save(schedule);
            const response = {
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
            const formattedResponse = {
                success: true,
                data: response,
            };
            res.json(formattedResponse);
        }
        catch (error) {
            console.error('Error updating schedule:', error);
            res.status(500).json({ message: 'Error updating schedule' });
        }
    }
    static async deleteSchedule(req, res) {
        try {
            const { id } = req.params;
            const scheduleRepository = database_1.AppDataSource.getRepository(Schedule_1.Schedule);
            const schedule = await scheduleRepository.findOne({ where: { id: parseInt(id) } });
            if (!schedule) {
                res.status(404).json({ message: 'Schedule not found' });
                return;
            }
            await scheduleRepository.softRemove(schedule);
            const formattedResponse = {
                success: true,
                data: { message: 'Schedule deleted successfully' },
            };
            res.json(formattedResponse);
        }
        catch (error) {
            console.error('Error deleting schedule:', error);
            res.status(500).json({ message: 'Error deleting schedule' });
        }
    }
    static async getSchedulesGroupedByMonth(req, res) {
        try {
            const { year = new Date().getFullYear(), eventType, status } = req.query;
            const scheduleRepository = database_1.AppDataSource.getRepository(Schedule_1.Schedule);
            let query = scheduleRepository.createQueryBuilder('schedule');
            if (eventType) {
                query = query.andWhere('schedule.eventType = :eventType', { eventType });
            }
            if (status) {
                query = query.andWhere('schedule.status = :status', { status });
            }
            console.log('Query parameters:', { year, eventType, status });
            console.log('Generated SQL:', query.getSql());
            const allSchedules = await scheduleRepository.find();
            console.log('Total schedules in database:', allSchedules.length);
            const schedules = await query
                .orderBy('schedule.scheduleDate', 'ASC')
                .addOrderBy('schedule.startTime', 'ASC')
                .getMany();
            console.log('Found schedules after filtering:', schedules.length);
            const groupedSchedules = [];
            const monthGroups = new Map();
            schedules.forEach(schedule => {
                const scheduleDate = new Date(schedule.scheduleDate);
                const monthKey = scheduleDate.toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric'
                });
                const scheduleResponse = {
                    id: schedule.id,
                    title: schedule.title,
                    description: schedule.description,
                    scheduleDate: schedule.scheduleDate ? (0, dayjs_1.default)(schedule.scheduleDate).format('DD MMM YYYY') : null,
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
                    createdAt: schedule.createdAt ? (0, dayjs_1.default)(schedule.createdAt).format('DD MMM YYYY HH:mm') : null,
                    updatedAt: schedule.updatedAt ? (0, dayjs_1.default)(schedule.updatedAt).format('DD MMM YYYY HH:mm') : null,
                };
                if (!monthGroups.has(monthKey)) {
                    monthGroups.set(monthKey, []);
                }
                monthGroups.get(monthKey).push(scheduleResponse);
            });
            monthGroups.forEach((schedules, date) => {
                groupedSchedules.push({ date, schedules });
            });
            groupedSchedules.sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return dateA.getTime() - dateB.getTime();
            });
            const formattedResponse = {
                success: true,
                data: groupedSchedules,
            };
            res.json(formattedResponse);
        }
        catch (error) {
            console.error('Error fetching schedules grouped by month:', error);
            res.status(500).json({ message: 'Error fetching schedules grouped by month' });
        }
    }
    static async getUpcomingSchedules(req, res) {
        try {
            const { days = 30, eventType } = req.query;
            const scheduleRepository = database_1.AppDataSource.getRepository(Schedule_1.Schedule);
            const startDate = new Date();
            const endDate = new Date();
            endDate.setDate(endDate.getDate() + parseInt(days));
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
            const response = schedules.map(schedule => ({
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
            const formattedResponse = {
                success: true,
                data: response,
            };
            res.json(formattedResponse);
        }
        catch (error) {
            console.error('Error fetching upcoming schedules:', error);
            res.status(500).json({ message: 'Error fetching upcoming schedules' });
        }
    }
    static async debugSchedules(req, res) {
        try {
            const scheduleRepository = database_1.AppDataSource.getRepository(Schedule_1.Schedule);
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
        }
        catch (error) {
            console.error('Debug error:', error);
            res.status(500).json({ message: 'Debug error', error });
        }
    }
}
exports.SchedulesController = SchedulesController;
//# sourceMappingURL=schedules.controller.js.map