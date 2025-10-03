export declare class ScheduleResponseDto {
    id: number;
    title: string;
    description?: string;
    scheduleDate: Date;
    startTime: string;
    endTime: string;
    location?: string;
    address?: string;
    eventType: 'rehearsal' | 'performance' | 'outreach' | 'recording' | 'meeting' | 'other';
    status: 'confirmed' | 'tentative' | 'cancelled' | 'completed';
    isRecurring: boolean;
    recurrencePattern?: 'weekly' | 'monthly' | 'yearly' | 'none';
    recurrenceInterval?: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=schedule-response.dto.d.ts.map