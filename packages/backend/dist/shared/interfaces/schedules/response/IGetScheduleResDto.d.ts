import { EEventType } from "@/shared/enum/EEventType.enum";
import { ERecurrencePattern } from "@/shared/enum/ERecurrencePattern.enum";
import { EScheduleStatus } from "@/shared/enum/EScheduleStatus.enum";
export interface IGetScheduleResDto {
    id: number;
    title: string;
    description?: string;
    scheduleDate?: string | null;
    startTime?: string | null;
    endTime?: string | null;
    location?: string | null;
    address?: string | null;
    eventType: EEventType;
    status: EScheduleStatus;
    isRecurring: boolean;
    recurrencePattern?: ERecurrencePattern;
    recurrenceInterval?: number;
    isActive: boolean;
    createdAt?: string | null;
    updatedAt?: string | null;
}
//# sourceMappingURL=IGetScheduleResDto.d.ts.map