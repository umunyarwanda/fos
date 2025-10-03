import { Request, Response } from 'express';
export declare class SchedulesController {
    static getAllSchedules(req: Request, res: Response): Promise<void>;
    static getScheduleById(req: Request, res: Response): Promise<void>;
    static createSchedule(req: Request, res: Response): Promise<void>;
    static updateSchedule(req: Request, res: Response): Promise<void>;
    static deleteSchedule(req: Request, res: Response): Promise<void>;
    static getSchedulesGroupedByMonth(req: Request, res: Response): Promise<void>;
    static getUpcomingSchedules(req: Request, res: Response): Promise<void>;
    static debugSchedules(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=schedules.controller.d.ts.map