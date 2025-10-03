"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecialProgramsController = void 0;
const database_1 = require("../config/database");
const SpecialProgram_1 = require("../entities/SpecialProgram");
const dayjs_1 = __importDefault(require("dayjs"));
class SpecialProgramsController {
    static async getAllSpecialPrograms(req, res) {
        try {
            const specialProgramRepository = database_1.AppDataSource.getRepository(SpecialProgram_1.SpecialProgram);
            const programs = await specialProgramRepository.find({
                order: { startDate: 'ASC' }
            });
            const response = programs.map(program => ({
                id: program.id,
                title: program.title,
                subtitle: program.subtitle,
                description: program.description,
                startDate: program.startDate ? (0, dayjs_1.default)(program.startDate).format('DD MMM YYYY') : null,
                endDate: program.endDate ? (0, dayjs_1.default)(program.endDate).format('DD MMM YYYY') : null,
                startTime: program.startTime ? program.startTime : null,
                endTime: program.endTime ? program.endTime : null,
                location: program.location,
                address: program.address,
                capacity: program.capacity,
                monthlyTuition: program.monthlyTuition,
                minAge: program.minAge,
                maxAge: program.maxAge,
                isActive: program.isActive,
                isFeatured: program.isFeatured,
                tags: program.tags,
                galleryImages: program.galleryImages,
                instructors: program.instructors,
                curriculum: program.curriculum,
                whatsIncluded: program.whatsIncluded,
                schedule: program.schedule,
                createdAt: program.createdAt ? (0, dayjs_1.default)(program.createdAt).format('DD MMM YYYY HH:mm') : null,
                updatedAt: program.updatedAt ? (0, dayjs_1.default)(program.updatedAt).format('DD MMM YYYY HH:mm') : null,
            }));
            const formattedResponse = {
                success: true,
                data: response,
            };
            res.json(formattedResponse);
        }
        catch (error) {
            console.error('Error fetching special programs:', error);
            res.status(500).json({ message: 'Error fetching special programs' });
        }
    }
    static async getSpecialProgramById(req, res) {
        try {
            const { id } = req.params;
            const specialProgramRepository = database_1.AppDataSource.getRepository(SpecialProgram_1.SpecialProgram);
            const program = await specialProgramRepository.findOne({
                where: { id: parseInt(id) },
                relations: ['director']
            });
            if (!program) {
                res.status(404).json({ message: 'Special program not found' });
                return;
            }
            const response = {
                id: program.id,
                title: program.title,
                subtitle: program.subtitle,
                description: program.description,
                startDate: program.startDate.toISOString().split('T')[0],
                endDate: program.endDate.toISOString().split('T')[0],
                startTime: program.startTime,
                endTime: program.endTime,
                location: program.location,
                address: program.address,
                capacity: program.capacity,
                monthlyTuition: program.monthlyTuition,
                minAge: program.minAge,
                maxAge: program.maxAge,
                isActive: program.isActive,
                isFeatured: program.isFeatured,
                tags: program.tags,
                galleryImages: program.galleryImages,
                instructors: program.instructors,
                curriculum: program.curriculum,
                whatsIncluded: program.whatsIncluded,
                schedule: program.schedule,
                directorId: program.directorId,
                createdAt: program.createdAt.toISOString(),
                updatedAt: program.updatedAt.toISOString(),
            };
            const formattedResponse = {
                success: true,
                data: response,
            };
            res.json(formattedResponse);
        }
        catch (error) {
            console.error('Error fetching special program:', error);
            res.status(500).json({ message: 'Error fetching special program' });
        }
    }
    static async createSpecialProgram(req, res) {
        try {
            const programData = req.body;
            const { title, subtitle, description, startDate, endDate, startTime, endTime, location, address, capacity, monthlyTuition, minAge, maxAge, isFeatured, tags, galleryImages, instructors, curriculum, whatsIncluded, schedule } = programData;
            const specialProgramRepository = database_1.AppDataSource.getRepository(SpecialProgram_1.SpecialProgram);
            const program = specialProgramRepository.create({
                title,
                subtitle,
                description,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                startTime,
                endTime,
                location,
                address,
                capacity,
                monthlyTuition,
                minAge,
                maxAge,
                isFeatured: isFeatured || false,
                tags,
                galleryImages,
                instructors,
                curriculum,
                whatsIncluded,
                schedule,
            });
            const savedProgram = await specialProgramRepository.save(program);
            const response = {
                id: savedProgram.id,
                title: savedProgram.title,
                subtitle: savedProgram.subtitle,
                description: savedProgram.description,
                startDate: savedProgram.startDate.toISOString().split('T')[0],
                endDate: savedProgram.endDate.toISOString().split('T')[0],
                startTime: savedProgram.startTime,
                endTime: savedProgram.endTime,
                location: savedProgram.location,
                address: savedProgram.address,
                capacity: savedProgram.capacity,
                monthlyTuition: savedProgram.monthlyTuition,
                minAge: savedProgram.minAge,
                maxAge: savedProgram.maxAge,
                isActive: savedProgram.isActive,
                isFeatured: savedProgram.isFeatured,
                tags: savedProgram.tags,
                galleryImages: savedProgram.galleryImages,
                instructors: savedProgram.instructors,
                curriculum: savedProgram.curriculum,
                whatsIncluded: savedProgram.whatsIncluded,
                schedule: savedProgram.schedule,
                directorId: savedProgram.directorId,
                createdAt: savedProgram.createdAt.toISOString(),
                updatedAt: savedProgram.updatedAt.toISOString(),
            };
            const formattedResponse = {
                success: true,
                data: response,
            };
            res.status(201).json(formattedResponse);
        }
        catch (error) {
            console.error('Error creating special program:', error);
            res.status(500).json({ message: 'Error creating special program' });
        }
    }
    static async updateSpecialProgram(req, res) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const specialProgramRepository = database_1.AppDataSource.getRepository(SpecialProgram_1.SpecialProgram);
            const program = await specialProgramRepository.findOne({ where: { id: parseInt(id) } });
            if (!program) {
                res.status(404).json({ message: 'Special program not found' });
                return;
            }
            Object.keys(updateData).forEach(key => {
                if (updateData[key] !== undefined) {
                    if (key === 'startDate' || key === 'endDate') {
                        program[key] = new Date(updateData[key]);
                    }
                    else {
                        program[key] = updateData[key];
                    }
                }
            });
            const updatedProgram = await specialProgramRepository.save(program);
            const response = {
                id: updatedProgram.id,
                title: updatedProgram.title,
                subtitle: updatedProgram.subtitle,
                description: updatedProgram.description,
                startDate: updatedProgram.startDate ? (0, dayjs_1.default)(updatedProgram.startDate).format('DD MMM YYYY') : null,
                endDate: updatedProgram.endDate ? (0, dayjs_1.default)(updatedProgram.endDate).format('DD MMM YYYY') : null,
                startTime: updatedProgram.startTime,
                endTime: updatedProgram.endTime,
                location: updatedProgram.location,
                address: updatedProgram.address,
                capacity: updatedProgram.capacity,
                monthlyTuition: updatedProgram.monthlyTuition,
                minAge: updatedProgram.minAge,
                maxAge: updatedProgram.maxAge,
                isActive: updatedProgram.isActive,
                isFeatured: updatedProgram.isFeatured,
                tags: updatedProgram.tags,
                galleryImages: updatedProgram.galleryImages,
                instructors: updatedProgram.instructors,
                curriculum: updatedProgram.curriculum,
                whatsIncluded: updatedProgram.whatsIncluded,
                schedule: updatedProgram.schedule,
                directorId: updatedProgram.directorId,
                createdAt: updatedProgram.createdAt.toISOString(),
                updatedAt: updatedProgram.updatedAt.toISOString(),
            };
            const formattedResponse = {
                success: true,
                data: response,
            };
            res.json(formattedResponse);
        }
        catch (error) {
            console.error('Error updating special program:', error);
            res.status(500).json({ message: 'Error updating special program' });
        }
    }
    static async deleteSpecialProgram(req, res) {
        try {
            const { id } = req.params;
            const specialProgramRepository = database_1.AppDataSource.getRepository(SpecialProgram_1.SpecialProgram);
            const program = await specialProgramRepository.findOne({ where: { id: parseInt(id) } });
            if (!program) {
                res.status(404).json({ message: 'Special program not found' });
                return;
            }
            await specialProgramRepository.softRemove(program);
            const formattedResponse = {
                success: true,
                data: { message: 'Special program deleted successfully' },
            };
            res.json(formattedResponse);
        }
        catch (error) {
            console.error('Error deleting special program:', error);
            res.status(500).json({ message: 'Error deleting special program' });
        }
    }
    static async getFeaturedSpecialPrograms(req, res) {
        try {
            const specialProgramRepository = database_1.AppDataSource.getRepository(SpecialProgram_1.SpecialProgram);
            const programs = await specialProgramRepository.find({
                where: { isFeatured: true, isActive: true },
                relations: ['director'],
                order: { startDate: 'ASC' }
            });
            const response = programs.map(program => ({
                id: program.id,
                title: program.title,
                subtitle: program.subtitle,
                description: program.description,
                startDate: program.startDate.toISOString().split('T')[0],
                endDate: program.endDate.toISOString().split('T')[0],
                startTime: program.startTime,
                endTime: program.endTime,
                location: program.location,
                address: program.address,
                capacity: program.capacity,
                monthlyTuition: program.monthlyTuition,
                minAge: program.minAge,
                maxAge: program.maxAge,
                isActive: program.isActive,
                isFeatured: program.isFeatured,
                tags: program.tags,
                galleryImages: program.galleryImages,
                instructors: program.instructors,
                curriculum: program.curriculum,
                whatsIncluded: program.whatsIncluded,
                schedule: program.schedule,
                directorId: program.directorId,
                createdAt: program.createdAt.toISOString(),
                updatedAt: program.updatedAt.toISOString(),
            }));
            const formattedResponse = {
                success: true,
                data: response,
            };
            res.json(formattedResponse);
        }
        catch (error) {
            console.error('Error fetching featured special programs:', error);
            res.status(500).json({ message: 'Error fetching featured special programs' });
        }
    }
}
exports.SpecialProgramsController = SpecialProgramsController;
//# sourceMappingURL=special-programs.controller.js.map