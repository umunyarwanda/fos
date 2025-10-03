"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactsController = void 0;
const database_1 = require("../config/database");
const Contact_1 = require("../entities/Contact");
const dayjs_1 = __importDefault(require("dayjs"));
class ContactsController {
    static async getAllContacts(req, res) {
        try {
            const { status, subject } = req.query;
            const contactRepository = database_1.AppDataSource.getRepository(Contact_1.Contact);
            let query = contactRepository.createQueryBuilder('contact');
            if (status) {
                query = query.andWhere('contact.status = :status', { status });
            }
            if (subject) {
                query = query.andWhere('contact.subject = :subject', { subject });
            }
            const contacts = await query
                .orderBy('contact.createdAt', 'DESC')
                .getMany();
            const response = contacts.map(contact => ({
                id: contact.id,
                fullName: contact.fullName,
                email: contact.email,
                phoneNumber: contact.phoneNumber,
                subject: contact.subject,
                message: contact.message,
                status: contact.status,
                adminNotes: contact.adminNotes,
                createdAt: contact.createdAt ? (0, dayjs_1.default)(contact.createdAt).format('DD MMM YYYY HH:mm') : null,
                updatedAt: contact.updatedAt ? (0, dayjs_1.default)(contact.updatedAt).format('DD MMM YYYY HH:mm') : null,
            }));
            const formattedResponse = {
                success: true,
                data: response,
            };
            res.json(formattedResponse);
        }
        catch (error) {
            console.error('Error fetching contacts:', error);
            res.status(500).json({ message: 'Error fetching contacts' });
        }
    }
    static async getContactById(req, res) {
        try {
            const { id } = req.params;
            const contactRepository = database_1.AppDataSource.getRepository(Contact_1.Contact);
            const contact = await contactRepository.findOne({
                where: { id: parseInt(id) }
            });
            if (!contact) {
                res.status(404).json({ message: 'Contact not found' });
                return;
            }
            const response = {
                id: contact.id,
                fullName: contact.fullName,
                email: contact.email,
                phoneNumber: contact.phoneNumber,
                subject: contact.subject,
                message: contact.message,
                status: contact.status,
                adminNotes: contact.adminNotes,
                createdAt: contact.createdAt ? (0, dayjs_1.default)(contact.createdAt).format('DD MMM YYYY HH:mm') : null,
                updatedAt: contact.updatedAt ? (0, dayjs_1.default)(contact.updatedAt).format('DD MMM YYYY HH:mm') : null,
            };
            const formattedResponse = {
                success: true,
                data: response,
            };
            res.json(formattedResponse);
        }
        catch (error) {
            console.error('Error fetching contact:', error);
            res.status(500).json({ message: 'Error fetching contact' });
        }
    }
    static async createContact(req, res) {
        try {
            const contactData = req.body;
            const contactRepository = database_1.AppDataSource.getRepository(Contact_1.Contact);
            const contact = contactRepository.create(contactData);
            const savedContact = await contactRepository.save(contact);
            const response = {
                id: savedContact.id,
                fullName: savedContact.fullName,
                email: savedContact.email,
                phoneNumber: savedContact.phoneNumber,
                subject: savedContact.subject,
                message: savedContact.message,
                status: savedContact.status,
                adminNotes: savedContact.adminNotes,
                createdAt: savedContact.createdAt ? (0, dayjs_1.default)(savedContact.createdAt).format('DD MMM YYYY HH:mm') : null,
                updatedAt: savedContact.updatedAt ? (0, dayjs_1.default)(savedContact.updatedAt).format('DD MMM YYYY HH:mm') : null,
            };
            const formattedResponse = {
                success: true,
                data: response,
            };
            res.status(201).json(formattedResponse);
        }
        catch (error) {
            console.error('Error creating contact:', error);
            res.status(500).json({ message: 'Error creating contact' });
        }
    }
    static async updateContact(req, res) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const contactRepository = database_1.AppDataSource.getRepository(Contact_1.Contact);
            const contact = await contactRepository.findOne({
                where: { id: parseInt(id) }
            });
            if (!contact) {
                res.status(404).json({ message: 'Contact not found' });
                return;
            }
            Object.assign(contact, updateData);
            const updatedContact = await contactRepository.save(contact);
            const response = {
                id: updatedContact.id,
                fullName: updatedContact.fullName,
                email: updatedContact.email,
                phoneNumber: updatedContact.phoneNumber,
                subject: updatedContact.subject,
                message: updatedContact.message,
                status: updatedContact.status,
                adminNotes: updatedContact.adminNotes,
                createdAt: updatedContact.createdAt ? (0, dayjs_1.default)(updatedContact.createdAt).format('DD MMM YYYY HH:mm') : null,
                updatedAt: updatedContact.updatedAt ? (0, dayjs_1.default)(updatedContact.updatedAt).format('DD MMM YYYY HH:mm') : null,
            };
            const formattedResponse = {
                success: true,
                data: response,
            };
            res.json(formattedResponse);
        }
        catch (error) {
            console.error('Error updating contact:', error);
            res.status(500).json({ message: 'Error updating contact' });
        }
    }
    static async deleteContact(req, res) {
        try {
            const { id } = req.params;
            const contactRepository = database_1.AppDataSource.getRepository(Contact_1.Contact);
            const contact = await contactRepository.findOne({
                where: { id: parseInt(id) }
            });
            if (!contact) {
                res.status(404).json({ message: 'Contact not found' });
                return;
            }
            await contactRepository.softDelete(parseInt(id));
            res.json({
                success: true,
                message: 'Contact deleted successfully'
            });
        }
        catch (error) {
            console.error('Error deleting contact:', error);
            res.status(500).json({ message: 'Error deleting contact' });
        }
    }
}
exports.ContactsController = ContactsController;
//# sourceMappingURL=contacts.controller.js.map