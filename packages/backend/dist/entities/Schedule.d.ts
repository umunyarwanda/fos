import { ERecurrencePattern } from '../shared/enum/ERecurrencePattern.enum';
import { EEventType } from '../shared/enum/EEventType.enum';
import { EScheduleStatus } from '../shared/enum/EScheduleStatus.enum';
export declare class Schedule {
    id: number;
    title: string;
    description?: string;
    scheduleDate: Date;
    startTime: string;
    endTime: string;
    location: string;
    address?: string;
    eventType: EEventType;
    status: EScheduleStatus;
    isRecurring: boolean;
    recurrencePattern?: ERecurrencePattern;
    recurrenceInterval?: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}
//# sourceMappingURL=Schedule.d.ts.map