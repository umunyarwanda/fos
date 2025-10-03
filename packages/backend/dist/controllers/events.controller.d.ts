import { Request, Response } from 'express';
export declare class EventsController {
    static getAllEvents(req: Request, res: Response): Promise<void>;
    static getEventById(req: Request, res: Response): Promise<void>;
    static createEvent(req: Request, res: Response): Promise<void>;
    static updateEvent(req: Request, res: Response): Promise<void>;
    static deleteEvent(req: Request, res: Response): Promise<void>;
    static getFeaturedEvents(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=events.controller.d.ts.map