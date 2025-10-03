import { Request, Response } from 'express';
export declare class ContactsController {
    static getAllContacts(req: Request, res: Response): Promise<void>;
    static getContactById(req: Request, res: Response): Promise<void>;
    static createContact(req: Request, res: Response): Promise<void>;
    static updateContact(req: Request, res: Response): Promise<void>;
    static deleteContact(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=contacts.controller.d.ts.map