import { ICreateScheduleReqDto } from '@/shared/interfaces/schedules/request/ICreateScheduleReqDto';
import { EEventType } from '@/shared/enum/EEventType.enum';
import { EScheduleStatus } from '@/shared/enum/EScheduleStatus.enum';
import { ERecurrencePattern } from '@/shared/enum/ERecurrencePattern.enum';
export declare class CreateScheduleDto implements ICreateScheduleReqDto {
    title: string;
    description?: string;
    scheduleDate: string;
    startTime: string;
    endTime: string;
    location?: string;
    address?: string;
    eventType: EEventType;
    status?: EScheduleStatus;
    isRecurring?: boolean;
    recurrencePattern?: ERecurrencePattern;
    recurrenceInterval?: number;
}
//# sourceMappingURL=create-schedule.dto.d.ts.map