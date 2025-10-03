import { Request, Response } from 'express';
export declare class BookingsController {
    static getAllBookings(req: Request, res: Response): Promise<void>;
    static getBookingById(req: Request, res: Response): Promise<void>;
    static createBooking(req: Request, res: Response): Promise<void>;
    static updateBooking(req: Request, res: Response): Promise<void>;
    static deleteBooking(req: Request, res: Response): Promise<void>;
    static getPendingBookings(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=bookings.controller.d.ts.map