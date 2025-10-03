import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Contact, ContactStatus, ContactSubject } from '../entities/Contact';
import { ICreateContactReqDto } from '../shared/interfaces/contacts/request/ICreateContactReqDto';
import { IUpdateContactReqDto } from '../shared/interfaces/contacts/request/IUpdateContactReqDto';
import { IGetContactResDto } from '../shared/interfaces/contacts/response/IGetContactResDto';
import { IResponseDto } from '../shared/interfaces/IResponseDto';
import dayjs from 'dayjs';

export class ContactsController {
  /**
   * @swagger
   * /api/contacts:
   *   get:
   *     summary: Get all contacts
   *     tags: [Contacts]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: query
   *         name: status
   *         schema:
   *           type: string
   *           enum: [new, in_progress, responded, closed]
   *         description: Filter by contact status
   *       - in: query
   *         name: subject
   *         schema:
   *           type: string
   *           enum: [general_inquiry, event_booking, commission_request, support, feedback, other]
   *         description: Filter by contact subject
   *     responses:
   *       200:
   *         description: List of contacts
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Contact'
   *       500:
   *         description: Internal server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  // GET /api/contacts - Get all contacts
  static async getAllContacts(req: Request, res: Response): Promise<void> {
    try {
      const { status, subject } = req.query;
      const contactRepository = AppDataSource.getRepository(Contact);
      
      let query = contactRepository.createQueryBuilder('contact');
      
      // Apply filters
      if (status) {
        query = query.andWhere('contact.status = :status', { status });
      }
      
      if (subject) {
        query = query.andWhere('contact.subject = :subject', { subject });
      }
      
      const contacts = await query
        .orderBy('contact.createdAt', 'DESC')
        .getMany();

      const response: IGetContactResDto[] = contacts.map(contact => ({
        id: contact.id,
        fullName: contact.fullName,
        email: contact.email,
        phoneNumber: contact.phoneNumber,
        subject: contact.subject,
        message: contact.message,
        status: contact.status,
        adminNotes: contact.adminNotes,
        createdAt: contact.createdAt ? dayjs(contact.createdAt).format('DD MMM YYYY HH:mm') : null,
        updatedAt: contact.updatedAt ? dayjs(contact.updatedAt).format('DD MMM YYYY HH:mm') : null,
      }));

      const formattedResponse: IResponseDto<IGetContactResDto[]> = {
        success: true,
        data: response,
      };
      res.json(formattedResponse);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      res.status(500).json({ message: 'Error fetching contacts' });
    }
  }

  /**
   * @swagger
   * /api/contacts/{id}:
   *   get:
   *     summary: Get contact by ID
   *     tags: [Contacts]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: Contact ID
   *     responses:
   *       200:
   *         description: Contact found
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 data:
   *                   $ref: '#/components/schemas/Contact'
   *       404:
   *         description: Contact not found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   *       500:
   *         description: Internal server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  // GET /api/contacts/:id - Get contact by ID
  static async getContactById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const contactRepository = AppDataSource.getRepository(Contact);
      
      const contact = await contactRepository.findOne({
        where: { id: parseInt(id) }
      });

      if (!contact) {
        res.status(404).json({ message: 'Contact not found' });
        return;
      }

      const response: IGetContactResDto = {
        id: contact.id,
        fullName: contact.fullName,
        email: contact.email,
        phoneNumber: contact.phoneNumber,
        subject: contact.subject,
        message: contact.message,
        status: contact.status,
        adminNotes: contact.adminNotes,
        createdAt: contact.createdAt ? dayjs(contact.createdAt).format('DD MMM YYYY HH:mm') : null,
        updatedAt: contact.updatedAt ? dayjs(contact.updatedAt).format('DD MMM YYYY HH:mm') : null,
      };

      const formattedResponse: IResponseDto<IGetContactResDto> = {
        success: true,
        data: response,
      };
      res.json(formattedResponse);
    } catch (error) {
      console.error('Error fetching contact:', error);
      res.status(500).json({ message: 'Error fetching contact' });
    }
  }

  /**
   * @swagger
   * /api/contacts:
   *   post:
   *     summary: Create new contact (from contact form)
   *     tags: [Contacts]
   *     security: []  # Public endpoint - no auth required
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateContactRequest'
   *     responses:
   *       201:
   *         description: Contact created successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 data:
   *                   $ref: '#/components/schemas/Contact'
   *       400:
   *         description: Validation error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ValidationError'
   *       500:
   *         description: Internal server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  // POST /api/contacts - Create new contact (from contact form)
  static async createContact(req: Request, res: Response): Promise<void> {
    try {
      const contactData: ICreateContactReqDto = req.body;
      const contactRepository = AppDataSource.getRepository(Contact);
      
      const contact = contactRepository.create(contactData);
      const savedContact = await contactRepository.save(contact);

      const response: IGetContactResDto = {
        id: savedContact.id,
        fullName: savedContact.fullName,
        email: savedContact.email,
        phoneNumber: savedContact.phoneNumber,
        subject: savedContact.subject,
        message: savedContact.message,
        status: savedContact.status,
        adminNotes: savedContact.adminNotes,
        createdAt: savedContact.createdAt ? dayjs(savedContact.createdAt).format('DD MMM YYYY HH:mm') : null,
        updatedAt: savedContact.updatedAt ? dayjs(savedContact.updatedAt).format('DD MMM YYYY HH:mm') : null,
      };

      const formattedResponse: IResponseDto<IGetContactResDto> = {
        success: true,
        data: response,
      };
      res.status(201).json(formattedResponse);
    } catch (error: any) {
      console.error('Error creating contact:', error);
      res.status(500).json({ message: 'Error creating contact' });
    }
  }

  /**
   * @swagger
   * /api/contacts/{id}:
   *   put:
   *     summary: Update contact (admin only)
   *     tags: [Contacts]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: Contact ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateContactRequest'
   *     responses:
   *       200:
   *         description: Contact updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 data:
   *                   $ref: '#/components/schemas/Contact'
   *       400:
   *         description: Validation error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ValidationError'
   *       404:
   *         description: Contact not found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   *       500:
   *         description: Internal server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  // PUT /api/contacts/:id - Update contact (admin only)
  static async updateContact(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateData: IUpdateContactReqDto = req.body;
      const contactRepository = AppDataSource.getRepository(Contact);
      
      const contact = await contactRepository.findOne({
        where: { id: parseInt(id) }
      });

      if (!contact) {
        res.status(404).json({ message: 'Contact not found' });
        return;
      }

      Object.assign(contact, updateData);
      const updatedContact = await contactRepository.save(contact);

      const response: IGetContactResDto = {
        id: updatedContact.id,
        fullName: updatedContact.fullName,
        email: updatedContact.email,
        phoneNumber: updatedContact.phoneNumber,
        subject: updatedContact.subject,
        message: updatedContact.message,
        status: updatedContact.status,
        adminNotes: updatedContact.adminNotes,
        createdAt: updatedContact.createdAt ? dayjs(updatedContact.createdAt).format('DD MMM YYYY HH:mm') : null,
        updatedAt: updatedContact.updatedAt ? dayjs(updatedContact.updatedAt).format('DD MMM YYYY HH:mm') : null,
      };

      const formattedResponse: IResponseDto<IGetContactResDto> = {
        success: true,
        data: response,
      };
      res.json(formattedResponse);
    } catch (error: any) {
      console.error('Error updating contact:', error);
      res.status(500).json({ message: 'Error updating contact' });
    }
  }

  /**
   * @swagger
   * /api/contacts/{id}:
   *   delete:
   *     summary: Delete contact (soft delete)
   *     tags: [Contacts]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: Contact ID
   *     responses:
   *       200:
   *         description: Contact deleted successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 message:
   *                   type: string
   *                   example: Contact deleted successfully
   *       404:
   *         description: Contact not found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   *       500:
   *         description: Internal server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  // DELETE /api/contacts/:id - Delete contact (soft delete)
  static async deleteContact(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const contactRepository = AppDataSource.getRepository(Contact);
      
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
    } catch (error: any) {
      console.error('Error deleting contact:', error);
      res.status(500).json({ message: 'Error deleting contact' });
    }
  }
}