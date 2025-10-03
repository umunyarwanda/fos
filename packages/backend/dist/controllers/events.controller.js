"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsController = void 0;
const database_1 = require("../config/database");
const Event_1 = require("../entities/Event");
class EventsController {
    static async getAllEvents(req, res) {
        try {
            const eventRepository = database_1.AppDataSource.getRepository(Event_1.Event);
            const events = await eventRepository.find({
                relations: ['organizer'],
                order: { eventDate: 'ASC' }
            });
            const response = events.map(event => ({
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
            const formattedResponse = {
                success: true,
                data: response,
            };
            res.json(formattedResponse);
        }
        catch (error) {
            console.error('Error fetching events:', error);
            res.status(500).json({ message: 'Error fetching events' });
        }
    }
    static async getEventById(req, res) {
        try {
            const { id } = req.params;
            const eventRepository = database_1.AppDataSource.getRepository(Event_1.Event);
            const event = await eventRepository.findOne({
                where: { id: parseInt(id) },
                relations: ['organizer']
            });
            if (!event) {
                res.status(404).json({ message: 'Event not found' });
                return;
            }
            const response = {
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
            const formattedResponse = {
                success: true,
                data: response,
            };
            res.json(formattedResponse);
        }
        catch (error) {
            console.error('Error fetching event:', error);
            res.status(500).json({ message: 'Error fetching event' });
        }
    }
    static async createEvent(req, res) {
        try {
            const eventData = req.body;
            const { title, subtitle, description, eventDate, startTime, endTime, location, address, capacity, isFeatured, tags, galleryImages, featuredPerformers, venueType } = eventData;
            const eventRepository = database_1.AppDataSource.getRepository(Event_1.Event);
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
            const response = {
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
            const formattedResponse = {
                success: true,
                data: response,
            };
            res.status(201).json(formattedResponse);
        }
        catch (error) {
            console.error('Error creating event:', error);
            res.status(500).json({ message: 'Error creating event' });
        }
    }
    static async updateEvent(req, res) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const eventRepository = database_1.AppDataSource.getRepository(Event_1.Event);
            const event = await eventRepository.findOne({ where: { id: parseInt(id) } });
            if (!event) {
                res.status(404).json({ message: 'Event not found' });
                return;
            }
            Object.keys(updateData).forEach(key => {
                if (updateData[key] !== undefined) {
                    if (key === 'eventDate') {
                        event[key] = new Date(updateData[key]);
                    }
                    else {
                        event[key] = updateData[key];
                    }
                }
            });
            const updatedEvent = await eventRepository.save(event);
            const response = {
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
            const formattedResponse = {
                success: true,
                data: response,
            };
            res.json(formattedResponse);
        }
        catch (error) {
            console.error('Error updating event:', error);
            res.status(500).json({ message: 'Error updating event' });
        }
    }
    static async deleteEvent(req, res) {
        try {
            const { id } = req.params;
            const eventRepository = database_1.AppDataSource.getRepository(Event_1.Event);
            const event = await eventRepository.findOne({ where: { id: parseInt(id) } });
            if (!event) {
                res.status(404).json({ message: 'Event not found' });
                return;
            }
            await eventRepository.softRemove(event);
            const formattedResponse = {
                success: true,
                data: { message: 'Event deleted successfully' },
            };
            res.json(formattedResponse);
        }
        catch (error) {
            console.error('Error deleting event:', error);
            res.status(500).json({ message: 'Error deleting event' });
        }
    }
    static async getFeaturedEvents(req, res) {
        try {
            const eventRepository = database_1.AppDataSource.getRepository(Event_1.Event);
            const events = await eventRepository.find({
                where: { isFeatured: true, isActive: true },
                relations: ['organizer'],
                order: { eventDate: 'ASC' }
            });
            const response = events.map(event => ({
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
            const formattedResponse = {
                success: true,
                data: response,
            };
            res.json(formattedResponse);
        }
        catch (error) {
            console.error('Error fetching featured events:', error);
            res.status(500).json({ message: 'Error fetching featured events' });
        }
    }
}
exports.EventsController = EventsController;
//# sourceMappingURL=events.controller.js.map