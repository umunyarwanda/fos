import { EEventType } from "@/shared/enum/EEventType.enum";
import { ERecurrencePattern } from "@/shared/enum/ERecurrencePattern.enum";
import { EScheduleStatus } from "@/shared/enum/EScheduleStatus.enum";

export interface ICreateScheduleReqDto {
  title: string;
  description?: string;
  scheduleDate: string; // ISO date string
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