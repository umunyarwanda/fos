import express, { Router } from 'express';
import { ContactsController } from '../controllers/contacts.controller';
import { validateDto } from '../middleware/validation.middleware';
import { CreateContactDto } from '../dtos/contacts/request/create-contact.dto';
import { UpdateContactDto } from '../dtos/contacts/request/update-contact.dto';

const router: Router = express.Router();

// GET /api/contacts - Get all contacts (admin only)
router.get('/', ContactsController.getAllContacts);

// GET /api/contacts/:id - Get contact by ID (admin only)
router.get('/:id', ContactsController.getContactById);

// POST /api/contacts - Create new contact (from contact form - public)
router.post('/', validateDto(CreateContactDto), ContactsController.createContact);

// PUT /api/contacts/:id - Update contact (admin only)
router.put('/:id', validateDto(UpdateContactDto), ContactsController.updateContact);

// DELETE /api/contacts/:id - Delete contact (admin only)
router.delete('/:id', ContactsController.deleteContact);

export default router;